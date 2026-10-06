import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { InactivityService } from './inactivity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth`;
  private inactivity = inject(InactivityService);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`,
      { email, password },
      { responseType: 'text' as 'json' }
    ).pipe(
      tap(token => {
        localStorage.setItem('token', token);
        this.inactivity.start();
      })
    );
  }

  register(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`,
      { email, password },
      { responseType: 'text' as 'json' }
    );
  }

  logout() {
    this.inactivity.stop();
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}