const express = require('express'); // import de express
const MongoClient = require('mongodb').MongoClient;
const app = express(); // instanciation de express
//const equipes = require('./equipes.json');
const dbName = 'sesame4a';
const url = 'mongodb://localhost:27017';
let db;
MongoClient.connect(url, function (err, client) {
   console.log('Connexion réussie avec la base');
   db = client.db(dbName);
});
app.use(express.json());
app.listen(83, () => {
   console.log("BACK EXPRESS JS")
});

//find All players
app.get('/joueurs', (req, res) => {
   db.collection('joueur').find({}).toArray(function (err, docs) {
      if (err) {
         console.log(err);
         throw err;
      }
      res.status(200).json(docs);
   });
})

//find player by id
app.get('/joueurs/:id', async (req, res) => {
   const id = parseInt(req.params.id)
   try {
      const docs = await db.collection('joueur').find({ id })
         .toArray()
      res.status(200).json(docs)
   } catch (err) {
      console.log(err)
      throw err
   }
})

//post new player
app.post('/joueurs', async (req, res) => {
   try {
      const equipeData = req.body
      const equipe = await db.collection('joueur')
         .insertOne(equipeData)
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})

//update player
app.put('/joueurs/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const replacementEquipe = req.body
      const equipe = await db.collection('joueur').
         replaceOne({ id }, replacementEquipe)
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})

//delete player
app.delete('/joueurs/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const equipe = await db.collection('joueur'
      ).deleteOne({ id })
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})


//find player by team id
app.get('/joueurs/team/:idEquipe', async (req, res) => {
   const idEquipe = parseInt(req.params.idEquipe)
   try {
      const docs = await db.collection('joueur').find({idEquipe : idEquipe })
         .toArray()
      res.status(200).json(docs)
   } catch (err) {
      console.log(err)
      throw err
   }
})


// Find team by player id
app.get('/equipe/joueur/:id', async (req, res) => {
   const id = parseInt(req.params.id)
   try {
      const docs = await db.collection('joueur').find({id : id })
         .toArray()
      const equipe = await db.collection('equipe').find({id: docs[0].idEquipe})
      .toArray();
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})



//find player by name
app.get('/joueurs/byName/:playerName', async (req, res) => {
   const playerName =req.params.playerName
   try {
      const docs = await db.collection('joueur').find({nom:  playerName })
         .toArray()
      res.status(200).json(docs)
   } catch (err) {
      console.log(err)
      throw err
   }
})






























//find All
app.get('/equipes', (req, res) => {
   db.collection('equipe').find({}).toArray(function (err, docs) {
      if (err) {
         console.log(err);
         throw err;
      }
      res.status(200).json(docs);
   });
})

//find by id
app.get('/equipes/:id', async (req, res) => {
   const id = parseInt(req.params.id)
   try {
      const docs = await db.collection('equipe').find({ id })
         .toArray()
      res.status(200).json(docs)
   } catch (err) {
      console.log(err)
      throw err
   }
})

//post new equipe
app.post('/equipes', async (req, res) => {
   try {
      const equipeData = req.body
      const equipe = await db.collection('equipe')
         .insertOne(equipeData)
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})

//update
app.put('/equipes/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const replacementEquipe = req.body
      const equipe = await db.collection('equipe').
         replaceOne({ id }, replacementEquipe)
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})

//delete
app.delete('/equipes/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const equipe = await db.collection('equipe'
      ).deleteOne({ id })
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})
/*app.get('/equipes',(req,res)=>{
   // res.send("<h1 align=center>Hello Backend Express JS</h1>");
   res.status(200).json(equipes);
});

app.get('/equipes/:id',(req,res)=>{
   const id = parseInt(req.params.id);
   const equipe = equipes.find(equipe => equipe.id === id);
   res.status(200).json(equipe);
});

app.post('/equipes/',(req,res)=>{
    equipes.push(req.body)
    res.status(200).json(equipes);
 });


 app.put('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    equipe.name = req.body.name;
    equipe.country = req.body.country;
    res.status(200).json(equipe);
 });

 app.delete('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    equipes.splice(equipes.indexOf(equipe),1)
    res.status(200).json(equipes);
 });*/