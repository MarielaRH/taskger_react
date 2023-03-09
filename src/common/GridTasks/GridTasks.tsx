import { useQuery } from "@apollo/client";
import { TasksCard } from "../TasksCard/TasksCard";
import { headerColumns } from "./GridTasks.constants";
import {
  TODO_TASKS_QUERY,
  IN_PROGRESS_TASKS_QUERY,
  BACKLOG_TASKS_QUERY,
  CANCELLED_TASKS_QUERY,
  DONE_TASKS_QUERY,
} from "./GridTasks.queries";
import { useEffect, useState } from "react";
import { Task, Status } from "./GridsTasks.interfaces";
import { Loader } from "../Loader/Loader";

export const GridTasks = () => {
  // Queries for get all tasks by status
  const {
    loading: todoLoading,
    error: todoError,
    data: todoData,
  } = useQuery(TODO_TASKS_QUERY);
  const {
    loading: inProgressLoading,
    error: inProgressError,
    data: inProgressData,
  } = useQuery(IN_PROGRESS_TASKS_QUERY);
  const {
    loading: backLogLoading,
    error: backLogError,
    data: backLogData,
  } = useQuery(BACKLOG_TASKS_QUERY);
  const {
    loading: cancelledLoading,
    error: cancelledError,
    data: cancelledData,
  } = useQuery(CANCELLED_TASKS_QUERY);
  const {
    loading: doneLoading,
    error: doneError,
    data: doneData,
  } = useQuery(DONE_TASKS_QUERY);

  // states to save tasks by status/column
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [inProgressList, setInProgressList] = useState<Task[]>([]);
  const [backlogList, setBacklogList] = useState<Task[]>([]);
  const [cancelledList, setCancelledList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);

  // update states with queryset values
  useEffect(() => {
    if (todoData) {
      setTodoList(todoData.tasks);
    }
    if (inProgressData) {
      setInProgressList(inProgressData.tasks);
    }
    if (backLogData) {
      setBacklogList(backLogData.tasks);
    }
    if (cancelledData) {
      setCancelledList(cancelledData.tasks);
    }
    if (doneData) {
      setDoneList(doneData.tasks);
    }
    console.log(todoList);
  }, [
    todoData,
    inProgressData,
    backLogData,
    cancelledData,
    doneData,
    todoList,
    inProgressList,
    backlogList,
    cancelledList,
    doneList,
  ]);

  //Verify if load ended
  if (
    todoLoading &&
    inProgressLoading &&
    backLogLoading &&
    cancelledLoading &&
    doneLoading
  )
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Loader />
      </div>
    );

  // verify if there is a error
  if (
    todoError ||
    inProgressError ||
    backLogError ||
    cancelledError ||
    doneError
  )
    return (
      <div className="h-full w-full flex flex-col justify-center items-center text-3xl font-light">
        Something failed, try it later
      </div>
    );

  const getTasksCount = (index: number) => {
    switch (index) {
      case 0:
        return todoList.length;
      case 1:
        return inProgressList.length;
      case 2:
        return backlogList.length;
      case 3:
        return cancelledList.length;
      case 4:
        return doneList.length;
    }
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
            {todoList.length > 0
              ? todoList.map((task: Task) =>
                  task.status === Status.TODO ? (
                    <TasksCard task={task} key={task.id} />
                  ) : null
                )
              : (
                <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center"><i className="fa-regular fa-folder text-6xl text-neutral-300"></i></div>
              )
              }
          </div>
          <div
            id="inprogress"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {inProgressList.length > 0
              ? inProgressList.map((task: Task) =>
                  task.status === Status.IN_PROGRESS ? (
                    <TasksCard task={task} key={task.id} />
                  ) : null
                )
              : (
                <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center"><i className="fa-regular fa-folder text-6xl text-neutral-300"></i></div>
              )}
          </div>
          <div
            id="backlog"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {backlogList.length > 0
              ? backlogList.map((task: Task) =>
                  task.status === Status.BACKLOG ? (
                    <TasksCard task={task} key={task.id} />
                  ) : null
                )
              : (
                <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center"><i className="fa-regular fa-folder text-6xl text-neutral-300"></i></div>
              )}
          </div>
          <div
            id="canceled"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {cancelledList.length > 0
              ? cancelledList.map((task: Task) =>
                  task.status === Status.CANCELLED ? (
                    <TasksCard task={task} key={task.id} />
                  ) : null
                )
              : (
                <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center"><i className="fa-regular fa-folder text-6xl text-neutral-300"></i></div>
              )}
          </div>
          <div
            id="done"
            className="flex flex-col  w-[348px] min-w-[348px] border-[1.5px] border-dashed rounded-lg p-2 border-neutral-300"
          >
            {doneList.length > 0
              ? doneList.map((task: Task) =>
                  task.status === Status.DONE ? (
                    <TasksCard task={task} key={task.id} />
                  ) : null
                )
              : (
                <div className="min-h-[14rem] w-[348px] min-w-[348px] flex justify-center items-center"><i className="fa-regular fa-folder text-6xl text-neutral-300"></i></div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
