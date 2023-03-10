import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

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
import { CREATE_TASK_MUTATION, TASKS_QUERY, UPDATE_TASK_MUTATION, USERS_TASKS_QUERY } from "../../utils/queries";
import { MenuProps, PointEstimate, StatusList, TaskTag } from "../../utils/constants";
import { Task, User } from "../../utils/interfaces";
import { PointEstimate_type, status_type } from "../../utils/types";

interface Props {
  showDialog: boolean;
  setOpen: (showDialog: boolean) => void;
  task: Task | null;
}

export const TasksForm: React.FC<Props> = ({ showDialog, setOpen, task }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [titleTask, setTitleTask] = useState<string>("");
  const [estimate, setEstimate] = useState<PointEstimate_type | null>(null);
  const [tag, setTag] = useState<string[]>([]);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | string>(dayjs());
  const [status, setStatus] = useState<string>("");

  // queries
  const { loading, error, data } = useQuery(USERS_TASKS_QUERY);

  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    update(cache, { data: { createTask } }) {
      const { tasks }: any = cache.readQuery({ query: TASKS_QUERY });
      if (tasks) {
        cache.writeQuery({
          query: TASKS_QUERY,
          data: {
            tasks: [createTask],
          },
        });
      }
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    update(cache, { data: { updateTask } }) {
      if (updateTask) {
        cache.modify({
          fields: {
            items(existingTask = [], { readField }) {
              return existingTask.map((task: any) => {
                if (readField("id", task) === data.updateItem.id) {
                  return data.updateItem;
                }
                return task;
              });
            },
          },
        });
      }
    },
  });


  useEffect(() => {
    if (data) {
      setUserList(data.users);
    }

    if (task) {
      setTitleTask(task.name);
      setEstimate(task.pointEstimate);
      setAssignee(task.assignee.fullName);
      setTag(task.tags);
      setDate(dayjs(task.dueDate));

      switch (task.status) {
        case StatusList[0].value:
          setStatus(StatusList[0].value);
          break;
        case StatusList[1].value:
          setStatus(StatusList[1].value);
          break;
        case StatusList[2].value:
          setStatus(StatusList[2].value);
          break;
        case StatusList[3].value:
          setStatus(StatusList[3].value);
          break;
        case StatusList[4].value:
          setStatus(StatusList[4].value);
          break;
      }
    }
  }, [data, userList, task]);

  const handleVisibilityDialog = () => {
    showDialog ? setOpen(false) : setOpen(true);

    setTitleTask("");
    setAssignee(null);
    setEstimate(null);
    setTag([]);
    setDate(dayjs());
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

  // handle the point_estimate of a task
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as status_type);
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
    return user[0].id;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!task) {
      const createTaskInput = {
        assigneeId: getUserId(),
        dueDate: dayjs(date).toISOString(),
        name: titleTask,
        pointEstimate: estimate,
        status: StatusList[0].value,
        tags: tag,
      };
      createTask({
        variables: { input: createTaskInput },
      });
    }else{
       const updateTaskInput = {
        id: task.id,
        assigneeId: getUserId(),
        dueDate: dayjs(date).toISOString(),
        name: titleTask,
        pointEstimate: estimate,
        status: status,
        tags: tag,
      };
      updateTask({
        variables: { input: updateTaskInput },
      });
    }

    handleVisibilityDialog();
  };

  return (
    <div>
      <Dialog open={showDialog} onClose={() => {}} className="w-full">
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
                    value={estimate ? estimate : ""}
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

                {task ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status ? status : ""}
                      label="Status"
                      onChange={handleChangeStatus}
                    >
                      {StatusList.map((item) => (
                        <MenuItem value={item.value} key={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
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
                    value={assignee ? assignee : ""}
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
                disabled={
                  titleTask === null ||
                  titleTask.length === 0 ||
                  estimate === null ||
                  tag.length === 0 ||
                  assignee === null
                }
              >
                <div className="capitalize font-normal text-base">{task ? 'Save Changes' : 'Create'}</div>
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
};
