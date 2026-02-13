# Google Forms Lite

Simple Google Forms clone. React + TypeScript frontend, GraphQL backend.

## Setup

Node.js 18+ required.

```bash
npm run install:all
```

## Running

Both client and server:

```bash
npm run dev
```

- Server: `http://localhost:4000/graphql`
- Client: `http://localhost:3000`

Or separately:

```bash
npm run dev:server  # server only
npm run dev:client  # client only
```

**Note**: If running client separately, make sure server is running on port 4000.

## Build

```bash
npm run build
```

## Notes

- In-memory storage (data lost on server restart)
- No authentication
- Basic form validation
