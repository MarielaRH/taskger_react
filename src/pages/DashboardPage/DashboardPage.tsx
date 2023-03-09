import { ActionsBar } from "../../common/ActionsBar/ActionsBar";
import { GridTasks } from "../../common/GridTasks/GridTasks";
import { SearchBar } from "../../common/SearchBar/SearchBar";

export const DashboardPage = () => {
  return (
    <div className="bg-neutral-500 w-full h-full flex flex-col text-neutral-100">
        <SearchBar />
        <ActionsBar />
      <div className="h-full overflow-auto">
        <GridTasks />
      </div>
    </div>
  );
};
