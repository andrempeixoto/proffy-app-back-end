import express from 'express';

const app = express();

app.use(express.json());


app.get('/users', (request, response) => {
  const users = [
    { name: "Andre", age: "34", saved: true, },
    { name: "Lumma", age: "30", saved: true, }
  ];
  
  return response.json(users);
})

// Request Body: Data for creation or update of a registry
app.post('/users', (request, response) => {
  console.log(request.body);

  const users = [
    { name: "Andre", age: 34, saved: true, },
    { name: "Lumma", age: 30, saved: true, }
  ];

  return response.json(users);
  
})

// Route Params: identify which resource will be updated or deleted
app.delete('/users/:id', (request, response) => {
  console.log(request.params);

  const users = [
    { name: "Andre", age: 34, saved: true, },
    { name: "Lumma", age: 30, saved: true, }
  ];

  return response.json(users);

})

app.listen(3333);

// Query Params: pagination, filter,
// EX.: https://localhost:3333/users/?page=2&sort=name

// HTTP Methods: GET, POST, PUT, DELETE

console.log('Server running on port 3333 \u{1F680}')