/* eslint-disable no-unused-vars */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    // Return Redis and DB status
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    // Get number of users and files
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    res.status(200).json({
      users,
      files,
    });
  }
}
