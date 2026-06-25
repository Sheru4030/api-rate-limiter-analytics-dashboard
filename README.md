# API Rate Limiter Analytics Dashboard

A full-stack Next.js application that simulates OTP requests, applies a custom sliding-window rate limiter, stores analytics in MongoDB Atlas, and visualizes request activity in a responsive dashboard.

## Project Overview

This project demonstrates how an OTP endpoint can be protected from excessive requests using a custom rate-limiting mechanism. The application allows up to 5 OTP requests per user within a rolling 60-second window. When the limit is exceeded, the API returns HTTP 429 Too Many Requests. Analytics are stored in MongoDB Atlas and displayed in the dashboard.

## Key Features

- Custom sliding-window rate limiter for OTP API requests
- Allows a maximum of *5 requests per user/IP in 60 seconds*
- Blocks the next request with *HTTP 429 Too Many Requests*
- Interactive AI chatbot on the dashboard for answering questions about request analytics, blocked requests, and rate-limit behavior
- Dynamic analytics dashboard with total, allowed, and blocked request metrics
- Allowed-versus-blocked request distribution chart
- Persistent analytics using MongoDB Atlas and Mongoose
- Light and dark theme support
- API documentation page
- Request History planned as a next-level enhancement

## Technology Stack

Technologies Used 

Frontend - Next.js, React, TypeScript
Backend - Next.js Route Handlers, Node.js
Database - MongoDB Atlas
Object Data Modeling - Mongoose
Database Inspection - MongoDB Compass
Styling - Tailwind CSS 
Charts - Recharts
Rate Limiting - Custom sliding window algorithm
Development Tools - GitHub Copilot, Google Antigravity, PowerShell
Version Control - Git and GitHub 

## Project Structure

app/
├── api/
│   ├── analytics/          
│   └── send-otp/           
├── api-documentation/      
├── dashboard/              
└── page.tsx                

components/
├── dashboard.tsx
├── distributionchart.tsx
├── statcard.tsx
└── sidebar.tsx

lib/
├── mongodb.ts              
├── models.ts               
├── ratelimiter.ts          
└── analytics.ts            

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Sheru4030/api-rate-limiter-analytics-dashboard.git
cd api-rate-limiter-analytics-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MongoDB Atlas

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

> Do not commit `.env.local`. It contains private database credentials.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

- Dashboard: `http://localhost:3000/dashboard`
- API Documentation: `http://localhost:3000/api-documentation`

## Verify the Rate Limiter

While the application is running, use this PowerShell command to send six OTP requests:

```powershell
1..6 | ForEach-Object {
  try {
    $response = Invoke-RestMethod `
      -Uri "http://localhost:3000/api/send-otp" `
      -Method POST `
      -ContentType "application/json" `
      -Body '{"email":"interviewer-test@example.com"}'

    Write-Host "Request ${_}: ALLOWED | Remaining: $($response.remaining)"
  }
  catch {
    Write-Host "Request ${_}: BLOCKED | Expected on request 6"
  }
}
```

### Expected Result

| Request | Result |
|---|---|
| Requests 1–5 | Allowed |
| Request 6 | Blocked with HTTP `429 Too Many Requests` |

After testing, open the dashboard to confirm that the analytics cards and request-distribution chart update.

## Architecture Overview

```text
React UI (Dashboard / API Documentation)
        |
        | fetch()
        v
Next.js API Routes
  ├── POST /api/send-otp
  └── GET /api/analytics
        |
        ├── Custom Sliding-Window Rate Limiter
        |
        └── MongoDB Atlas via Mongoose
              └── Analytics collection
```

## Rate Limiter Design

The project uses a custom sliding-window algorithm.

For each user/IP identifier, request timestamps are tracked in memory. Before a new request is processed, timestamps older than 60 seconds are removed.

```ts
const LIMIT = 5;
const WINDOW_MS = 60 * 1000;
```

If five requests already exist in the current rolling window, the next request is rejected with HTTP `429`.

### Why Sliding Window?

A sliding window evaluates the previous 60 seconds from the current request time. This avoids the boundary issue of fixed window rate limiting, where users could send many requests at the end of one minute and again at the beginning of the next.

## Analytics Persistence

MongoDB Atlas stores analytics data including:

- Total OTP requests
- Blocked OTP requests
- Active user/IP identifiers

This allows analytics to remain available after application restarts.

## Theme Support

The dashboard supports light and dark themes, allowing users to choose their preferred interface appearance.

## Request History — Next-Level Enhancement

A request-history page and backend structure were planned as a next-level enhancement.

The intended feature is to record each OTP request with:

- User/IP identifier
- API endpoint
- Allowed or blocked decision
- HTTP status code
- Timestamp

This would create an audit trail of rate-limit decisions and support future filtering, search, and pagination.

## Design Decisions and Trade-offs

- *Real-time OTP request processing*: Each OTP request is processed dynamically. The rate limiter evaluates the user/IP request activity at the time of the request, and the dashboard retrieves updated analytics from the API.
- *Sliding-window rate limiting*: The application allows up to 5 OTP requests per user/IP within a rolling 60-second window. Requests beyond this limit are blocked with HTTP 429 Too Many Requests.
- *Persistent analytics*: Request metrics are stored in MongoDB Atlas so total requests, blocked requests, and active user/IP identifiers remain available after application restarts.
- *OTP simulation:* The endpoint simulates OTP delivery. No real SMS or email provider is connected.
- *Request history:* Planned as the next development enhancement; dashboard analytics are the completed persistence feature.

## Future Improvements

- Complete request-history feature with filtering, search, and pagination to review and audit rate-limit decisions.
- Use Redis for distributed rate limiting so the application can scale reliably across multiple server instances.
- Connect the OTP workflow to a production-ready SMS or email delivery service.

## Screenshots




## Security Notes

- `.env.local` is excluded from Git.
- MongoDB connection strings, passwords, API keys, and tokens must never be committed.
- Use a least-privilege MongoDB database user for deployment.
