require("dotenv").config();

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const timezone = process.env.DB_TIMEZONE
const port = process.env.DB_PORT
const type = process.env.DB_TYPE;

module.exports = {
  development: {
    username,
    database,
    host,
    port: port,
    dialect: type,
    query: {
      raw: true,
    },
    timezone: timezone,
  },
};
