/* eslint-disable */

const { generateManyBook } = require('../fakes/book.fake');
const BooksService = require('./books.service');

/* const fakeBooks = [
  {
    _id: 1,
    name: 'Libro Falso 1'
  },
  {
    _id: 2,
    name: 'Libro Falso 2'
  }
]; */

const mockGetAll = jest.fn();

const MongoLibStub = {
  getAll: mockGetAll,
  create:()=>{},
}

jest.mock('../lib/mongo.lib', ()=> jest.fn().mockImplementation(()=>({
    getAll:mockGetAll,
    create:()=>{},
})));

describe('test para books services',()=>{
  let service;
  beforeEach(()=>{
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe('test para get books',()=>{

    //TEST 1 -******************************************************
    test('deberia devolver la lista de libros', async()=>{

      const fakeBooks = generateManyBook(20)
      mockGetAll.mockResolvedValue ([...fakeBooks]);

      const books = await service.getBooks({});
      console.log(books);
      expect(books.length).toEqual(20);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    //TEST 2 -******************************************************
    test('deberia devolver el primer dato', async()=>{
      const fakeBooks = generateManyBook(4);

      mockGetAll.mockResolvedValue(fakeBooks);

      const books = await service.getBooks({});
      console.log(books);
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });

  });
});
