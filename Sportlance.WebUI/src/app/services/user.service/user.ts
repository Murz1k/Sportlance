export class User {

  firstName: string;

  secondName: string;

  token: string;

  roles: string[];

  email: string;

  photoUrl: string;

  isConfirmed: boolean;

  constructor(firstName: string, secondName: string, token: string, roles: string[], email: string, isConfirmed: boolean, photoUrl: string) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.token = token;
    this.roles = roles;
    this.email = email;
    this.isConfirmed = isConfirmed;
    this.photoUrl = photoUrl;
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
