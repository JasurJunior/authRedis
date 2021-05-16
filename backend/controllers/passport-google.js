import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '1099394884269-8fsp8ehm4tt9jafem7t40nrerj2n994l.apps.googleusercontent.com',
      clientSecret: 'MDTciRVgt4sc3kkliBwndaM5',
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile)
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
