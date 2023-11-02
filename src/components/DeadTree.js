import deadTree from "../assets/deadtree.svg?raw";

class DeadTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      svg {
        height: 400px;
        position: absolute;
        scale: 1 1;
        translate: -200px 0;
        bottom: 0;
        z-index: 1;
      }

      :host([x2]) {
        scale: 1.35;
      }

      :host([far]) {
        opacity: 0.3;
      }

      path {
        fill: var(--shadow-color);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${DeadTree.styles}</style>
    ${deadTree}
    `;
  }
}

customElements.define("dead-tree", DeadTree);
