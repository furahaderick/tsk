import { input } from "@inquirer/prompts";

export const promptDescriptor = async () => {
	const descriptor = await input({ message: "Enter the task descriptor: " });
	return descriptor;
};
