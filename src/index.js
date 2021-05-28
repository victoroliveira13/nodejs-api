const express = require('express');
const app = express();
const { uuid } = require('uuidv4');

app.use(express.json());

const projects = [];

app.get('/p', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/p', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner }
  projects.push(project);

  return response.json(project)
});

app.put('/p/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0){
    return response.status(400).json({ error: 'Project not found.' })
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/p/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0){
    return response.status(400).json({ error: 'Project not found.' })
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});


app.listen(3334, () => {
  console.log('🚀 Back-end started!');
}); 