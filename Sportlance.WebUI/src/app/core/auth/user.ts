export class User {

  id: number;

  firstName: string;

  secondName: string;

  roles: string[];

  email: string;

  photoUrl: string;

  isConfirmed: boolean;

  inviteLink: string;

  constructor(firstName: string, secondName: string, roles: any, email: string, isConfirmed: boolean, photoUrl: string, userId: number, inviteLink: string) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.id = +userId;
    if (roles instanceof Array) {
      this.roles = roles;
    }
    if (typeof roles === 'string') {
      this.roles = [roles];
    }
    this.email = email;
    this.isConfirmed = isConfirmed;
    this.photoUrl = photoUrl;
    this.inviteLink = inviteLink;
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
