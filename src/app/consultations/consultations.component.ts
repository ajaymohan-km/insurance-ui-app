import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardService } from '../services/customer-dashboard.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
  consultations: any[] = [];
  loading = true;

  constructor(private dashboardService: CustomerDashboardService,private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.dashboardService.getConsultations().subscribe({
      next: (data) => {
        this.consultations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading consultations:', error);
        this.loading = false;
      }
    });
  }

  onApply(consultation: any): void {
    const applicationData = {
      planId: consultation.planId,
      providerId: consultation.providerId,
      consultationId: consultation.id
    };

    this.dashboardService.submitApplication(applicationData).subscribe({
      next: (response) => {
        this.loadConsultations();
        this.toastr.success('Application submitted successfully!', 'Success');
      },
      error: (error) => {
        this.toastr.error('Failed to submit application', 'Error');
        console.error('Error submitting application:', error);
      }
    });
  }
}
