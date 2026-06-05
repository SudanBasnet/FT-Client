# Finance Tracker Client

React frontend for the full-stack finance tracker. It handles authentication,
dashboard charts, transaction creation/editing/deleting, pagination, search, and
protected navigation.

## Tech Stack

- React
- Vite
- React Router
- React Bootstrap
- Bootstrap CSS
- Axios
- React Toastify
- React Icons
- Recharts

## Setup

Install dependencies:

```bash
yarn install
```

Create an `.env` file in `ft-client`:

```env
VITE_ROOT_API=http://localhost:8000
```

Important:

- Vite frontend env variables must start with `VITE_`.
- The app reads the API URL with `import.meta.env.VITE_ROOT_API`.

## Run

Development:

```bash
yarn dev
```

Build:

```bash
yarn build
```

Preview production build:

```bash
yarn preview
```

Default frontend URL:

```txt
http://localhost:5173
```

## Main Files

- `src/main.jsx` - app entry, Bootstrap CSS, Toastify CSS, BrowserRouter
- `src/App.jsx` - route definitions and ToastContainer
- `src/App.css` - custom app theme and special UI styles
- `helpers/axiosHelper.js` - API request helpers
- `src/context/UserContext.jsx` - user, transaction, modal, edit state
- `src/auth/Auth.jsx` - protected route wrapper
- `src/assets/pages/Login.jsx` - login page
- `src/assets/pages/Signup.jsx` - signup page
- `src/assets/pages/Dashboard.jsx` - dashboard and charts
- `src/assets/pages/Transaction.jsx` - transaction page
- `src/components/layouts/TransactionForm.jsx` - add/edit transaction form
- `src/components/layouts/TransactionTable.jsx` - search, pagination, edit, delete
- `src/components/CustomModal.jsx` - add/edit modal wrapper
- `src/components/layouts/Header.jsx` - responsive navbar
- `src/components/layouts/Footer.jsx` - app footer

## Routes

```txt
/              Login
/signup        Signup
/dashboard     Protected dashboard
/transaction   Protected transaction page
```

Protected routes require a logged-in user.

## Authentication Flow

1. User logs in from the login page.
2. API returns `accessJWT`.
3. Client stores token:

```js
localStorage.setItem("accessJWT", data.accessJWT);
```

4. Axios helpers send token in the `Authorization` header.
5. `autoLogin()` loads the profile when the app refreshes.
6. Protected routes use `Auth.jsx` to redirect logged-out users.

## Password Rules

Signup password must include:

- minimum 5 characters
- at least 1 uppercase letter
- at least 1 special character

Valid example:

```txt
Hello!
```

## API Helpers

Located in:

```txt
helpers/axiosHelper.js
```

Current helpers:

- `postNewUser(data)`
- `loginUser(data)`
- `getUser()`
- `postNewTransaction(data)`
- `updateTransaction(id, data)`
- `fetchTransactions()`
- `deleteTransactions(data)`

Delete selected transactions expects:

```js
deleteTransactions({ ids: selectedIds });
```

## User Context

Located in:

```txt
src/context/UserContext.jsx
```

Stores:

- `user`
- `transactions`
- `show`
- `editingTransaction`

Main functions:

- `setUser`
- `setTransactions`
- `getTransactions`
- `toggleModal`
- `setEditingTransaction`

## Transaction Page Features

Located in:

```txt
src/components/layouts/TransactionTable.jsx
```

Features:

- list logged-in user's transactions
- search by title, type, amount, or date
- pagination
- checkbox selection
- select all current page
- delete selected transactions
- edit button for each row

## Add/Edit Transaction

Located in:

```txt
src/components/layouts/TransactionForm.jsx
```

The form is reused for both adding and editing.

If `editingTransaction` exists:

- modal opens with prefilled data
- submit sends a `PUT` request

If `editingTransaction` is `null`:

- modal opens empty
- submit sends a `POST` request

## Dashboard Features

Located in:

```txt
src/assets/pages/Dashboard.jsx
```

Shows:

- total income
- total expense
- total balance
- transaction count
- income vs expense chart
- top expenses chart
- recent activity with pagination

Charts use:

```txt
recharts
```

Components used:

- `ResponsiveContainer`
- `PieChart`
- `Pie`
- `Cell`
- `BarChart`
- `Bar`
- `XAxis`
- `YAxis`
- `Tooltip`

## Styling

Most layout styling uses Bootstrap and React Bootstrap classes.

`App.css` keeps custom styles for:

- app background
- glass-like surfaces
- LED auth form border
- chart sizing
- table polish
- navbar/footer theme

## Notes

- Make sure the backend is running before using the client.
- Make sure `VITE_ROOT_API` points to the backend URL.
- Recharts may trigger a Vite chunk-size warning during build. The build still
  works.
