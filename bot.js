const Mastodon = require("mastodon-api");
const {connect} = require('./js/connect.js'); // Assuming `connect.js` exports the connect function
const Toot = require("./js/tootSchema");
require("dotenv").config();

const accessToken = process.env.ACCESS_TOKEN;
const userId = process.env.USER_ID;

console.log("reading-bot started...");

const M = new Mastodon({
  access_token: accessToken,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  api_url: "https://mastodon.xyz/api/v1/",
});

async function main() {
  try {
    await connect(); // Wait for MongoDB connection to be established

    const listener = M.stream("streaming/user");

    listener.on("message", async (msg) => {
      try {
        // record your toots
        if (
          msg.data.visibility == "public" &&
          msg.event == "update" &&
          msg.data.account.id === userId
        ) {
          const newToot = new Toot(msg);
          await newToot.save(); // Wait for the document to be saved
          console.log('Document inserted successfully');
          console.log('Inserted document ID:', newToot._id);
        }
      } catch (error) {
        console.error(error);
      }
    });

    listener.on("error", (err) => console.log(err));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

main();

