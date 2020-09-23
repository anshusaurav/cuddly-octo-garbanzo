//CREATE SLACK API
const { WebClient } = require("@slack/web-api");
const token = process.env.SLACK_AUTH_TOKEN;
const web = new WebClient(token);
const slash = {};

//UPDATES SLACK STATUS BASED OFF SLASH COMMANDS
slash.slash_command = (req, res) => {
  let command = req.body.command;
  let status, emoji, help;
  let userName = req.body.user_name;
  let userId = req.body.user_id;
  let channelId = req.body.channel_id;
  console.log(`${userName} has requested ${command}`);

  switch (command) {
    case "/options":
      help = true;
      break;
    case "/home":
      status = "Working from Home";
      emoji = ":house:";
      break;
    case "/office":
      status = "In the Office";
      emoji = ":office:";
      break;
    case "/vacation":
      status = "On Vacation";
      emoji = ":palm_tree:";
      break;
    case "/sick":
      status = "Out Sick";
      emoji = ":face_with_thermometer:";
      break;
    case "/late":
      status = "Running Late";
      emoji = ":runner:";
      break;
    case "/meeting":
      status = "In a Meeting";
      emoji = ":spiral_calendar_pad:";
      break;
    case "/fox":
      status = "Being a Fox";
      emoji = ":thefox:";
      break;
    case "/lunch":
      status = "Eating Lunch";
      emoji = ":pizza:";
      break;
    case "/marc":
      status = "On a Call";
      emoji = ":slack_call:";
      break;
    case "/out":
      status = "Out of Office";
      emoji = ":door:";
      break;
    case "/parent":
      status = "Being a Parent";
      emoji = ":man-woman-girl-boy:";
      break;
    default:
      help = true;
  }

  (async () => {
    if (help) {
      const error = await web.chat.postEphemeral({
        attachments: [
          {
            text: "You can set your status using the following commands",
            actions: [
              {
                name: "status",
                text: "home",
                type: "button",
                value: "/home",
                action_id: "/home"
              },
              {
                name: "status",
                text: "office",
                type: "button",
                value: "/office"
              },
              {
                name: "status",
                text: "vacation",
                type: "button",
                value: "/vacation"
              },
              {
                name: "status",
                text: "sick",
                type: "button",
                value: "/sick"
              },
              {
                name: "status",
                text: "late",
                type: "button",
                value: "/late"
              },
              {
                name: "status",
                text: "meeting",
                type: "button",
                value: "/meeting"
              }
            ]
          }
        ],
        channel: channelId,
        //text: "You can set your status using the following commands",
        user: userId,
        reply_broadcast: false,
        as_user: false,
        username: "Status Bot"
      });
    } else {
      const result = await web.users.profile.set({
        profile: {
          status_text: status,
          status_emoji: emoji,
          status_expiration: 0
        }
      });

      const success = await web.chat.postEphemeral({
        attachments: [{ text: `${emoji} *${status}*` }],
        channel: channelId,
        text: "You changed your status to",
        user: userId,
        reply_broadcast: false,
        as_user: false,
        username: "Status Bot"
      });
    }
    res.json();
  })();
};



module.exports = slash;
