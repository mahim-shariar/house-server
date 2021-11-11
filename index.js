const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors =require('cors')
const app = express();


app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k4g9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("Barhouse");
      const productsCollection = database.collection("products");
      const orderCollection = database.collection("products");
    }
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!This is my BarHouse Web Application..')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})









