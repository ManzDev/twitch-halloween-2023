class MansionWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --frame-size: 6px;
      }

      .container {
        width: var(--window-width, 90px);
        height: var(--window-height, 125px);
        display: grid;
        place-items: center;
        position: relative;
        box-shadow: 0 0 0 35px var(--shadow-color);
        transition: background 1s;
      }

      :host(.off) .container {
        background: #000;
      }

      :host-context(.roof) .container {
        box-shadow:
          97px 0 0 35px var(--shadow-color),
          -98px 0 0 35px var(--shadow-color),
          0 0 0 35px var(--shadow-color);
      }

      .container::before,
      .container::after {
          content: "";
          display: block;
          background: var(--shadow-color);
          width: var(--frame-size);
          height: 100%;
          position: absolute;
      }

      .container::after {
        width: 100%;
        height: var(--frame-size);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  toggle() {
    this.classList.toggle("off");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${MansionWindow.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("mansion-window", MansionWindow);
