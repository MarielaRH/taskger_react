import Avatar from "@mui/material/Avatar";
interface Props {
  url: string | null;
  width: number;
}

export const Profile: React.FC<Props> = ({ url, width }) => {
  return (
    <Avatar
      alt="Remy Sharp"
      src={url ? url : require("../../public/img/profile.png")}
      sx={{ width: width, height: width }}
    />
  );
};
