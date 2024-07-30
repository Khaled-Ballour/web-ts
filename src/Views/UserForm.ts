import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  constructor(public parent: HTMLElement, public user: User) {
    super(user);
  }

  eventMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.change-name": this.onSetNameClick,
    };
  }

  onSetAgeClick(): void {
    this.model.setRandomAge();
  }

  onSetNameClick(): void {
    const name = this.parent.querySelector("input")?.value;
    if (name) this.model.set({ name });
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get("name")}</div>
        <div>User age: ${this.model.get("age")}</div>
        <input />
        <button class="change-name">Change name</button>
        <button class="set-age">Set random age</button>
      </div>
    `;
  }

  // bindEvents(fragment: DocumentFragment): void {
  //   const eventsMap = this.eventMap();
  //   for (let eventKey in eventsMap) {
  //     const [eventName, selector] = eventKey.split(":");
  //     fragment.querySelectorAll(selector).forEach((element) => {
  //       element.addEventListener(eventName, eventsMap[eventKey].bind(this));
  //     });
  //   }
  // }

  // render(): void {
  //   this.parent.innerHTML = "";
  //   const templateElement = document.createElement("template");
  //   templateElement.innerHTML = this.template();
  //   this.bindEvents(templateElement.content);
  //   this.parent.append(templateElement.content);
  // }
}
