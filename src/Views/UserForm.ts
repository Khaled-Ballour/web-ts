export class UserForm {
  constructor(public parent: HTMLElement) {}

  onButtonClick(): void {
    console.log("Hello World");
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click Me</button>
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.parent.append(templateElement.content);
  }
}
