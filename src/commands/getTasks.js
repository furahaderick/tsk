import { input, select } from "@inquirer/prompts";

import Task from "../models/task.model.js";
import { startDB, stopDB } from "../config/db.js";

class TaskFetchError extends Error {}

export const getFetchingDescriptor = async () => {
	let descriptor;

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
		case "single":
			descriptor = await input({ message: "Enter task descriptor: " });
			break;

		default:
			break;
	}

	return descriptor;
};

export const fetchTasks = async (descriptor = undefined) => {
	let data;

	try {
		await startDB();

		// Handle optional descriptor argument
		if (descriptor) {
			data = await Task.findOne({ descriptor });
		} else {
			// Else fetch all tasks
			data = await Task.find();
		}

		return data;
	} catch (err) {
		throw new TaskFetchError("Error reading task(s): " + err.message);
	} finally {
		await stopDB();
	}
};
