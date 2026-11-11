# Employee Management System (MERN)

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Run the backend
```bash
cd backend
npm install
cp .env.example .env     # edit MONGO_URI if needed
npm run dev              # http://localhost:5000
```

## Run the frontend
```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```
The Vite dev server proxies `/api` to the backend on port 5000.

## REST API
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | /api/employees       | List all employees   |
| GET    | /api/employees/:id   | Get one employee     |
| POST   | /api/employees       | Create an employee   |
| PUT    | /api/employees/:id   | Update an employee   |
| DELETE | /api/employees/:id   | Delete an employee   |

Body for POST/PUT:
```json
{ "name": "Asha Nair", "email": "asha@example.com", "salary": 850000, "joinDate": "2024-03-18", "department": "Engineering" }
```
