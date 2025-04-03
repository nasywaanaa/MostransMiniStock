import {
  MasterUserTable,
  TokenMicrosoftTable,
} from "../../../ModelDB/Mostrans/General/UserDB.ts";

const masterUser = MasterUserTable();
const token = TokenMicrosoftTable();

let _type = ` type User { `;
masterUser.arrGraphQL.forEach((element: string) => {
  _type += element;
});
_type += ` } `;

_type += ` type LoginData { 
  id: String,
  email: String,
  nama: String,
  token: String,
}`;

_type += ` type Token { `;
token.arrGraphQL.forEach((element: string) => {
  _type += element;
});
_type += ` } `;

_type += ` type result_list_user{
    data:[User],
    response:Response
}`;

_type += ` type result_search_user{
  data:User,
  response:Response
}`;

_type += ` type result_list_token{
    data:[Token],
    response:Response
}`;

_type += ` type result_latest_token {
    data:[Token],
    response:Response,
    expired:Boolean  
}`;

_type += ` type login_response{
    data:LoginData,
    response:Response
}`;

_type += ` input UserFilterInput {
  nama: String
}`;

export const types = _type;

let _inputs = ` input TokenInput {`;
token.arrInputGraphQL.forEach((element: string) => {
  _inputs += element;
});

_inputs += ` } `;

export const inputs = _inputs;

export const queries = `
    getAllUser(pageNumber: Int, pageSize: Int, filters: UserFilterInput): result_list_user
    getAllToken(pageNumber: Int, pageSize: Int): result_list_token
    getUserById(id: String): result_search_user

    getLatestToken: result_latest_token
    userLogin(email: String, password: String): login_response
`;

export const mutations = `
    insertToken(input: TokenInput): Response
`;
