# 0xzero AI Discord Bot

## Overview

An AI-powered Discord bot that provides intelligent, concise responses to user messages using OpenAI's GPT-4o model. The bot features a professional interface with OpenAI-style green embeds, admin-controlled channel configuration, and message management capabilities. Built with Discord.js v14 and the OpenAI SDK, this bot enables seamless AI conversations within designated Discord channels.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Framework Architecture
- **Discord.js v14**: Core bot framework handling Discord API interactions
- **Gateway Intents**: Configured for Guilds, GuildMessages, MessageContent, and GuildMembers to enable full message processing and server member access
- **Event-driven architecture**: Uses Discord.js event listeners (`ready`, `messageCreate`) for handling bot lifecycle and user interactions

### AI Integration Layer
- **OpenAI SDK v6.3.0**: Official OpenAI client library for GPT-4o model access
- **Configurable endpoint**: Supports custom OpenAI base URLs via environment variable, enabling compatibility with OpenAI-compatible APIs or proxies
- **Model selection**: Uses GPT-4o for generating responses (configurable in code)
- **Response optimization**: System prompts configured to deliver concise answers by default, with ability to provide detailed responses when explicitly requested

### State Management
- **In-memory channel configuration**: Single-channel setup stored in `setupChannelId` variable
- **Trade-off**: Simple implementation suitable for single-server deployments, but state is lost on bot restart
- **Alternative consideration**: Could use persistent storage (database/file) for multi-server support and state persistence across restarts

### Command System
- **Prefix-based commands**: Uses `!` prefix for bot commands
- **Command types**:
  - `!setchannel`: Admin-only channel configuration
  - `!purge <number>`: Message deletion (1-100 messages)
  - `!help`: User guidance
- **Permission handling**: Leverages Discord.js PermissionFlagBits for admin verification and message management permissions

### Message Processing Flow
1. **Filter layer**: Ignores bot messages and DMs
2. **Command router**: Processes prefix commands first
3. **Channel validation**: Only responds to messages in configured channel
4. **Ignore pattern**: Messages starting with "?" are skipped (for compatibility with other bots)
5. **AI processing**: Eligible messages are sent to OpenAI for response generation
6. **Response delivery**: AI responses delivered via rich embeds with consistent branding

### UI/UX Design
- **Embed-based interface**: All bot responses use Discord embeds for professional presentation
- **Brand color**: OpenAI green (#10A37F) for consistent visual identity
- **Structured responses**: Embeds include titles, descriptions, footers, and timestamps
- **Error handling**: User-friendly error messages delivered through embeds

## External Dependencies

### Required Services
- **Discord Bot**: Requires Discord application with bot token
  - Gateway intents: Message Content Intent and Server Members Intent must be enabled
  - Permissions: Manage Messages permission required for purge functionality
  
- **OpenAI API**: GPT-4o model access via OpenAI API or compatible endpoint
  - API key authentication required
  - Supports custom base URLs for proxy/alternative endpoints

### Environment Variables
- `DISCORD_BOT_TOKEN`: Discord bot authentication token
- `AI_INTEGRATIONS_OPENAI_API_KEY`: OpenAI API authentication key
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: OpenAI API endpoint URL (enables custom endpoints)

### NPM Dependencies
- **discord.js** (^14.23.2): Discord API client library with full TypeScript support
- **openai** (^6.3.0): Official OpenAI API client with streaming and error handling capabilities

### Runtime Requirements
- **Node.js**: Version 16.11.0 or higher (requirement from discord.js)
- **Network**: Outbound HTTPS access to Discord Gateway and OpenAI API endpoints