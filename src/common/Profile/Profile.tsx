
import { Avatar } from "@material-tailwind/react";

interface Props {
  url: string | null
}

export const Profile: React.FC<Props> = ({url}) => {
  return (
    <Avatar src={url ? url : require("../../public/img/profile.png")} alt="avatar" variant="circular" size="sm" className="static" />
  )
}
