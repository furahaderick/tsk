import { input } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";

import Task from "../models/task.model.js";

export const addNewTask = async () => {
	try {
		const answers = {
			title: await input({ message: "Enter task title: " }),
			description: await input({ message: "Enter task description: " }),
			descriptor: await input({ message: "Enter a unique descriptor: " }),
		};

		const spinner = ora("Creating new task...").start();
		await Task.create(answers);
		spinner.stop();
		console.log(chalk.greenBright("Successfully added new task"));
	} catch (err) {
		console.error(chalk.redBright(err));
	}
};
