import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "@/models/user.model";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const profilePicture = profile.photos?.[0].value;

        if (!email) {
          return done(new Error("No email from Google"), undefined);
        }

        let user = await User.findOne({
          authProvider: "google",
          providerId: profile.id,
        });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            authProvider: "google",
            providerId: profile.id,
            profilePicture,
            isEmailVerified: true,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    },
  ),
);
