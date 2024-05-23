import { FRIENDS_ROUTE, PROFILE_PAGE_ROUTE } from "@/utils/constants";
import { ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import Link from "next/link";

export default async function UserSectionsNavMenu() {
  return (
    <MenuList
      sx={{ margin: 2, backgroundColor: "grey", borderRadius: 2, width: 200 }}
    >
      <Link href={PROFILE_PAGE_ROUTE}>
        <MenuItem>
          <ListItemText>Basic Info</ListItemText>
        </MenuItem>
      </Link>
      <Link href={FRIENDS_ROUTE}>
        <MenuItem>
          <ListItemText>Friends</ListItemText>
        </MenuItem>
      </Link>
    </MenuList>
  );
}
