``` mermaid
graph TD
    A[theme.ts] -->|createTheme| B[ThemeProvider]
    B -->|Wraps| C[App]
    C -->|Provides theme context| D[Components]
    D -->|Uses theme via| E[MUI Components]
    D -->|Uses theme via| F[Custom Components]
```