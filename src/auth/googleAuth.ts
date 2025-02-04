import { Request, Response } from "express";
import fetch from "cross-fetch";
import { createToken } from "../token/jwtToken";
import userSchema from "../model/userSchema";

/**
 * Google Authentication Handler
 * This function handles Google OAuth login, creates or retrieves a user,
 * and sets a JWT token in an HTTP-only cookie.
 */

const GoogleAuth = async (req: Request, res: Response) => {
  try {
    const { tokenResponse } = req.body;

    // Validate the tokenResponse
    if (!tokenResponse) {
      return res
        .status(400)
        .json({ success: false, message: "Google access token is required." });
    }

    // Fetch user info from Google API
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse}`
    );

    // Check if the Google API request was successful
    if (!response.ok) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Google access token." });
    }

    const jsonRes = await response.json();

    // Check if the required fields are present in the Google response
    if (!jsonRes?.email || !jsonRes?.name) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data from Google." });
    }

    // Create or retrieve the user in the database
    let user = await userSchema.findOne({ email: jsonRes.email });

    if (!user) {
      // Create a new user if they don't exist
      user = new userSchema({
        email: jsonRes.email,
        password: "", // No password for Google-authenticated users
        name: jsonRes.name,
        picture: jsonRes.picture,
      });
      await user.save();
    }

    // Generate a JWT token for the user
    const accessToken = createToken(user);

    // Set the JWT token in an HTTP-only cookie
    res.cookie("FoodToken", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      sameSite: "none",
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Google authentication successful.",
    });
  } catch (err) {
    console.error("Error during Google authentication:", err);

    // Send a generic error response
    res.status(500).json({
      success: false,
      message: "An error occurred during Google authentication.",
    });
  }
};

export default GoogleAuth;
