export const types = `
  type Product {
    IDProduct: Int
    ProductName: String
    ProductCategory: String
    ProductDescription: String
    TotalStock: Int
    Unit: String
    Status: String
    MinimumCapacity: Int
    MaximumCapacity: Int
    Description: String
  }
`;

export const queries = `
  getAllProducts: [Product]
  getProductById(IDProduct: Int!): Product
`;

export const mutations = `
  updateProductStock(IDProduct: Int!, quantity: Int!, action: String!): Product
`;