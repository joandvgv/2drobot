import { Circular } from "./Circular";
import {
  Direction,
  DirectionCommand,
  MovementCommand,
  Robot,
} from "./types/types";

const movementMap: {
  [key in Direction]: (robot: Robot) => { x: number; y: number };
} = {
  north: ({ x, y }) => ({ x, y: y + 1 }),
  south: ({ x, y }) => ({ x, y: y - 1 }),
  east: ({ x, y }) => ({ x: x + 1, y }),
  west: ({ x, y }) => ({ x: x - 1, y }),
};

export const generateNewRobot = (): Robot => ({
  x: 0,
  y: 0,
  direction: new Circular(["north", "east", "south", "west"]),
});

const changeFacingDirection = (robot: Robot, direction: DirectionCommand) => {
  if (direction === "R") {
    robot.direction.next();
  } else {
    robot.direction.previous();
  }
  return robot;
};

export const moveRobot = (robot: Robot, command: MovementCommand) => {
  const changesDirection = command !== "M";

  if (changesDirection) {
    return changeFacingDirection(robot, command);
  }

  const { x: newX, y: newY } = movementMap[robot.direction.current()](robot);

  robot.x = newX;
  robot.y = newY;

  return robot;
};
