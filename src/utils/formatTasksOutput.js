import chalk from "chalk";

export const formatTasksOutput = (taskData, descriptor = undefined) => {
	let taskStatus;

	if (taskData instanceof Array) {
		if (taskData.length === 0) {
			console.log(chalk.blueBright("You do not have any tasks yet."));
		} else {
			taskData.map((task, i) => {
				taskStatus = task.completed ? "true" : "false";
				console.log(
					chalk.blueBright(`\n${i + 1}.\ttitle: `) +
						task.title +
						"\n" +
						chalk.blueBright("  \tdescription: ") +
						task.description +
						"\n" +
						chalk.blueBright("  \tdescriptor: ") +
						task.descriptor +
						"\n" +
						chalk.blueBright("\tcompleted: ") +
						taskStatus +
						"\n"
				);
			});
		}
	} else {
		if (!taskData) {
			console.log(
				chalk.redBright(
					`Couldn't find task with descriptor '${descriptor}'`
				)
			);
		} else {
			taskStatus = taskData.completed ? "true" : "false";
			console.log(
				chalk.blueBright("\n\ttitle: ") +
					taskData.title +
					"\n" +
					chalk.blueBright("\tdescription: ") +
					taskData.description +
					"\n" +
					chalk.blueBright("\tdescriptor: ") +
					taskData.descriptor +
					"\n" +
					chalk.blueBright("\tcompleted: ") +
					taskStatus +
					"\n"
			);
		}
	}
};
