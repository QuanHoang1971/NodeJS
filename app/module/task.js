const fs = require("fs");

const readAllTask = () => {
  const buffer = fs.readFileSync("task.json");
  // chuyển sang chuỗi
  const taskString = buffer.toString();
  //chuyển sang kiểu JSON , để nó thành mảng
  const taskJson = JSON.parse(taskString);
  return taskJson;
};

const createTask = (title, description) => {
  const newTask = {
    id: Math.random().toString(),
    title,
    description,
  };
  //   lấy mảng ra để thêm mới vào task.json
  let taskList = readAllTask();
  //   push phần tử vào trong 1 mảng
  taskList = [...taskList, newTask];
  //lưu lại vào task.json. lưu vào thì dùng stringify => tạo thành chuỗi
  // mã hóa ít ai truy cập đc
  fs.writeFileSync("task.json", JSON.stringify(taskList));

  //   trả lại cho bên index để báo cho ng dùng biết là đã thêm thành công
  return newTask;
};

const updateTask = (id, title, description) => {
  let taskList = readAllTask();
  //   tim den file muon update
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    // thu hien update
    const oldTask = taskList[index];
    // nó sẽ tự động cập nhật vào cái cũ
    const newTask = { ...oldTask, title, description };
    // cap nhat vao task hien tai
    taskList[index] = newTask;
    // luu lai
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    // thong bao cho ng dung biet
    return false;
  }
};

const deleteTask = (id) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task = taskList[index];
    //filter để lọc, nếu id truyền vào giống với id trong task.json thì nó sẽ xóa đi
    // trả về taskList ko có id truyền vào nữa
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

module.exports = {
  readAllTask,
  createTask,
  updateTask,
  deleteTask,
};
