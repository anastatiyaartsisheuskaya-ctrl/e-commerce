![Second Hand Studio](./src/shared/images/logo.svg)

# E-commerce SPA

A responsive e-commerce single-page application built with React and TypeScript. The application allows users to browse products, manage their shopping cart, and communicate with customer support through a real-time chat.

## Features

### Authentication
- User registration and login using Firebase Authentication.
- Form validation with React Hook Form and Zod.
- Protected application routes.
- User logout and authentication state handling.

### Products
- Product catalogue with responsive layouts.
- Product search.
- Category, color, size, price, and sale filters.
- Price sorting (ascending and descending).
- URL-based filter and sorting state.
- Individual product details pages.
- Product availability and stock status.
- Product size and color selection.

### Shopping Cart
- Add products with selected options.
- Update item quantities.
- Remove individual items.
- Clear the entire cart.
- Calculate item subtotals and cart total.
- Empty cart state.
- Optimistic updates and cache synchronization with TanStack Query.

### Real-time Support Chat
- Socket.IO connection to the support server.
- Real-time message sending and receiving.
- Connection status indicator.
- Unread message counter.
- Floating chat window.
- Messages are currently maintained in client state and are not persisted.

### UI and UX
- Responsive desktop, tablet, and mobile layouts.
- Tailwind CSS and shadcn/ui components.
- Loading, error, and empty states.
- Reusable UI components.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI library |
| TypeScript | Static typing |
| Vite | Development server and build tool |
| TanStack Router | Application routing |
| TanStack Query | Server-state management |
| Firebase Authentication | User authentication |
| Axios | HTTP communication with the backend |
| Socket.IO Client | Real-time support chat |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| React Hook Form | Form management |
| Zod | Form validation and schemas |
| Lucide React | Icons |

## Project Architecture

The project follows a feature-oriented structure:

```text
src/
├── features/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   └── support/
├── routes/
├── shared/
│   ├── components/
│   ├── helpers/
│   ├── images/
│   ├── lib/
│   └── api/
├── router.tsx
└── main.tsx
```

Feature-specific components, API operations, hooks, and business logic are kept close to the features they belong to. Shared functionality is placed in the `shared` directory.

The frontend communicates with the custom backend through REST API endpoints for product and cart operations. Socket.IO is used for real-time support chat communication.

## Prerequisites

Before running the application, make sure you have:

- Node.js and npm installed.
- A Firebase project with Authentication configured.
- The custom backend running and accessible.
- The backend REST API and Socket.IO endpoints configured.

## Firebase Setup

Firebase Authentication is used to manage user accounts.

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project or select an existing one.
3. Register a Web App in your Firebase project.
4. Navigate to **Authentication → Sign-in method**.
5. Enable the **Email/Password** provider.
6. Copy the Firebase Web App configuration.
7. Add the configuration values to your environment file.

For local development, make sure `localhost` is included in Firebase Authentication's authorized domains.

Firebase configuration is initialized in the frontend using the Firebase Web SDK.

If Firestore is used by the backend, its credentials and database configuration must be managed on the backend. Never expose service account credentials or private keys in the frontend.

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_API_BASE_URL="https://e-commerce-backend-production-19d1.up.railway.app/api"
```

Replace the empty Firebase values with your Firebase Web App configuration.

Make sure the environment variable names match those used in the application's Firebase, API client, and Socket.IO configuration.

## Installation

Clone the repository:

```bash
git clone https://github.com/anastatiyaartsisheuskaya-ctrl/e-commerce.git
```

Navigate to the project directory:

```bash
cd e-commerce
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and configure the required environment variables.

Make sure the backend is running before using features that require API or WebSocket communication.

## Development

Start the Vite development server:

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Production Build

Build the application:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Database Seeding

Initial product data is managed by the backend.

To populate the database, run the seed script from the backend project directory.

The seed script should import the initial product dataset into the database. The frontend retrieves product data through the backend API rather than using the seed file as a runtime data source.

## Deployment

[**Live application**](https://e-commerce-pu4a.vercel.app)

The frontend can be deployed using Vercel.

When configuring the deployment:

1. Connect the GitHub repository.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Configure all required environment variables in the deployment platform.
6. Ensure the backend allows requests from the deployed frontend origin and that its API and Socket.IO endpoints are accessible.
