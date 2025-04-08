import { program } from "commander";
import inquirer from "inquirer";
import { select } from "@inquirer/prompts";
import ora from "ora";
import chalk from "chalk";
import boxen from "boxen";

const intro = () => {
	console.log(
		chalk.yellow(
			boxen("TASKER: YOUR CLI TASK MANAGER", {
				padding: 1,
				// margin: 1,
				borderStyle: "classic",
				textAlignment: "center",
			})
		)
	);
	// TODO: Print documentation (instructions)
};

// Config
program.version("1.0.0").description("tasker: Manage daily tasks from the CLI");

program.action(async () => {
	// Print intro documentation
	intro();

	// User prompts
	const answer = await select({
		message: "What are you about to do?",
		choices: [
			{
				name: "Add a todo",
				value: "add",
				description: "Add a task for today",
			},
			{
				name: "Check todo",
				value: "check",
				description: "Mark a todo as completed",
			},
			{
				name: "Update a todo",
				value: "update",
				description: "Change a todo",
			},
			{
				name: "Delete a todo",
				value: "delete",
				description: "Remove a todo permanently",
			},
		],
	});

	// Handle user choices
	switch (answer) {
		case "add":
			console.log(chalk.red("Feature in development!"));
			break;
		case "check":
			console.log(chalk.red("Feature in development!"));
			break;
		case "update":
			console.log(chalk.red("Feature in development!"));
			break;
		case "delete":
			console.log(chalk.red("Feature in development!"));
			break;
		default:
			break;
	}
});

program.parse(process.argv);
