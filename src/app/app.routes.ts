import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./customer-dashboard/customer-dashboard.component')
                    .then(m => m.CustomerDashboardComponent)
            },
            {
                path: 'plans',
                loadComponent: () => import('./insurance-plans/insurance-plans.component')
                    .then(m => m.InsurancePlansComponent)
            },
            {
                path: 'consultations',
                loadComponent: () => import('./consultations/consultations.component')
                    .then(m => m.ConsultationsComponent)
            },
            {
                path: 'policies',
                loadComponent: () => import('./policies/policies.component')
                    .then(m => m.PoliciesComponent)
            },
            {
                path: 'claims',
                loadComponent: () => import('./claims/claims.component')
                    .then(m => m.ClaimsComponent)
            },
            {
                path: 'plan-details/:id',
                loadComponent: () => import('./plan-details/plan-details.component').then(m => m.PlanDetailsComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'plan-selection/:id',
                loadComponent: () => import('./plan-selection/plan-selection.component').then(m => m.PlanSelectionComponent),
                canActivate: [AuthGuard]
            }
        ]
    },
    
    {
        path: 'providers',
        loadComponent: () => import('./service-providers/service-providers.component')
            .then(m => m.ServiceProvidersComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'provider-dashboard',
        loadComponent: () => import('./provider-dashboard/provider-dashboard.component')
            .then(m => m.ProviderDashboardComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'admin-dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
