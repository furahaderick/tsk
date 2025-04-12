import chalk from "chalk";
import mongoose from "mongoose";
import ora from "ora";

import dotenv from "dotenv";
dotenv.config();

export const startDB = async () => {
	try {
		const spinner = ora("Connecting to mongoDB...").start();
		await mongoose.connect(process.env.MONGO_URI);
		spinner.stop();
	} catch (err) {
		console.log(chalk.redBright("\nCouldn't connect to mongoDB. Try again."));
		process.exit(1);
	}
};

export const stopDB = async () => {
	try {
		await mongoose.disconnect();
	} catch (err) {
		console.log(
			chalk.redBright("\nError disconnecting from mongoDB. Try again.")
		);
	}
};
