import * as authService from './auth.service.js';
import { registerSchema, loginSchema } from './auth.schema.js';

export const register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await authService.registerJobSeeker(data);
    res.status(201).json({ success: true, message: 'Registration successful', data: { id: user.id } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.loginUser(email, password);
    res.status(200).json({ success: true, message: 'Login successful', data: result });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({ success: true, message: 'User details fetched', data: user });
  } catch (error) {
    next(error);
  }
};
