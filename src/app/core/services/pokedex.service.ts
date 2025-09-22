import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  private key = signal<string | null>(null);
  public pokedex = signal<Pokemon[]>([]);

  public initializePokedex() {
    const currentUser = this.authService.getCurrentUser();
    const storageKey = currentUser ? `pokedex_${currentUser.id}` : null;
    this.key.set(storageKey);

    if (storageKey) {
      const storedPokedex = localStorage.getItem(storageKey);
      if (storedPokedex) {
        this.pokedex.set(JSON.parse(storedPokedex));
      } else {
        this.pokedex.set([]);
      }
    } else {
      this.pokedex.set([]);
    }
  }

  addPokemonToPokedex(pokemons: Pokemon[]) {
    const newPokemons = pokemons.filter(
      (p) => !this.pokedex().some((existing) => existing.id === p.id)
    );

    if (newPokemons.length === 0) {
      return;
    }

    const updatedPokedex = [...this.pokedex(), ...newPokemons];
    this.pokedex.set(updatedPokedex);

    const storageKey = this.key();
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(updatedPokedex));
    }

    this.toastService.showSuccess('TOAST.POKEDEX.ADD_SUCCESS');
  }
}
