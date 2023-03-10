import { useState } from "react";
import { menuItem } from "../../utils/constants";
import { SideBarItem } from './Components/SideBarItem/SideBarItem';

export const SideBar = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <div
      className={`transition-all duration-500 bg-neutral-400 text-neutral-100 rounded-[16px] pt-[14px] flex flex-col items-center ${
        sideBarVisible ? "w-[14.5rem]" : "w-[3.5rem]"
      }`}
    >
      <div onClick={() => setSideBarVisible(!sideBarVisible)} className="cursor-pointer">
        <img src={require('../../public/img/logo-menu.png')} alt="logo" width="35" height="36" />
      </div>
      <div className="pt-[62px] w-full">
        {
          menuItem.map((item)=>(
            <SideBarItem sideBarItem={item} sideBarVisible={sideBarVisible} key={item.key}></SideBarItem>
          ))
        }
      </div>
    </div>
  );
};
