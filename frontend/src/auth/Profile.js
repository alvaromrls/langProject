import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Logout from "./Logout";
import Login from "./Login";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { margin } from "@mui/system";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Profile = (props) => {
  const { handleLogin } = props;
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims,
    isLoading,
  } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        // console.log(accessToken);
        const ID = await getIdTokenClaims({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(ID);
        handleLogin(ID, accessToken);
      } catch (e) {
        console.log("ERROR!!! ", e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, handleLogin, getIdTokenClaims]);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 5 }}
      >
        {isAuthenticated ? (
          <>
            <Button variant="outlined" disable="true">
              <Avatar alt={user.name} src={user.picture} />
              <Div>{user.name}</Div>
            </Button>
            <Logout />
          </>
        ) : (
          <Login />
        )}
      </Stack>
      {isLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <CircularProgress size={100} justifyContent="center" />
        </div>
      )}
    </>
  );
};

export default Profile;
