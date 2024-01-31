import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";
import User, { UserDocument } from "../models/user.model";

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user: UserDocument | null = await User.findOne({ username });

        if (!user) {
          return done(undefined, false, {
            message: `username ${username} not found.`,
          });
        }

        const isMatch = await user.matchPassword(password);

        if (isMatch) {
          return done(undefined, user);
        } else {
          return done(undefined, false, {
            message: "Invalid email or password.",
          });
        }
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (req: Request, id: string, done: any) => {
  try {
    const user: UserDocument | null = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
