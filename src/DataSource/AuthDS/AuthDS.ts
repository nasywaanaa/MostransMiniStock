import { MasterUserTable } from "../../ModelDB/Mostrans/General/UserDB.ts";
import { constructUser } from "../../Models/Mostrans/General/UserModel.ts";

const tableUser = MasterUserTable();

interface ReturnData {
  data: any;
  errMsg: string;
}

export const getUserByIDAuth = async (
  MostransPGDB: any,
  id: string
): Promise<ReturnData> => {
  const returnData: ReturnData = {
    data: null,
    errMsg: "",
  };

  try {
    let sql = `SELECT `;

    // Construct Return Query
    tableUser.tableKolom.forEach((kolom: string, idx: number) => {
      if (
        kolom === "id" ||
        kolom === "email" ||
        kolom === "role" ||
        kolom === "hak_akses"
      ) {
        sql += `${tableUser.alias}.${kolom} AS ${tableUser.alias}_${kolom}, `;
      }
    });
    sql = sql.slice(0, -2); // Remove the trailing comma and space

    // Construct Resource Table
    sql += ` FROM ${tableUser.tableQuery}`;

    // Construct WHERE Clause
    sql += ` WHERE ${tableUser.alias}.id = $id;`;

    // const [status, result, metadata] = await CommonFunction.DoQueryNonArray(
    //   MostransPGDB,
    //   sql,
    //   { id }
    // );

    const [status, result, metadata] = await MostransPGDB.query(sql, { id });

    if (status === 1) {
      returnData.errMsg = "Failed Auth";
      return returnData;
    }

    if (metadata.rowCount === 0) {
      returnData.errMsg = "User Unknown";
      return returnData;
    }

    const resultData = constructUser(result);
    returnData.data = resultData;
  } catch (e: any) {
    returnData.errMsg = `Catch Error: ${e.message}`;
  }

  return returnData;
};

export const insertLoggingMutation = async (db: any, objLog: any) => {
  // Implementation code
};

export const insertLogging = async (db: any, objLog: any) => {
  // Implementation code
};
