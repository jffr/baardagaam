export default class Hello {
  render() {
    const paragraph = document.createElement('p');
    paragraph.textContent = "Hello world!";

    return paragraph;
  }
}
