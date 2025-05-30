#! /usr/bin/env node

import { program } from "commander";
import { select } from "@inquirer/prompts";

import {
	addTasks,
	parseAddingArgsInteractively,
} from "./commands/addNewTask.js";

import { fetchTasks, getFetchingDescriptor } from "./commands/getTasks.js";
import { formatTasksOutput } from "./utils/formatTasksOutput.js";

import { promptDescriptor } from "./utils/promptDescriptor.js";
import { updateTask } from "./commands/updateTask.js";
import { deleteTask } from "./commands/deleteTask.js";

program
	.name("tsk")
	.version("1.0.0")
	.description("tsk: A CLI app for managing daily tasks")
	.option("-i, --interactive", "run in interactive mode");

// Interactive mode
program.action(async (options) => {
	if (options.interactive) {
		// TODO: Deleting, Checking tasks
		const command = await select({
			message: "What are you about to do?",
			choices: [
				{
					name: "Add a task",
					value: "add",
				},
				{
					name: "Read your tasks",
					value: "get",
				},
				{
					name: "Update a task",
					value: "update",
				},
				{
					name: "Delete a task",
					value: "delete",
				},
			],
		});

		let descriptor;

		switch (command) {
			case "add":
				const tasksArray = await parseAddingArgsInteractively();
				await addTasks(tasksArray);
				break;

			case "get":
				descriptor = await getFetchingDescriptor();
				const taskData = await fetchTasks(descriptor);
				formatTasksOutput(taskData, descriptor);
				break;

			case "update":
				descriptor = await promptDescriptor();
				await updateTask(descriptor);
				break;
			case "delete":
				descriptor = await promptDescriptor();
				await deleteTask(descriptor);
				break;
			default:
				break;
		}
	}
});

program
	.command("add <title> <description> <descriptor>")
	.description("Adds a new task")
	.action(async (title, description, descriptor) => {
		const taskArray = [{ title, description, descriptor }];
		await addTasks(taskArray);
	});

program
	.command("get [descriptor]")
	.description("Retrieves all tasks, or a single task by descriptor")
	.action(async (descriptor) => {
		const taskData = await fetchTasks(descriptor);
		formatTasksOutput(taskData, descriptor);
	});

program
	.command("update <descriptor>")
	.description("Updates a task by descriptor")
	.action(async (descriptor) => {
		await updateTask(descriptor);
	});

program
	.command("delete <descriptor>")
	.description("Deletes a task by descriptor")
	.action(async (descriptor) => {
		await deleteTask(descriptor);
	});

program.parse(process.argv);
