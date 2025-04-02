import { AuthenticationError } from "apollo-server-core";
import {
  getUserByIDAuth,
  insertLogging,
  insertLoggingMutation,
} from "../DataSource/AuthDS/AuthDS.ts";
import { MostransPGDB } from "../DataSource/DataSource.ts";

interface Request {
  body: {
    query: string;
  };
  headers: {
    host: string;
    authorization?: string;
    email?: string;
    user_id?: string;
  };
}

interface Header {
  user_id: string;
  email: string;
  shipper_id: string;
  transporter_id: string;
  role: string;
  timestamp: string;
}

const checkActivity = async (req: Request, qry: string, header: Header) => {
  const result: { status: boolean; errMsg: string } = {
    status: false,
    errMsg: "OK",
  };

  if (
    qry.includes("getUserByUsername") ||
    qry.includes("getUserAdminByUsername") ||
    qry.includes("login")
  ) {
    return result;
  }

  try {
    const userID = header.user_id;
    const user = await getUserByIDAuth(MostransPGDB, userID);

    if (!user.data) {
      result.status = true;
      result.errMsg = `Authentication Error: ${user.errMsg}`;
      return result;
    }

    if (user.data.email !== header.email) {
      result.status = true;
      result.errMsg = "Authentication Error: Username does not match";
      return result;
    }

    if (
      (qry.includes("insertMasterKota") ||
        qry.includes("insertMasterJenisKendaraan")) &&
      user.data.role !== "ADMIN"
    ) {
      result.status = true;
      result.errMsg =
        "Authentication Error: User does not have sufficient privileges";
      return result;
    }

    if (qry.includes("insert") || qry.includes("update")) {
      await logMutation(req, qry, userID);
    }
  } catch (e: any) {
    result.status = true;
    result.errMsg = `Authentication Catch: ${e.message}`;
  }

  return result;
};

const logActivity = async (req: Request, qry: string, user_id: string) => {
  const objLog = {
    host_req: req.headers.host,
    create_by: user_id,
    function_name: qry,
  };

  await insertLogging(MostransPGDB, objLog);
};

const logMutation = async (req: Request, qry: string, user_id: string) => {
  let body_data = req.body.query.replace(/ /g, " ");
  body_data = body_data.replace(/\r?\n|\r/g, " ");
  qry = qry.replace(/\$/g, " ");
  body_data = body_data.replace(/\$/g, " ");

  const objLog = {
    function_name: qry,
    body_data,
    create_by: user_id,
  };

  await insertLoggingMutation(MostransPGDB, objLog);
};

export const ServerContext = async ({
  req,
  connection,
}: {
  req: Request;
  connection: any;
}) => {
  if (connection) {
    return connection.context;
  } else {
    // Handle HTTP request
    let qry = req.body.query.replace(/ /g, "");
    qry = qry.split("{")[1];
    qry = qry.replace(/\r?\n|\r/g, "");

    if (
      qry !== "__schema" &&
      !qry.includes("getUserByUsername") &&
      !qry.includes("login") &&
      !qry.includes("sendKonfirmasi") &&
      !qry.includes("registerShipper") &&
      !qry.includes("registerTransporter") &&
      !qry.includes("updateShipper") &&
      !qry.includes("updateTransporter")
    ) {
      let token =
        "eyJ1c2VyX2lkIjoiMTciLCJlbWFpbCI6ImNocmlzLnR1dHVoYXR1bmV3YUBlbnNldmFsLmNvbSIsInNoaXBwZXJfaWQiOiIyIiwidHJhbnNwb3J0ZXJfaWQiOiIwIiwicm9sZSI6IlNISVBQRVIiLCJ0aW1lc3RhbXAiOiIyMDI0LTA1LTIwIDEzOjA4OjU5In0=";

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        throw new AuthenticationError(
          "Token: You must be logged in to query this schema"
        );
      }

      let header: string;

      try {
        header = atob(token);
        const header1: Header = JSON.parse(header);
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() - 60);

        // if (currentTime < new Date(header.timestamp)) {
        //   throw new AuthenticationError("Token Timeout");
        // }

        const checkData = await checkActivity(req, qry, header1);

        if (!checkData.status) {
          throw new AuthenticationError(checkData.errMsg);
        }
      } catch (error) {
        const authError = error as Error;
        throw new AuthenticationError(`Fail Auth: ${authError.message}`);
      }
    }
  }
};
