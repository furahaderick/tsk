import ora from "ora";
import chalk from "chalk";

import Task from "../models/task.model.js";
import { startDB, stopDB } from "../config/db.js";

class TaskDeleteError extends Error {}

export const deleteTask = async (descriptor) => {
	try {
		await startDB();
		const spinner = ora("Searching task...").start();
		const task = await Task.findOne({ descriptor });
		spinner.stop();

		if (!task) {
			console.log(
				chalk.redBright(
					`Couldn't find task with descriptor '${descriptor}'`
				)
			);
		} else {
			spinner.start("Deleting task...");

			await Task.findOneAndDelete({ descriptor });

			spinner.stop();
			console.log(chalk.greenBright("Task deleted successfully"));
		}
	} catch (err) {
		throw new TaskDeleteError("Error deleting task: " + err.message);
	} finally {
		await stopDB();
	}
};
