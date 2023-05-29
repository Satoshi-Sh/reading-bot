const { MongoClient }= require('mongodb')
const url = 'mongodb://satoshi:3104_mela@127.0.0.1:27017/database'; // Replace with your MongoDB connection URL
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect()
    console.log('Connected to databse')
    const db = client.db('database')
    const collections = await (await db.collections())[0].find()
    console.log(collections[0].find())
  } catch (error) {
    console.error('Error connecting to the MongoDB database', error);
  }
}

connect()
