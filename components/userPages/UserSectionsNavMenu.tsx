import { PROFILE_PAGE_ROUTE } from "@/utils/constants";
import { ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import Link from "next/link";

export default async function UserSectionsNavMenu() {
  return (
    <MenuList
      sx={{ margin: 2, backgroundColor: "grey", borderRadius: 2, width: 200 }}
    >
      <MenuItem>
        <Link href={PROFILE_PAGE_ROUTE}>
          <ListItemText>Basic Info</ListItemText>
        </Link>
      </MenuItem>
    </MenuList>
  );
}
