// Import thư viện 'xlsx'
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
require('dotenv').config();


const cityNameEnv=process.env.CITY_NAME
const cityKeyEnv=process.env.CITY_KEY

// Đường dẫn tới file Excel (đảm bảo file ở cùng thư mục với script này)
const filePath = path.join(__dirname, `/file/city_excel/${cityNameEnv}.xlsx`);

// Đọc file Excel
const workbook = xlsx.readFile(filePath);

// Lấy tên của sheet đầu tiên
const sheetName = workbook.SheetNames[0];

// Lấy dữ liệu từ sheet đầu tiên
const sheet = workbook.Sheets[sheetName];

// Chuyển dữ liệu trong sheet thành JSON
const data = xlsx.utils.sheet_to_json(sheet);

// In ra kết quả
console.log(data);
const transformedData = transformKeys(data);

const jsonData = JSON.stringify(transformedData, null, 2);

// Đường dẫn để lưu file JSON
const filePathJson = path.join(__dirname, `/file/city_json/${cityKeyEnv}.json`);

// Ghi dữ liệu vào file JSON
fs.writeFile(filePathJson, jsonData, "utf8", (err) => {
  if (err) {
    console.error("Lỗi khi ghi file:", err);
    return;
  }
  console.log("Đã ghi dữ liệu vào file output.json");
});


function transformKeys(data) {
  return data.map((item) => {
    return {
      code: item["STT"],
      city: item["Tỉnh/Huyện/Phường/Xã"],
      category: item["Type"] || null,
      nameCategory: item["Phân loại"] || null,
      viKeyLanguage: item["Key"],
      viNameLanguage: item["Translate Value"],
    };
  });
}
