# node-rdbms-crud-test

## Tech Stack

- Node.js & Express
- Prisma ORM
- PostgreSQL
- EJS

## Get Started

1. `git clone (repository-url)`
2. `npm install`
3. Set up your database connection by creating a `.env` file (PORT, DATABASE_URL)
4. `npm start`

## Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=3000
DATABASE_URL=your_database_url_here
```

## API Endpoints

### Categories API

- **GET** `/categories` - Get all categories.
- **GET** `/categories/create` - Show create category form.
- **POST** `/categories` - Create a new category.
- **GET** `/categories/edit/:id` - Show edit category form.
- **PUT** `/categories/:id` - Update a category by ID.
- **DELETE** `/categories/:id` - Delete a category by ID.

### Products API

- **GET** `/products` - Get all products (with pagination).
- **GET** `/products/create` - Show create product form.
- **POST** `/products` - Create a new product.
- **GET** `/products/edit/:id` - Show edit product form.
- **PUT** `/products/:id` - Update a product by ID.
- **DELETE** `/products/:id` - Delete a product by ID.
