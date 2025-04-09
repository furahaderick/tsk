#! /usr/bin/env node

import { program } from "commander";
import { select } from "@inquirer/prompts";
// import figlet from "figlet";
import chalk from "chalk";

import { startDB, stopDB } from "./config/db.js";
import { addNewTask } from "./commands/addNewTask.js";
import { getTasks } from "./commands/getTasks.js";
import { updateTask } from "./commands/updateTask.js";
import { deleteTask } from "./commands/deleteTask.js";

program.version("1.0.0").description("tsk: A CLI app for managing daily tasks");

program.action(async () => {
    // Start the database server
	await startDB();


	const command = await select({
		message: "What are you about to do?",
		choices: [
			{
				name: "Add a task",
				value: "add",
				description: "Adds a new task",
			},
			{
				name: "Get tasks",
				value: "get",
				description: "Fetch tasks",
			},
			{
				name: "Update task",
				value: "update",
				description: "Updates a task",
			},
			{
				name: "Delete task",
				value: "delete",
				description: "Deletes a task",
			},
		],
	});

	switch (command) {
		case "add":
			await addNewTask();
			break;
		case "get":
			getTasks();
			break;
		case "update":
			updateTask();
			break;
		case "delete":
			deleteTask();
			break;

		default:
			break;
	}

    // Stop the database server
	await stopDB();
});

program.parse(process.argv);
