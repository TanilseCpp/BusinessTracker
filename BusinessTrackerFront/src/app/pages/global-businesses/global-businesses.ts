import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService, RegionService, CountryService } from '../../services/api';
import { IBusiness, BusinessType } from '../../models/business.model';
import { IRegion } from '../../models/region.model';
import { ICountry } from '../../models/country.model';

@Component({
  selector: 'app-global-businesses',
  imports: [CommonModule, FormsModule],
  templateUrl: './global-businesses.html',
  styleUrl: './global-businesses.css',
})
export class GlobalBusinesses implements OnInit {
  private readonly businessService = inject(BusinessService);
  private readonly regionService = inject(RegionService);
  private readonly countryService = inject(CountryService);

  readonly businesses = signal<IBusiness[]>([]);
  readonly regions = signal<IRegion[]>([]);
  readonly countries = signal<ICountry[]>([]);
  readonly isLoading = signal(true);

  readonly searchTerm = signal('');
  readonly selectedRegionId = signal<number | null>(null);
  readonly selectedCountryId = signal<number | null>(null);
  readonly selectedType = signal<BusinessType | null>(null);

  readonly businessTypes = Object.values(BusinessType);

  /** Filtered list: server-side search + client-side name filter */
  readonly filteredBusinesses = computed(() => {
    let result = this.businesses();
    const term = this.searchTerm().toLowerCase().trim();

    if (term) {
      result = result.filter(
        (b) =>
          b.businessName.toLowerCase().includes(term) ||
          b.email?.toLowerCase().includes(term)
      );
    }

    return result;
  });

  ngOnInit(): void {
    this.loadReferenceData();
    this.executeSearch();
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onRegionChange(value: string): void {
    this.selectedRegionId.set(value ? Number(value) : null);
    this.executeSearch();
  }

  onCountryChange(value: string): void {
    this.selectedCountryId.set(value ? Number(value) : null);
    this.executeSearch();
  }

  onTypeChange(value: string): void {
    this.selectedType.set(value ? (value as BusinessType) : null);
    this.executeSearch();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedRegionId.set(null);
    this.selectedCountryId.set(null);
    this.selectedType.set(null);
    this.executeSearch();
  }

  getTypeBadgeClass(type: string): string {
    const classes: Record<string, string> = {
      RESTAURANT: 'bg-warning text-dark',
      STORE: 'bg-info text-dark',
      SERVICE: 'bg-primary',
      ONLINE: 'bg-success',
      TECNOLOGY: 'bg-secondary',
      OTHER: 'bg-dark',
    };
    return classes[type] ?? 'bg-secondary';
  }

  /** Uses backend /search endpoint with filters */
  private executeSearch(): void {
    this.isLoading.set(true);
    this.businessService
      .search({
        type: this.selectedType() ?? undefined,
        regionId: this.selectedRegionId() ?? undefined,
        countryId: this.selectedCountryId() ?? undefined,
      })
      .subscribe({
        next: (data) => {
          this.businesses.set(data);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }

  private loadReferenceData(): void {
    this.regionService.getAll().subscribe({
      next: (data) => this.regions.set(data),
    });
    this.countryService.getAll().subscribe({
      next: (data) => this.countries.set(data),
    });
  }
}
