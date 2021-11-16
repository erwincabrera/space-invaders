import { Geometry } from "./Geometry";

export type Sounds = "photonTorpedos" | "invaderDeath";

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface MovePayload {
  dx: number;
  dy: number;
}

export interface Player {
  geo: Geometry;
  cooldown: number;
  hp: number;
}

export interface Invader {
  geo: Geometry;
  hp: number;
  score: number;
}

export interface Shot {
  geo: Geometry;
}

export type View = "Start" | "Game" | "End" | "Login";

export interface State {
  view: View;
  isStarted: boolean;
  player: Player;
  score: number;
  shots: Shot[];
  invaders: Invader[];
}

export interface LoginResponse {
  name: string;
  username: string;
  token: string;
}
