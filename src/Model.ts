import { AxiosPromise, AxiosResponse } from "axios";
interface ModelAttributes<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasID {
  id?: number;
}

export class Model<T extends HasID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot featch without an id");
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
