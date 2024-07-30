import { Model } from "../Model";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps, rootUrl: string): User {
    return new User(
      new Attributes(attrs),
      new ApiSync(rootUrl),
      new Eventing()
    );
  }

  static buildUserCollection(rootUrl: string): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json, rootUrl)
    );
  }

  isAdminUser(): boolean {
    return this.get("id") === 1;
  }

  setRandomAge(): void {
    const randomAge = Math.trunc(Math.random() * 100) + 1;
    this.set({ age: randomAge });
  }
}
