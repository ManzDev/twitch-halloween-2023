class MansionDoor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --frame-size: 5px;
      }

      .container {
        width: var(--door-width, 90px);
        height: var(--door-height, 125px);
        display: grid;
        background:
          linear-gradient(125deg, transparent 0 50%, #0003 60%),
          url("images/wood.png"),
          linear-gradient(to bottom, transparent, #0008),
          linear-gradient(130deg, #2c251d 0 20%, #320f05);
        border: 4px solid #050505;
        background-blend-mode: normal, multiply, multiply, multiply;
        background-size: cover;
        place-items: center;
        position: relative;
        transform: scale(1.6, 2);
        transform-origin: 50% 25%;
        box-shadow:
          0 0 0 5px var(--shadow-color),
          0 0 15px #000 inset;
        transition: background 1s;
      }

      .container::before {
        content: "";
        display: block;
        background: #060606;
        width: 20px;
        height: 16px;
        transform: translate(0, 20px);
      }

      .container::after {
        content: "";
        display: block;
        width: 12px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(#2d1809, #000);
        position: absolute;
        transform: translate(0, -5px);
        left: 5px;
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
    <style>${MansionDoor.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("mansion-door", MansionDoor);
