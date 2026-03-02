import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService, RegionService } from '../../services/api';
import { IBusiness, BusinessType } from '../../models/business.model';

interface RegionStat {
  regionName: string;
  countryName: string;
  total: number;
  percentage: number;
  byType: Record<string, number>;
}

interface CountryStat {
  countryName: string;
  total: number;
}

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  private readonly businessService = inject(BusinessService);

  readonly businesses = signal<IBusiness[]>([]);
  readonly isLoading = signal(true);
  readonly businessTypes = Object.values(BusinessType);

  /** Production grouped by region and type */
  readonly regionStats = computed<RegionStat[]>(() => {
    const map = new Map<string, RegionStat>();
    const total = this.businesses().length;

    for (const b of this.businesses()) {
      const key = `${b.region?.name}-${b.region?.country?.name}`;
      if (!map.has(key)) {
        map.set(key, {
          regionName: b.region?.name ?? 'Sin región',
          countryName: b.region?.country?.name ?? 'Sin país',
          total: 0,
          percentage: 0,
          byType: {},
        });
      }
      const stat = map.get(key)!;
      stat.total++;
      stat.percentage = total > 0 ? (stat.total / total) * 100 : 0;
      const typeName = b.type ?? 'OTHER';
      stat.byType[typeName] = (stat.byType[typeName] ?? 0) + 1;
    }

    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  });

  /** Top 10 countries by entrepreneurship */
  readonly topCountries = computed<CountryStat[]>(() => {
    const map = new Map<string, number>();
    for (const b of this.businesses()) {
      const country = b.region?.country?.name ?? 'Sin país';
      map.set(country, (map.get(country) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([countryName, total]) => ({ countryName, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  });

  /** Percentage by region */
  readonly regionPercentages = computed(() => {
    return this.regionStats().map((r) => ({
      label: `${r.regionName} (${r.countryName})`,
      percentage: r.percentage,
      total: r.total,
    }));
  });

  ngOnInit(): void {
    this.businessService.getAll().subscribe({
      next: (data) => {
        this.businesses.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
