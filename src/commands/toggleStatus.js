import ora from "ora";
import chalk from "chalk";

import Task from "../models/task.model.js";
import { startDB, stopDB } from "../config/db.js";

class CheckTaskError extends Error {}
class UncheckTaskError extends Error {}

export const checkStatus = async (descriptor) => {
	try {
		await startDB();

		const spinner = ora("Searching for task...").start();
		const task = await Task.findOne({ descriptor });
		spinner.stop();

		if (!task) {
			console.log(
				chalk.redBright(
					`Couldn't find task with descriptor '${descriptor}'`
				)
			);
		} else {
			spinner.start("Checking task...");

			await Task.findOneAndUpdate({ descriptor }, { completed: true });

			spinner.stop();
			console.log(chalk.greenBright("Task checked"));
		}
	} catch (err) {
		throw new CheckTaskError("Error checking task: " + err.message);
	} finally {
		await stopDB();
	}
};

export const uncheckStatus = async (descriptor) => {
	try {
		await startDB();

		const spinner = ora("Searching for task...").start();
		const task = await Task.findOne({ descriptor });
		spinner.stop();

		if (!task) {
			console.log(
				chalk.redBright(
					`Couldn't find task with descriptor '${descriptor}'`
				)
			);
		} else {
			spinner.start("Unchecking task...");

			await Task.findOneAndUpdate({ descriptor }, { completed: false });

			spinner.stop();
			console.log(chalk.greenBright("Task unchecked"));
		}
	} catch (err) {
		throw new UncheckTaskError("Error unchecking task: " + err.message);
	} finally {
		await stopDB();
	}
};
