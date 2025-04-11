import { createServer as createHttpsServer, ServerOptions } from "https";
import { createServer as createHttpServer } from "http";
import { ApolloServer } from "npm:apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "npm:apollo-server-core";

import express from "npm:express";
import http from "http";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import cors from "cors";
// import { setupAssociations } from "./ModelDB/Mostrans/user/UserDB.ts";

// Call the setupAssociations function to initialize the relationships
// setupAssociations();
// Load ENV

const env = config();

// DB connection
import { MostransPG } from "./Database/MostransPGDB.ts";
MostransPG(); // Inisialisasi koneksi DB

// Server context
import { ServerContext } from "./Utils/Auth.ts";

// Base schema dan resolver (yang lama)
import baseTypeDefs from "./Schema/Schema.ts";
import baseResolvers from "./Resolvers/Resolver.ts";

// Schema dan resolver untuk mt_master_ticket
import ticketTypeDefs from "./Schema/Mostrans/General/mt_master_ticket.ts";
import ticketResolvers from "./Resolvers/Mostrans/General/mt_master_ticket.ts";

// DataSource
import dataSources from "./DataSource/DataSource.ts";

// App config
interface Configuration {
  ssl: boolean;
  hostname: string;
  port: number;
}
const Configuration: Configuration = {
  ssl: env.SSL === "true",
  hostname: env.HOSTNAME ?? "localhost",
  port: parseInt(env.PORT ?? "4000"),
};

interface DbCredentials {
  DatabaseName: string;
  DatabaseUsername: string;
  DatabasePassword: string;
  DatabasePort: string;
  DatabaseHost: string;
}
const db_cred: DbCredentials = {
  DatabaseName: "",
  DatabaseUsername: "",
  DatabasePassword: "",
  DatabasePort: "",
  DatabaseHost: "",
};

// Set environment dari .env
async function setUpEnv() {
  db_cred.DatabaseName = env.DB_NAME ?? "";
  db_cred.DatabaseUsername = env.DB_USERNAME ?? "";
  db_cred.DatabasePassword = env.DB_PASSWORD ?? "";
  db_cred.DatabasePort = env.DB_PORT ?? "0";
  db_cred.DatabaseHost = env.DB_HOST ?? "";
}

// Start Apollo Server
async function startApolloServer(
  typeDefs: any,
  resolvers: any,
  dataSources: any,
  context: any
) {
  const app = express();
  app.use(cors());

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
    `http${Configuration.ssl ? "s" : ""}://${Configuration.hostname}:${Configuration.port}${server.graphqlPath}`
  );
}

// 🔄 Inisialisasi dan run server
setUpEnv()
  .then(() => {
    console.log("Environment loaded successfully");

    // Merge all typeDefs and resolvers
    const mergedTypeDefs = [baseTypeDefs, ticketTypeDefs];
    const mergedResolvers = {
      Query: {
        ...baseResolvers.Query,
        ...ticketResolvers.Query,
      },
      Mutation: {
        ...baseResolvers.Mutation,
        ...ticketResolvers.Mutation,
      },
    };

    startApolloServer(
      mergedTypeDefs,
      mergedResolvers,
      dataSources,
      ServerContext
    ).catch((error) => {
      console.error("Failed to start Apollo Server:", error);
      Deno.exit(1);
    });
  })
  .catch((error) => {
    console.error("Failed to set up environment:", error);
    Deno.exit(1);
  });
