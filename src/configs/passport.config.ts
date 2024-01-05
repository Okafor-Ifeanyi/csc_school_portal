import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Admin from "../models/admin.model";

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err: NativeError, user: any) => done(err, user));
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await Admin.findOne({ email: email.toLowerCase() });

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
