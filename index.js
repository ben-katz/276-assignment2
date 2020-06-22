const express = require('express')
const path = require('path')
const db = require('./queries')
const PORT = process.env.PORT || 5000



express()
  .use(express.json())
  .use(express.urlencoded({extended:false}))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', db.getMonsters)
  .get('/monsters/:id', db.getMonsterById)
  .get('/delete/:id', db.deleteMonster)
  .post('/monsters/:id', db.updateMonster)
  .post('/add', db.addMonster)
  .get('/monsters', db.getMonsters)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
/*Remember to add back for my functions:   
  app.get('/users', db.getUsers)
  app.get('/users/:id', db.getUserById)
  app.post('/users', db.createUser)
  app.put('/users/:id', db.updateUser)
  app.delete('/users/:id', db.deleteUser) */
  
