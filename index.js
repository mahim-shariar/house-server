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
      const reviewsCollection= database.collection("reviews");
      

      // POST Reviews
      app.post('/addReviews', async (req, res) => {
        const review = req.body;
        const result = await reviewsCollection.insertOne(review)
        res.send(result);
      })

      // GET products
      app.get('/addProducts', async (req, res) => {
        const result = await productsCollection.find({}).toArray();
        res.json(result);
      })

      // post products
      app.post('/addProducts', async (req, res) => {
        const products = req.body;
        const result = await productsCollection.insertOne(products)
        res.send(result);
      })
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









