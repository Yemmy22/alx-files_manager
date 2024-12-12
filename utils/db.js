import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    
    const url = `mongodb://${host}:${port}`;
    
    this.client = new MongoClient(url, { 
      useUnifiedTopology: true,
      useNewUrlParser: true 
    });
    
    this.connected = false;
    
    // Establish connection
    this.client.connect((err) => {
      if (err) {
        console.error('MongoDB Connection Error:', err);
        this.connected = false;
      } else {
        this.connected = true;
        this.db = this.client.db(database);
      }
    });
  }

  /**
   * Check if the MongoDB connection is alive
   * @returns {boolean} - Connection status
   */
  isAlive() {
    return this.connected;
  }

  /**
   * Get the number of users in the database
   * @returns {Promise<number>} - Number of users
   */
  async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
  }

  /**
   * Get the number of files in the database
   * @returns {Promise<number>} - Number of files
   */
  async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
  }
}

// Create and export a singleton instance
const dbClient = new DBClient();
export default dbClient;
