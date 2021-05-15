import { IDispose } from "../../utils/ComponentDisposer";

class HelloWorld implements IDispose {
  private _rootElement: HTMLDivElement;

  constructor(rootElement: HTMLDivElement) {
    this._rootElement = rootElement;
    this.init();
  }

  init() {
    const name = this._rootElement.dataset.name;
    const p = document.createElement('p');
    p.textContent = `Goodbye ${name}!`;
    this._rootElement.appendChild(p);
  }

  dispose(): void {
    this._rootElement.innerHTML = '';
  }
}

export default HelloWorld;
