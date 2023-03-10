import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Task } from '../../utils/interfaces';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useMutation } from "@apollo/client";
import { DELETE_TASKS_QUERY, TASKS_QUERY } from '../../utils/queries';

interface Props {
  setOpen: (showDialog: boolean) => void;
  setTaskDialog: (task: Task | null) => void;
  task: Task;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const TasksActions: React.FC<Props> = ({
  setOpen,
  setTaskDialog,
  task,
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

  const [deleteTask] = useMutation(DELETE_TASKS_QUERY);

  const handlerDialog = () => {
    setOpen(true);
    setTaskDialog(task);
  };

  const handleConfirmDialog = () => {
    setShowConfirmDialog(!showConfirmDialog);
  };

  const handleDeleteTask = () => {
    const deleteTaskById = {
      id: task.id,
    };
    deleteTask({
      variables: { input: deleteTaskById },
      refetchQueries: [{query: TASKS_QUERY}]
    });
    handleConfirmDialog()
  };

  return (
    <>
      <Dialog
        open={showConfirmDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleConfirmDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="bg-neutral-300 rounded-none text-neutral-100 p-2">
          <DialogTitle>
            {"Are you sure you want to delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <span className="text-neutral-200">
                This action cannot be undone
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="bg-neutral-300">
            <Button
              variant="text"
              onClick={handleConfirmDialog}
              className="mr-3"
              type="button"
            >
              <div className="capitalize font-normal text-base">Cancel</div>
            </Button>
            <Button
              onClick={handleDeleteTask}
              variant="contained"
              type="button"
              className="bg-primary-400 disabled:opacity-50"
            >
              <div className="capitalize font-normal text-base">Delete</div>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Menu placement="bottom-end">
        <MenuHandler>
          <i className="fa-solid fa-ellipsis text-neutral-200 cursor-pointer"></i>
        </MenuHandler>
        <MenuList className="bg-neutral-300 border-neutral-200 text-neutral-100 min-w-[138px]">
          <MenuItem onClick={handlerDialog}>
            <div className="flex items-center">
              <i className="fa-solid fa-pencil pr-3"></i>
              <p className="font-medium">Edit</p>
            </div>
          </MenuItem>
          <MenuItem onClick={handleConfirmDialog}>
            <div className="flex items-center">
              <i className="fa-solid fa-trash pr-3"></i>
              <p className="font-medium">Delete</p>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
