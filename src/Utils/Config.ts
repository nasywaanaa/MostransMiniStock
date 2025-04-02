// server
const configurations = {
  production: { ssl: true, port: 500, hostname: "mostrans.co.id" }, // Integration
  development: { ssl: false, port: 4021, hostname: "localhost" },
};

export const db_cred = {
  DatabaseName: "",
  DatabaseUsername: "",
  DatabasePassword: "",
  DatabasePort: "",
  DatabaseHost: "",
};

export const Configuration = configurations["development"];

// Certificate
export const Certificate = "";
export const CertificateKey = "";

// Base Url
export const BaseUrl = "";

// Url Rest
// export const PaymentLayoutUrl = 'payment/checkOutPayment' // production
export const PaymentLayoutUrl = ""; // integration
// export const PaymentHistory = '' // production
export const PaymentHistory = ""; // integration

// Key Rijndael Password
export const RijndaelKey = "";

// Key TDES for Payment
export const PaymentKey = "";

export const JWT_SECRET = "mostransDigital";

// export const default_url_download = "http://localhost:5011" //ini local
export const csv_path_Fleet = "./src/csv/Fleet";
// export const default_url_download = "https://apidev.mostrans.co.id" // ini dev
// export const default_url_download = "http://localhost:5011" // ini local
export const default_url_download = "https://apidev.mostrans.co.id"; // ini prod
