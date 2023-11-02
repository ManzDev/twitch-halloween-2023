class CementeryZone extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        height: 200px;
        width: 600px;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 5;
        display: flex;
        align-self: end;

        & dead-tree {
          z-index: 0;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        & tomb-stone {
          z-index: 2;
          translate: 0 12px;
        }
      }
    `;
  }

  addChar(char) {
    this.shadowRoot.prepend(char);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CementeryZone.styles}</style>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <dead-tree x2></dead-tree>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <ghost-user style="--color: red"></ghost-user>
    <ghost-user style="--color: indigo; --direction: alternate-reverse"></ghost-user>
    `;
  }
}

customElements.define("cementery-zone", CementeryZone);
