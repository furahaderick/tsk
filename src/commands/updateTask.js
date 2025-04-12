import { input } from "@inquirer/prompts";
import ora from "ora";
import chalk from "chalk";

import Task from "../models/task.model.js";

export const updateTask = async () => {
	const descriptor = await input({ message: "Enter the task descriptor: " });

	const spinner = ora("Fetching task...").start();
	const task = await Task.findOne({ descriptor });
	spinner.stop();

	if (!task) {
		console.log(
			chalk.redBright(`Couldn't find task with descriptor '${descriptor}'`)
		);
	} else {
		const newTask = {
			title: await input({ message: "Enter new task title: " }),
			description: await input({ message: "Enter new task description: " }),
		};

		spinner.start("Updating task...");

		await Task.findOneAndUpdate({ descriptor }, newTask);

		spinner.stop();
		console.log(chalk.greenBright("Task updated successfully"));
	}
};
