import { inject, Injectable, signal } from '@angular/core';
import { Pokemon, Team } from '@core/models';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root',
})
export class TeamDataService {
  private teamService = inject(TeamsService);

  teams = signal<Team[]>([]);

  constructor() {
    this.loadTeams();
  }

  private loadTeams() {
    this.teams.set(this.teamService.getTeams());
  }

  public createTeam(teamData: { teamName: string; maxMembers: number; dateCreated: Date }) {
    this.teamService.createTeam(teamData);
    this.loadTeams();
  }

  public updateTeam(teamId: string, pokemons: Pokemon[]) {
    this.teamService.updateTeam(teamId, pokemons);
    this.loadTeams();
  }
  public deleteTeam(teamId: string) {
    this.teamService.deleteTeam(teamId);
    this.loadTeams();
  }

  public getTeamById(teamId: string): Team | undefined {
    return this.teamService.getTeamById(teamId);
  }
}
