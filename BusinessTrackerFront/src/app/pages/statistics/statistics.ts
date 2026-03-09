import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  viewChild,
  effect,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../services/api';
import {
  IProductionReport,
  ICountryRanking,
  BusinessType,
} from '../../models/business.model';
import { Chart, ArcElement, BarElement, BarController, DoughnutController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, BarController, DoughnutController, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit, OnDestroy {
  private readonly businessService = inject(BusinessService);

  readonly productionReport = signal<IProductionReport[]>([]);
  readonly regionPercentages = signal<Record<string, number>>({});
  readonly topCountries = signal<ICountryRanking[]>([]);
  readonly isLoading = signal(true);
  readonly businessTypes = Object.values(BusinessType);

  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  readonly pieCanvas = viewChild<ElementRef<HTMLCanvasElement>>('pieCanvas');
  readonly barCanvas = viewChild<ElementRef<HTMLCanvasElement>>('barCanvas');

  constructor() {
    // Reactively build pie chart when canvas becomes available
    effect(() => {
      const canvasRef = this.pieCanvas();
      const data = this.regionPercentages();
      if (canvasRef && Object.keys(data).length > 0) {
        this.buildPieChart(canvasRef.nativeElement, data);
      }
    });

    // Reactively build bar chart when canvas becomes available
    effect(() => {
      const canvasRef = this.barCanvas();
      const countries = this.topCountries();
      if (canvasRef && countries.length > 0) {
        this.buildBarChart(canvasRef.nativeElement, countries);
      }
    });
  }

  ngOnInit(): void {
    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded === 3) {
        this.isLoading.set(false);
      }
    };

    this.businessService.getProductionReport().subscribe({
      next: (data) => { this.productionReport.set(data); checkDone(); },
      error: () => checkDone(),
    });

    this.businessService.getRegionPercentages().subscribe({
      next: (data) => { this.regionPercentages.set(data); checkDone(); },
      error: () => checkDone(),
    });

    this.businessService.getTop10Countries().subscribe({
      next: (data) => { this.topCountries.set(data); checkDone(); },
      error: () => checkDone(),
    });
  }

  ngOnDestroy(): void {
    this.pieChart?.destroy();
    this.barChart?.destroy();
  }

  private buildPieChart(canvas: HTMLCanvasElement, data: Record<string, number>): void {
    this.pieChart?.destroy();
    const entries = Object.entries(data).map(([region, percentage]) => ({ region, percentage }));
    const colors = this.generateColors(entries.length);
    this.pieChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: entries.map((e) => e.region),
        datasets: [{
          data: entries.map((e) => e.percentage),
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 14, padding: 12 } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${(ctx.raw as number).toFixed(1)}%`,
            },
          },
        },
      },
    });
  }

  private buildBarChart(canvas: HTMLCanvasElement, countries: ICountryRanking[]): void {
    this.barChart?.destroy();
    const barColors = this.generateColors(countries.length);
    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: countries.map((c) => c.country),
        datasets: [{
          label: 'Emprendimientos',
          data: countries.map((c) => c.totalBusinesses),
          backgroundColor: barColors,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } },
      },
    });
  }

  /** Unique regions in report */
  get uniqueRegions(): string[] {
    const set = new Set(this.productionReport().map((r) => r.region));
    return Array.from(set);
  }

  getCountForRegionType(region: string, type: string): number {
    return (
      this.productionReport().find(
        (r) => r.region === region && r.type === type
      )?.totalUsers ?? 0
    );
  }

  regionTotal(region: string): number {
    return this.productionReport()
      .filter((r) => r.region === region)
      .reduce((sum, r) => sum + r.totalUsers, 0);
  }

  get percentageEntries(): { region: string; percentage: number }[] {
    return Object.entries(this.regionPercentages()).map(([region, percentage]) => ({
      region,
      percentage,
    }));
  }

  private generateColors(count: number): string[] {
    const palette = [
      '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
      '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ac',
      '#86bcb6', '#8cd17d', '#b6992d', '#499894', '#e15759',
    ];
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
  }
}
