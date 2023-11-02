class BatUser extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host{
        --bat-height: 75px;
        --bat-color: #000;

        position: absolute;
        animation: move-bat 15s linear infinite var(--direction, alternate);
      }

      .bat{
        width: calc(var(--bat-height) * 2.5);
        height: var(--bat-height);
        display: flex;
        justify-content: center;
        position: relative;

        & .body{
          width: 30%;
          height: 100%;
          background: var(--bat-color);
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          position: relative;
          clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
          &::after, &::before{
            content: "";
            width: 30%;
            height: 30%;
            position: absolute;
            background: var(--bat-color);
            clip-path: polygon(0 0, 100% 100%, 0 100%);
            border-radius: 50%;
          }
          &::after{
            clip-path: polygon(100% 0%, 100% 100%, 0 100%);
            right: 0;
          }
          & .eye{
            width: 20%;
            height: 7%;
            background: var(--color);
            border-radius: 0% 0% 50% 50% / 0% 0% 100% 100%;
            position: absolute;
            top: 30%;
            left: 20%;
            transform: rotate(var(--angle, 30deg));
            animation: blink-eye 1s ease infinite alternate;
          }
          & .eye:nth-child(2){
            left: 60%;
            --angle: -30deg;
          }
        }

        & .wing{
          width: 35%;
          height: 80%;
          background: linear-gradient(var(--bat-color) 50%, transparent 50%);
          border-radius: 20% 80% 50% 50% / 40% 40% 40% 40%;
          position: relative;
          transform-origin: right center;
          animation: fly .15s linear infinite alternate;
          translate: 2% 0;
          &::before{
            content: "";
            width: 70%;
            height: 30%;
            position: absolute;
            background: var(--bat-color);
            top: 49.5%;
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            right: 0;
          }
          &::after{
            content: "";
            width: 40%;
            height: 30%;
            position: absolute;
            background: var(--bat-color);
            top: 49.5%;
            border-radius: 0% 100% 50% 50% / 0% 0% 100% 100% ;
            clip-path: polygon(0 0, 100% 0, 50% 100%, 0 100%);

          }
        }
        & .body+.wing{
          --angle: -10deg;
          border-radius: 80% 20% 50% 50% / 40% 40% 40% 40%;
          transform-origin: left center;
          translate: -2% 0;
          &::after{
            right: 0;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 100%);
          }
          &::before{
            left: 0;
          }
        }
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
        top: -40px;
        left: 85px;
      }

      @keyframes move-bat {
        0% {
          transform: translate(var(--start-offset), 0)
        }
        100% {
          transform: translate(var(--end-offset), 0)
        }
      }

      @keyframes fly {
        to{
          transform: rotate(var(--angle, 10deg));
        }
      }

      @keyframes blink-eye {
        0%, 80% {
          background: var(--color);
        }
        100% {
          background: transparent;
        }
      }
    `;
  }

  connectedCallback() {
    this.render();
    const userName = this.shadowRoot.querySelector("user-name");
    userName.setText(this.username);
  }

  setText(text) {
    this.username = text;
  }

  setColor(color) {
    this.style.setProperty("--color", color ?? "indigo");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BatUser.styles}</style>
    <user-name></user-name>
    <div class="bat">
      <div class="wing"></div>
      <div class="body">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
      <div class="wing"></div>
    </div>`;
  }
}

customElements.define("bat-user", BatUser);
