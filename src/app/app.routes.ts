import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'login',
        loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)
    }
    ,
    {
        path:'register',
        loadComponent:()=>import('./register/register.component').then(m=>m.RegisterComponent)
    },
    { 
        path: 'dashboard', 
        loadComponent:()=>import('./customer-dashboard/customer-dashboard.component').then(m=>m.CustomerDashboardComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'plans',
        loadComponent: () => import('./insurance-plans/insurance-plans.component').then(m => m.InsurancePlansComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'providers',
        loadComponent: () => import('./service-providers/service-providers.component')
            .then(m => m.ServiceProvidersComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
    
];
