export const FPS = 60;
export const SHOTS_PER_SEC = 3;
export const HEIGHT = 600;
export const WIDTH = 1024;
export const TICK_MS = 1000 / FPS;
export const SHOT_COOLDOWN = FPS / SHOTS_PER_SEC;
export const DX = 400 / FPS;
export const DY = 400 / FPS;
export const SHOT_DY = 20;
export const INVADER_DY = 2;
export const SHOT_WIDTH = 10;
export const SHOT_HEIGHT = 10;

export const KEYS = {
    START: 'Enter',
    MOVEMENT: {
        UP: 'w',
        DOWN: 's',
        LEFT: 'a',
        RIGHT: 'd'
    },
    WEAPONS: {
        PHOTON_TORPEDOS: ' '
    }
};
