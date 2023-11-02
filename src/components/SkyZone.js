class SkyZone extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: absolute;
        display: block;
        width: 100%;
        height: 300px;
        z-index: 1;
        transform: translateY(-200px);
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
    <style>${SkyZone.styles}</style>
    <div class="container">
      <bat-user style="--color: gold"></bat-user>
      <bat-user style="--color: red; --direction: alternate-reverse"></bat-user>
    </div>
    `;
  }
}

customElements.define("sky-zone", SkyZone);
