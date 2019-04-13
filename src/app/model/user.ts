export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  getDisplayName() {
    return this.name + this.email;
  }
}
