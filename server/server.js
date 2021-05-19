require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("../config.js");
const { OAuth2Client } = require("google-auth-library");
const knex = require("knex")({
  client: "mysql",
  version: "8.0",
  connection: {
    database: "SimpleReactApp",
    host: "127.0.0.1",
    user: "root",
    password: config.DB_PASS,
  },
});

// https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=accessToken
// if invalid, it will give "error": "invalid_token"
// if valid, it will give issued_to, audience, user_id, scope, expires_in, email, verified_email, access_type

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const server = express();

function loginAccount(body, ticket, res) {
  const { email } = ticket.getPayload();
  knex("users")
    .select("*")
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        if (body.googleId === data[i].googleid) {
          // If account already exists, login
          res.send(data[i]);
          //cookies.set(accessToken, )
          break;
        } else if (i === data.length - 1) {
          // Else create new account
          createAccount(body, email, res);
        }
      }
    });
}

function createAccount(body, email, res) {
  knex("users")
    .insert([
      {
        googleid: body.googleId,
        email: email,
      },
    ])
    .then(function () {
      console.log("New Account: " + email);
      // Immediately login after creating account
      knex("users")
        .select("*")
        .then(function (data) {
          res.send(data[data.length - 1]);
        });
    });
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());

server.get("/users", (req, res) => {
  res.json({ message: "Test" });
});

server.post("/google-login", async (req, res) => {
  var body = req.body;
  //console.log(req.cookies);
  //console.log(body); token + googleid
  // Verify and decode token
  const ticket = await client.verifyIdToken({
    idToken: body.token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  loginAccount(body, ticket, res);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
