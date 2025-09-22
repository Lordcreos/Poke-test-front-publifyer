import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@core/services';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';

interface DashboardMetric {
  label: string;
  value: number;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  color: string;
}

interface SystemStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
}

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    ChartModule,
    ButtonModule,
    TagModule,
    PanelModule,
    ProgressBarModule,
    BadgeModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent implements OnInit {
  private authService = inject(AuthService);

  // Verificar que es admin
  isAdmin = computed(() => this.authService.isAdmin());

  // Métricas principales
  metrics = signal<DashboardMetric[]>([
    {
      label: 'dashboard.totalUsers',
      value: 1247,
      icon: 'pi pi-users',
      trend: 'up',
      trendValue: 12,
      color: 'blue'
    },
    {
      label: 'dashboard.activeTrainers',
      value: 892,
      icon: 'pi pi-user',
      trend: 'up',
      trendValue: 8,
      color: 'green'
    },
    {
      label: 'dashboard.pokemonCaught',
      value: 15634,
      icon: 'pi pi-star',
      trend: 'up',
      trendValue: 24,
      color: 'orange'
    },
    {
      label: 'dashboard.teamsCreated',
      value: 3456,
      icon: 'pi pi-users',
      trend: 'down',
      trendValue: 3,
      color: 'purple'
    }
  ]);

  // Estado del sistema
  systemStatus = signal<SystemStatus[]>([
    { name: 'dashboard.serverHealth', status: 'online', uptime: '99.9%' },
    { name: 'dashboard.databaseStatus', status: 'online', uptime: '99.8%' },
    { name: 'dashboard.apiCalls', status: 'warning', uptime: '1,234,567' }
  ]);

  // Datos del gráfico de actividad de usuarios
  userActivityData = signal<any>({});
  userActivityOptions = signal<any>({});

  // Datos del gráfico de Pokémon populares
  popularPokemonData = signal<any>({});
  popularPokemonOptions = signal<any>({});

  // Actividad reciente
  recentActivity = signal<any[]>([
    {
      user: 'Carlos M.',
      action: 'Capturó Charizard',
      time: 'Hace 5 min',
      type: 'catch'
    },
    {
      user: 'Ana L.',
      action: 'Creó nuevo equipo',
      time: 'Hace 12 min',
      type: 'team'
    },
    {
      user: 'Miguel R.',
      action: 'Se registró',
      time: 'Hace 23 min',
      type: 'register'
    },
    {
      user: 'Sofia P.',
      action: 'Actualizó perfil',
      time: 'Hace 1 hora',
      type: 'profile'
    }
  ]);

  ngOnInit() {
    this.initializeCharts();
  }

  private initializeCharts() {
    // Configurar gráfico de actividad de usuarios
    this.userActivityData.set({
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Usuarios Activos',
          data: [65, 78, 90, 81, 96, 78, 92],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    });

    this.userActivityOptions.set({
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#E5E7EB'
          }
        },
        x: {
          grid: {
            color: '#E5E7EB'
          }
        }
      }
    });

    // Configurar gráfico de Pokémon populares
    this.popularPokemonData.set({
      labels: ['Pikachu', 'Charizard', 'Blastoise', 'Venusaur', 'Lucario'],
      datasets: [
        {
          data: [342, 287, 234, 198, 176],
          backgroundColor: [
            '#FFD700',
            '#FF6B35',
            '#4A90E2',
            '#7ED321',
            '#9013FE'
          ],
          borderWidth: 0
        }
      ]
    });

    this.popularPokemonOptions.set({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    });
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'online': return 'success';
      case 'warning': return 'warning';
      case 'offline': return 'danger';
      default: return 'warning';
    }
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return 'pi pi-arrow-up';
      case 'down': return 'pi pi-arrow-down';
      default: return 'pi pi-minus';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'catch': return 'pi pi-star';
      case 'team': return 'pi pi-users';
      case 'register': return 'pi pi-user-plus';
      case 'profile': return 'pi pi-user-edit';
      default: return 'pi pi-circle';
    }
  }

  getActivityColor(type: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (type) {
      case 'catch': return 'warn';
      case 'team': return 'info';
      case 'register': return 'success';
      case 'profile': return 'secondary';
      default: return 'contrast';
    }
  }
}