import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Pokemon, Team } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private authService = inject(AuthService);

  createTeam(teamData: { teamName: string; maxMembers: number; dateCreated: Date }) {
    const key = `teams_${this.authService.getCurrentUser()?.id}`;
    const existingTeams = JSON.parse(localStorage.getItem(key) || '[]');
    const newTeam = {
      id: crypto.randomUUID(),
      ...teamData,
    };
    existingTeams.push(newTeam);
    localStorage.setItem(key, JSON.stringify(existingTeams));
  }

  getTeams(): Team[] {
    const key = `teams_${this.authService.getCurrentUser()?.id}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  updateTeam(teamId: string, pokemons: Pokemon[]) {
    const key = `teams_${this.authService.getCurrentUser()?.id}`;
    const existingTeams: Team[] = JSON.parse(localStorage.getItem(key) || '[]');
    const teamIndex = existingTeams.findIndex((team) => team.id === teamId);
    if (teamIndex !== -1) {
      const currentPokemons = existingTeams[teamIndex].pokemons || [];
      existingTeams[teamIndex].pokemons = [...currentPokemons, ...pokemons];
      localStorage.setItem(key, JSON.stringify(existingTeams));
    }
  }

  deleteTeam(teamId: string) {
    const key = `teams_${this.authService.getCurrentUser()?.id}`;
    const existingTeams: Team[] = JSON.parse(localStorage.getItem(key) || '[]');
    const updatedTeams = existingTeams.filter((team) => team.id !== teamId);
    localStorage.setItem(key, JSON.stringify(updatedTeams));
  }

  getTeamById(teamId: string): Team | undefined {
    const key = `teams_${this.authService.getCurrentUser()?.id}`;
    const existingTeams: Team[] = JSON.parse(localStorage.getItem(key) || '[]');
    return existingTeams.find((team) => team.id === teamId);
  }
}
