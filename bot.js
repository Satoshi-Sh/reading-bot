const Mastodon = require("mastodon-api");
const fs = require("fs");
const connectDB = require("./js/connect.js");
const Toot = require("./js/tootSchema");

require("dotenv").config();

const accessToken = process.env.ACCESS_TOKEN;
const userId = process.env.USER_ID;
console.log("reading-bot started...");
const db = connectDB();

const M = new Mastodon({
  access_token: accessToken,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  api_url: "https://mastodon.xyz/api/v1/",
});

const listener = M.stream("streaming/user");

listener.on("message", (msg) => {
  try {
    // record your toots
    console.log("working?");
    console.log(userId, msg);
    if (
      msg.data.visibility == "public" &&
      msg.event == "update" &&
      msg.data.account.id === userId
    ) {
      const newToot = new Toot(msg);
      newToot
        .save()
        .then(() => {
          console.log("Toot saved successfully");
        })
        .catch((err) => {
          console.error(`Failed to save toot:` + err);
        });
      console.log("Data written to the database successfully.");
    }
  } catch (error) {
    console.error("Error writing to file:", error);
  }
});

listener.on("error", (err) => console.log(err));
