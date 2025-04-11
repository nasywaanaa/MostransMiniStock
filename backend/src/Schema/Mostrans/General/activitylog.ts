export const types = `
  type Activity {
    IDUpdate: Int
    IDProduct: Int
    IDOperator: Int
    Action: String
    Notes: String
    UpdateDate: String
    UpdateTime: String
  }

  type Slider {
    id: Int
    name: String
    imageUrl: String
  }
`;

export const queries = `
  historyLog: [Activity]
  getSlider: [Slider]
`;

export const mutations = ``;
