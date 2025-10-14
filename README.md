# Discord AI Chat Bot

A Discord bot that responds to messages in a designated channel using AI (ChatGPT).

## Features

- Responds to all messages in the setup channel
- Ignores messages that start with "?"
- Uses OpenAI GPT-4o-mini for intelligent responses
- Simple channel setup with `!setchannel` command

## Setup

1. Create a Discord bot at https://discord.com/developers/applications
   - Click "New Application" and give it a name
   - Go to "Bot" section and click "Add Bot"
   - Under "Privileged Gateway Intents", enable:
     - Message Content Intent
     - Server Members Intent
   - Copy your bot token (you'll need this)

2. Invite the bot to your server
   - Go to OAuth2 > URL Generator
   - Select scopes: `bot`
   - Select permissions: `Send Messages`, `Read Messages/View Channels`, `Read Message History`
   - Copy the generated URL and open it in your browser to invite the bot

3. Add your bot token as a secret (DISCORD_BOT_TOKEN)

## Usage

1. In any Discord channel, type `!setchannel` to set up that channel for AI chat
2. The bot will respond to all messages in that channel (except those starting with "?")
3. Messages starting with "?" are ignored by the bot

## How It Works

- The bot listens to all messages in the designated channel
- When a message is received (that doesn't start with "?"), it sends the message to OpenAI's GPT-4o-mini
- The AI response is sent back as a reply to the user's message
