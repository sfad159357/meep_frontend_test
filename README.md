```markdown
# Real-time Chat Room Application

A modern chat application built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended)
- Git

### Installation
```bash
git clone https://github.com/sfad159357/meep_frontend_test.git
cd meep_frontend_test
pnpm install
pnpm dev
```

The application will be available at `http://localhost:3001`

## Documentation Overview

The project includes several documentation files for different aspects:

> **Note**: For markdown files containing mermaid diagrams, it is recommended to use the VS Code extension "Markdown Preview Mermaid Support". Use shortcut Ctrl + Shift + V (Windows) or Cmd + Shift + V (Mac) to preview.

- [`checkList.md`](https://github.com/sfad159357/meep_frontend_test/blob/master/checkList.md): Detailed feature completion checklist and progress tracking
- [`landing.md`](https://github.com/sfad159357/meep_frontend_test/blob/master/landing.md): Application initialization and component tree flow documentation
- [`map.md`](https://github.com/sfad159357/meep_frontend_test/blob/master/map.md): Frontend architecture and project structure visualization
- [`theme.md`](https://github.com/sfad159357/meep_frontend_test/blob/master/theme.md): Theme system implementation and configuration details
- [`think.md`](https://github.com/sfad159357/meep_frontend_test/blob/master/think.md): Technical decisions and implementation rationale

For detailed information about specific aspects, please refer to these documentation files.

## Tech Stack & Design Decisions

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── chat-list/     # Chat list components
│   ├── chat-room/     # Chat room components
│   ├── message/       # Message components
│   ├── modal/         # Modal components
│   ├── user-info/     # User info components
│   └── layout/        # Layout components
├── pages/             # Next.js pages
├── store/             # Zustand state management
├── services/          # API and mock services
├── styles/            # Global styles and theme
├── types/             # TypeScript type definitions
└── constant/          # Constants and mock data
```

## Core Components

### Layout Component
- Consistent page structure
- Responsive design foundation
- Theme integration

### Message Component
- Multiple message type support
- Reaction functionality
- Timestamp display
- Sender information

### ChatList Component
- Conversation overview
- Last message display
- Timestamp integration
- User information display

### ChatRoom Component
- Message list integration
- Input handling
- Image upload support
- Reaction management

## Mock API Implementation

### Endpoints
- GET /conversations
- GET /messages?conversationId={id}
- POST /conversations/:id/messages/create
- POST /conversations/:id/messages/:messageId/reactions

## Performance Optimizations

- Image lazy loading
- Code splitting
- Component-level optimization
- State management efficiency
- Theme transition smoothing
- Responsive image handling

## Development Guidelines

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Follow component-based architecture
4. Implement proper error handling
5. Use image optimization
6. Maintain clean code structure

## Future Improvements

1. Real-time Features
   - WebSocket simulation
   - Message status tracking
   - Online presence

2. User Experience
   - Message search
   - Read receipts
   - Typing indicators

3. Technical Improvements
   - Backend integration
   - Error handling
   - Performance optimization
   - Group chat support 
```

You can update your `README.md` file with the above content to include the links to the specified markdown files.
