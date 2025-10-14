# 0xzero AI Discord Bot

A professional Discord bot that responds to messages in a designated channel using AI (ChatGPT-4o).

## Features

- Responds to all messages in the setup channel with detailed, intelligent answers
- Ignores messages that start with "?"
- Uses **OpenAI GPT-4o** (premium model) for exceptional response quality
- Enhanced AI with comprehensive, well-structured answers and markdown formatting
- 2000 token limit for detailed responses
- Simple channel setup with `!setchannel` command

2. Invite the bot to your server
   - Go to OAuth2 > URL Generator
   - Select scopes: `bot`
   - Select permissions: `Send Messages`, `Read Messages/View Channels`, `Read Message History`
   - Copy the generated URL and open it in your browser to invite the bot


## Usage

1. In any Discord channel, type `!setchannel` to set up that channel for AI chat
2. The bot will respond to all messages in that channel (except those starting with "?")
3. Messages starting with "?" are ignored by the bot

## How It Works

- The bot listens to all messages in the designated channel
- When a message is received (that doesn't start with "?"), it sends the message to OpenAI's GPT-4o-mini
- The AI response is sent back as a reply to the user's message
