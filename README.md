# ERP System

A full-stack Enterprise Resource Planning (ERP) system built with Node.js, Express, React, and PostgreSQL.

## Features

- A Node.js/Express backend
- PostgreSQL database with Sequelize ORM
- JWT authentication with refresh tokens
- Role-based access control
- File upload functionality
- Email notifications
- Comprehensive logging system
- API documentation via Swagger
- React frontend

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Sequelize ORM
- **Frontend**: React with Redux (planned)
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Zo3rb/smart
   ```

   ```bash
   cd erp-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.development` file based on `.env.example`:

   ```bash
   cp .env.example .env.development
   ```

4. Update the environment variables in `.env.development` with your configuration.

5. Initialize the database:

   ```bash
   npm run db:reset
   ```

6. Start the development server:

   ```bash
   npm run server
   ```

7. Access the API documentation at:

   [Demo](http://localhost:5000/docs)

## Development

- `npm run server`: Start the backend server with nodemon
- `npm run client`: Start the frontend development server
- `npm run dev`: Start both backend and frontend
- `npm run db:reset`: Reset the database (drop, migrate, seed)

## Project Structure

```bash
Smart-ERP/
├── client/ # React frontend (to be implemented)
├── server/ # Node.js backend
│ ├── config/ # Configuration files
│ ├── controllers/ # Request handlers
│ ├── docs/ # API documentation
│ ├── middleware/ # Custom middleware
│ ├── migrations/ # Database migrations
│ ├── models/ # Sequelize models
│ ├── routes/ # API routes
│ ├── seeders/ # Database seeders
│ ├── services/ # Business logic
│ ├── uploads/ # Uploaded files
│ ├── utils/ # Utility functions
│ ├── validators/ # Request validators
│ ├── app.js # Express app setup
│ └── server.js # Server entry point
└── .env.development # Environment variables
```

## License

Open-Source

## Contributors

- [Ali Abu-elfottoh](https://www.linkedin.com/in/alif90/)
