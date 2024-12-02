import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');

    return this.http.get(`${this.apiUrl}/customer/dashboard/summary`, { headers });
  }

  getPlanDetails(planId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');
  
    return this.http.get(`${this.apiUrl}/plans/${planId}`, { headers });
  }

  getAllPlans(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');
  
    return this.http.get(`${this.apiUrl}/plans`, { headers });
  }

  getServiceProviders(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');
  
    return this.http.get(`${this.apiUrl}/users/service-providers`, { headers });
  }

  submitConsultation(consultationData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*')
      .set('Content-Type', 'application/json');
  
    return this.http.post(`${this.apiUrl}/consultations`, consultationData, { headers });
  }

  getConsultations(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*');
  
    return this.http.get(`${this.apiUrl}/consultations`, { headers });
  }

  submitApplication(applicationData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', '*/*')
      .set('Content-Type', 'application/json');
  
    return this.http.post(`${this.apiUrl}/applications`, applicationData, { headers });
  }

  getPolicies(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('accept', '*/*');
    
    return this.http.get(`${this.apiUrl}/policies`, { headers });
  }

  submitClaim(claimData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('accept', '*/*')
        .set('Content-Type', 'application/json');
    
    return this.http.post(`${this.apiUrl}/claims`, claimData, { headers });
  }

  getClaims(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('accept', '*/*');
    
    return this.http.get(`${this.apiUrl}/claims`, { headers });
  }
}
