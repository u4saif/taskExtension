export const GetAllTasks= ()=>{
    let initialTasks = localStorage.getItem("taskData");
    if (initialTasks) {
      // Parse the task data from localStorage since localStorage stores strings
      let taskObj = JSON.parse(initialTasks);
      let allTask: any = [];
      // Extract all tasks into a single array
      taskObj.task.forEach((month: any) => {
        month.forEach((task: any) => {
          // Push each task object into the array
          Object.keys(task).forEach((dateKey) => {
            allTask.push(task[dateKey]);
          });
        });
      });
    return allTask;
}
}