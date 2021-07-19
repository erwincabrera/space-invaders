export const SHOTS_PER_SEC = 3;
export const HEIGHT = window.innerHeight;
export const WIDTH = window.innerWidth;
export const TICK_MS = 15;
export const SHOT_COOLDOWN = 1000 / (TICK_MS * SHOTS_PER_SEC);
export const DX = 400 * TICK_MS / 1000;
export const DY = 400 * TICK_MS / 1000;
export const SHOT_DY = 1000 * TICK_MS / 1000;
export const INVADER_DY = 100 * TICK_MS / 1000;
export const SHOT_WIDTH = 10;
export const SHOT_HEIGHT = 10;

export const KEYS = {
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
