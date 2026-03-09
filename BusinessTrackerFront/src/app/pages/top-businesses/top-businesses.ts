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

  /** Top 10 businesses sorted by annual income */
  readonly topBusinesses = computed(() => {
    return [...this.allBusinesses()]
      .sort((a, b) => (b.annualIncome ?? 0) - (a.annualIncome ?? 0))
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
}
