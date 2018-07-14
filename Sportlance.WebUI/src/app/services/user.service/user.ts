export class User {

  firstName: string;

  secondName: string;

  token: string;

  roles: string[];

  email: string;

  isConfirmed: boolean;

  constructor(firstName: string, secondName: string, token: string, roles: string[], email: string, isConfirmed: boolean) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.token = token;
    this.roles = roles;
    this.email = email;
    this.isConfirmed = isConfirmed;
  }

  get isTrainer(): boolean {
    return this.roles.some(r => r === 'Trainer');
  }

  get isAdmin(): boolean {
    return this.roles.some(r => r === 'Admin');
  }

  get isTeam(): boolean {
    return this.roles.some(r => r === 'Team');
  }
}
