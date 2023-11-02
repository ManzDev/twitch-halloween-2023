class UserName extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        font-family: EnterCommand;
        font-size: 27px;
        color: #fff;
        text-shadow:
          0 0 10px var(--color),
          0 0 5px var(--color);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  setText(text) {
    const container = this.shadowRoot.querySelector(".container");
    container.textContent = text;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${UserName.styles}</style>
    <div class="container">
      DHardySD
    </div>`;
  }
}

customElements.define("user-name", UserName);
