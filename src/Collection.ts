import { Eventing } from "./models/Eventing";
import { User, UserProps } from "./models/User";
import axios, { AxiosResponse } from "axios";

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(private rootUrl: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((value: UserProps) => {
        this.models.push(User.buildUser(value));
      });
    });
  }
}
