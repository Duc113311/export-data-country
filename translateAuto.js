const fs = require("fs");
const path = require("path");
const axios = require("axios");

require("dotenv").config();

const cityKeyEnv = process.env.CITY_KEY;
const inputLanguage = process.env.INPUT_LANGUAGE;
const outputLanguage = process.env.OUTPUT_LANGUAGE;

// Đọc dữ liệu từ file JSON
const filePath = path.join(__dirname, `/file/export_city/${cityKeyEnv}.json`);
const rawData = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(rawData);
let gtValue = inputLanguage;
let tlValue = outputLanguage;
// Hàm dịch văn bản
async function translateText(text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${gtValue}&tl=${tlValue}&dt=t&q=${encodeURIComponent(
    text
  )}`;

  try {
    const response = await axios.get(url);
    return response.data[0][0][0]; // Trả về bản dịch
  } catch (error) {
    console.error("Error fetching translation:", error);
    return text; // Trả về văn bản gốc nếu có lỗi
  }
}

// Hàm dịch toàn bộ đối tượng
async function translateObject(data) {
  const translatedObject = {};

  for (const [key, value] of Object.entries(data)) {
    const translatedValue = await translateText(value);
    translatedObject[key] = translatedValue;
  }

  return translatedObject;
}

// Hàm chính
async function main() {
  const translatedData = await translateObject(data);

  // Lưu dữ liệu đã dịch vào file JSON mới
  const outputPath = path.join(
    __dirname,
    `/file/translate/${cityKeyEnv}/${cityKeyEnv}_${tlValue}.json`
  );

  // Tạo thư mục nếu chưa tồn tại
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(translatedData, null, 2), "utf8");

  console.log(`Đã dịch dữ liệu và lưu vào file ${cityKeyEnv}_${tlValue}.json`);
}

main(); // Gọi hàm main
