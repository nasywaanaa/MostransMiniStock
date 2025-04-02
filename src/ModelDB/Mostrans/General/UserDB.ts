interface Table {
  nama: string;
  alias: string;
  kolom: string[];
  additionalKolom: string[];
}

interface TableData {
  alias: string;
  tableName: string;
  tableQuery: string;
  tableKolom: string[];
  arrAlias: string[];
  arrQuery: string[];
  arrGraphQL: string[];
  arrInputGraphQL: string[];
}

const createTableData = (
  tableName: string,
  alias: string,
  kolom: string[],
  additionalKolom: string[] = []
): TableData => {
  const tableQuery = `${tableName} ${alias}`;
  const arrAlias: string[] = [];
  const arrQuery: string[] = [];
  const arrGraphQL: string[] = [];
  const arrInputGraphQL: string[] = [];

  kolom.forEach((element) => {
    const aliasResult = `${alias}_${element}`;
    const kolomQry = `${alias}.${element}`;

    arrAlias.push(aliasResult);
    arrQuery.push(`${kolomQry} as ${aliasResult}`);
    arrGraphQL.push(`${element}:String \n`);

    if (
      element !== "id" &&
      element !== "create_date" &&
      element !== "update_date"
    ) {
      arrInputGraphQL.push(`${element}:String \n`);
    }
  });

  additionalKolom.forEach((element) => {
    arrGraphQL.push(`${element} \n`);
  });

  return {
    alias: alias,
    tableName: tableName,
    tableQuery: tableQuery,
    tableKolom: kolom,
    arrAlias: arrAlias,
    arrQuery: arrQuery,
    arrGraphQL: arrGraphQL,
    arrInputGraphQL: arrInputGraphQL,
  };
};
// mt_master_user Table
export const MasterUserTable = (): TableData => {
  const tableName = "mt_master_user";
  const alias = "muser";
  const kolom = [
    "id",
    "nama",
    "phone",
    "email",
    "create_by",
    "create_date",
    "password",
  ];

  return createTableData(tableName, alias, kolom);
};

// mt_token_microsoft Table
export const TokenMicrosoftTable = (): TableData => {
  const tableName = "mt_token_microsoft";
  const alias = "mtoken";
  const kolom = ["id", "token", "timeout"];

  return createTableData(tableName, alias, kolom);
};
