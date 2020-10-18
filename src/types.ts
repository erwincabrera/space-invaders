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

export interface Invader {
  pos: Position;
}

export interface State {
  pos: Position,
  shots: Position[],
  invaders: Invader[]
}

