import { RESTDataSource } from "apollo-datasource-rest";

class RestEnseval extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "";
  }

  async getAPIData(custID: string): Promise<string | undefined> {
    if (custID) {
      try {
        const response = await this.get(custID);

        if (response.firstName == null) {
          response.firstName = "";
        }
        return response.firstName;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propagate the error to the caller
      }
    }

    return undefined; // Ensure all code paths return a value
  }

  dataReducer(data: any): any {
    return {
      ID: data.ID,
      RefID: data.RefID,
      Channel: data.Channel,
      Method: data.Method,
      Host: data.Host,
      Path: data.Path,
      Protocol: data.Protocol,
      ContentLength: data.ContentLength,
      ContentType: data.ContentType,
      Body: data.Body,
      Response: data.Response,
      Type: data.Type,
      date: data.CreationDate.date,
      timezone_type: data.CreationDate.timezone_type,
      timezone: data.CreationDate.timezone,
    };
  }
}

export default RestEnseval;
