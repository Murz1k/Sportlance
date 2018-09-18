export class User {

  firstName: string;

  secondName: string;

  roles: string[];

  email: string;

  photoUrl: string;

  isConfirmed: boolean;

  constructor(firstName: string, secondName: string, roles: string[], email: string, isConfirmed: boolean, photoUrl: string) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.roles = roles;
    this.email = email;
    this.isConfirmed = isConfirmed;
    this.photoUrl = photoUrl;
  }

  get isTrainer(): boolean {
    return this.roles ? this.roles.some(r => r === 'Trainer') : false;
  }

  get isAdmin(): boolean {
    return this.roles ? this.roles.some(r => r === 'Admin') : false;
  }

  get isTeam(): boolean {
    return this.roles ? this.roles.some(r => r === 'Team') : false;
  }
}
