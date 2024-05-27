import { Box } from "@mui/system";
import UserSectionHeader from "./UserSectionHeader";
import UserSectionsNavMenu from "./UserSectionsNavMenu";

export default function UserPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserSectionHeader />
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
        <UserSectionsNavMenu />
        <Box
          sx={{
            flex: 1,
            margin: 2,
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 3px 5px 2px rgba(128, 128, 128, 0.5)",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
