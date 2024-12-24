const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
const removeAccents = require("remove-accents");
const diacritics = require("diacritics");

const cityKeyEnv = process.env.CITY_KEY;
const inputLanguage = process.env.INPUT_LANGUAGE;
const outputLanguage = process.env.OUTPUT_LANGUAGE;
const postCode = process.env.POST_CODE;

// Đọc dữ liệu từ file JSON
const filePath = path.join(__dirname, `/file/city_json/${cityKeyEnv}.json`);
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

function splitStringArray(array) {
  const objectFirst = array[0];

  if (objectFirst === "Thành") {
    return array[0] + " " + array[1];
  }

  if (objectFirst === "Quận") {
    return array[0];
  }
  if (objectFirst === "Huyện") {
    return array[0];
  }
  if (objectFirst === "Phường") {
    return array[0];
  }
  if (objectFirst === "Xã") {
    return array[0];
  }

  if (objectFirst === "Thị") {
    return array[0] + " " + array[1];
  }
  return "Tỉnh thành"
}

// Hàm nhóm dữ liệu các tỉnh
async function groupData(data) {
  const groupedData = [];

  for (const item of data) {
    // Sử dụng for...of thay vì forEach
    // Tìm các mục có "district" là null, dùng làm nhóm chính
    if (item.category === null) {
      console.log("viKeyLanguage-district", item.viKeyLanguage);

      const typeLanguage = await translateText(
        splitStringArray(item.viKeyLanguage.split("_")),
        inputLanguage,
        outputLanguage
      );

      console.log("typeLanguage", typeLanguage);

      groupedData.push({
        code: item.code,
        category: item.category,
        type: typeLanguage,
        viNameLanguage: item.nameCategory,
        postalCode:
          groupedData.length !== 0
            ? postalCode + groupedData.length
            : postalCode,
        keyAccentLanguage: diacritics.remove(item.viKeyLanguage),
        wards: [], // Khởi tạo mảng rỗng cho danh sách phường/xã/thị trấn
      });
    } else {
      // Tìm nhóm phù hợp theo "category" và thêm vào "wards"
      const group = groupedData.find(
        (g) => g.viNameLanguage === item.nameCategory && g.category === null
      );
      if (group) {
        console.log("viKeyLanguage-ward", item.viKeyLanguage);

        const typeLanguage = await translateText(
          splitStringArray(item.viKeyLanguage.split("_")),
          inputLanguage,
          outputLanguage
        );
        group.wards.push({
          code: item.code,
          type: typeLanguage,
          viNameLanguage: item.viNameLanguage,
          keyAccentLanguage: diacritics.remove(item.viKeyLanguage),
        });
      }
    }
  }

  return groupedData;
}
// Hàm nhóm dữ liệu các đồng bằng vùng miền
async function groupDataFull(data) {
  const groupedData = [];

  for (const item of data) {
    // Sử dụng for...of thay vì forEach
    // Tìm các mục có "district" là null, dùng làm nhóm chính
    if (item.category === null) {
      console.log("viKeyLanguage-district", item.viKeyLanguage);

      const typeLanguage = await translateText(
        "Vùng Địa Lý",
        inputLanguage,
        outputLanguage
      );

      console.log("typeLanguage", typeLanguage);

      groupedData.push({
        code: item.code,
        category: item.category,
        type: typeLanguage,
        viNameLanguage: item.nameCategory,
        postalCode:
          groupedData.length !== 0
            ? postalCode + groupedData.length
            : postalCode,
        keyAccentLanguage: removeAccents(item.viKeyLanguage),
        provinceCity: [], // Khởi tạo mảng rỗng cho danh sách phường/xã/thị trấn
      });
    } else {
      // Tìm nhóm phù hợp theo "category" và thêm vào "wards"
      const group = groupedData.find(
        (g) => g.viNameLanguage === item.nameCategory && g.category === null
      );
      if (group) {
        console.log("viKeyLanguage-ward", item.viKeyLanguage);

        const typeLanguage = await translateText(
          item.category,
          inputLanguage,
          outputLanguage
        );
        group.provinceCity.push({
          code: item.code,
          type: typeLanguage,
          viNameLanguage: item.viNameLanguage,
          keyAccentLanguage: removeAccents(item.viKeyLanguage),
        });
      }
    }
  }

  return groupedData;
}

async function main() {
  // Nhóm dữ liệu
  const groupedData = await groupData(data);

  // Lưu dữ liệu đã nhóm vào file JSON mới
  const outputPath = path.join(__dirname, `/file/group/${cityKeyEnv}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(groupedData, null, 2), "utf8");

  console.log(`Đã chuyển đổi dữ liệu và lưu vào file/${cityKeyEnv}.json`);
}

main(); // Gọi hàm main
