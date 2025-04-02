import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
console.log("ini apa ya? ", "env-rds-dev");

const secret_name = "env-rds-dev";
const env = config();

// const client = new SecretsManagerClient({
//   region: process.env.REGION,
// });

// let response;

//   export async function secret () {
//     try {
//         response = await client.send(
//           new GetSecretValueCommand({
//             SecretId: secret_name,
//             VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//           })
//         );
//       } catch (error) {
//         // For a list of exceptions thrown, see
//         // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//         throw error;
//       }
//       return JSON.parse(response.SecretString);
// }

export const secret = async (secretName = secret_name) => {
  const client = new SecretsManagerClient({ region: env.REGION });
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
    })
  );
  console.log(response);

  if (response.SecretString) {
    return JSON.parse(response.SecretString);
  }

  if (response.SecretBinary) {
    return response.SecretBinary;
  }
};
