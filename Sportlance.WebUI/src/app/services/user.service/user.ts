export class User {
  firstName: string;

  secondName: string;

  token: string;

  roles: string[];

  email: string;

  isConfirmed: boolean;

  get isTrainer(): boolean {
    return this.roles.some(r => r === 'trainer');
  }

  get isClient(): boolean {
    return this.roles.some(r => r === 'client');
  }
}
