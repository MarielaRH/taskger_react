import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  PointEstimate,
  PointEstimate_type,
  User,
  TaskTag,
} from "../../common/GridTasks/GridsTasks.interfaces";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK_MUTATION, USERS_TASKS_QUERY } from "./TasksForm.queries";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { Status } from '../../common/GridTasks/GridsTasks.interfaces';

// configurations to inputLabel
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const TasksForm = () => {
  const { loading, error, data } = useQuery(USERS_TASKS_QUERY);
  const [createTask, { loading: loadingMutation, error: errorMutation }] =
    useMutation(CREATE_TASK_MUTATION);
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [titleTask, setTitleTask] = useState<string>('');
  const [estimate, setEstimate] = useState<PointEstimate_type | null>(null);
  const [tag, setTag] = useState<string[]>([]);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | string>(dayjs());

  useEffect(() => {
    if (data) {
      setUserList(data.users);
    }
  }, [data, userList]);

  const handleVisibilityDialog = () => {
    open ? setOpen(false) : setOpen(true);

    setTitleTask('');
    setAssignee(null);
    setEstimate(null);
    setTag([]);
    setDate(dayjs())

  };

  // handle name of a task
  const handlerChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    if (titleTask !== null) {
      setTitleTask(event.target.value);
    }
  };

  // handle the point_estimate of a task
  const handleChangeEstimate = (event: SelectChangeEvent) => {
    setEstimate(event.target.value as PointEstimate_type);
  };

  // handle labels of a task
  const handleChangeTag = (event: SelectChangeEvent<typeof tag>) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // handle the user assignee of a task
  const handleChangeUser = (event: SelectChangeEvent) => {
    setAssignee(event.target.value as string);
  };

  const handleChangeDate = (event: any) => {
    // setDate(dayjs(event).toISOString())
    setDate(event);
  };

  const getUserId = () => {
    const user = userList.filter((user) => user.fullName === assignee);
    return user[0].id
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createTaskInput = {
      assigneeId: getUserId(),
      dueDate: dayjs(date).toISOString(),
      name: titleTask,
      pointEstimate: estimate,
      status: Status.TODO,
      tags: tag,
    };

    createTask({
      variables: { input: createTaskInput },
    });

    handleVisibilityDialog();
  };

  return (
    <div>
      <IconButton
        onClick={handleVisibilityDialog}
        className="bg-primary-400 shadow-none hover:shadow-none hover:scale-90 w-[35px] h-[35px] focus-visible:focus:outline-none"
      >
        <i className="fa-solid fa-plus text-lg font-normal"></i>
      </IconButton>

      <Dialog open={open} onClose={() => {}} className="w-full">
        <div className="bg-neutral-300 rounded-none text-neutral-100 p-2">
          <DialogTitle className="bg-neutral-300">
            <input
              placeholder="Write Title"
              className="bg-neutral-300 focus:outline-none"
              value={titleTask}
              onChange={handlerChangeName}
            />
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <DialogContent className="bg-neutral-300 w-full sm:w-56 md:w-96">
              <div className="flex flex-col gap-4 p-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Estimate
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={estimate ? estimate : ''}
                    label="Estimate"
                    onChange={handleChangeEstimate}
                  >
                    {PointEstimate.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Label
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={tag}
                    onChange={handleChangeTag}
                    input={<OutlinedInput label="Label" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    style={{ zIndex: 9999 }}
                    defaultValue={[TaskTag[0]]}
                  >
                    {TaskTag.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={tag.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Assignee
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={assignee ? assignee : ''}
                    label="Assignee"
                    onChange={handleChangeUser}
                  >
                    {userList.map((item) => (
                      <MenuItem value={item.fullName} key={item.id}>
                        {item.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={date}
                        onChange={handleChangeDate}
                        label="Due date"
                        className="w-full"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </div>
            </DialogContent>

            <DialogActions className="bg-neutral-300">
              <Button
                variant="text"
                onClick={handleVisibilityDialog}
                className="mr-3"
              >
                <div className="capitalize font-normal text-base">Cancel</div>
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="bg-primary-400 disabled:opacity-50"
                disabled={titleTask === null || estimate === null || tag.length === 0 || assignee === null}
              >
                <div className="capitalize font-normal text-base">Create</div>
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
};
