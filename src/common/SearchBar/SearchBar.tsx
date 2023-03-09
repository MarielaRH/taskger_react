import { ChangeEvent, useState } from "react";
import { Profile } from "../Profile/Profile";

export const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const handlerChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    // if input's value is valid, update the state
    if (keyword !== null) {
      setKeyword(event.target.value);
    }
  };
  return (
    <div className="flex justify-between py-[12px] px-[22px] bg-neutral-400 rounded-[16px]">
      <div className="flex items-center">
        <img
          src={require("../../public/img/search.png")}
          alt="search icon"
          width={18}
          className="mr-4"
        />
        <input
          placeholder="Search"
          className="bg-neutral-400 focus:outline-none"
          value={keyword}
          onChange={handlerChangeInput}
        />
      </div>

      <div className="flex items-center">
        <img
          src={require("../../public/img/bell.png")}
          alt="search icon"
          width={18}
          className="mr-4 cursor-pointer"
        />
        <Profile url={null}/>
      </div>
    </div>
  );
};
