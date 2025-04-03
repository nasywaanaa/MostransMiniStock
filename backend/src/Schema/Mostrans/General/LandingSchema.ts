let _type = ``;
_type += ` type SliderResponse {
    id: String,
    content: String,
    sender: String,
    segment: String,
    attachment: String,
    created_at: String,
    updated_at: String,
}
`;
export const types = _type;
let _inputs = ``;
export const inputs = _inputs;

export const queries = `
    getSlider: [SliderResponse]
`;
let _mutation = ``;
export const mutations = _mutation;
