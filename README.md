
---

# 📝 tsk — A Simple CLI Task Manager

`tsk` is a lightweight and interactive command-line tool to manage your daily tasks with ease. It supports both interactive and command-based modes so you can use it your way.

---

## ✨ Features

* 📋 Add, read, update, check, uncheck, and delete tasks
* 💬 Fully interactive prompt-based workflow with `-i` flag
* 🧠 Simple command-based interface for scripting and automation
* 🧹 Clean and readable CLI output

---

## 🚀 Installation

Clone the repository and link the binary globally:

```bash
git clone https://github.com/furahaderick/tsk.git
cd tsk
npm install
npm link
```

Now you can run `tsk` from anywhere on your system.

---

## 🛠️ Usage

### Interactive Mode

Launch `tsk` in interactive mode:

```bash
tsk -i
```

You'll be prompted to choose from actions like:

* Add a task
* Read your tasks
* Check/uncheck tasks
* Update or delete a task

### Command Mode

Prefer scripting or quick commands? Use `tsk` like this:

#### Add a Task

```bash
tsk add "Buy groceries" "Milk, eggs, bread" "shopping"
```

#### Get Tasks

All tasks:

```bash
tsk get
```

Filtered by descriptor:

```bash
tsk get shopping
```

#### Check/Uncheck a Task

```bash
tsk check shopping
tsk uncheck shopping
```

#### Update a Task

```bash
tsk update shopping
```

#### Delete a Task

```bash
tsk delete shopping
```

---

## 📁 Project Structure

```plaintext
tsk/
├── commands/
│   ├── addNewTask.js
│   ├── getTasks.js
│   ├── updateTask.js
│   ├── deleteTask.js
│   └── toggleStatus.js
├── config/
│   └── db.js
├── models/
│   └── task.model.js
├── utils/
│   ├── promptDescriptor.js
│   └── formatTasksOutput.js
└── tsk.js  // Entry point
```

---

## 📦 Dependencies

* [`commander`](https://www.npmjs.com/package/commander) — CLI argument parser
* [`@inquirer/prompts`](https://www.npmjs.com/package/@inquirer/prompts) — Interactive command-line prompts

Install them with:

```bash
npm install
```

---

## ✅ Example

```bash
$ tsk -i

? What are you about to do? ›
❯ Add a task
  Read your tasks
  Check tasks
  Uncheck tasks
  Update a task
  Delete a task
```

---

## 🙌 Contributing

PRs and suggestions are welcome! Feel free to open an issue or fork the project.

---

## 📄 License

MIT License

---
