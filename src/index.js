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

program.version("1.0.0").description("tasker: Manage daily tasks from the CLI");

program.action(async () => {
	// Print intro documentation
	intro();
});

program.parse(process.argv);
