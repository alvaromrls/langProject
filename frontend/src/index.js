import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const domain = process.env.REACT_APP_VALIDATE_DOMAIN_URL;
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={client_id}
    redirectUri={window.location.origin}
    audience={`https://${domain}/api/v2/`}
  >
    <App />
  </Auth0Provider>
);
