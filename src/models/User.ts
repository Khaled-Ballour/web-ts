import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { AxiosResponse, AxiosPromise } from 'axios';

interface Syncable<T> {
  fetch(id: number): void;
  save(data: T): void;
}

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users/';

export class User {
  private attributes: Attributes<UserProps>;
  private events: Eventing;
  private sync: Sync<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
    this.events = new Eventing();
    this.sync = new Sync<UserProps>(rootUrl);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot featch without an id');
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
