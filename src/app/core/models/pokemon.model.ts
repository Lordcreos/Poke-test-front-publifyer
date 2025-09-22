export interface Pokemon {
  id: number;
  name: string;
  image: null | string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  speed: number;
  experience: number;
  height: number;
  weight: number;
  types: Type[];
  generation: Generation;
  region: Region;
}

export enum Generation {
  GenerationI = 'generation-i',
  GenerationIi = 'generation-ii',
  GenerationIii = 'generation-iii',
  GenerationIv = 'generation-iv',
  GenerationIx = 'generation-ix',
  GenerationV = 'generation-v',
  GenerationVi = 'generation-vi',
  GenerationVii = 'generation-vii',
  GenerationViii = 'generation-viii',
  Unknown = 'unknown',
}

export enum Region {
  Alola = 'alola',
  Galar = 'galar',
  Hoenn = 'hoenn',
  Johto = 'johto',
  Kalos = 'kalos',
  Kanto = 'kanto',
  Paldea = 'paldea',
  Sinnoh = 'sinnoh',
  Unova = 'unova',
  Unknown = 'unknown',
}

export enum Type {
  Bug = 'bug',
  Dark = 'dark',
  Dragon = 'dragon',
  Electric = 'electric',
  Fairy = 'fairy',
  Fighting = 'fighting',
  Fire = 'fire',
  Flying = 'flying',
  Ghost = 'ghost',
  Grass = 'grass',
  Ground = 'ground',
  Ice = 'ice',
  Normal = 'normal',
  Poison = 'poison',
  Psychic = 'psychic',
  Rock = 'rock',
  Steel = 'steel',
  Water = 'water',
  Unknown = 'unknown',
}

export const TypeColors: Record<Type, { background: string; text: string }> = {
  [Type.Bug]: { background: '#A8B820', text: '#FFFFFF' },
  [Type.Dark]: { background: '#705848', text: '#FFFFFF' },
  [Type.Dragon]: { background: '#7038F8', text: '#FFFFFF' },
  [Type.Electric]: { background: '#F8D030', text: '#000000' },
  [Type.Fairy]: { background: '#EE99AC', text: '#000000' },
  [Type.Fighting]: { background: '#C03028', text: '#FFFFFF' },
  [Type.Fire]: { background: '#F08030', text: '#FFFFFF' },
  [Type.Flying]: { background: '#A890F0', text: '#000000' },
  [Type.Ghost]: { background: '#705898', text: '#FFFFFF' },
  [Type.Grass]: { background: '#78C850', text: '#000000' },
  [Type.Ground]: { background: '#E0C068', text: '#000000' },
  [Type.Ice]: { background: '#98D8D8', text: '#000000' },
  [Type.Normal]: { background: '#A8A878', text: '#000000' },
  [Type.Poison]: { background: '#A040A0', text: '#FFFFFF' },
  [Type.Psychic]: { background: '#F85888', text: '#FFFFFF' },
  [Type.Rock]: { background: '#B8A038', text: '#000000' },
  [Type.Steel]: { background: '#B8B8D0', text: '#000000' },
  [Type.Water]: { background: '#6890F0', text: '#FFFFFF' },
  [Type.Unknown]: { background: '#68A090', text: '#FFFFFF' },
};
