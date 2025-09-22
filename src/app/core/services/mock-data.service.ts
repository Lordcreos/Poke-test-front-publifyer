import { Injectable } from '@angular/core';
import { UserEntity, UserRole } from '../models';

export interface MockUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  hasReference: boolean;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly MOCK_USERS_KEY = 'mock_users';
  
  private defaultUsers: MockUser[] = [
    {
      id: '1',
      name: 'Admin',
      lastName: 'User',
      email: 'admin@pokedex.com',
      password: 'Admin123',
      phone: '+1234567890',
      city: 'Pallet Town',
      hasReference: true,
      role: UserRole.ADMIN
    },
    {
      id: '2',
      name: 'Ash',
      lastName: 'Ketchum',
      email: 'ash@pokedex.com',
      password: 'Trainer123',
      phone: '+1234567891',
      city: 'Pallet Town',
      hasReference: true,
      role: UserRole.TRAINER
    },
    {
      id: '3',
      name: 'Misty',
      lastName: 'Waterflower',
      email: 'misty@pokedex.com',
      password: 'Trainer123',
      phone: '+1234567892',
      city: 'Cerulean City',
      hasReference: true,
      role: UserRole.TRAINER
    },
    {
      id: '4',
      name: 'Guest',
      lastName: 'User',
      email: 'guest@pokedex.com',
      password: 'Guest123',
      hasReference: false,
      role: UserRole.VISITOR
    }
  ];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const existingUsers = localStorage.getItem(this.MOCK_USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(this.MOCK_USERS_KEY, JSON.stringify(this.defaultUsers));
    }
  }

  getMockUsers(): MockUser[] {
    const users = localStorage.getItem(this.MOCK_USERS_KEY);
    return users ? JSON.parse(users) : this.defaultUsers;
  }

  findUserByEmail(email: string): MockUser | undefined {
    return this.getMockUsers().find(user => user.email === email);
  }

  validateCredentials(email: string, password: string): MockUser | null {
    const user = this.findUserByEmail(email);
    return user && user.password === password ? user : null;
  }

  addUser(user: Omit<MockUser, 'id'>): MockUser {
    const users = this.getMockUsers();
    const newUser: MockUser = {
      ...user,
      id: (users.length + 1).toString()
    };
    users.push(newUser);
    localStorage.setItem(this.MOCK_USERS_KEY, JSON.stringify(users));
    return newUser;
  }

  resetMockData(): void {
    localStorage.setItem(this.MOCK_USERS_KEY, JSON.stringify(this.defaultUsers));
  }

  // Método para obtener usuarios de prueba para mostrar en el login
  getTestAccounts(): Array<{email: string, password: string, role: UserRole, description: string}> {
    return [
      {
        email: 'admin@pokedex.com',
        password: 'Admin123',
        role: UserRole.ADMIN,
        description: 'Acceso completo al sistema'
      },
      {
        email: 'ash@pokedex.com',
        password: 'Trainer123',
        role: UserRole.TRAINER,
        description: 'Entrenador - Gestión de equipos y pokédex'
      },
      {
        email: 'misty@pokedex.com',
        password: 'Trainer123',
        role: UserRole.TRAINER,
        description: 'Entrenadora - Gestión de equipos y pokédex'
      },
      {
        email: 'guest@pokedex.com',
        password: 'Guest123',
        role: UserRole.VISITOR,
        description: 'Visitante - Solo visualización'
      }
    ];
  }
}