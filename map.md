```mermaid
graph TD
    subgraph Frontend Architecture
        A[Pages] --> B[Components]
        B --> C[Shared Components]
        B --> D[Features]
        
        subgraph Pages
            A1[index.tsx - Chat List]
            A2[chat/[id].tsx - Chat Room]
        end

        subgraph Components
            C1[Layout]
            C2[ChatList]
            C3[ChatRoom]
            C4[MessageInput]
            C5[Message]
            C6[UserInfo]
        end

        subgraph Features
            D1[Message Types]
            D2[Reactions]
            D3[Image Upload]
        end

        subgraph State Management
            E1[Zustand Store]
            E2[Chat Store]
            E3[User Store]
        end

        subgraph Types
            F1[Message]
            F2[User]
            F3[Reaction]
            F4[Chat]
        end
    end

    B --> E1
    D --> E1
```

## Project Structure

```
project_b/
├── src/
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── chat/
│   │   │   └── [id].tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── chat-list/
│   │   │   ├── chat-room/
│   │   │   ├── message/
│   │   │   └── user-info/
│   │   ├── features/
│   │   │   ├── message-types/
│   │   │   ├── reactions/
│   │   │   └── image-upload/
│   │   ├── store/
│   │   │   ├── chat.ts
│   │   │   └── user.ts
│   │   └── types/
│   │       ├── message.ts
│   │       ├── user.ts
│   │       └── chat.ts
│   ├── public/
│   │   └── assets/
│   ├── styles/
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── README.md
``` 