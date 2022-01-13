import { generateNewRobot, moveRobot } from "../src/robot";
import { MovementCommand, Robot } from "../src/types/types";

describe("moveRobot", () => {
  let robot: Robot;
  beforeEach(() => {
    robot = generateNewRobot();
  });

  test("move robot should change direction properly", () => {
    const state = moveRobot(robot, "R");
    expect(state.direction.current()).toEqual("east");

    const newState = moveRobot(state, "R");
    expect(state.direction.current()).toEqual("south");

    moveRobot(newState, "L");
    expect(state.direction.current()).toEqual("east");
  });

  test("move robot should move forward properly", () => {
    const movements: MovementCommand[] = ["M", "L", "M", "M", "R", "R", "M"];

    // M: 0, 1 North
    // L: 0, 1 West
    // M: -1, 1 West
    // M: -2, 1 West
    // R: -2, 1 North
    // R: -2, 1 East
    // M: -1 1 East
    for (const command of movements) {
      moveRobot(robot, command);
    }

    expect(robot.x).toEqual(-1);
    expect(robot.y).toEqual(1);
    expect(robot.direction.current()).toEqual("east");
  });
});
