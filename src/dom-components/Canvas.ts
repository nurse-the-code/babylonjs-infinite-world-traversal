// I realize that this is way over-engineered. I am leaving it in as example of a Vanilla TypeScript Class Component.
abstract class ComponentFactory {
  static create(): HTMLCanvasElement {
    throw new Error("This method should be implemented by derived classes.");
  }
}

interface Canvas {
  getElement(): HTMLCanvasElement;
  getElementId(): string;
}

class MainCanvas extends ComponentFactory implements Canvas {
  private readonly element: HTMLCanvasElement;

  constructor() {
    super();
    this.element = document.createElement("canvas");
    this.element.id = "renderCanvas";
    this.setCanvasStyle();
  }

  // Static factory method
  public static create(): HTMLCanvasElement {
    const mainCanvas = new MainCanvas();
    return mainCanvas.getElement();
  }

  public getElement(): HTMLCanvasElement {
    return this.element;
  }

  public getElementId(): string {
    return this.element.id;
  }

  private setCanvasStyle(): void {
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.padding = "0";
    this.element.style.margin = "0";
    this.element.style.touchAction = "none"; // Prevents default touch actions
  }
}

export default MainCanvas;
