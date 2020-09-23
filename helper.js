const { WebClient } = require("@slack/web-api");
const token = process.env.SLACK_AUTH_TOKEN;
const web = new WebClient(token);
const helper = {};

helper.fetchUserStatus = async function(userId) {
  const info = await web.users.info({
    user: userId
  });
  return info.user;
};

module.exports = helper;
