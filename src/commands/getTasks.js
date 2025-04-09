import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";

import Task from "../models/task.model.js";

const fetchAllTasks = async () => {
	try {
		const spinner = ora("Fetching tasks...").start();
		const allTasks = await Task.find();
		spinner.stop();
		if (allTasks.length === 0) {
			console.log(chalk.blueBright("You do not have any tasks yet."));
		} else {
			allTasks.map((task, i) => {
				console.log(
					chalk.cyanBright(`\n${i + 1}.\ttitle: `) +
						task.title +
						"\n" +
						chalk.blueBright("  \tdescription: ") +
						task.description +
						"\n" +
						chalk.cyanBright("  \tdescriptor: ") +
						task.descriptor +
						"\n"
				);
			});
		}
	} catch (err) {
		console.error(chalk.redBright(err));
	}
};

const fetchSingleTask = async () => {
	try {
		const descriptor = await input({ message: "Enter todo descriptor: " });
		const spinner = ora("Fetching task...").start();
		const task = await Task.findOne({ descriptor });
		spinner.stop();
		if (!task) {
			console.log(
				chalk.redBright(
					`Couldn't find task with descriptor '${descriptor}'`
				)
			);
		} else {
			console.log(
				chalk.cyanBright("\n\ttitle: ") +
					task.title +
					"\n" +
					chalk.blueBright("\tdescription: ") +
					task.description +
					"\n" +
					chalk.cyanBright("\tdescriptor: ") +
					task.descriptor +
					"\n"
			);
		}
	} catch (err) {
		console.error(chalk.redBright(err));
	}
};

export const getTasks = async () => {
	const option = await select({
		message: "Specify tasks to fetch",
		choices: [
			{
				name: "Fetch all tasks",
				value: "all",
			},
			{
				name: "Fetch single tasks",
				value: "single",
			},
		],
	});

	switch (option) {
		case "all":
			await fetchAllTasks();
			break;
		case "single":
			await fetchSingleTask();
			break;
		default:
			break;
	}
};
