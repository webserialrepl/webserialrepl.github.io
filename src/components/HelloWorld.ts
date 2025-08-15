import { html, css, LitElement } from 'lit';

export class HelloWorld extends LitElement {
  static styles = css`p { color: green; margin: 0.5em; }`;
  render() {
    return html`<p>Lit Component 動作OK</p>`;
  }
}
customElements.define('hello-world', HelloWorld);