import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { User } from '../../../../common/GridTasks/GridsTasks.interfaces';
interface Props {
  items: PointEstimate[];
  name: string;
}

interface PointEstimate {
  value: string;
  label: string;
}
export const InputSelect: React.FC<Props> = ({ items, name }) => {
  const [estimate, setEstimate] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setEstimate(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={estimate}
        label={name}
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem value={item.label} key={item.value }>{item?.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
