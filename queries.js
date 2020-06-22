const {Pool} = require('pg');
var pool;
pool = new Pool({
  //connectionString: 'postgres://postgres:6757@localhost/monsterbuilder'
  connectionString: process.env.DATABASE_URL
})




const getMonsters = (request, response) => {
    var getMonstersQuery = 'SELECT * FROM monsters';
    pool.query(getMonstersQuery, (error,result) => {
      if (error) {response.end(error)};
      var results = {'rows':result.rows}
      response.render('pages/index', results);
    })
  }

  const getMonsterById = (request, response) => {
    const id = parseInt(request.params.id);
    var getMonstersQuery = 'SELECT * FROM monsters WHERE id = $1';
    pool.query(getMonstersQuery, [id], (error,result) => {
      if (error) {response.end(error)};
      var results = {'rows':result.rows}
      response.render('pages/monsters', results);
    })
  }

  const deleteMonster = (request, response) => {
    const id = parseInt(request.params.id);
    var deleteMonsterQuery = 'DELETE FROM monsters WHERE id = $1';
    pool.query(deleteMonsterQuery, [id], (error,result) => {
      if (error) {response.end(error)};
      response.redirect('../');
    })
  }

  const updateMonster = (request, response) => {
    var id = parseInt(request.params.id);
    var monster_name = request.body.monstername;
    var color = request.body.color;
    var shape = request.body.shape;
    var expression = request.body.expression;
    var cyclops = request.body.cyclops;
    var updateMonsterQuery = 'UPDATE monsters SET name = $1, color = $2, shape = $3, expression = $4, cyclops = $5 WHERE id = $6';
    pool.query(updateMonsterQuery, [monster_name, color, shape, expression, cyclops, id], (error,result) => {
      if (error) {response.end(error)};
      response.redirect('../monsters/' + `${id}`);
    })
  }


  const addMonster = (request, response) => {
    var id = Math.floor(Math.random() * 100000) + 1;
    var monster_name = request.body.monstername;
    var color = request.body.color;
    var shape = request.body.shape;
    var expression = request.body.expression;
    var cyclops = request.body.cyclops;
    var insertQuery = 'INSERT INTO monsters VALUES ($1, $2, $3, $4, $5, $6)'
    pool.query(insertQuery, [id, monster_name, color, shape, expression, cyclops], (error, result) => {
    if (error) {response.end(error)};
    response.redirect('back');
    })
  }

  module.exports = {
    getMonsters,
    addMonster,
    getMonsterById,
    updateMonster,
    deleteMonster
  }