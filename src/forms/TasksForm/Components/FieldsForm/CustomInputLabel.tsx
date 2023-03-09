import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { TaskTag, User } from "../../../../common/GridTasks/GridsTasks.interfaces";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

export const CustomInputLabel = () => {
  const [tag, setTag] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tag>) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl>
      <InputLabel id="demo-multiple-checkbox-label">Label</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={tag}
        onChange={handleChange}
        input={<OutlinedInput label="Label" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        style={{ zIndex: 9999 }}
      >
        {TaskTag.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={tag.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
