import express from 'express';
import { DeleteUser, FindAllUsers, findUserEmail, findUserName } from '../../controllers/adminController.js';

const router= express.Router();

/*
@swagger
 * /admin/delete/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      description: Deletes a user from the database using their ID
 */
router.delete('/delete/:id', DeleteUser);
/*
@swagger
 * /admin/userEmail/{email}:
 *  get:
 *      summary: Find a user by email
 *      description: Retrieves user details based on the provided email address
 */
router.get('/userEmail/:email', findUserEmail);
/*
@swagger
 * /admin/userName/{username}:
 *  get:
 *      summary: Find a user by username
 *      description: Retrieves user details based on the provided username
 */
router.get('/userName/:username', findUserName);
/*
@swagger
 * /admin/allUsers:
 *  get:
 *      summary: Get all users
 *      description: Retrieves a list of all users in the database
 */
router.get('/allUsers', FindAllUsers);

export default router;