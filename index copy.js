const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var axios = require('axios');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
var qs = require('qs');

const app = express();

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is up and running on ${PORT} ...`);
});


app.get('/', (req, res) => {
  res.send('Main2')
})

//////////////
// Main Code Here //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
	// Validate User Here
	// Then generate JWT Token

	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	let data = {
		time: Date(),
		userId: 12,
	}

	const token = jwt.sign(data, jwtSecretKey);

	res.send(token);
});


app.get('/movies', function(req, res) {
    

    res.render(__dirname + "/views/text.html");
  
  });
  
// Verification of JWT
app.get("/user/validateToken", (req, res) => {
	// Tokens are generally passed in header of request
	// Due to security reasons.

	let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		const token = req.header(tokenHeaderKey);

		const verified = jwt.verify(token, jwtSecretKey);
		if(verified){
			return res.send("Successfully Verified");
		}else{
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
		return res.status(401).send(error);
	}
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

app.post('/refresh', (req, res) => {
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

/////////////////

var config = {
  method: 'post',
  url: 'http://localhost:5000/user/generateToken',
  headers: { }
};

//Request POST asking for Bearer token
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//Request GET Verifying the token
config = {
    method: 'get',
    url: 'http://localhost:5000/user/validateToken',
    headers: { 
      'gfg_token_header_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE9jdCAyMCAyMDIyIDAxOjM0OjA3IEdNVC0wMzAwIChob3JhIGVzdMOhbmRhciBkZSBBcmdlbnRpbmEpIiwidXNlcklkIjoxMiwiaWF0IjoxNjY2MjQwNDQ3fQ.0lklSXTzXhTrcMKH6vXyx5KqBdJZYLldaRm7UC72gYs'
    }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  
////////////////////////

//Request POST for refresh access token
var data = qs.stringify({
    'username': 'node-challenge',
    'password': 'node-challenge123' 
  });
  var config = {
    method: 'post',
    url: 'http://localhost:5000/login',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  