const { PORT, MONGO_URI, DB_NAME } = process.env;

const ENV_CONFIG = Object.freeze({
  port: Number(PORT),
  mongoUri: String(MONGO_URI),
  dbName: String(DB_NAME)
});

export default ENV_CONFIG;
