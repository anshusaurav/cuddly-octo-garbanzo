//CREATE SLACK API
const { WebClient } = require("@slack/web-api");
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);
const bot = {};

//MESSAGE WHEN SERVER STARTS
bot.connect = (req, res) => {
  res.json(`Connected on port ${process.env.PORT}`);
}

//RESPONDS TO SPECIFIC MESSAGES
bot.bot_message = function (req, res) {
  console.log('POST MSG')
  // let type = req.body.event.type;
  let { text, channel } = req.body.event;
  // web.chat.postMessage({
  //   text,
  //   channel
  // }).then((response) => {
  //   res.json({ response });
  // })
  web.conversations.join({ channel }).then((res1) => {
    console.log(res1);
    web.conversations.members({ channel }).then((response) => {
      let requests = response.members.map(member => web.chat.postMessage({ text, channel: member, as_user: true }));
      Promise.all(requests)
        .then(res => res.forEach((resp) => console.log(resp)));
    });
  })


};
// (async () => {
//   console.log("inside async");
//   const test = await web.chat.postMessage({
//     text: response,
//     // reply_broadcast: false,
//     as_user: false,
//     username: "jokebot",
//     channel: channelId
//   });
//   res.json({ test });
// })();



module.exports = bot
