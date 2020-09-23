# Status Bot
Status Bot is a slackbot for updating and checking a user's slack status.

## Prerequisites
- Have node, npm and ngrok installed
- Create a slack app and save credentials in .env
- Install the app on slack

## Getting started  
 - `npm install`
 - Create .env file with Slack tokens
 - `npm start`
 - `npm run public`
 - Create slack commands on api.slack website and set the request url to the ngrok url

## Commands
- **/home** - Sets status to Working from Home 🏠 
- **/office** - Sets status to In the Office 🏢
- **/vacation** - Sets status to On Vacation 🌴
- **/sick** - Sets status to Out Sick 🤒
- **/late** - Sets status to Running Late 🏃
- **/meeting** - Sets status to In a Meeting 🗓️
- **/lunch** - Sets status to Eating Lunch 🍕

## Todos
[See To Do list](todo.md)

