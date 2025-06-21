# Library Management API

A RESTful API for managing a library system, built with Express, TypeScript, and MongoDB (Mongoose).

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- TypeScript

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/ashraful2871/Assignment-Library-Management-API.git
```

2. go this directory:

```bash
   cd library-management-api
```

3. Install dependencies:

```bash
   npm install
```

4.  for development with hot-reloading:

```bash
npm run dev
```

Or Build and run the project:

```bash
npm run build
```

## API Endpoints

- **POST /api/books**: Create a new book
- **GET /api/books**: Get all books (supports filtering and sorting)
- **GET /api/books/:bookId**: Get a book by ID
- **PUT /api/books/:bookId**: Update a book
- **DELETE /api/books/:bookId**: Delete a book
- **POST /api/borrow**: Borrow a book
- **GET /api/borrow**: Get borrowed books summary

## Features

- Schema validation using Mongoose
- Business logic for borrowing (availability control)
- MongoDB aggregation for borrowed books summary
- Mongoose static method for updating book availability
- Mongoose middleware for validation and updates
- Filtering and sorting for book retrieval
