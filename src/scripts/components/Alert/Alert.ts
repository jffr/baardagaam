class Alert {
  private _node: HTMLButtonElement;

  constructor(node: HTMLButtonElement) {
    this._node = node;
    node.addEventListener('click', this.handleClick);
  }

  handleClick() {
    alert('Alert! 🎉');
  }

  dispose() {
    this._node.removeEventListener('click', this.handleClick);
  }
}

export default Alert;
