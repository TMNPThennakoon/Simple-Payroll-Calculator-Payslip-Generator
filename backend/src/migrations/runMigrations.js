require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');
const logger = require('../utils/logger');

async function runMigrations() {
  try {
    logger.info('Starting database migrations...');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schema);
    
    logger.info('Database migrations completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();
