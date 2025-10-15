# 0xzero AI Discord Bot

## Overview

0xzero is an AI-powered Discord bot that integrates OpenAI's GPT-4o model to provide intelligent, conversational responses in designated Discord channels. The bot features a professional interface with OpenAI-style green theming and offers admin-controlled channel configuration. Built with Discord.js v14 and the OpenAI SDK, it provides a streamlined chat experience with concise AI responses by default, expandable to detailed explanations when requested.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Structure

**Single-File Architecture**: The entire application logic resides in `index.js`, following a simple event-driven pattern suitable for lightweight Discord bots. This monolithic approach is appropriate given the bot's focused feature set and simplifies deployment.

### Bot Framework

**Discord.js v14**: Chosen as the primary Discord API wrapper, utilizing the modern Gateway Intents system for efficient event handling. The bot subscribes to:
- `Guilds` - Server information access
- `GuildMessages` - Message events
- `MessageContent` - Privileged intent for reading message text
- `GuildMembers` - Member information for permission checks

**Rationale**: Discord.js is the most mature and well-documented Node.js library for Discord bot development, with strong TypeScript support and active maintenance.

### AI Integration

**OpenAI SDK v6**: Direct integration with OpenAI's API using their official Node.js client. The implementation supports:
- Custom base URL configuration (allows switching to OpenAI-compatible providers)
- GPT-4o model as the primary inference engine
- Configurable API endpoints via environment variables

**Design Decision**: The bot uses a stateless conversation model (no conversation history persistence), treating each message as an independent query. This simplifies the architecture but limits multi-turn conversations.

**Alternatives Considered**:
- Conversation history tracking: Rejected to reduce complexity and memory usage
- Multiple AI provider support: Deferred; current architecture allows easy extension

### State Management

**In-Memory Channel Configuration**: The active AI channel is stored in a simple variable (`setupChannelId`). This approach has significant limitations:
- State is lost on bot restart
- Only supports one channel per bot instance across all servers
- No persistence layer

**Pros**: Zero dependencies, instant setup, minimal complexity
**Cons**: Not suitable for multi-server deployments, requires reconfiguration after restarts

**Future Consideration**: A database integration (SQLite, PostgreSQL, or MongoDB) would enable per-guild channel configuration and state persistence.

### Message Processing Pipeline

1. **Message Validation**: Filters bot messages, ensures guild context
2. **Command Detection**: Prefix-based command system (`!setchannel`, `!purge`, `!help`)
3. **Channel Verification**: Checks if message originates from configured AI channel
4. **Ignore Pattern**: Messages starting with "?" are skipped (multi-bot compatibility)
5. **AI Request**: Sends user message to OpenAI API
6. **Response Formatting**: Wraps AI response in Discord embeds with branding

### Security & Permissions

**Admin-Only Setup**: The `!setchannel` command requires administrator permissions to prevent unauthorized configuration changes.

**Message Deletion**: The `!purge` command includes validation (1-100 message limit) and proper permission checks to prevent abuse.

**API Key Security**: Credentials stored in environment variables, never exposed in code or version control.

### User Experience Design

**Embed-Based Responses**: All bot responses use Discord's `EmbedBuilder` with:
- Consistent OpenAI green color scheme (#10A37F)
- Branded footer ("0xzero AI • Made by Taktfuld")
- Timestamps for context
- Professional formatting

**Concise Response Strategy**: The system prompt (implied in AI configuration) emphasizes brief answers, with users able to request elaboration explicitly.

## External Dependencies

### Discord Platform
- **Discord API Gateway**: Real-time event streaming for messages and guild events
- **Discord Bot Token**: Authentication mechanism requiring bot setup in Discord Developer Portal
- **Required Privileged Intents**: Message Content intent must be enabled in bot settings

### OpenAI Service
- **API Endpoint**: `https://api.openai.com/v1` (configurable via `AI_INTEGRATIONS_OPENAI_BASE_URL`)
- **Authentication**: API key-based (`AI_INTEGRATIONS_OPENAI_API_KEY`)
- **Model**: GPT-4o (specified in code, not configurable without modification)
- **Compatibility**: Architecture supports OpenAI-compatible APIs through base URL override

### Runtime Environment
- **Node.js**: Requires v16.11.0+ (Discord.js requirement)
- **Environment Variables**: `.env` file for configuration management via `dotenv` package

### NPM Dependencies
- `discord.js` (^14.23.2): Discord API client library
- `openai` (^6.3.0): Official OpenAI API client
- `dotenv` (^17.2.3): Environment variable loader

### Deployment Considerations
- No database requirement (current implementation)
- Stateless architecture suitable for serverless deployment
- Single-process design (no clustering or worker threads)
- No external file storage or caching layer