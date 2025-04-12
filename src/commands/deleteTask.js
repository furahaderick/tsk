import { input } from "@inquirer/prompts";
import ora from "ora";
import chalk from "chalk";

import Task from "../models/task.model.js";

export const deleteTask = async () => {
	const descriptor = await input({ message: "Enter the task descriptor: " });
	const spinner = ora("Fetching task...").start();
	const task = await Task.findOne({ descriptor });
	spinner.stop();

	if (!task) {
		console.log(
			chalk.redBright(`Couldn't find task with descriptor '${descriptor}'`)
		);
	} else {
		spinner.start("Deleting task...");
		await Task.findOneAndDelete({ descriptor });
		spinner.stop();
		console.log(chalk.greenBright("Task deleted successfully"));
	}
};
