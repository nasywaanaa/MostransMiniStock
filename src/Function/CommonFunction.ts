export const DoQuery = (
  database: any, // Replace 'any' with your Sequelize database type
  sql: string,
  bind: any // Replace 'any' with the type you expect for bind
): Promise<[number, any[], any]> => {
  // Adjust the return type accordingly
  return database.sequelize
    .query(sql, {
      bind: bind,
      raw: true,
    })
    .then(async ([results, metadata]: [any[], any]) => {
      return [0, results, metadata];
    })
    .catch(function (err: any) {
      return [1, err, null];
    });
};

// Function to perform a query and return a non-array output
export const DoQueryNonArray = (
  database: any,
  sql: string,
  bind: any
): Promise<[number, any, any]> => {
  return database.sequelize
    .query(sql, {
      bind: bind,
      raw: true,
    })
    .then(async ([results, metadata]: [any[], any]) => {
      return [0, results[0], metadata];
    })
    .catch(function (err: any) {
      return [1, err, null];
    });
};
