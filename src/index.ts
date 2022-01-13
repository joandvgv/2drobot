import readline from "readline";
import { Commands, Robot } from "./types/types";
import { generateNewRobot, moveRobot } from "./robot";
import { HELP_TEXT, WELCOME_TEXT } from "./constants";

const printHelp = () => console.log(HELP_TEXT);
const printWelcome = () => console.log(WELCOME_TEXT);

const printRobotState = (robot: Robot) => {
  const direction = robot.direction.current();
  console.log(`Robot is at (${robot.x}, ${robot.y}) facing ${direction}`);
};

async function* questions(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  printWelcome();
  printHelp();

  try {
    // When the loop breaks, it'll call rl.close();
    for (;;) {
      yield new Promise<Commands>((resolve) =>
        rl.question(query, (answer) => resolve(answer as Commands))
      );
    }
  } finally {
    rl.close();
  }
}

async function run() {
  const robot = generateNewRobot();

  for await (const command of questions("Command: ")) {
    if (command == "Q") break;
    if (command == "?") {
      printHelp();
    } else {
      moveRobot(robot, command);
      printRobotState(robot);
    }
  }
}

run();
