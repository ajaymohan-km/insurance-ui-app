import { Component } from '@angular/core';
import { ServiceProvider } from '../model/service.provider.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-providers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-providers.component.html',
  styleUrl: './service-providers.component.css'
})
export class ServiceProvidersComponent {

  selectedSpecialty: string = '';
  selectedLocation: string = '';
  searchTerm: string = '';
  providers: ServiceProvider[] = [];
  filteredProviders: ServiceProvider[] = [];

  filterProviders(): void {
    this.filteredProviders = this.providers.filter(provider => {
      const matchesSpecialty = !this.selectedSpecialty || provider.specialty === this.selectedSpecialty;
      const matchesLocation = !this.selectedLocation || provider.location === this.selectedLocation;
      const matchesSearch = !this.searchTerm || 
        provider.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSpecialty && matchesLocation && matchesSearch;
    });
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

}
