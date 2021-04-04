class HelloWorld {
  private _rootElement: HTMLDivElement;

  constructor(rootElement: HTMLDivElement) {
    this._rootElement = rootElement;
    this.init();
  }

  init() {
    const name = this._rootElement.dataset.name;
    const p = document.createElement('p');
    p.textContent = `Hello ${name}!`;
    this._rootElement.appendChild(p);
  }

  public dispose(): void {
    this._rootElement.innerHTML = '';
  }
}

export default HelloWorld;
