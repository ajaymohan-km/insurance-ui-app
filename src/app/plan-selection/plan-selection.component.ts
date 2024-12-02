import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerDashboardService } from '../services/customer-dashboard.service';

@Component({
  selector: 'app-plan-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.css']
})
export class PlanSelectionComponent implements OnInit {
  planDetails: any;
  serviceProviders: any[] = [];
  selectedProvider: string = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: CustomerDashboardService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('id');
    if (planId) {
      this.loadPlanDetails(planId);
      this.loadServiceProviders();
    }
  }

  loadPlanDetails(planId: string): void {
    this.dashboardService.getPlanDetails(planId).subscribe({
      next: (data) => {
        this.planDetails = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading plan details:', error);
        this.loading = false;
      }
    });
  }

  loadServiceProviders(): void {
    this.dashboardService.getServiceProviders().subscribe({
      next: (data) => {
        this.serviceProviders = data;
      },
      error: (error) => {
        console.error('Error loading service providers:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.selectedProvider && this.planDetails) {
      const consultationData = {
        serviceProviderId: this.selectedProvider,
        planId: this.planDetails.id,
        scheduledTime: new Date().toISOString(),
        notes: "Plan consultation request"
      };
  
      this.dashboardService.submitConsultation(consultationData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error submitting consultation:', error);
        }
      });
    }
  }
}
