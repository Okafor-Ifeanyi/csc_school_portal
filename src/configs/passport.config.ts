import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Admin, { AdminDocument } from "../models/admin.model";
import { Request } from "express";

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user: AdminDocument | null = await Admin.findOne({
          email: email.toLowerCase(),
        });
        console.log(user);
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`,
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
    const user: AdminDocument | null = await Admin.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
