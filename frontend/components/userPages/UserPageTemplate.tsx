import { Box } from "@mui/system";
import UserInfoHeader from "./UserInfoHeader";
import UserSectionsNavMenu from "./UserSectionsNavMenu";
import getUserAccountInfo from "@/utils/database/userProfile/getUserAccountInfo";

interface UserPageTemplateProps {
  children: React.ReactNode;
}

const UserPageTemplate: React.FC<UserPageTemplateProps> = async ({
  children,
}) => {
  const userInfo = await getUserAccountInfo();
  return (
    <>
      <UserInfoHeader
        name={userInfo.name}
        username={userInfo.username}
        bio={userInfo.bio ?? ""}
      />
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
};

export default UserPageTemplate;
