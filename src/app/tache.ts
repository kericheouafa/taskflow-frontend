import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private apiUrl = 'http://localhost:8080/taches';

  constructor(private http: HttpClient) {}

  getTaches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTache(tache: any): Observable<any> {
    return this.http.post(this.apiUrl, tache);
  }

  deleteTache(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}