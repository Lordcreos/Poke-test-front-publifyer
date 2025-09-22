import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingPageComponent {
  private router = inject(Router);

  features = [
    {
      icon: 'pi pi-search',
      titleKey: 'landing.features.search.title',
      descriptionKey: 'landing.features.search.description'
    },
    {
      icon: 'pi pi-users',
      titleKey: 'landing.features.teams.title',
      descriptionKey: 'landing.features.teams.description'
    },
    {
      icon: 'pi pi-chart-line',
      titleKey: 'landing.features.analytics.title',
      descriptionKey: 'landing.features.analytics.description'
    },
    {
      icon: 'pi pi-mobile',
      titleKey: 'landing.features.responsive.title',
      descriptionKey: 'landing.features.responsive.description'
    }
  ];

  testimonials = [
    {
      name: 'Ash Ketchum',
      role: 'Pokémon Trainer',
      content: 'landing.testimonials.ash.content',
      avatar: '🧢',
      rating: 5
    },
    {
      name: 'Misty',
      role: 'Gym Leader',
      content: 'landing.testimonials.misty.content',
      avatar: '🌊',
      rating: 5
    },
    {
      name: 'Brock',
      role: 'Pokémon Breeder',
      content: 'landing.testimonials.brock.content',
      avatar: '🗿',
      rating: 5
    }
  ];

  navigateToAuth() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}