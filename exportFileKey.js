const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cityKeyEnv = process.env.CITY_KEY;

const filePath = path.join(__dirname, `/file/group/${cityKeyEnv}.json`);
const rawData = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(rawData);

function groupData(data) {
  let newArrays = [];
  let districtListValue = data;
  console.log("districtListValue", districtListValue);

  // const districtListValue = data;
  for (let index = 0; index < districtListValue.length; index++) {
    const elementDistrict = districtListValue[index];
    const keyAccentLanguageV = elementDistrict.keyAccentLanguage;
    newArrays.push({
      [keyAccentLanguageV]: elementDistrict.viNameLanguage,
    });
    if (elementDistrict.wards.length !== 0) {
      for (
        let wardIndex = 0;
        wardIndex < elementDistrict.wards.length;
        wardIndex++
      ) {
        const elementWards = elementDistrict.wards[wardIndex]; // Sửa lại biến
        const keyWardsV = elementWards.keyAccentLanguage; // Lấy giá trị từ elementWards
        newArrays.push({ [keyWardsV]: elementWards.viNameLanguage }); // Sử dụng keyWardsV làm key
      }
    }
  }
  return newArrays; // Thêm giá trị trả về
}

// Nhóm dữ liệu
const groupedData = groupData(data);

const resultObject = groupedData.reduce((accumulator, current) => {
  return { ...accumulator, ...current }; // Gộp các đối tượng vào accumulator
}, {});

// Lưu dữ liệu đã nhóm vào file JSON mới
const outputPath = path.join(__dirname, `/file/export_city/${cityKeyEnv}.json`);
fs.writeFileSync(outputPath, JSON.stringify(resultObject, null, 2), "utf8");

console.log(`Đã chuyển đổi dữ liệu và lưu vào file/${cityKeyEnv}.json`);
