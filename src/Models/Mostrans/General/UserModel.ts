import {
  MasterUserTable,
  TokenMicrosoftTable,
} from "../../../ModelDB/Mostrans/General/UserDB.ts";

interface User {
  [key: string]: any;
}

export const constructUser = (data: any): User => {
  const masterUser = MasterUserTable();
  const objResult: User = {};

  masterUser.tableKolom.forEach((element: string, index: number) => {
    objResult[element] = data[masterUser.arrAlias[index]];
  });

  return objResult;
};

export const constructLoginData = (data: any): User => {
  const objResult: User = {};

  objResult["id"] = data["muser_id"];
  objResult["email"] = data["muser_email"];
  objResult["nama"] = data["muser_nama"];
  objResult["token"] = data["muser_token"];

  return objResult;
};

export const constructUserCustom = (data: User): User => {
  const masterUser = MasterUserTable();
  const objResult: User = {};

  masterUser.tableKolom.forEach((element: string, index: number) => {
    objResult[element] = data[0][masterUser.arrAlias[index]];
  });

  return objResult;
};

export const constructTokenMicrosoft = (data: any): User => {
  const table = TokenMicrosoftTable();
  const objResult: User = {};

  table.tableKolom.forEach((element: string, index: number) => {
    objResult[element] = data[table.arrAlias[index]];
  });

  return objResult;
};
