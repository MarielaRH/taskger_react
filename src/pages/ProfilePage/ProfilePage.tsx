import { Profile } from "../../common/Profile/Profile";
import { useQuery } from "@apollo/client";
import { PROFILE_QUERY } from "../../utils/queries";
import { User } from "../../utils/interfaces";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const { data } = useQuery(PROFILE_QUERY);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (data) {
      setUser(data.profile);
    }
  }, [data]);
  return (
    <div className="h-full w-full flex flex-col rounded-2xl relative">
      <div className="h-2/6 background-profile rounded-t-2xl"></div>
      <div className="h-4/6 bg-neutral-400 rounded-b-2xl"></div>
      <div className="bg-neutral-500/20 w-full h-full absolute flex flex-col justify-center items-center text-neutral-100">
        <Profile width={225} url={user?.avatar ? user.avatar : null} />
        <p className="p-5 mt-8 mb-3 bg-neutral-100/5 rounded-md min-w-[300px]">{user?.fullName}</p>
        <p className="p-5 mb-3 bg-neutral-100/5 rounded-md min-w-[300px]">{user?.email}</p>
        <p className="p-5 mb-3 bg-neutral-100/5 rounded-md min-w-[300px]">{user?.type}</p>
      </div>
    </div>
  );
};
