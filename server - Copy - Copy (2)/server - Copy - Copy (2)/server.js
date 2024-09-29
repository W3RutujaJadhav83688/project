const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const utils = require("./utils");
const jwt = require("jsonwebtoken");
const config = require("./config");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use((request, response, next) => {
  if (request.url == "/user/signin" ||
      request.url == "/user/signup"
  ) {
    next();
  } else {
    const token = request.headers["token"];
    if (!token || token.length == 0) {
      response.send(utils.createError("Missing token"));
    } else {
      try {
        const payload = jwt.verify(token, config.secret);

        request.user = payload;
        next();
      } catch (ex) {
        response.send(utils.createError("Invalid token"));
      }
    }
  }
});

const userRouter = require('./routes/user')
const employeeRouter = require ('./routes/employee')

app.use('/user', userRouter)
app.use('/employee',employeeRouter)

app.listen(9000, () => {
  console.log(`server started on port 9000`);
});
