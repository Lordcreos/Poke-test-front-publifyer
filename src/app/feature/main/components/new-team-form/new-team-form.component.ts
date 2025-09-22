import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamDataService } from '@core/services';

@Component({
  selector: 'new-team-form',
  imports: [ReactiveFormsModule, TranslateModule, InputTextModule, InputNumberModule, ButtonModule],
  templateUrl: './new-team-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamFormComponent {
  private teamDataService = inject(TeamDataService);

  public close = output<void>();

  teamForm = new FormGroup({
    teamName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    maxMembers: new FormControl<number>(6, { nonNullable: true, validators: [Validators.min(1)] }),
    dateCreated: new FormControl<Date>(new Date(), { nonNullable: true }),
  });

  onCancel() {
    this.close.emit();
  }

  onCreateNewTeam() {
    if (this.teamForm.valid) {
      const newTeam = this.teamForm.getRawValue();
      this.teamDataService.createTeam(newTeam);
      this.teamForm.reset({ teamName: '', maxMembers: 6, dateCreated: new Date() });
      this.close.emit();
    }
  }
}
