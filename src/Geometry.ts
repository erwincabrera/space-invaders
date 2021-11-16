export interface Position {
  x: number;
  y: number;
}

export const dx = (p1: Position, p2: Position): number => {
  return p2.x - p1.x;
};

export const dy = (p1: Position, p2: Position): number => {
  return p2.y - p1.y;
};

export interface Geometry {
  pos: Position;
  width: number;
  height: number;
}

export const isOverlapping = (a: Geometry, b: Geometry): boolean => {
  return (
    b.pos.x - a.pos.x <= a.width &&
    b.pos.x - a.pos.x >= -b.width &&
    b.pos.y - a.pos.y <= a.height &&
    b.pos.y - a.pos.y >= -b.height
  );
};

export const isWithinBounds = (
  geo: Geometry,
  maxWidth: number,
  maxHeight: number,
): boolean => {
  return (
    geo.pos.y + geo.height < maxHeight &&
    geo.pos.y > 0 &&
    geo.pos.x + geo.width < maxWidth &&
    geo.pos.x > 0
  );
};
