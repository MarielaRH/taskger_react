import { IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { PropsActionsBar } from "../../utils/interfaces";
import { Options } from "../../utils/types";


export const ActionsBar: React.FC<PropsActionsBar> = ({ setOpen, setTaskDialog }) => {
  const [optionActive, setOptionActive] = useState<Options>("LIST");

  const handleDialog = () => {
    setOpen(true)
    setTaskDialog(null)
  };

  return (
    <div className="pt-[25px] pb-[25px] flex justify-between items-center h-auto">
      <div className="flex items-center">
        <IconButton
          className={`bg-transparent shadow-none hover:shadow-none hover:scale-90 w-[35px] h-[35px] mr-2 focus-visible:focus:outline-none ${
            optionActive === "LIST"
              ? "border-primary-400 border-solid border-[1.5px]"
              : "border-none"
          }`}
          onClick={() => {
            setOptionActive("LIST");
          }}
        >
          <img
            src={require(`../../public/img/${
              optionActive === "LIST" ? "tasks-icon-red.png" : "tasks-icon.png"
            }`)}
            alt="grid icon"
            className="max-w-[16px] h-[14px]"
          />
        </IconButton>

        <IconButton
          className={`bg-transparent shadow-none hover:shadow-none hover:scale-90 w-[35px] h-[35px] focus-visible:focus:outline-none ${
            optionActive === "COLUMNS"
              ? "border-primary-400 border-solid border-[1.5px]"
              : "border-none"
          }`}
          onClick={() => {
            setOptionActive("COLUMNS");
          }}
        >
          <img
            src={require(`../../public/img/${
              optionActive === "COLUMNS"
                ? "dashboard-icon-red.png"
                : "dashboard-icon.png"
            }`)}
            alt="grid icon"
            className="max-w-[18px] h-[16px]"
          />
        </IconButton>
      </div>
      <IconButton
        onClick={handleDialog}
        className="bg-primary-400 shadow-none hover:shadow-none hover:scale-90 w-[35px] h-[35px] focus-visible:focus:outline-none"
      >
        <i className="fa-solid fa-plus text-lg font-normal"></i>
      </IconButton>
    </div>
  );
};
