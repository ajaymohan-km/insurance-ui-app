import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPendingApplications(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

    return this.http.get(`${this.apiUrl}/applications/submitted`, { headers });
  }

  getServiceProviders(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

    return this.http.get(`${this.apiUrl}/users/all-service-providers`, { headers });
  }
  approveApplication(applicationId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('accept', '*/*');

    return this.http.put(`${this.apiUrl}/admin/applications/${applicationId}/approve`, {}, { headers });
}

rejectApplication(applicationId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('accept', '*/*');

    return this.http.put(`${this.apiUrl}/admin/applications/${applicationId}/reject`, {}, { headers });
}
enableProvider(providerId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

  return this.http.put(`${this.apiUrl}/admin/providers/${providerId}/approve`, {}, { headers });
}

disableProvider(providerId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

  return this.http.put(`${this.apiUrl}/admin/providers/${providerId}/reject`, {}, { headers });
}


}
