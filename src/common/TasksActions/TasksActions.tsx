import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";

export default function TasksActions() {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <i className="fa-solid fa-ellipsis text-neutral-200 cursor-pointer"></i>
      </MenuHandler>
      <MenuList className="bg-neutral-300 border-neutral-200 text-neutral-100 min-w-[138px]">
        <MenuItem>
          <div className="flex items-center">
            <i className="fa-solid fa-pencil pr-3"></i>
            <p className="font-medium">Editar</p>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex items-center">
            <i className="fa-solid fa-trash pr-3"></i>
            <p className="font-medium">Eliminar</p>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
