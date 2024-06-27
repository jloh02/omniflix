"use client";
import { USER_PUBLIC_PROFILE_PAGE_ROUTE } from "@/utils/constants";
import { Tooltip, Button } from "@mui/material";
import Link from "next/link";

interface ViewProfileButtonProps {
  username: string;
}

const ViewProfileButton: React.FC<ViewProfileButtonProps> = ({ username }) => {
  const profilePageRoute = `${USER_PUBLIC_PROFILE_PAGE_ROUTE}/${username}`;

  return (
    <Link href={profilePageRoute}>
      <Tooltip title="View Profile">
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "grey !important",
            "&:hover": {
              backgroundColor: "dimgrey !important",
            },
          }}
        >
          View Profile
        </Button>
      </Tooltip>
    </Link>
  );
};

export default ViewProfileButton;
