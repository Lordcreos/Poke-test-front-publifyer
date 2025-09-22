# Sistema de Roles - PokeDex

## Roles Disponibles

### 1. **Admin** (`UserRole.ADMIN`)
- **Permisos completos**: Puede ver, agregar, editar y eliminar cualquier dato
- **Acceso a**: Todas las funcionalidades del sistema
- **Pokédex**: Ve todos los pokémon disponibles sin restricciones
- **Equipos**: Puede gestionar todos los equipos
- **Estadísticas**: Acceso a estadísticas avanzadas y métricas completas

### 2. **Entrenador/Trainer** (`UserRole.TRAINER`)
- **Permisos de gestión**: Puede gestionar su propia pokédex y equipos
- **Acceso a**: 
  - Crear y gestionar equipos
  - Agregar pokémon a su pokédex
  - Ver estadísticas de progreso
  - Todas las funcionalidades de entrenador
- **Pokédex**: Ve pokémon que no están en su pokédex actual
- **Equipos**: Gestión completa de sus propios equipos

### 3. **Visitante** (`UserRole.VISITOR`)
- **Permisos limitados**: Solo puede visualizar información básica
- **Acceso a**: 
  - Ver pokédex pública (limitada a 50 pokémon)
  - Ver estadísticas básicas
  - Solo visualización, sin capacidad de modificar datos
- **Restricciones**: No puede agregar pokémon ni crear equipos

## Usuarios Mock Disponibles

```typescript
// Admin
Email: admin@pokedex.com
Password: Admin123

// Trainers
Email: ash@pokedex.com
Password: Trainer123

Email: misty@pokedex.com  
Password: Trainer123

// Visitor
Email: guest@pokedex.com
Password: Guest123
```

## Uso en Guards

```typescript
import { roleGuard, adminGuard, trainerGuard } from '@core/guards';

// Rutas que requieren roles específicos
{
  path: 'admin',
  canActivate: [adminGuard],
  component: AdminComponent
},
{
  path: 'teams',
  canActivate: [trainerGuard], // Admin + Trainer
  component: TeamsComponent
},
{
  path: 'dashboard',
  canActivate: [roleGuard([UserRole.ADMIN, UserRole.TRAINER])],
  component: DashboardComponent
}
```

## Uso en Servicios

```typescript
// En PokemonDataService
async getPokemonsByRole(): Promise<Pokemon[]> {
  if (this.authService.isVisitor()) {
    return response.slice(0, 50); // Limitado para visitantes
  }
  
  if (this.authService.isTrainer()) {
    return response.filter(p => !this.inUserPokedex(p)); // Sin duplicados
  }
  
  if (this.authService.isAdmin()) {
    return response; // Todo disponible
  }
}

// Verificaciones de permisos
if (this.authService.canManagePokedex()) {
  // Permitir agregar pokémon
}

if (this.authService.canViewAdvancedStats()) {
  // Mostrar estadísticas avanzadas
}
```

## Uso en Componentes

```typescript
export class PokemonListComponent {
  private authService = inject(AuthService);
  
  get canAddPokemon(): boolean {
    return this.authService.canManagePokedex();
  }
  
  get showAdvancedStats(): boolean {
    return this.authService.canViewAdvancedStats();
  }
  
  get currentUserRole(): string {
    return this.authService.getCurrentUser()?.role || 'None';
  }
}
```

## Métodos Disponibles en AuthService

```typescript
// Verificación de roles específicos
isAdmin(): boolean
isTrainer(): boolean  
isVisitor(): boolean

// Verificación de permisos
hasRole(role: UserRole): boolean
hasAnyRole(roles: UserRole[]): boolean

// Verificación de capacidades
canManagePokedex(): boolean    // Admin + Trainer
canManageTeams(): boolean      // Admin + Trainer  
canViewAdvancedStats(): boolean // Admin + Trainer
```

## Inicialización

Los usuarios mock se inicializan automáticamente al arrancar la aplicación. Si necesitas resetear los datos:

```typescript
// En cualquier componente o servicio
private mockDataService = inject(MockDataService);

resetData() {
  this.mockDataService.resetMockData();
}
```