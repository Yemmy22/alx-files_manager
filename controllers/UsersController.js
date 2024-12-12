import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }

    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }

    try {
      // Check if user already exists
      const userExist = await dbClient.db.collection('users').findOne({ email });
      if (userExist) {
        res.status(400).json({ error: 'Already exist' });
        return;
      }

      // Create new user
      const hashedPassword = sha1(password);
      const result = await dbClient.db.collection('users').insertOne({
        email,
        password: hashedPassword,
      });

      // Return the new user's ID and email
      const id = result.insertedId.toString();
      res.status(201).json({ id, email });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
