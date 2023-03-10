import { useState } from "react";
import { ActionsBar } from "../../common/ActionsBar/ActionsBar";
import { GridTasks } from "../../common/GridTasks/GridTasks";
import { SearchBar } from "../../common/SearchBar/SearchBar";
import { TasksForm } from "../../forms/TasksForm/TasksForm";
import { Task } from "../../utils/interfaces";

export const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [taskDialog, setTaskDialog] = useState<Task | null>(null);
  
  return (
    <div className="bg-neutral-500 w-full h-full flex flex-col text-neutral-100">
        <SearchBar />
        <ActionsBar setOpen={setOpen} setTaskDialog={setTaskDialog}/>
      <div className="h-full overflow-auto">
        <GridTasks setOpen={setOpen} setTaskDialog={setTaskDialog}/>
      </div>
       <TasksForm setOpen={setOpen} showDialog={open} task={taskDialog}/>
    </div>
  );
};
