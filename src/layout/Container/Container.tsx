import { PropsWithChildren } from "react";
import { SideBar } from "../SideBar/SideBar";

export const Container = (props: PropsWithChildren) => {
  return (
    <div className="flex p-[15px] gap-x-[32px] h-screen bg-neutral-500 overflow-hidden">

        <SideBar />
        <div className="overflow-auto w-full">
        {props.children}
        </div>
    </div>
  );
};
