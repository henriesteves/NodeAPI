const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let clients = [];

app.post('/clients', (req, res) => {
  clients.push(req.body);

  res.json({info: 'client create successfully'});
});

app.get('/clients', (req, res) => {
  res.json(clients);
});

app.get('/clients/:name', (req, res) => {
  res.json(clients.filter(client => client.name == req.params.name));
});

app.put('/clients/:name', (req, res) => {
  const clientIndex = clients.findIndex(client => client.name == req.params.name);

  clients[clientIndex] = req.body;

  res.json({info: 'client updated successfully'});
});

app.delete('/clients/:name', (req, res) => {
  clients = clients.filter(client => client.name != req.params.name);

  res.json({info: 'client removed successfully'});
});

app.listen(3000, () => {
  console.log('Server is running at port 3000')
});

// Commands to test the API

// curl -S -X GET http://localhost:3000/clients

// curl -S -H "Content-Type: application/json" -X POST http://localhost:3000/clients -d '{"name": "Henrique", "age": "30"}'
// curl -S -H "Content-Type: application/json" -X POST http://localhost:3000/clients -d '{"name": "Heloisa", "age": "25"}'

// curl -S -X GET http://localhost:3000/clients

// curl -S -X GET http://localhost:3000/clients/Henrique

// curl -S -H "Content-Type: application/json" -X PUT http://localhost:3000/clients/Henrique -d '{"name":"Henrique2","age": "31"}'

// curl -S -X DELETE http://localhost:3000/clients/Henrique
