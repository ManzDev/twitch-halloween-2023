(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}toggle(){this.classList.toggle("off")}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
    </div>`}}customElements.define("mansion-window",a);class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}toggle(){this.classList.toggle("off")}render(){this.shadowRoot.innerHTML=`
    <style>${i.styles}</style>
    <div class="container">
    </div>`}}customElements.define("mansion-door",i);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.windows=[]}static get styles(){return`
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
    `}addChar(t){const n=[...this.shadowRoot.querySelectorAll(".wall")],s=~~(Math.random()*n.length);n[s].after(t)}connectedCallback(){this.render(),this.windows=[...this.shadowRoot.querySelectorAll("mansion-window")],setInterval(()=>this.randomEvents(),1e3)}randomEvents(){~~(Math.random()*8)===0&&this.toggleWindow()}toggleWindow(){const t=~~(Math.random()*this.windows.length);this.windows[t].toggle()}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
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
    </div>`}}customElements.define("haunted-mansion",l);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}setText(t){const n=this.shadowRoot.querySelector(".container");n.textContent=t}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <div class="container">
      DHardySD
    </div>`}}customElements.define("user-name",d);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}setColor(t){this.style.setProperty("--color",t??"indigo")}setText(t){this.username=t}connectedCallback(){this.render(),this.shadowRoot.querySelector("user-name").setText(this.username)}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
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
    </div>`}}customElements.define("ghost-user",c);const u=`<svg viewBox="0 0 520 390">
  <path
    d="M506 95s-7 16-12 18c-5 1-24-3-24-3l-10-37s-9-5-9 2l7 35-16 34c-3 5-39 7-48 11-5 3-2 36-24 43l-1-2v-1c-5-25-19-49-44-69 9-10 22-26 20-31-3-7-20-26-25-32l-3-13-10-24-16-14c-4-6-8 2-5 5l12 12 6 14c2 9-3 6-3 6l-21-17c-6-3-14-15-17-17-4-2-30-10-34-10s-4 7-1 8l29 10 7 8-35-4c-8 0-8 9-4 9l24 1c3 1 24 6 29 10 5 3 16 17 22 21 6 5 26 23 22 27-2 2-13 10-23 14-57-26-123 1-126 2-4 1-7-2-11-7-5-5-17-3-19-6-2-4 17-20 22-23 11-8-3-8-3-8s-27 23-27 16l1-15-1-27c-1-4-7-1-7-1v23l-20-5c-5-2-8 4-5 6s17 5 20 8c4 2 5 13 2 19-4 5-7 15 1 16l15 4c6 1 17 15 6 23-9 7-49 37-73 28-3-1-3-3-5-8l7-22s-4-4-5-1l-6 14-4-20c-1-10-6-8-7-2-1 5 1 28 8 39-13-5-30-27-34-35-3-5-10 1-8 3 2 5 12 19 18 27-10-4-34-20-36-20-2 2-3 6-1 6s31 22 42 27c7 6 21 11 29 12 25 6 75-24 102-40 26-15 98-31 113 37 9 37-5 73-33 114-16-11-43-23-48-25-7-2-50-7-55-9l-30-17c-6-4-16-6-24-9-3 0-3 8-3 8l20 5 23 16-23-3-34 4c-7 1-4 11 0 11l38-3c8 1 28 9 28 9s43 2 54 8c22 10 25 33 25 44-19 23-35 39-56 62h22s18-10 25-16c8-5 0 11-3 19h124s0 1 0 0h7l4-21c4 0 25 4 34 15l2 6h11c0-31-38-41-37-73 0-7 9-51 11-74v-2c30-17 40-68 47-72 8-5 19 4 19 9v2c0 3 2 5 11 4 11-1 31-2 31-4l13-30-4-6-16 26s-15 3-18 0c-4-2-1-11 5-20 5-9 6-27 13-33 0 0 17 0 25 2 9 1 14-21 17-28 2-7-6-3-6-3z" />
</svg>
`;class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${h.styles}</style>
    ${u}
    `}}customElements.define("dead-tree",h);const v=`<svg xmlns="http://www.w3.org/2000/svg" width="84" height="189">
  <path d="M24 0 0 50l18 139h48L84 50 60 0H32Z" />
</svg>
`,x=`<style>
  svg {
    --cros_color: black;
    --gravestone_color: var(--shadow-color);
    --inscription_color: var(--shadow-color);

    height: 400px;
  }
</style>
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="250">
  <!-- Fondo -->
  <!-- Tumba -->
  <path fill=var(--gravestone_color) d="M10 90 L30 80 L60 80 L110 80 L130 90 L110 250 L30 250" />
  <!-- Cruz -->
  <rect x="35" y="30" width="70" height="10" fill=var(--cros_color) />
  <rect x="65" y="10" width="10" height="70" fill=var(--cros_color) />
  <!-- Inscripcion -->
  <rect x="35" y="100" width="70" height="10" fill=var(--inscription_color) />
  <rect x="35" y="130" width="70" height="10" fill=var(--inscription_color) />
  <rect x="35" y="160" width="70" height="10" fill=var(--inscription_color) />
</svg>
`,y=`<svg xmlns="http://www.w3.org/2000/svg" width="84" height="189">
  <path
    d="M 31 61 L 31 83 L 12 83 L 12 107 L 31 107 L 31 189 L 57 189 L 57 107 L 78 107 L 78 83 L 57 83 L 57 61 L 31 61 z" />
</svg>
`,w=[v,x,y];class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}getRandomTombStone(){const t=~~(Math.random()*w.length);return w[t]}connectedCallback(){this.render();const t=-12+~~(Math.random()*12),n=20+~~(Math.random()*20),s=this.shadowRoot.querySelector(".container");s.style.setProperty("--rotate",`${t}deg`),s.style.setProperty("--ty",`${n}px`),~~(Math.random()*3)===0&&this.toggleAttribute("mirror")}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">
      ${this.getRandomTombStone()}
    </div>
    `}}customElements.define("tomb-stone",p);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.shadowRoot.querySelector("user-name").setText(this.username)}setText(t){this.username=t}setColor(t){this.style.setProperty("--color",t??"indigo")}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <user-name></user-name>
    <div class="bat">
      <div class="wing"></div>
      <div class="body">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
      <div class="wing"></div>
    </div>`}}customElements.define("bat-user",m);class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}addChar(t){this.shadowRoot.prepend(t)}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${g.styles}</style>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <dead-tree x2></dead-tree>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <tomb-stone></tomb-stone>
    <ghost-user style="--color: red"></ghost-user>
    <ghost-user style="--color: indigo; --direction: alternate-reverse"></ghost-user>
    `}}customElements.define("cementery-zone",g);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        position: absolute;
        display: block;
        width: 100%;
        height: 300px;
        z-index: 1;
        transform: translateY(-200px);
      }
    `}addChar(t){this.shadowRoot.prepend(t)}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${f.styles}</style>
    <div class="container">
      <bat-user style="--color: gold"></bat-user>
      <bat-user style="--color: red; --direction: alternate-reverse"></bat-user>
    </div>
    `}}customElements.define("sky-zone",f);
