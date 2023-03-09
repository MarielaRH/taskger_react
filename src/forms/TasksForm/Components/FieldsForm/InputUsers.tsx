import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { User } from "../../../../common/GridTasks/GridsTasks.interfaces";
import { useEffect } from 'react';

interface Props {
  items: User[];
  name: string;
}

export const InputUsers: React.FC<Props> = ({ items, name }) => {
  const [user, setUser] = React.useState("");

  console.log(items);

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={user}
        label={name}
        onChange={handleChange}
      >
         {items.map((item) => (
          <MenuItem value={item.fullName} key={item.id }>{item.fullName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
