import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NewTeamFormComponent } from '@feature/main/components/new-team-form/new-team-form.component';
import { TeamDataService } from '@core/services';
import { TeamSummaryComponent } from '@feature/main/components/team-summary/team-summary.component';

@Component({
  selector: 'app-my-team-page',
  imports: [
    TranslateModule,
    ButtonModule,
    DialogModule,
    NewTeamFormComponent,
    TeamSummaryComponent,
  ],
  templateUrl: './my-team-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyTeamPageComponent {
  private teamDataService = inject(TeamDataService);

  teams = this.teamDataService.teams;

  display = signal<boolean>(false);

  showTeamForm() {
    this.display.set(true);
  }
}
