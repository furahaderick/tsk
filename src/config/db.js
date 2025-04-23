import ora from "ora";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

class DBConnectError extends Error {}
class DBDisconnectError extends Error {}

export const startDB = async () => {
	try {
		const spinner = ora("Connecting to the database...").start();
		await mongoose.connect(process.env.MONGO_URI);
		spinner.stop();
	} catch (err) {
		throw new DBConnectError("Failed to connect to database: " + err.message);
	}
};

export const stopDB = async () => {
	try {
		await mongoose.disconnect();
	} catch (err) {
		throw new DBDisconnectError(
			"Failed to disconnect database: " + err.message
		);
	}
};
