import { DataSource, DataSourceConfig } from "apollo-datasource";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import UserDataSource from "../user/UserDS.ts";

const env = config();

interface MostransPGDB {
  sequelize: any;
}

class LandingDatasource extends DataSource {
  MostransPGDB: MostransPGDB;
  context: any;

  constructor({ MostransPGDB }: { MostransPGDB: MostransPGDB }) {
    super();
    this.MostransPGDB = MostransPGDB;
  }

  override initialize(config: DataSourceConfig<any>): void {
    this.context = config.context;
  }
  async getSlider() {
    const userDataSource = new UserDataSource({
      MostransPGDB: this.MostransPGDB,
    });
    const token = await userDataSource.getAllToken(1, 1);
    let validToken;
    if (token.data) {
      const expired = new Date() > token.data[0].timeout;
      if (expired) {
        const login = await userDataSource.userLogin(
          "johndoe@example.com",
          "password123"
        );
        validToken = login.data.token;
      } else {
        validToken = token.data[0].token;
      }
    }

    const response = await fetch(env.MICROSOFT_GRAPH_GET_LIST_LANDING, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${validToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const ids = data.value.map((item: { id: string }) => item.id);
    const result = [];

    for (const id of ids) {
      const response = await fetch(
        env.MICROSOFT_GRAPH_GET_LIST_LANDING + "/" + id,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${validToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const extractedData = {
        id: data.fields.ContentID,
        sender: data.fields.Short_x002d_ContentDescription,
        content: data.fields.Long_x002d_ContentDescription,
        segment: data.fields.ContentSegment,
      };
      result.push(extractedData);
    }

    return result;
  }
}
export default LandingDatasource;
