import "./UserName.js";

class GhostUser extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --color: red;

        position: absolute;
        bottom: -30px;
        animation: move-ghost 5s linear infinite var(--direction, alternate);
      }

      .character-container {
        --width: 140px;
        --height: 225px;

        width: var(--width);
        height: var(--height);
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        /*z-index: 5;*/

        & .character {
          position: relative;
          filter: drop-shadow(0 0 15px var(--color, indigo));
          animation: floating 1s ease-in-out infinite alternate-reverse;
        }

        & .soul-glow {
          width: var(--width);
          height: var(--height);
          background: radial-gradient(var(--color, #7909fa) 25%, transparent 50% 85%);
          border-radius: 50%;
          position: absolute;
          top: var(--offset-y, 0);
          left: 0;
          mix-blend-mode: screen;
          animation: floating 1s infinite alternate-reverse;
        }
      }

      .ghost {
        --width: 125px;
        --height: 225px;
        scale: 0.6;
        translate: 0 55px;

        background:
          radial-gradient(ellipse 135px 200px at 50% 15%, #fff 25%, #fff0 90%),
          radial-gradient(circle 75px at 50% 40%, #fff 35%, #fff0 90%);
        width: var(--width);
        height: var(--height);
        border-radius: 50% 50% 0 0 / 30% 30% 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .eyes {
          display: flex;
          justify-content: space-around;
          transform: translateY(50px);
          width: 100%;
          margin: auto;

          & .eye {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #000;
            margin: 0 5px;
          }
        }

        & .mouth-container {
          display: flex;
          justify-content: center;
          transform: translateY(55px);

          & .mouth {
            width: 20px;
            height: 35px;
            border-radius: 25px;
            background: #000;
          }
        }

        & .soul-glow {
          --width: 125px;
          --height: 125px;
          --offset-y: 25px;
        }
      }

      @keyframes floating {
        0% { transform: translateY(0); }
        100% { transform: translateY(-10%); }
      }

      :host-context(sky-zone) {
        --start-offset: -200px;
        --end-offset: 1700px;
      }

      :host-context(haunted-mansion) {
        --start-offset: -350px;
        --end-offset: 350px;
      }

      :host-context(cementery-zone) {
        --start-offset: 0px;
        --end-offset: 500px;
      }

      user-name {
        position: absolute;
        top: 64px;
      }

      @keyframes move-ghost {
        0% {
          transform: translate(var(--start-offset), 0)
        }
        100% {
          transform: translate(var(--end-offset), 0)
        }
      }
    `;
  }

  setColor(color) {
    this.style.setProperty("--color", color ?? "indigo");
  }

  setText(text) {
    this.username = text;
  }

  connectedCallback() {
    this.render();
    // const time = ~~(Math.random() * 5);
    // this.style.setProperty("--delay", `${time}s`);
    const userName = this.shadowRoot.querySelector("user-name");
    userName.setText(this.username);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GhostUser.styles}</style>
    <div class="character-container">
      <user-name></user-name>
      <div class="ghost character">
        <div class="float">
          <div class="face">
            <div class="eyes">
              <div class="left eye"></div>
              <div class="right eye"></div>
            </div>
            <div class="mouth-container">
              <div class="mouth"></div>
            </div>
          </div>
        </div>
          <div class="soul-glow"></div>
      </div>
    </div>`;
  }
}

customElements.define("ghost-user", GhostUser);
