const {
  PORT,
  MONGO_URI,
  DB_NAME,
  SALT_ROUNDS,
  PRODUCTION,
  SESSION_SECRET,
  SESSION_TIME_OUT,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TIME_OUT,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TIME_OUT,
  EMAIL_USER_NAME,
  EMAIL_USER_PASSWORD,
  CLIENT_URL
} = process.env;

const ENV_CONFIG = Object.freeze({
  port: Number(PORT),
  mongoUri: String(MONGO_URI),
  dbName: String(DB_NAME),
  saltRounds: Number(SALT_ROUNDS),
  production: PRODUCTION === "false",
  sessionSecret: String(SESSION_SECRET),
  sessionTimeOut: Number(SESSION_TIME_OUT),
  jwtAccessSecret: String(JWT_ACCESS_SECRET),
  jwtAccessTimeOut: String(JWT_ACCESS_TIME_OUT),
  jwtRefreshSecret: String(JWT_REFRESH_SECRET),
  jwtRefreshTimeOut: String(JWT_REFRESH_TIME_OUT),
  emailUser: String(EMAIL_USER_NAME),
  emailPass: String(EMAIL_USER_PASSWORD),
  clientUrl: String(CLIENT_URL)
});

export default ENV_CONFIG;
