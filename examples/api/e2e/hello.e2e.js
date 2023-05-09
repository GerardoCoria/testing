/* eslint-disable */
const request = require('supertest');

const createApp=require('../src/app');

describe('test para la ruta de inicio', ()=>{
  let app = null;
  let server = null;

  beforeAll(()=>{
    app = createApp();
    server = app.listen(3002)
  })
  afterAll(async ()=>{
    await server.close();
  })

  describe('test GET "/"',()=>{
    test('debe devolver HELLO WORLD',()=> request(app)
       .get('/')
       .expect(200)
       .then(res=>{
          expect(res.text).toEqual('Hello World!')

    })
  )})

});
