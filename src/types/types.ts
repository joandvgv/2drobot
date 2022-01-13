import { Circular } from "../Circular";

export type Commands = "L" | "R" | "M" | "Q" | "?";
export type Direction = "north" | "west" | "east" | "south";
export type MovementCommand = Exclude<Commands, "Q" | "?">;
export type DirectionCommand = Extract<Commands, "L" | "R">;

export type Robot = {
  x: number;
  y: number;
  direction: Circular<Direction>;
};
