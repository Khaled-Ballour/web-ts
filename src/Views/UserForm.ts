import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  constructor(public parent: Element, public user: User) {
    super(parent, user);
  }

  eventMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.change-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
    };
  }

  onSetAgeClick(): void {
    this.model.setRandomAge();
  }

  onSetNameClick(): void {
    const name = this.parent.querySelector("input")?.value;
    if (name) this.model.set({ name });
  }

  onSaveClick(): void {
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get("name")}" />
        <button class="change-name">Change name</button>
        <button class="set-age">Set random age</button>
        <button class="save-model"> Sava </button> 
      </div>
    `;
  }
}
