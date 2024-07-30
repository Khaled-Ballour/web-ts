import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection<T, R> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(private rootUrl: string, private deserialize: (json: R) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((value: R) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
  }
}
