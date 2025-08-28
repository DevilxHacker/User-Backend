// After /users the remainaing part of url is handled here
import express from 'express';
import {  signin, signup, update } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidtor.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const router = express.Router();



/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 * 
 */
router.post('/signup', validate(zodSignupSchema), signup);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 * 
 */
router.post('/signin', validate(zodSigninSchema), signin);

/**
 * @swagger 
 * /users/update/{id}:
 * put:
 *        summary: Update user details
 *        description: Update user details by user ID
 */
router.put('/update/:id', update);

export default router;