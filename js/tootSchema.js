const mongoose = require("mongoose");
const {Schema} = mongoose;

const mediaAttachmentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  preview_url: { type: String, required: true },
  remote_url: String,
  text_url: String,
  meta: {
    original: {
      width: Number,
      height: Number,
      size: String,
      aspect: Number,
    },
    small: {
      width: Number,
      height: Number,
      size: String,
      aspect: Number,
    },
    focus: {
      x: Number,
      y: Number,
    },
  },
  description: String,
  blurhash: String,
});

const tootSchema = new mongoose.Schema({
  event: String,
  data: {
    id: String,
    created_at: Date,
    in_reply_to_id: String,
    in_reply_to_account_id: String,
    sensitive: Boolean,
    spoiler_text: String,
    visibility: String,
    language: String,
    uri: String,
    url: String,
    replies_count: Number,
    reblogs_count: Number,
    favourites_count: Number,
    edited_at: Date,
    content: String,
    reblog: String, // Assuming reblog is a string
    application: {
      name: String,
      website: String,
    },
    account: {
      id: String,
      username: String,
      acct: String,
      display_name: String,
      locked: Boolean,
      bot: Boolean,
      discoverable: Boolean,
      group: Boolean,
      created_at: Date,
      note: String,
      url: String,
      avatar: String,
      avatar_static: String,
      header: String,
      header_static: String,
      followers_count: Number,
      following_count: Number,
      statuses_count: Number,
      last_status_at: Date,
      noindex: Boolean,
      emojis: [String], // Assuming emojis is an array of strings
      roles: [String], // Assuming roles is an array of strings
      fields: [
        {
          name: String,
          value: String,
          verified_at: Date,
        },
      ],
    },
    media_attachments: [mediaAttachmentSchema], 
    mentions: [
      {
        id: String,
        username: String,
        url: String,
        acct: String,
      },
    ], // Assuming mentions is an array of strings
    tags: [String], // Assuming tags is an array of strings
    emojis: [String], // Assuming emojis is an array of strings
    favourited: Boolean,
    reblogged: Boolean,
    muted: Boolean,
    bookmarked: Boolean,
    pinned: Boolean,
  },
});

const Toot = mongoose.model("Toot", tootSchema);

module.exports = Toot;
