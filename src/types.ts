export type Sounds = "photonTorpedos" | "invaderDeath"

export interface Action<T> {
  type: string;
  payload: T;
}

export interface MovePayload {
  dx: number;
  dy: number;
}

export interface Position {
  x: number,
  y: number
}

export interface Geometry {
  pos: Position,
  width: number;
  height: number;
}

export interface Player {
  geo: Geometry;
  cooldown: number;
}

export interface Invader {
  pos: Position;
  width: number;
  height: number;
  hp: number;
}

export interface State {
  isStarted: boolean;
  player: Player,
  shots: Position[],
  invaders: Invader[]
}

