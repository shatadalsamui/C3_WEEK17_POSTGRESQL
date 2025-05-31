# PostgreSQL Node.js Integration

## Project Structure
```
WEEK17_POSTGRESQL/
├── src/
│   └── index.ts       # Main database operations
├── dist/             # Compiled JavaScript
├── node_modules/     # Dependencies
└── tsconfig.json    # TypeScript configuration
```

## Core Components

### 1. Database Connection
- Uses `pg` (node-postgres) driver
- Connection pooling for efficiency
- Environment variable configuration

### 2. Query Execution
```typescript
const { rows } = await pool.query(
  'SELECT * FROM users WHERE id = $1', 
  [userId]
);
```
- Parameterized queries for security
- Type-safe result handling

### 3. Transaction Management
```typescript
await client.query('BEGIN');
try {
  // Multiple operations
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
}
```
- ACID-compliant operations
- Automatic rollback on error

### 4. Schema Design
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL
);
```
- Proper data types
- Constraints and relationships

## Implementation Details
The project demonstrates:
- Secure credential management
- Connection lifecycle handling
- Error recovery patterns
- Type-safe database interactions
