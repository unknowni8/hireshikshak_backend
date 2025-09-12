import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from './usersControllers.js';

const userRoutes = express.Router();

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
userRoutes.get("/:id", getUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
userRoutes.get("/", getUsers);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a user
 *     responses:
 *       201:
 *         description: User created
 */
userRoutes.post("/", createUser);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 */
userRoutes.patch("/:id", updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
userRoutes.delete("/:id", deleteUser);

export default userRoutes;