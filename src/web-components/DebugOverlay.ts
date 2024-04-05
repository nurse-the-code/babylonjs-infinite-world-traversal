interface DebugOverlay {
  updateData(posX: number, posZ: number, vecX: number, vecZ: number): void;
}

// Create the template for the web component
const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      position: fixed;
      top: 1.25rem;
      left: 1.25rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 0.5rem;
      border-radius: 2.875rem;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 0.875rem;
      z-index: 9999;
    }
    .overlay-data-item {
      margin: 0 2.25rem;
    }
  </style>
  <div>
    <div class="overlay-data-item">
      Player position: (x: <span id="posX"></span>, z: <span id="posZ"></span>)
    </div>
    <div class="overlay-data-item">
      Player forward vector: (x: <span id="vecX"></span>, z:
      <span id="vecZ"></span>)
    </div>
  </div>
`;

// Define the web component class
class DataOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  updateData(posX: number, posZ: number, vecX: number, vecZ: number) {
    const posXElement: Element | null | undefined =
      this.shadowRoot?.querySelector("#posX");
    const posZElement: Element | null | undefined =
      this.shadowRoot?.querySelector("#posZ");
    const vecXElement: Element | null | undefined =
      this.shadowRoot?.querySelector("#vecX");
    const vecZElement: Element | null | undefined =
      this.shadowRoot?.querySelector("#vecZ");

    if (posXElement) posXElement.textContent = posX.toFixed(2);
    if (posZElement) posZElement.textContent = posZ.toFixed(2);
    if (vecXElement) vecXElement.textContent = vecX.toFixed(2);
    if (vecZElement) vecZElement.textContent = vecZ.toFixed(2);
  }
}

// Register the web component
customElements.define("data-overlay", DataOverlay);

export const createOverlay = () => {
  const overlay = document.createElement("data-overlay") as DataOverlay;
  document.body.appendChild(overlay);
  return overlay;
};

export default DebugOverlay;
