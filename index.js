import 'dotenv/config'

import app from "./src/app.js";
import ENV_CONFIG from "./src/config/env.config.js";
import { connectMongoose } from "./src/config/mongooseConfig.js";

const { port } = ENV_CONFIG;
console.log("port", port);


const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  connectMongoose();

});

server.on("error", (err) => {
  switch (err.code) {
    case "EACCES":
      console.error("Require elevated privileges..");
      return process.exit(1);
    case "EADDRINUSE":
      console.error(`${port} is already in use..`);
      return process.exit(1);
    default:
      throw err;
  }
});
