import { useQuery } from "@apollo/client";
import { TasksCard } from "../TasksCard/TasksCard";

import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Task } from "../../utils/interfaces";
import { headerColumns, StatusList } from "../../utils/constants";
import { TASKS_QUERY } from "../../utils/queries";
interface Props {
  setOpen: (showDialog: boolean) => void
  setTaskDialog:  (task: Task|null) => void;
}
export const GridTasks: React.FC<Props>  = ({setOpen, setTaskDialog}) => {
  // Queries for get all tasks by status
  const {
    loading: taskLoading,
    error: taskError,
    data: taskData,
  } = useQuery(TASKS_QUERY);

  // states to save tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

  // update states with queryset values
  useEffect(() => {
    if (taskData) {
      setTaskList(taskData.tasks);
    }
  }, [taskData, taskList]);


  //Verify if load ended
  if (taskLoading)
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Loader />
      </div>
    );

  // verify if there is a error
  if (taskError)
    return (
      <div className="h-full w-full flex flex-col justify-center items-center text-3xl font-light">
        Something failed, try it later
      </div>
    );

  const getTasksCount = (index: number) => {
    switch (index) {
      case 0:
        return reduce(StatusList[0].value);
      case 1:
        return reduce(StatusList[1].value);
      case 2:
        return reduce(StatusList[2].value);
      case 3:
        return reduce(StatusList[3].value);
      case 4:
        return reduce(StatusList[4].value);
    }
  };

  const reduce = (status: string) => {
    const countTasks = taskList.reduce((count, task) => {
      if (task.status === status) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    return countTasks;
  };

  return (
    <div className="flex flex-col h-full gap-y-3 gap-x-6 overflow-y-auto container-scrollbar-style pr-1">
      <div className="flex flex-col w-fit sticky top-0 bg-neutral-500 pb-1">
        <div className="flex flex-row w-full gap-y-3 gap-x-6">
          {headerColumns.map((item, index) => (
            <div
              className="flex flex-col  w-[348px] min-w-[348px] font-medium"
              key={item.key}
            >
              {item.label} ({getTasksCount(index)})
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow">
        <div className="flex flex-row h-auto  w-full gap-y-3 gap-x-6 pb-1">
          <div
            id="todo"
            className="flex flex-col min-h-[14rem] w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {taskList.length > 0 ? (
              taskList.map((task: Task) =>
                task.status === StatusList[0].value ? (
                  <TasksCard setOpen={setOpen} setTaskDialog={setTaskDialog} task={task} key={task.id}  />
                ) : null
              )
            ) : (
              <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center">
                <i className="fa-regular fa-folder text-6xl text-neutral-300"></i>
              </div>
            )}
          </div>
          <div
            id="inprogress"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {taskList.length > 0 ? (
              taskList.map((task: Task) =>
                task.status === StatusList[1].value ? (
                  <TasksCard setOpen={setOpen} setTaskDialog={setTaskDialog} task={task} key={task.id} />
                ) : null
              )
            ) : (
              <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center">
                <i className="fa-regular fa-folder text-6xl text-neutral-300"></i>
              </div>
            )}
          </div>
          <div
            id="backlog"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {taskList.length > 0 ? (
              taskList.map((task: Task) =>
                task.status === StatusList[2].value ? (
                  <TasksCard setOpen={setOpen} setTaskDialog={setTaskDialog} task={task} key={task.id} />
                ) : null
              )
            ) : (
              <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center">
                <i className="fa-regular fa-folder text-6xl text-neutral-300"></i>
              </div>
            )}
          </div>
          <div
            id="canceled"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {taskList.length > 0 ? (
              taskList.map((task: Task) =>
                task.status === StatusList[3].value ? (
                  <TasksCard setOpen={setOpen} setTaskDialog={setTaskDialog} task={task} key={task.id} />
                ) : null
              )
            ) : (
              <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center">
                <i className="fa-regular fa-folder text-6xl text-neutral-300"></i>
              </div>
            )}
          </div>
          <div
            id="done"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {taskList.length > 0 ? (
              taskList.map((task: Task) =>
                task.status === StatusList[4].value ? (
                  <TasksCard setOpen={setOpen} setTaskDialog={setTaskDialog} task={task} key={task.id} />
                ) : null
              )
            ) : (
              <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center">
                <i className="fa-regular fa-folder text-6xl text-neutral-300"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
