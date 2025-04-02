export interface Response {
  status: string;
  errMsg: string;
  id_affected: number;
  message?: string;
  return_id?: string;
}

export const constructResponseOK = (id_affected: number) => {
  const objResult = {
    status: "200",
    errMsg: "OK",
    id_affected: id_affected,
  };
  return objResult;
};

export const constructResponseInsertOK = (
  id_affected: number,
  return_id?: string
) => {
  const objResult = {
    status: "200",
    errMsg: "OK",
    id_affected: id_affected,
    return_id,
  };
  return objResult;
};

export const constructResponseNOK = (notes: string) => {
  const objResult = {
    status: "001",
    errMsg: "NOK:" + notes,
    id_affected: 0,
  };
  return objResult;
};

export const constructResponseOKCustom = (
  first_id: string,
  second_id: string
) => {
  const objResult = {
    status: "000",
    errMsg: "OK",
    driver_id: first_id,
    detail_driver_id: second_id,
  };
  return objResult;
};

export const constructResponseNOKCustom = (notes: string, data: string) => {
  const objResult = {
    status: "001",
    errMsg: "NOK:" + notes,
    id_affected: 0,
    param_inputs: data,
  };
  return objResult;
};

export const constructResponseNOKCustomDB = (notes: string) => {
  const objResult = {
    status: "002",
    errMsg: "NOK:" + notes,
    id_affected: 0,
  };
  return objResult;
};

export const constructResponseOKAbsen = (id_affected: number, link: string) => {
  const objResult = {
    status: "000",
    errMsg: "OK",
    id_affected: id_affected,
    csv_link: link,
  };
  return objResult;
};

export const constructResponseOKMeCheck = (
  id_affected: number,
  tot_score: number
) => {
  const objResult = {
    status: "000",
    errMsg: "OK",
    id_affected: id_affected,
    total_score: tot_score,
  };
  return objResult;
};

export const constructResponseOKFreight = (
  id_affected: number,
  order_id: number,
  trip_id: number
) => {
  const objResult = {
    status: "000",
    errMsg: "OK",
    id_affected: id_affected,
    order_id: order_id,
    trip_id: trip_id,
  };
  return objResult;
};
