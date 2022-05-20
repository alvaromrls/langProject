import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Logout from "./Logout";
import Login from "./Login";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

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
            <Avatar alt={user.name} src={user.picture} />
            <h2>{user.name}</h2>
            <Logout />
          </>
        ) : (
          <Login />
        )}
      </Stack>
      {isLoading && <h2> LOADING</h2>}
    </>
  );
};

export default Profile;
