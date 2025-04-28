import ora from "ora";
import chalk from "chalk";
import { input } from "@inquirer/prompts";

import Task from "../models/task.model.js";
import { startDB, stopDB } from "../config/db.js";

class TasksAddError extends Error {}
class ArgsParsingError extends Error {}

export const parseAddingArgsInteractively = async () => {
	let loop = true;
	let taskInputs = [];

	try {
		// Connect to database
		await startDB();

		do {
			// Improve Visibility with empty line :)
			console.log();

			const title = await input({
				message: "Enter task title (or 'q' to quit): ",
			});

			if (title.toLowerCase().trim() === "q") {
				loop = false;
				return taskInputs;
			}

			const description = await input({
				message: "Enter task description: ",
			});
			const descriptor = await input({
				message: "Enter task's unique descriptor: ",
			});

			// Validate descriptor
			const duplicateDescriptor = await Task.findOne({
				descriptor: descriptor,
			});
			if (duplicateDescriptor) {
				console.log(
					chalk.redBright(`Found duplicate descriptor: '${descriptor}'`)
				);
			} else {
				taskInputs.push({
					title,
					description,
					descriptor,
					completed: false,
				});
			}
		} while (loop);
	} catch (err) {
		throw new ArgsParsingError("Error parsing args: " + err.message);
	} finally {
		// Close database
		await stopDB();
	}
};

export const addTasks = async (taskArray) => {
	try {
		// Connect to database
		await startDB();

		if (taskArray.length > 0) {
			const spinner = ora("Adding task(s)...").start();
			await Task.insertMany(taskArray);
			spinner.stop();
			console.log(chalk.greenBright("Successfully added new task(s)"));
		}
	} catch (err) {
		throw new TasksAddError("Error adding task(s): " + err.message);
	} finally {
		// Stop the database server
		await stopDB();
	}
};
