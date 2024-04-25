import * as authController from '../controllers/auth.controller';
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Authentication Controller', () => {
  describe('signup', () => {
    it('should create a new user', async () => {
      const req: any = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await authController.signup(req, res, next);

      expect(User.create).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: expect.any(String), // Ensure hashed password is passed to create
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith('User created successfully!');
    });
  });

  describe('signin', () => {
    it('should sign in a user with correct credentials', async () => {
      // Mock User.findOne to return a valid user
      User.findOne.mockResolvedValueOnce({
        email: 'test@example.com',
        password: bcryptjs.hashSync('password123', 10), // Hashed password
      });

      const req: any = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      };
      const next = jest.fn();

      await authController.signin(req, res, next);

      // Ensure JWT token is created and sent in response
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith(
        'access_token',
        expect.any(String),
        {
          httpOnly: true,
        },
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com' }); // Ensure password is not included in response
    });

    // Add more tests for other cases (e.g., invalid user, wrong password)
  });
});
