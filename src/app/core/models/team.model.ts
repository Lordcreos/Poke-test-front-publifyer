import { Pokemon } from './pokemon.model';

export interface Team {
  id: string;
  teamName: string;
  maxMembers: number;
  dateCreated: Date;
  pokemons?: Pokemon[];
}
