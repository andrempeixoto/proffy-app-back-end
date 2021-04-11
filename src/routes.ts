import express from 'express';
import db from './database/connection';

const routes = express.Router(); 

routes.post('/classes', async (request, response) => {
  
  const {
    name,
    avatar,
    telegram,
    bio,
    subject,
    price,
    schedule
  } = request.body;
  
  const insertedUsersIds = await db('users').insert({
    name,
    avatar,
    telegram,
    bio,
  })

  const user_id = insertedUsersIds[0];

  const insertedClassesIds await db('classes').insert({
    subject,
    price,
    user_id,
  })

  const classes_id = insertedClassesIds[0];
  
  await db('class_schedule').insert({
    schedule,
    classes_id,
  })

  return response.send();
});

export default routes;