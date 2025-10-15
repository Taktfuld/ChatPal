# 0xzero AI Discord Bot

AI-powered Discord bot that responds to messages using GPT-4o. Professional interface with concise, intelligent answers.

**Made by Taktfuld**

## Features

- 🤖 Smart AI responses powered by GPT-4o
- 💬 Concise answers by default (detailed when requested)
- 🎨 Professional OpenAI-style green interface
- 🔒 Admin-only setup commands
- ⚡ Fast and responsive

## How to Use

https://discord.com/oauth2/authorize?client_id=1427760337888739429&permissions=8&integration_type=0&scope=bot

### 1. Setup (Admins Only)

1. Invite the bot to your Discord server
2. In any channel, type: **`!setchannel`**
3. That channel is now your AI chat channel!

### 2. Chat with the Bot

- Type any message in the configured channel
- Bot responds with AI-powered answers
- Messages starting with **"?"** are ignored (for other bots)
- Want more detail? Say **"explain in detail"** or **"elaborate"**

### 3. Commands

- `!setchannel` - Configure AI chat in current channel
- `!purge <number>` - Delete messages (1-100)
- `!help` - Show help information

## Requirements

- Discord Bot Token (as `DISCORD_BOT_TOKEN` secret)
- OpenAI API access via Replit AI Integrations
- **Discord Bot Intents**: Enable both **Message Content Intent** and **Server Members Intent** in Discord Developer Portal
- **Discord Bot Permissions**: Enable **Manage Messages** permission for purge command to work

## Credits

**Made by Taktfuld** | Powered by GPT-4o
