import { NavLink } from "react-router-dom";
import { Props } from "./SideBarItem.interfaces";

export const SideBarItem: React.FC<Props> = ({sideBarItem, sideBarVisible}) => {
  return (
    <NavLink id={sideBarItem.name} to={sideBarItem.path} className={ ({isActive})=>  isActive ? 'menu_item_active' : undefined}>
     <div id="menu_item" className={`flex h-[56px] p-[19px] items-center  ${sideBarVisible ? 'justify-start' : ''}`}>
          <img
            src={require(`../../../../public/img/${sideBarItem.icon}`)}
            alt="icon menu item"
            className="max-w-[18px] h-[17px]"
          />
          <p className={`whitespace-nowrap overflow-x-hidden ${sideBarVisible ? 'pl-[19px]':'pl-[0px] duration-100 delay-1000'}`}> {sideBarItem.name}</p>
    </div>
    </NavLink>
  )
};
