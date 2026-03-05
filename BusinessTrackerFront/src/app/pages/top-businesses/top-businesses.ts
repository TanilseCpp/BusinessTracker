import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../services/api';
import { IBusiness } from '../../models/business.model';

@Component({
  selector: 'app-top-businesses',
  imports: [CommonModule],
  templateUrl: './top-businesses.html',
  styleUrl: './top-businesses.css',
})
export class TopBusinesses implements OnInit {
  private readonly businessService = inject(BusinessService);

  readonly allBusinesses = signal<IBusiness[]>([]);
  readonly isLoading = signal(true);

  /** Top 10 businesses sorted by income (most searched = most profitable) */
  readonly topBusinesses = computed(() => {
    return [...this.allBusinesses()]
      .sort((a, b) => (b.income ?? 0) - (a.income ?? 0))
      .slice(0, 10);
  });

  ngOnInit(): void {
    this.businessService.getAll().subscribe({
      next: (data) => {
        this.allBusinesses.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  /** Calculate profit for a business */
  getProfit(business: IBusiness): number {
    return (business.income ?? 0) - (business.expenses ?? 0);
  }

  /** Calculate ROI for a business */
  getRoi(business: IBusiness): number {
    if (!business.expenses || business.expenses === 0) return 0;
    return (this.getProfit(business) / business.expenses) * 100;
  }
}
