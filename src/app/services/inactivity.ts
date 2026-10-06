import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InactivityService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private expiryTimer: any;
  private running = false;
  private refreshing = false;
  private readonly events = ['click', 'keydown', 'mousemove', 'scroll'];
  private readonly onActivity = () => this.maybeRefresh();

  start() {
    if (this.running) return;
    this.running = true;
    this.events.forEach(e => window.addEventListener(e, this.onActivity));
    this.scheduleExpiry();
    console.log('InactivityService démarré');
  }

  stop() {
    this.running = false;
    clearTimeout(this.expiryTimer);
    this.events.forEach(e => window.removeEventListener(e, this.onActivity));
  }

  private readPayload(): { exp: number; iat: number } | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(b64));
    } catch {
      return null;
    }
  }

  private scheduleExpiry() {
    clearTimeout(this.expiryTimer);
    const p = this.readPayload();
    if (!p) return;
    const ms = Math.max(p.exp * 1000 - Date.now(), 0);
    this.expiryTimer = setTimeout(() => this.expire(), ms);
  }

  private maybeRefresh() {
    if (this.refreshing) return;
    const p = this.readPayload();
    if (!p) return;

    const remaining = p.exp * 1000 - Date.now();
    const lifetime = (p.exp - p.iat) * 1000;
    if (remaining <= 0 || remaining > lifetime / 2) return;

    this.refreshing = true;
    this.http
      .post(`${environment.apiUrl}/api/auth/refresh`, {}, { responseType: 'text' })
      .subscribe({
        next: token => {
          localStorage.setItem('token', token);
          this.scheduleExpiry();
          this.refreshing = false;
        },
        error: () => { this.refreshing = false; }
      });
  }

  private expire() {
    this.stop();
    localStorage.removeItem('token');
    this.router.navigate(['/session-expiree']);
  }
}