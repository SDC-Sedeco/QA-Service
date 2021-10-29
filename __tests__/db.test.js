const { Pool } = require('pg')

//setup mock for unit tests
jest.mock('pg', () =>{
  const mockPool = {
    connect: function () {
      return {query: jest.fn()}
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn()
  }
  return { Pool: jest.fn(() => mockPool)}
})

describe('test', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it ('Should pass', async () => {
    pool.query.mockResolvedValueOnce({rows: [], rowCount: 0});
  })
})






