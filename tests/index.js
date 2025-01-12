
const { index, indexById, store, update, destroy } = require('../app/user/controllers');
const User = require('../app/user/models'); // Mock model



jest.mock('../app/user/models');

jest.mock('express-validator', () => ({
    body: jest.fn(),
    param: jest.fn(),
    validationResult: jest.fn(() => ({
      isEmpty: jest.fn(() => false),
      array: jest.fn(() => [
        { msg: 'Valid email is required', param: 'email', location: 'body' },
        { msg: 'Name is required', param: 'name', location: 'body' },
      ]),
    })),
  }));

describe('User Controller - store', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  
  
  describe('User Controller - store', () => {
    let mockReq, mockRes;
  
    beforeEach(() => {
      mockReq = { params: {}, body: {} };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  });

  // Test for `index`
  describe('index', () => {
    it('should return all users', async () => {
      const users = [
        { id: '1', name: 'John Doe', email: 'john@example.com', age: 25 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 30 },
      ];
      User.find.mockResolvedValue(users);

      await index(mockReq, mockRes);

      expect(User.find).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(users);
    });

    it('should return 500 if there is a server error', async () => {
      User.find.mockRejectedValue(new Error('Database error'));

      await index(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ err: 'server error' });
    });
  });

  // Test for `indexById`
  describe('indexById', () => {
    it('should return user by ID', async () => {
      const user = { id: '1', name: 'John Doe', email: 'john@example.com', age: 25 };
      mockReq.params.id = '1';
      User.findOne.mockResolvedValue(user);

      await indexById(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ id: '1' });
      expect(mockRes.json).toHaveBeenCalledWith(user);
    });

    it('should return 404 if user not found', async () => {
      mockReq.params.id = '1';
      User.findOne.mockResolvedValue(null);

      await indexById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 500 if there is a server error', async () => {
      mockReq.params.id = '1';
      User.findOne.mockRejectedValue(new Error('Database error'));

      await indexById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  // Test for `store`
  describe('store', () => {
    it('should create a new user', async () => {
      const mockReq = {
        body: { name: 'John Doe', email: 'john@example.com', age: 25 },
      };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const savedUser = { id: '12345', name: 'John Doe', email: 'john@example.com', age: 25 };

      // Mock User.save()
      User.prototype.save = jest.fn().mockResolvedValue(savedUser);
      jest.mock('uuid', () => ({
        v4: jest.fn(() => '12345'),
      }));

      await store(mockReq, mockRes);

      expect(User.prototype.save).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(savedUser);
    });

    it('should return 400 if validation fails', async () => {
      const mockReq = {
        body: { email: 'invalid-email', age: -5 }, // Data tidak valid
      };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Simulasi validasi gagal
      jest.spyOn(require('express-validator'), 'validationResult').mockImplementation(() => ({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => [{ msg: 'Valid email is required', param: 'email', location: 'body' },
            { msg: 'Name is required', param: 'name', location: 'body' }
        ]),
      }));

      await store(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        err: 'Bad Request',
        details: expect.any(String),
      });
    });
  });

  // Test for `update`
  describe('update', () => {
    it('should update a user and return updated data', async () => {
      const updatedUser = { id: '1', name: 'John Doe', email: 'john@example.com', age: 26 };
      mockReq.params.id = '1';
      mockReq.body = { name: 'John Doe', email: 'john@example.com', age: 26 };
      User.findOneAndUpdate.mockResolvedValue(updatedUser);

      await update(mockReq, mockRes);

      expect(User.findOneAndUpdate).toHaveBeenCalledWith({ id: '1' }, { name: 'John Doe', email: 'john@example.com', age: 26 }, { new: true });
      expect(mockRes.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user not found', async () => {
      mockReq.params.id = '1';
      mockReq.body = { name: 'John Doe', email: 'john@example.com', age: 26 };
      User.findOneAndUpdate.mockResolvedValue(null);

      await update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ err: 'User not Found' });
    });

    it('should return 500 if there is a server error', async () => {
      mockReq.params.id = '1';
      mockReq.body = { name: 'John Doe', email: 'john@example.com', age: 26 };
      User.findOneAndUpdate.mockRejectedValue(new Error('Database error'));

      await update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Bad request', details: 'Database error' });
    });
  });

  // Test for `destroy`
  describe('destroy', () => {
    it('should delete a user and return success message', async () => {
      User.findOneAndDelete.mockResolvedValue({ id: '12345', name: 'John Doe' });
      mockReq.params.id = '12345';

      await destroy(mockReq, mockRes);

      expect(User.findOneAndDelete).toHaveBeenCalledWith({ id: '12345' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return 404 if user not found', async () => {
      User.findOneAndDelete.mockResolvedValue(null);
      mockReq.params.id = '12345';

      await destroy(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ err: 'User Not Found' });
    });

    it('should return 500 if there is a server error', async () => {
      User.findOneAndDelete.mockRejectedValue(new Error('Database error'));
      mockReq.params.id = '12345';

      await destroy(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Bad request', details: 'Database error' });
    });
  });
});
