import { Profile } from "../Profile/Profile";
import * as React from "react";
import { Tag } from "../Tag/Tag";
import { TasksActions } from "../TasksActions/TasksActions";
import { Task } from "../../utils/interfaces";
import { PointEstimate } from "../../utils/constants";

import { TransitionProps } from "@mui/material/transitions";

interface PropsTaskCard  {
  task: Task;
  setOpen: (showDialog: boolean ) => void
  setTaskDialog:  (task: Task|null) => void;
}



export const TasksCard: React.FC<PropsTaskCard> = ({ task, setOpen, setTaskDialog }) => {
  // format pointEstimate
  const formatPointEstimate = (pointEstimate: string) => {
    if (pointEstimate === PointEstimate[0].value) {
      return PointEstimate[0].label;
    } else if (pointEstimate === PointEstimate[1].value) {
      return PointEstimate[1].label;
    } else if (pointEstimate === PointEstimate[2].value) {
      return PointEstimate[2].label;
    } else if (pointEstimate === PointEstimate[3].value) {
      return PointEstimate[3].label;
    } else if (pointEstimate === PointEstimate[4].value) {
      return PointEstimate[4].label;
    }
  };

  // convert number of month in string
  const getMonthName = (numberMonth: number | string) => {
    const month: string[] = [];
    const intMonth = +numberMonth;
    switch (intMonth) {
      case 0:
        month.push("JAN");
        break;
      case 1:
        month.push("FEB");
        break;
      case 2:
        month.push("MAR");
        break;
      case 3:
        month.push("APR");
        break;
      case 4:
        month.push("MAY");
        break;
      case 5:
        month.push("JUN");
        break;
      case 6:
        month.push("JUL");
        break;
      case 7:
        month.push("AUG");
        break;
      case 8:
        month.push("SEP");
        break;
      case 9:
        month.push("OCT");
        break;
      case 10:
        month.push("NOV");
        break;
      case 11:
        month.push("DEC");
        break;
    }
    return month[0];
  };

  // Format date
  const formatDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();

    // validate if the date is of yesterday or today for to apply a format specific
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    ) {
      if (date.getDate() === today.getDate() - 1) {
        return "YESTERDAY";
      } else if (date.getDate() === today.getDate()) {
        return "TODAY";
      } else {
        return `${date.getDate()} ${getMonthName(
          date.getMonth()
        )}, ${date.getFullYear()}`;
      }
    } else {
      return `${date.getDate()} ${getMonthName(
        date.getMonth()
      )}, ${date.getFullYear()}`;
    }
  };

  return (
    <div className="min-h-[208px] bg-neutral-400 rounded-[8px] p-4 flex flex-col mb-4">
      <div className="flex flex-row justify-between items-center pb-5">
        <p className="font-semibold text-base">{task.name}</p>
        <TasksActions setOpen={setOpen} setTaskDialog={setTaskDialog} task={task}/>
      </div>
      <div className="flex flex-row justify-between items-center pb-5">
        <p className="font-semibold text-base">
          {formatPointEstimate(task.pointEstimate)}
        </p>
        <div className="flex justify-between items-center px-2 py-1 bg-neutral-200/10 rounded-[4px]">
          <img
            src={require("../../public/img/clock.png")}
            alt="clock icon"
            className="max-w-[18px] h-[16px] mr-4"
          />
          <p className="font-semibold text-sm">{formatDate(task.dueDate)}</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-starts items-center pb-5">
        {task.tags.map((tag) => (
          <Tag tag={tag} key={`${task.id}_${tag}`} />
        ))}
      </div>
      <div className="flex flex-row justify-between items-center">
        <Profile
        width={36}
          url={
            task.assignee && task.assignee.avatar ? task.assignee.avatar : null
          }
        />
        <div className="flex items-center">
          <i className="fa-solid fa-paperclip mr-4"></i>
          <div className="flex justify-between items-center">
            <p className="font-semibold pr-1">5</p>
            <img
              src={require("../../public/img/structure.png")}
              alt="search icon"
              className="max-w-[18px] h-[15px] mr-4 cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold pr-1">3</p>
            <img
              src={require("../../public/img/comments.png")}
              alt="search icon"
              className="max-w-[18px] h-[15px] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
