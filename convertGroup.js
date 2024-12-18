const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const cityKeyEnv = process.env.CITY_KEY;
const inputLanguage = process.env.INPUT_LANGUAGE;
const outputLanguage = process.env.OUTPUT_LANGUAGE;
const postCode = process.env.POST_CODE;

// Đọc dữ liệu từ file JSON
const filePath = path.join(__dirname, `/file/data_file_js/${cityKeyEnv}.json`);
const rawData = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(rawData);
const postalCode = postCode;

function removeDiacritics(str) {
  if (typeof str !== "string") {
    console.error("Input must be a string, but got:", str);
    return ""; // Trả về chuỗi rỗng nếu input không hợp lệ
  }

  return str
    .normalize("NFD") // Tách ký tự dấu
    .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
}

function convertToSnakeCase(inputString) {
  return inputString.replace(/ /g, "_").toLowerCase();
}

// Hàm nhóm dữ liệu các tỉnh
async function groupData(data) {
  const groupedData = [];

  const stateValue = data;
  stateValue.keyAccentLanguage = convertToSnakeCase(data.nameState.toLowerCase());

  const listCountries = stateValue.counties;
  for (const item of listCountries) {
    // Sử dụng for...of thay vì forEach
    const objectCounties = item;
    objectCounties.keyAccentLanguage = convertToSnakeCase(item.name.toLowerCase());
    // for (const item of objectCounties.cities) {
    //   const objectCities = item;
    //   objectCities.keyAccentLanguage = convertToSnakeCase(item.name.toLowerCase());
    // }
  }

  return stateValue;
}


// states Full
// async function groupData(data) {
//   const groupedData = [];

//   const stateValues = data.states;
  

//   for (const item of stateValues) {
//     // Sử dụng for...of thay vì forEach
//     const objectCounties = item;
//     objectCounties.keyAccentLanguage = convertToSnakeCase(item.nameState.toLowerCase());
//   }

//   return stateValues;
// }


async function main() {
  // Nhóm dữ liệu
  const groupedData = await groupData(data);

  console.log("groupedData", groupedData);

  // Lưu dữ liệu đã nhóm vào file JSON mới
  const outputPath = path.join(__dirname, `/file/data_push/${cityKeyEnv}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(groupedData, null, 2), "utf8");

  console.log(`Đã chuyển đổi dữ liệu và lưu vào /file/data_push/${cityKeyEnv}.json`);
}

main(); // Gọi hàm main
