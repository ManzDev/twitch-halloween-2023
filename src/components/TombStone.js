import tombStone1 from "../assets/tombstone-1.svg?raw";
import tombStone2 from "../assets/tombstone-2.svg?raw";
import tombStone3 from "../assets/tombstone-3.svg?raw";

const tombStones = [
  tombStone1, tombStone2, tombStone3
];

class TombStone extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        margin: 0 15px;
        transform: rotate(var(--rotate)) translateY(var(--ty));
      }

      svg {
        height: 400px;
      }

      path {
        background: var(--shadow-color);
      }

      :host([mirror]) {
        scale: -1 1;
      }
    `;
  }

  getRandomTombStone() {
    const r = ~~(Math.random() * tombStones.length);
    return tombStones[r];
  }

  connectedCallback() {
    this.render();
    const r = -12 + ~~(Math.random() * 12);
    const ty = 20 + ~~(Math.random() * 20);
    const container = this.shadowRoot.querySelector(".container");
    container.style.setProperty("--rotate", `${r}deg`);
    container.style.setProperty("--ty", `${ty}px`);
    const m = ~~(Math.random() * 3);
    m === 0 && this.toggleAttribute("mirror");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TombStone.styles}</style>
    <div class="container">
      ${this.getRandomTombStone()}
    </div>
    `;
  }
}

customElements.define("tomb-stone", TombStone);
