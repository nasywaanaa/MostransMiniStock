export const activityLogSchema = `
  type Activity {
    IDUpdate: Int
    IDProduct: Int
    IDOperator: Int
    Action: String
    Notes: String
    UpdateDate: String
    UpdateTime: String
  }

  type Query {
    historyLog: [Activity]
    getSlider: [Slider]
  }

  type Slider {
    id: Int
    name: String
    imageUrl: String
    # Add other fields as necessary
  }
`;
