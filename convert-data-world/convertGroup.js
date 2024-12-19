const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const cityKeyEnv = process.env.CITY_KEY;
const inputLanguage = process.env.INPUT_LANGUAGE;
const outputLanguage = process.env.OUTPUT_LANGUAGE;
const postCode = process.env.POST_CODE;

// Đọc dữ liệu từ file JSON
const filePath = path.join(__dirname, `file/data_file_js/alabama.json`);
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

async function translateText(inputText, inputLanguage, outputLanguage) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURIComponent(
    inputText
  )}`;

  try {
    const response = await axios.get(url);
    return response.data[0][0][0]; // Trả về bản dịch
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
}

// Hàm nhóm dữ liệu các tỉnh
async function groupData(data) {
  const groupedData = [];

  const stateValue=data

  const listCountries = stateValue.counties;
  stateValue.keyAccentLanguage=data.nameState.toLowerCase() 
  for (const item of listCountries) {
    // Sử dụng for...of thay vì forEach
    const objectCounties=item
    objectCounties.keyAccentLanguage=item.name.toLowerCase() 
    for (const item of objectCounties.cities) {
        const objectCities=item
        objectCities.keyAccentLanguage=item.name.toLowerCase() 
    }
  }

  return groupedData;
}


async function main() {
  // Nhóm dữ liệu
  const groupedData = await groupData(data);

  // Lưu dữ liệu đã nhóm vào file JSON mới
  const outputPath = path.join(__dirname, `/file/data_push/alabama.json`);
  fs.writeFileSync(outputPath, JSON.stringify(groupedData, null, 2), "utf8");

  console.log(`Đã chuyển đổi dữ liệu và lưu vào /file/data_push/alabama.json`);
}

main(); // Gọi hàm main
