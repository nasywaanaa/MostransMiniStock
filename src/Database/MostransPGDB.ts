import Sequelize from "sequelize";
import { db_cred } from "../Utils/Config.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();

export const MostransPG = () => {
  db_cred.DatabaseHost = env.DB_HOST ?? "";
  db_cred.DatabaseName = env.DB_NAME ?? "";
  db_cred.DatabasePassword = env.DB_PASSWORD ?? "";
  db_cred.DatabasePort = env.DB_PORT ?? "";
  db_cred.DatabaseUsername = env.DB_USERNAME ?? "";
  
  const sequelize = new Sequelize(
    db_cred.DatabaseName,
    db_cred.DatabaseUsername,
    db_cred.DatabasePassword,
    {
      host: db_cred.DatabaseHost,
      port: parseInt(db_cred.DatabasePort, 10), // Ensure port is a number
      dialect: "postgres",
      timezone: "+07:00",
      logging: false,
      dialectOptions: {
        useUTC: false, // for reading from the database
        dateStrings: true,
        typeCast: true,
        ssl: false, // Ensure SSL is explicitly disabled here
      },
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
      },
    }
  );

  // Test the connection
  sequelize
    .authenticate()
    .then(() => {
      console.log("PostgreSQL connection has been established successfully.");
    })
    .catch((err: Error) => {
      console.log("ENV DEBUG", {
        user: db_cred.DatabaseUsername,
        pass: db_cred.DatabasePassword,
        db: db_cred.DatabaseName
      });
      console.error("Unable to connect to the database:", err);
    });

  return { sequelize };
};
