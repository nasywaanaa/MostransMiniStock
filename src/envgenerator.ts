import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  
  const secret_name = "sm-rds-mostrans";
  
  const client = new SecretsManagerClient({
    region: "ap-southeast-1",
  });
  
  let response;

 
  
//   const secret = response.SecretString;

export const secret = async() => {
    try {
        response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
      } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
      }
      return response.SecretString;
}
  
  // Your code goes here