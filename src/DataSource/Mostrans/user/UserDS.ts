import {
  MasterUserTable,
  TokenMicrosoftTable,
} from "../../../ModelDB/Mostrans/General/UserDB.ts";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import {
  constructResponseOK,
  constructResponseNOK,
  Response,
} from "../../../Models/Mostrans/Response/ResponseModel.ts";
import * as CommonFunction from "../../../Function/CommonFunction.ts";
import {
  constructLoginData,
  constructTokenMicrosoft,
  constructUser,
} from "../../../Models/Mostrans/General/UserModel.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();

const user = MasterUserTable();
const token = TokenMicrosoftTable();

interface ReturnData<T> {
  data: T | null;
  response: Response;
}

interface Token {
  id: number;
  token: string;
  timeout: Date;
}

interface MostransPGDB {
  sequelize: any;
}

class UserDataSource extends DataSource {
  MostransPGDB: MostransPGDB;
  context: any;

  constructor({ MostransPGDB }: { MostransPGDB: MostransPGDB }) {
    super();
    this.MostransPGDB = MostransPGDB;
  }

  override initialize(config: DataSourceConfig<any>): void {
    this.context = config.context;
  }

  async getAllUser(
    pageNumber: number = 1,
    pageSize: number = 5,
    filters: Record<string, any> = {}
  ): Promise<ReturnData<any[]>> {
    const returnData: ReturnData<any[]> = {
      data: null,
      response: constructResponseOK(0),
    };

    try {
      let sql = `SELECT `;
      // Construct Return Query
      user.arrQuery.forEach((element: string) => {
        sql += element + ", ";
      });
      sql = sql.slice(0, -2); // Remove the trailing comma and space

      // Construct Resource Table
      sql += ` FROM ${user.tableQuery}`;

      // Add filters dynamically
      const filterClauses = [];
      for (const [field, value] of Object.entries(filters)) {
        filterClauses.push(`${user.alias}.${field} LIKE '%${value}%'`);
      }
      if (filterClauses.length > 0) {
        sql += ` WHERE ` + filterClauses.join(" AND ");
      }

      // Add pagination
      const offset = (pageNumber - 1) * pageSize;

      sql += ` LIMIT ${pageSize} OFFSET ${offset}`;

      const [status, result, metadata] = await CommonFunction.DoQuery(
        this.MostransPGDB,
        sql,
        {}
      );

      if (status === 1) {
        returnData.response = constructResponseNOK("error");
        return returnData;
      }

      if (metadata.rowCount === 0) {
        returnData.response = constructResponseNOK("Data Not Found");
        return returnData;
      }

      const resultData = result.map((data: any) => constructUser(data));
      returnData.data = resultData;
    } catch (e: any) {
      returnData.response = constructResponseNOK(e.message);
    }
    return returnData;
  }

  async getUserById(id: string): Promise<ReturnData<any>> {
    const returnData: ReturnData<any> = {
      data: null,
      response: constructResponseOK(0),
    };

    try {
      let sql = `SELECT `;
      // Construct Return Query
      user.arrQuery.forEach((element: string) => {
        sql += element + ", ";
      });
      sql = sql.slice(0, -2); // Remove the trailing comma and space

      // Construct Resource Table
      sql += ` FROM ${user.tableQuery}`;

      // Add filters dynamically
      const filterClauses = [];
      filterClauses.push(`${user.alias}.id = '${id}'`);

      if (filterClauses.length > 0) {
        sql += ` WHERE ` + filterClauses.join(" AND ");
      }

      const [status, result, metadata] = await CommonFunction.DoQuery(
        this.MostransPGDB,
        sql,
        {}
      );

      if (status === 1) {
        returnData.response = constructResponseNOK("error");
        return returnData;
      }

      if (metadata.rowCount === 0) {
        returnData.response = constructResponseNOK("Data Not Found");
        return returnData;
      }

      const resultData = result.map((data: any) => constructUser(data));
      returnData.data = resultData[0];
    } catch (e: any) {
      returnData.response = constructResponseNOK(e.message);
    }
    return returnData;
  }

  async getAllToken(
    pageNumber: number = 1,
    pageSize: number = 5,
    filters: Record<string, any> = {}
  ): Promise<ReturnData<Token[]>> {
    const returnData: ReturnData<any[]> = {
      data: null,
      response: constructResponseOK(0),
    };

    try {
      let sql = `SELECT `;
      // Construct Return Query
      token.arrQuery.forEach((element: string) => {
        sql += element + ", ";
      });
      sql = sql.slice(0, -2); // Remove the trailing comma and space

      // Construct Resource Table
      sql += ` FROM ${token.tableQuery}`;

      // Add pagination
      const offset = (pageNumber - 1) * pageSize;

      sql += ` ORDER BY timeout DESC LIMIT ${pageSize} OFFSET ${offset}`;

      const [status, result, metadata] = await CommonFunction.DoQuery(
        this.MostransPGDB,
        sql,
        {}
      );

      if (status === 1) {
        returnData.response = constructResponseNOK("error");
        return returnData;
      }

      if (metadata.rowCount === 0) {
        returnData.response = constructResponseNOK("Data Not Found");
        return returnData;
      }

      const resultData = result.map((data: any) =>
        constructTokenMicrosoft(data)
      );
      returnData.data = resultData;
    } catch (e: any) {
      returnData.response = constructResponseNOK(e.message);
    }
    return returnData;
  }

  async userLogin(email: string, password: string): Promise<any> {
    const returnData: ReturnData<any> = {
      data: null,
      response: constructResponseOK(0),
    };

    try {
      let sql = `SELECT muser.id muser_id,  muser.nama muser_nama, muser.email muser_email`;

      // Construct Resource Table
      sql += ` FROM ${user.tableQuery}`;

      // Add filters dynamically
      const filterClauses = [];
      filterClauses.push(`${user.alias}.email = '${email}'`);
      filterClauses.push(`${user.alias}.password = '${password}'`);

      if (filterClauses.length > 0) {
        sql += ` WHERE ` + filterClauses.join(" AND ");
      }

      const [status, result, metadata] = await CommonFunction.DoQuery(
        this.MostransPGDB,
        sql,
        {}
      );

      if (status === 1) {
        returnData.response = constructResponseNOK("error");
        return returnData;
      }

      if (metadata.rowCount === 0) {
        returnData.response = constructResponseNOK("User Not Found");
        return returnData;
      }

      let validToken = false;
      const latestToken = await this.getAllToken(1, 1, {});

      if (latestToken.data !== null) {
        if (new Date() < latestToken.data[0].timeout) {
          validToken = true;
        }
      }

      if (!validToken || latestToken.data === null) {
        const tokenResponse = await fetch(env.MICROSOFT_GRAPH_LOGIN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: env.MICROSOFT_GRAPH_GRANT_TYPE,
            client_id: env.MICROSOFT_GRAPH_CLIENT_ID,
            client_secret: env.MICROSOFT_GRAPH_CLIENT_SECRET,
            scope: env.MICROSOFT_GRAPH_SCOPE,
          }).toString(),
        });

        const tokenData = await tokenResponse.json();
        result[0].muser_token = tokenData.access_token;

        this.insertToken(tokenData.access_token);
      } else {
        result[0].muser_token = latestToken.data[0].token;
      }

      const resultData = result.map((data: any) => constructLoginData(data));

      returnData.data = resultData[0];
    } catch (e: any) {
      returnData.response = constructResponseNOK(e.message);
    }
    console.log("return Data", returnData);
    return returnData;
  }

  async insertToken(inputs: any): Promise<Response> {
    let returnData: Response = constructResponseOK(0);
    const transaction = await this.MostransPGDB.sequelize.transaction();

    console.log(inputs);
    try {
      // Extract columns and values from inputs
      const columns = Object.keys(inputs).join(", ");
      const values = Object.values(inputs);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

      // Ensure columns and placeholders are not empty
      if (!columns || !placeholders) {
        throw new Error("No columns or values provided for insertion");
      }

      const dateUTC = new Date(Date.now() + 1 * 60 * 60 * 1000);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const localTimeString = dateUTC
        .toLocaleString("en-GB", options)
        .replace(",", "")
        .replace(/\//g, "-")
        .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");

      // Construct the SQL query
      const sql = `INSERT INTO ${
        token.tableQuery.split(" ")[0]
      } (token, timeout) VALUES ('${inputs}', '${localTimeString}') RETURNING id;`;

      console.log("ini sql", sql);

      // Execute the SQL query directly
      const [status, result] = await this.MostransPGDB.sequelize.query(sql, {
        bind: inputs,
        type: this.MostransPGDB.sequelize.QueryTypes.INSERT,
        transaction,
      });

      if (status === 1) {
        await transaction.rollback();
        returnData = constructResponseNOK(result);
        return returnData;
      }
      await transaction.commit();
    } catch (e: any) {
      await transaction.rollback();
      returnData = constructResponseNOK(e.message);
    }
    return returnData;
  }
}

export default UserDataSource;
