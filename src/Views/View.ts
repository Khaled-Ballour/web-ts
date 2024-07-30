import { Model, HasID } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasID> {
  regions: { [key: string]: Element } = {};

  constructor(protected parent: HTMLElement, protected model: T) {
    this.bindModel();
  }

  abstract template(): string;

  eventMap(): { [key: string]: () => void } {
    return {};
  }

  regionsMap(): { [key: string]: string } {
    return {};
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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let regionKey in regionsMap) {
      const selector = regionsMap[regionKey];
      const element = fragment.querySelector(selector);
      if (element) this.regions[regionKey] = element;
    }
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
