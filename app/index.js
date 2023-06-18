const yargs = require("yargs"); //ES5
const {
  readAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require("./module/task");

// node app/index.js create
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("da tao moi", newTask);
  },
});

yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(result);
  },
});

yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    console.log("id", id);
    console.log("read-detail");
  },
});

yargs.command({
  command: "update",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log("task updated", task);
    } else {
      console.log("Not Found");
    }
    // console.log("update");
  },
});

yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log("delete task:", task);
    } else {
      console.log("Not Found");
    }
  },
});

yargs.parse();
