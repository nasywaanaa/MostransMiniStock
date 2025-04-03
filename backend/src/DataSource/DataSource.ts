// Import MostransPG function from MostransPGDB module
import { MostransPG } from "../Database/MostransPGDB.ts";
import LandingDatasource from "./Mostrans/General/LandingDS.ts";

// Import KotaDataSource class from KotaDS module
import UserDataSource from "./Mostrans/user/UserDS.ts";

// Initiate MostransPGDB instance
export const MostransPGDB = MostransPG();

// Define DataSource function
const DataSource = () => ({
  UserDatasource: new UserDataSource({ MostransPGDB }),
  LandingDatasource: new LandingDatasource({ MostransPGDB }),
});

// Export DataSource function as default
export default DataSource;
