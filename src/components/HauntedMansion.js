import "./MansionWindow.js";
import "./MansionDoor.js";

class HauntedMansion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.windows = [];
  }

  static get styles() {
    return /* css */`
      :host {
        --window-width: 90px;
        --window-height: 125px;
        --mansion-width: 800px;
        --floor-number: 3;
        --window-per-floor: 5;
      }

      .container {
        width: var(--mansion-width, 800px);
        height: var(--mansion-height, 700px);
        background: var(--shadow-color);
        display: grid;
        align-items: center;
        clip-path: polygon(0 30%, 12% 0, 88% 0, 100% 30%, 100% 100%, 0 100%);
      }

      .floor,
      .roof {
        display: flex;
        justify-content: space-around;
        height: calc(var(--mansion-height) / var(--floor-number));
        position: relative;
        align-items: end;
      }

      .roof {
        justify-content: space-evenly;
      }

      .wall {
        width: 100%;
        height: 100%;
        position: absolute;
        background: linear-gradient(gold, orangered);
      }

      .roof-laterals-container {
        display: flex;
        justify-content: center;
        position: relative;

        & .roof-front {
          background: var(--shadow-color);
          height: 45px;
          width: 225px;
          position: absolute;
          bottom: 0;
          clip-path: polygon(15% 0, 85% 0, 100% 100%, 0 100%);
        }

        & .chimney {
          background: var(--shadow-color);
          width: 40px;
          height: 40px;
          position: absolute;
          bottom: 0;
          transform: translateX(-150px);

          &::before {
            content: "";
            display: block;
            background: inherit;
            width: 120%;
            height: 10px;
            transform: translate(-7.5%, -10px)
          }
        }

        & .roof-laterals {
          background: #111;
          height: 90px;
          width: 91%;
          transform: translate(0, 130px);
        }
      }
    `;
  }

  addChar(char) {
    const walls = [...this.shadowRoot.querySelectorAll(".wall")];
    const index = ~~(Math.random() * walls.length);
    walls[index].after(char);
  }

  connectedCallback() {
    this.render();
    this.windows = [...this.shadowRoot.querySelectorAll("mansion-window")];
    setInterval(() => this.randomEvents(), 1000);
  }

  randomEvents() {
    const n = ~~(Math.random() * 8);
    n === 0 && this.toggleWindow();
  }

  toggleWindow() {
    const selectedWindow = ~~(Math.random() * this.windows.length);
    this.windows[selectedWindow].toggle();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${HauntedMansion.styles}</style>
    <div class="roof-laterals-container">
      <div class="chimney"></div>
      <div class="roof-front"></div>
      <div class="roof-laterals"></div>
    </div>
    <div class="container">
      <div class="roof">
        <div class="wall"></div>
        <ghost-user style="--color: red"></ghost-user>
        <mansion-window part="window"></mansion-window>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
      </div>
      <div class="floor">
        <div class="wall"></div>
        <ghost-user style="--direction: alternate-reverse; --color: green"></ghost-user>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
      </div>
      <div class="floor">
        <div class="wall"></div>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
        <mansion-door></mansion-door>
        <mansion-window></mansion-window>
        <mansion-window></mansion-window>
      </div>
    </div>`;
  }
}

customElements.define("haunted-mansion", HauntedMansion);
