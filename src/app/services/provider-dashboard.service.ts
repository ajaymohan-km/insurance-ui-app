import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderDashboardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProviderConsultations(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

    return this.http.get(`${this.apiUrl}/consultations/provider`, { headers });
  }

  getProviderClaims(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

    return this.http.get(`${this.apiUrl}/claims/provider`, { headers });
  }
  completeConsultation(consultationId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('accept', '*/*');

    return this.http.put(`${this.apiUrl}/consultations/${consultationId}/complete`, {}, { headers });
}
approveClaim(claimId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

  return this.http.put(`${this.apiUrl}/claims/${claimId}/approve`, {}, { headers });
}

rejectClaim(claimId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

  return this.http.put(`${this.apiUrl}/claims/${claimId}/reject`, {}, { headers });
}

}
