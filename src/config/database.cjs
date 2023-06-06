require("dotenv").config();

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const timezone = process.env.DB_TIMEZONE
const port = process.env.DB_PORT

module.exports = {
  development: {
    username,
    database,
    host,
    port: port,
    dialect: "mysql",
    query: {
      raw: true,
    },
    timezone: timezone,
  },
};
