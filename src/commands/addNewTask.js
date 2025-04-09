import { input } from "@inquirer/prompts";
import chalk from "chalk";

import Task from "../models/task.model.js";

export const addNewTask = async () => {
	try {
		const answers = {
			title: await input({ message: "Enter task title: " }),
			description: await input({ message: "Enter task description: " }),
		};

		const newTask = await Task.create(answers);
		console.log(chalk.greenBright("Successfully added new task"));
	} catch (err) {
		console.error(chalk.redBright(err));
	}
};
