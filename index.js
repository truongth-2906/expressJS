const express = require("express")
const route = require("./src/routes");
const path = require("path");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { trim_all } = require("request_trimmer");
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const { io } = require("./socket.js");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "src/public")));

let redisClient = redis.createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

app.locals.moment = require('moment');

app.use(
  session({
    // store: redisStore,
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: parseInt(process.env.COOKIE_MAX_AGE),
      secure:
        process.env.COOKIE_SECURE === "false"
          ? false
          : !!process.env.COOKIE_SECURE,
      sameSite:
        process.env.COOKIE_SAME_SITE === "false"
          ? false
          : process.env.COOKIE_SAME_SITE,
    },
  })
);
app.use(express.static(path.join(__dirname, "src/uploads")));

app.set("trust proxy", "loopback");
app.set("views", [path.join(__dirname, "/src/views")]);
app.set("view engine", "pug");
app.use(trim_all);

route(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App is now running at port ", port);
});

// socket
const socketPort = process.env.SOCKET_PORT || 3000;

io.listen(socketPort);

// cronjob

const rewardArena = require("./src/cronjob/RewardArena");
rewardArena.cron.start();
