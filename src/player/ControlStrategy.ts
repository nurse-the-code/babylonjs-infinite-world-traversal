import Player from "./Player";
import Vector, { Vector2D } from "../geometry/Vector";
import Direction from "../geometry/Direction.ts";

interface ControlStrategy {
  handleInput(): void;
}

export class KeyboardControlStrategy implements ControlStrategy {
  readonly player: Player;
  movementVector: Vector = new Vector2D(0, 0);

  constructor(player: Player) {
    this.player = player;
  }

  handleInput(): void {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

    this.player.move(this.calculateMovementVector());
  }

  set movingForward(value: boolean) {
    this.activeDirections[Direction.Forward] = value;
  }

  set movingLeft(value: boolean) {
    this.activeDirections[Direction.Left] = value;
  }

  set movingBackward(value: boolean) {
    this.activeDirections[Direction.Backward] = value;
  }

  set movingRight(value: boolean) {
    this.activeDirections[Direction.Right] = value;
  }

  calculateMovementVector(): Vector {
    let newMovementVector: Vector = new Vector2D(0, 0);

    // We want to make sure that the player can't move in two opposite
    // directions at the same time
    if (
      this.activeDirections[Direction.Forward] &&
      !this.activeDirections[Direction.Backward]
    ) {
      newMovementVector = newMovementVector.add(this.player.forwardVector);
    }
    if (
      this.activeDirections[Direction.Backward] &&
      !this.activeDirections[Direction.Forward]
    ) {
      newMovementVector = newMovementVector.add(
        this.player.forwardVector.scale(-1),
      );
    }
    if (
      this.activeDirections[Direction.Left] &&
      !this.activeDirections[Direction.Right]
    ) {
      newMovementVector = newMovementVector.add(
        this.player.forwardVector.rotateDirection(Direction.Left),
      );
    }
    if (
      this.activeDirections[Direction.Right] &&
      !this.activeDirections[Direction.Left]
    ) {
      newMovementVector = newMovementVector.add(
        this.player.forwardVector.rotateDirection(Direction.Right),
      );
    }

    this.movementVector = newMovementVector
      .normalize()
      .scale(this.player.speed);

    return this.movementVector;
  }

  private KEY_MAPPINGS: Record<Direction, string[]> = {
    [Direction.Forward]: ["w", "arrowup"],
    [Direction.Left]: ["a", "arrowleft"],
    [Direction.Backward]: ["s", "arrowdown"],
    [Direction.Right]: ["d", "arrowright"],
  };

  private activeDirections: Record<Direction, boolean> = {
    [Direction.Forward]: false,
    [Direction.Left]: false,
    [Direction.Backward]: false,
    [Direction.Right]: false,
  };

  private handleKeyDown(event: KeyboardEvent): void {
    const key: string = event.key.toLowerCase();
    if (this.KEY_MAPPINGS[Direction.Forward].includes(key)) {
      this.movingForward = true;
    } else if (this.KEY_MAPPINGS[Direction.Left].includes(key)) {
      this.movingLeft = true;
    } else if (this.KEY_MAPPINGS[Direction.Backward].includes(key)) {
      this.movingBackward = true;
    } else if (this.KEY_MAPPINGS[Direction.Right].includes(key)) {
      this.movingRight = true;
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const key: string = event.key.toLowerCase();
    if (this.KEY_MAPPINGS[Direction.Forward].includes(key)) {
      this.movingForward = false;
    } else if (this.KEY_MAPPINGS[Direction.Left].includes(key)) {
      this.movingLeft = false;
    } else if (this.KEY_MAPPINGS[Direction.Backward].includes(key)) {
      this.movingBackward = false;
    } else if (this.KEY_MAPPINGS[Direction.Right].includes(key)) {
      this.movingRight = false;
    }
  }
}

export default ControlStrategy;
