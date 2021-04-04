import express from 'express';

const app = express();

app.use(express.json());


app.get('/users', (request, response) => {

})

// Request Body: Data for creation or update of a registry
app.post('/users', (request, response) => {
  
})

// Route Params: identify which resource will be updated or deleted
app.delete('/users/:id', (request, response) => {

})

app.listen(3333);

// Query Params: pagination, filter,
// EX.: https://localhost:3333/users/?page=2&sort=name

// HTTP Methods: GET, POST, PUT, DELETE

console.log('Server running on port 3333 \u{1F680}')