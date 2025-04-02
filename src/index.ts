import { createServer as createHttpsServer, ServerOptions } from "https";
import { createServer as createHttpServer } from "http";
import { ApolloServer } from "npm:apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "npm:apollo-server-core";
import express from "npm:express";
import http from "http";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import cors from "cors";
import { MostransPG } from "./Database/MostransPGDB.ts"; 

const env = config();

// Configuration and Credentials
interface Configuration {
  ssl: boolean;
  hostname: string;
  port: number;
}

interface DbCredentials {
  DatabaseName: string;
  DatabaseUsername: string;
  DatabasePassword: string;
  DatabasePort: string;
  DatabaseHost: string;
}

const Configuration: Configuration = {
  ssl: env.SSL === "true", // Example: Set SSL from environment variable
  hostname: env.HOSTNAME ?? "localhost",
  port: parseInt(env.PORT ?? "4000"),
};

const db_cred: DbCredentials = {
  DatabaseName: "",
  DatabaseUsername: "",
  DatabasePassword: "",
  DatabasePort: "",
  DatabaseHost: "",
};

async function setUpEnv() {
  // Set up environment variables
  db_cred.DatabaseName = env.DB_NAME ?? "";
  db_cred.DatabaseUsername = env.DB_USERNAME ?? "";
  db_cred.DatabasePassword = env.DB_PASSWORD ?? "";
  db_cred.DatabasePort = env.DB_PORT ?? "0";
  db_cred.DatabaseHost = env.DB_HOST ?? "";
}

// Express App Initialization
const app = express();
app.use(cors());

// GraphQL Type Definitions and Resolvers (Assumed default exports)
import { ServerContext } from "./Utils/Auth.ts";
import typeDefs from "./Schema/Schema.ts";
import resolvers from "./Resolvers/Resolver.ts";
import dataSources from "./DataSource/DataSource.ts";

// Start Apollo Server with Express
async function startApolloServer(
  typeDefs: any,
  resolvers: any,
  dataSources: any,
  context: any
) {
  let httpServer: http.Server;

  if (Configuration.ssl) {
    const serverOptions: ServerOptions = {};
    httpServer = createHttpsServer(serverOptions, app);
  } else {
    httpServer = createHttpServer(app);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    bodyParserConfig: {
      limit: "10mb",
    },
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: Configuration.port }, () => resolve())
  );

  console.log(
    "Server ready at",
    `http${Configuration.ssl ? "s" : ""}://${Configuration.hostname}:${
      Configuration.port
    }${server.graphqlPath}`
  );
}

// Set up environment and start Apollo Server
setUpEnv()
  .then(() => {
    console.log("Environment loaded successfully");
    startApolloServer(typeDefs, resolvers, dataSources, ServerContext).catch(
      (error) => {
        console.error("Failed to start Apollo Server:", error);
        Deno.exit(1); // Exit process on failure
      }
    );
  })
  .catch((error) => {
    console.error("Failed to set up environment:", error);
    Deno.exit(1); // Exit process on failure
  });
