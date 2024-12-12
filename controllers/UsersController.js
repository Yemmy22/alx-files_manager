/* eslint-disable no-unused-vars */

import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const usersCollection = dbClient.db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password
    const hashedPassword = sha1(password);

    // Insert the new user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
    });

    // Return the new user's ID and email
    const user = {
      id: result.insertedId.toString(),
      email,
    };
    return res.status(201).json(user);
  }
}

export default UsersController;
