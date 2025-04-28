import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		descriptor: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	}
	// { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
