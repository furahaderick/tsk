import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";

import Task from "../models/task.model.js";

export const addNewTask = async () => {
	// Create an endless loop for user input
	let loop = false; // Off
	const taskInputs = new Array();

	do {
		const task = {
			title: await input({ message: "Enter task title: " }),
			description: await input({ message: "Enter task description: " }),
			descriptor: await input({ message: "Enter a unique descriptor: " }),
		};

		const duplicateDescriptorTask = await Task.findOne({
			descriptor: task.descriptor,
		});

		if (duplicateDescriptorTask) {
			console.log(
				chalk.redBright(
					`You cannot add duplicate descriptor: '${task.descriptor}'`
				)
			);
			return;
		}
		taskInputs.push(task);

		const confirm = await select({
			message: "Do you want to add another task?",
			choices: [
				{
					name: "yes",
					value: "Y",
				},
				{
					name: "no",
					value: "N",
				},
			],
		});

		switch (confirm) {
			case "Y":
				loop = true;
				break;
			case "N":
				loop = false;
				break;

			default:
				break;
		}
	} while (loop);

	try {
		const spinner = ora("Creating new task(s)...").start();
		await Task.insertMany(taskInputs);
		spinner.stop();
		console.log(chalk.greenBright("Successfully added new task(s)"));
	} catch (err) {
		console.error(chalk.redBright(err));
	}
};
