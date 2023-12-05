import { AuthUser, UserRole } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public dateOfBirth: Date;
  public role: UserRole;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      dateOfBirth: this.dateOfBirth,
      role: this.role,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.dateOfBirth = data.dateOfBirth;
    this.role = data.role;
  }

}
