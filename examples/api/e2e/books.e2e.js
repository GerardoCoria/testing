/* eslint-disable */

const request = require('supertest');
const createApp = require('../src/app');
const { config }= require('../src/config/index');
const { MongoClient } = require('mongodb');
const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('test para books', ()=>{
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async ()=>{
    app = createApp();
    server = app.listen(3002)
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser:true,
      useUnifiedTopology: true
    });
    await client.connect();
    database = client.db(DB_NAME);
  })
  afterAll(async ()=>{
    await server.close();
    await database.dropDatabase();
  })

  describe('test GET "/api/v1/books"',()=>{
    test('debe devolver HELLO WORLD',async ()=>{

    const seedData = await database.collection('books').insertMany([
      {
        name: 'Libro A',
        price: 125
      },
      {
        name: 'Libro B',
        price: 222
      },
      {
        name: 'Libro C',
        price: 325
      }
    ])

    return request(app)
       .get('/api/v1/books')
       .expect(200)
       .then(({body})=>{
          console.log(body)
          expect(body.length).toEqual(seedData.insertedCount)
    })
    })
})
});
