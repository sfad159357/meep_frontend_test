``` mermaid
graph TD
    A[Browser Request] --> B[Next.js Server]
    B --> C[pages/_app.tsx]
    C --> D[ThemeProvider from _app.tsx]
    D --> E[CssBaseline]
    E --> F[pages/index.tsx]
    F --> G[layout/Layout.tsx]
    
    subgraph Application Wrapper
        C
        D[ThemeProvider]
        E
    end
    
    subgraph Layout Structure
        G --> H[Header]
        G --> I[Main Content]
    end
    
    subgraph Main Content
        I --> J[ChatList Component]
        J --> K[Chat Store]
    end

   
```

