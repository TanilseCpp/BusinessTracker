import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService, RegionService } from '../../services/api';
import { IBusiness } from '../../models/business.model';
import { IRegion } from '../../models/region.model';

@Component({
  selector: 'app-global-businesses',
  imports: [CommonModule, FormsModule],
  templateUrl: './global-businesses.html',
  styleUrl: './global-businesses.css',
})
export class GlobalBusinesses implements OnInit {
  private readonly businessService = inject(BusinessService);
  private readonly regionService = inject(RegionService);

  readonly businesses = signal<IBusiness[]>([]);
  readonly regions = signal<IRegion[]>([]);
  readonly isLoading = signal(true);

  readonly searchTerm = signal('');
  readonly selectedRegionId = signal<number | null>(null);

  /** Filtered list based on search term and region */
  readonly filteredBusinesses = computed(() => {
    let result = this.businesses();
    const term = this.searchTerm().toLowerCase().trim();
    const regionId = this.selectedRegionId();

    if (term) {
      result = result.filter(
        (b) =>
          b.businessName.toLowerCase().includes(term) ||
          b.type?.toLowerCase().includes(term) ||
          b.email?.toLowerCase().includes(term)
      );
    }

    if (regionId) {
      result = result.filter((b) => b.region?.id === regionId);
    }

    return result;
  });

  ngOnInit(): void {
    this.loadData();
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onRegionChange(value: string): void {
    this.selectedRegionId.set(value ? Number(value) : null);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedRegionId.set(null);
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

  private loadData(): void {
    this.businessService.getAll().subscribe({
      next: (data) => {
        this.businesses.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });

    this.regionService.getAll().subscribe({
      next: (data) => this.regions.set(data),
    });
  }
}
