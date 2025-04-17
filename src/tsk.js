#! /usr/bin/env node

import { program } from "commander";
import { select } from "@inquirer/prompts";

import {
	addTasks,
	parseAddingArgsInteractively,
} from "./commands/addNewTask.js";
import { getTasks } from "./commands/getTasks.js";
import { updateTask } from "./commands/updateTask.js";
import { deleteTask } from "./commands/deleteTask.js";

program
	.name("tsk cli")
	.version("1.0.0")
	.description("tsk: A CLI app for managing daily tasks")
	.option("-i, --interactive", "run in interactive mode");

// program.action(async () => {

// 	// Start the database server
// 	await startDB();

// 	const command = await select({
// 		message: "What are you about to do?",
// 		choices: [
// 			{
// 				name: "Add a task",
// 				value: "add",
// 			},
// 			{
// 				name: "Get tasks",
// 				value: "get",
// 			},
// 			{
// 				name: "Update task",
// 				value: "update",
// 			},
// 			{
// 				name: "Delete task",
// 				value: "delete",
// 			},
// 		],
// 	});

// 	switch (command) {
// 		case "add":
// 			await addNewTask();
// 			break;
// 		case "get":
// 			await getTasks();
// 			break;
// 		case "update":
// 			await updateTask();
// 			break;
// 		case "delete":
// 			await deleteTask();
// 			break;

// 		default:
// 			break;
// 	}

// 	// Stop the database server
// 	await stopDB();
// });

program.action(async (options) => {
	if (options.interactive) {
		const tasksArray = await parseAddingArgsInteractively();
		await addTasks(tasksArray);
	}
});

program
	.command("add <title> <description> <descriptor>")
	.action(async (title, description, descriptor) => {
		const taskArray = [{ title, description, descriptor }];
		await addTasks(taskArray);
	});

program.parse(process.argv);
