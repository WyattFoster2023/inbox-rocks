// Gmail OAuth and API interaction service

// OAuth configuration
const CLIENT_ID = import.meta.env.VITE_GMAIL_CLIENT_ID || "";
const REDIRECT_URI =
  import.meta.env.VITE_GMAIL_REDIRECT_URI ||
  window.location.origin + "/success";
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

// Generate OAuth URL for Gmail login
export const getGmailAuthUrl = () => {
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.append("client_id", CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("scope", SCOPES.join(" "));
  authUrl.searchParams.append("access_type", "offline");
  authUrl.searchParams.append("prompt", "consent");

  return authUrl.toString();
};

// Exchange authorization code for tokens
export const exchangeCodeForTokens = async (code: string) => {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: import.meta.env.VITE_GMAIL_CLIENT_SECRET || "",
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to exchange code: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    throw error;
  }
};

// Get user profile information
export const getUserProfile = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Refresh access token when it expires
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: import.meta.env.VITE_GMAIL_CLIENT_SECRET || "",
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
