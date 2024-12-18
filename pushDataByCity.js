const fs = require("fs");
const path = require("path");
require('dotenv').config();
const cityKeyEnv=process.env.CITY_KEY


const filePath = path.join(__dirname, `/file/group/${cityKeyEnv}.json`);
const rawData = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(rawData);



// Hàm nhóm dữ liệu
function groupData(data) {
  const groupedData = [];

  const firstElement = data[0];

  const objectNewData = {
    code: firstElement.code,
    type: "City",
    viNameLanguage: firstElement.nameCategory,
    postalCode: firstElement.postalCode,
    keyAccentLanguage: firstElement.keyAccentLanguage,
    districtList: [],
  };

  objectNewData.districtList.push(...data.slice(1));

  return objectNewData;
}

// Nhóm dữ liệu
const groupedData = groupData(data);

// Lưu dữ liệu đã nhóm vào file JSON mới
const outputPath = path.join(__dirname, `/file/push_city/${cityKeyEnv}.json`);
fs.writeFileSync(outputPath, JSON.stringify(groupedData, null, 2), "utf8");

console.log(`Đã chuyển đổi dữ liệu và lưu vào file/${cityKeyEnv}.json`);
