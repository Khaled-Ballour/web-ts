import { Model, HasID } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasID> {
  abstract parent: HTMLElement;
  abstract template(): string;
  abstract eventMap(): { [key: string]: () => void };

  constructor(protected model: T) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on("change", this.render.bind(this));
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey].bind(this));
      });
    }
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
