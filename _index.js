import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import cookieparser from 'cookie-parser'
import bodyParser from 'body-parser'
import qs from 'qs'


const app = express();

// Set up Global configuration access
dotenv.config();

console.log(process.env.PORT)
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is up and running on ${PORT} ...`);
});

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

const userCredentials = {
    username: 'node-challenge',
    password: 'node-challenge123',
    email: 'node-challenge@gmail.com'
}

////Endpoint for access token
app.post('/login', (req, res) => {
  // Destructuring username & password from body
  const { username, password } = req.body;

  // Checking if credentials match
  if (username === userCredentials.username && 
      password === userCredentials.password) {
      
      //creating a access token
      const accessToken = jwt.sign({
          username: userCredentials.username,
          email: userCredentials.email
      }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10m'
      });
      // Creating refresh token not that expiry of refresh 
      //token is greater than the access token
      
      const refreshToken = jwt.sign({
          username: userCredentials.username,
      }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

      // Assigning refresh token in http-only cookie 
      res.cookie('jwt', refreshToken, { httpOnly: true, 
          sameSite: 'None', secure: true, 
          maxAge: 24 * 60 * 60 * 1000 });
      return res.json({ accessToken });
  }
  else {
      // Return unauthorized error if credentials don't match
      return res.status(406).json({ 
          message: 'Invalid credentials' });
  }
})


//Endpoint for refresh token 
app.post('/refresh', (req, res) => {
  console.log(req.cookies)
  if (req.cookies?.jwt) {
      // Destructuring refreshToken from cookie
      const refreshToken = req.cookies.jwt;

      // Verifying refresh token
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
      (err, decoded) => {
          if (err) {
              // Wrong Refesh Token
              return res.status(406).json({ message: 'Unauthorized' });
          }
          else {
              // Correct token we send a new access token
              const accessToken = jwt.sign({
                  username: userCredentials.username,
                  email: userCredentials.email
              }, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn: '10m'
              });
              return res.json({ accessToken });
          }
      })
  } else {
      return res.status(406).json({ message: 'Unauthorized' });
  }
})