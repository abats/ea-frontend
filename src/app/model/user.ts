export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  getDisplayName() {
    return this.name + this.email;
  }
}

export interface IfcSampleInterface {
  key: string;
  value: string;
}

const sampleVar = {} as IfcSampleInterface;
