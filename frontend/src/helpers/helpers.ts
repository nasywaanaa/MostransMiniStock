import { TokenResponse, UserLoginResponse } from "../lib/interface.tsx";

const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const unixToDate = (unix: string) => {
  const date = new Date(Number(unix));

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};

async function getLatestToken(): Promise<TokenResponse | null> {
  const query = `
      query GetLatestToken {
          getLatestToken {
              data {
                  token,
                  id,
                  timeout
              }
              response {
                  status
              }
              expired
          }
      }
  `;

  try {
    const response = await fetch(backendURL + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    return result.data.getLatestToken;
  } catch (error) {
    console.error("Error fetching latest token:", error);
    return null;
  }
}

async function userLogin(
  email: string,
  password: string
): Promise<UserLoginResponse | null> {
  const query = `
      query UserLogin($email: String, $password: String) {
          userLogin(email: $email, password: $password) {
              data {
                  id,
                  email,
                  nama,
                  token
              }
              response {
                  status
              }
          }
      }
  `;

  const variables = { email, password };

  try {
    const response = await fetch(backendURL + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    return result.data.userLogin;
  } catch (error) {
    console.error("Error during user login:", error);
    return null;
  }
}

export async function getToken(
  email: string,
  password: string
): Promise<string | null> {
  const latestTokenResponse = await getLatestToken();

  if (
    latestTokenResponse &&
    !latestTokenResponse.expired &&
    latestTokenResponse.data !== null
  ) {
    return latestTokenResponse.data[0].token;
  } else {
    const userLoginResponse = await userLogin(email, password);
    if (userLoginResponse) {
      return userLoginResponse.data.token;
    }
  }

  return null;
}
