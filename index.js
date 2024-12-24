const { exec } = require("child_process");

// Hàm để chạy một file script
function runScript(script) {
  return new Promise((resolve, reject) => {
    exec(`node ${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Lỗi khi chạy ${script}:`, error);
        return reject(error);
      }
      console.log(`Kết quả từ ${script}:\n`, stdout);
      resolve(stdout);
    });
  });
}
// // { cityName: "bac_giang", cityKey: "bacgiang", postCode: "26000" },
//   { cityName: "an_giang", cityKey: "angiang", postCode: "90000" },
//   { cityName: "bac_kan", cityKey: "backan", postCode: "23000" },
//   { cityName: "bac_lieu", cityKey: "baclieu", postCode: "97000" },
//   { cityName: "bac_ninh", cityKey: "bacninh", postCode: "16000" },
//   { cityName: "vung_tau", cityKey: "vungtau", postCode: "78000" },
//   { cityName: "ben_tre", cityKey: "bentre", postCode: "86000" },
//   { cityName: "binh_dinh", cityKey: "binhdinh", postCode: "55000" },
//   { cityName: "binh_phuoc", cityKey: "binhphuoc", postCode: "75000" },
//   { cityName: "binh_thuan", cityKey: "binhthuan", postCode: "77000" },
//   { cityName: "ca_mau", cityKey: "camau", postCode: "98000" },
//   { cityName: "cao_bang", cityKey: "caobang", postCode: "21000" },
//   { cityName: "da_nang", cityKey: "danang", postCode: "50000" },
//   { cityName: "dac_nong", cityKey: "dacnong", postCode: "65000" },
//   { cityName: "dien_bien_phu", cityKey: "dienbienphu", postCode: "32000" },
//   { cityName: "dong_thap", cityKey: "dongthap", postCode: "81000" },
//   { cityName: "gia_lai", cityKey: "gialai", postCode: "61000" },
// { cityName: "ha_giang", cityKey: "hagiang", postCode: "20000" },
//   { cityName: "ha_nam", cityKey: "hanam", postCode: "18000" },
//   { cityName: "ha_noi", cityKey: "hanoi", postCode: "10000" },
//   { cityName: "ha_tinh", cityKey: "hatinh", postCode: "23000" },
//   { cityName: "hai_duong", cityKey: "haiduong", postCode: "03000" },
//   { cityName: "hai_phong", cityKey: "haiphong", postCode: "04000" },
//   { cityName: "hau_giang", cityKey: "haugiang", postCode: "95000" },
//   { cityName: "ho_chi_minh", cityKey: "hochiminh", postCode: "70000" },
//   { cityName: "hoa_binh", cityKey: "hoabinh", postCode: "36000" },
//   { cityName: "hue", cityKey: "hue", postCode: "49000" },
//   { cityName: "hung_yen", cityKey: "hungyen", postCode: "17000" },
//   { cityName: "khanh_hoa", cityKey: "khanhhoa", postCode: "57000" },
//   { cityName: "kien_giang", cityKey: "kiengiang", postCode: "91000" },
//   { cityName: "kom_tum", cityKey: "komtum", postCode: "60000" },
//   { cityName: "lai_chau", cityKey: "laichau", postCode: "30000" },
//   { cityName: "lam_dong", cityKey: "lamdong", postCode: "66000" },
//   { cityName: "lang_son", cityKey: "langson", postCode: "25000" },
//   { cityName: "lao_cai", cityKey: "laocai", postCode: "31000" },
//   { cityName: "long_an", cityKey: "longan", postCode: "82000" },
//   { cityName: "nam_dinh", cityKey: "namdinh", postCode: "07000" },
//   { cityName: "nghe_an", cityKey: "nghean", postCode: "43000" },
//   { cityName: "ninh_binh", cityKey: "ninhbinh", postCode: "08000" },
//   { cityName: "ninh_thuan", cityKey: "ninhthuan", postCode: "59000" },
//   { cityName: "phu_tho", cityKey: "phutho", postCode: "35000" },
//   { cityName: "phu_yen", cityKey: "phuyen", postCode: "56000" },
//   { cityName: "quang_binh", cityKey: "quangbinh", postCode: "47000" },
//   { cityName: "quang_nam", cityKey: "quangnam", postCode: "51000" },
// { cityName: "quang_ngai", cityKey: "quangngai", postCode: "53000" },
// { cityName: "quang_ninh", cityKey: "quangninh", postCode: "01000" },
// { cityName: "quang_tri", cityKey: "quangtri", postCode: "48000" },
// { cityName: "soc_trang", cityKey: "soctrang", postCode: "96000" },
// { cityName: "son_la", cityKey: "sonla", postCode: "34000" },
// { cityName: "tay_ninh", cityKey: "tayninh", postCode: "80000" },
// Danh sách các tỉnh với mã bưu chính
const provinces = [
  // { cityName: "an_giang", cityKey: "angiang", postCode: "90000" },
  // { cityName: "thai_binh", cityKey: "thaibinh", postCode: "06000" },
  // { cityName: "thai_nguyen", cityKey: "thainguyen", postCode: "24000" },
  // { cityName: "thanh_hoa", cityKey: "thanhhoa", postCode: "40000" },
  // { cityName: "tien_giang", cityKey: "tiengiang", postCode: "84000" },
  // { cityName: "tra_vinh", cityKey: "travinh", postCode: "87000" },
  // { cityName: "tuyen-quang", cityKey: "tuyenquang", postCode: "22000" },
  // { cityName: "vinh_long", cityKey: "vinhlong", postCode: "85000" },
  // { cityName: "vinh_phuc", cityKey: "vinhphuc", postCode: "15000" },
  // { cityName: "yen_bai", cityKey: "yenbai", postCode: "33000" },

  { cityName: "bac_giang", cityKey: "bacgiang", postCode: "26000" },
  { cityName: "an_giang", cityKey: "angiang", postCode: "90000" },
  { cityName: "bac_kan", cityKey: "backan", postCode: "23000" },
  { cityName: "bac_lieu", cityKey: "baclieu", postCode: "97000" },
  { cityName: "bac_ninh", cityKey: "bacninh", postCode: "16000" },
  { cityName: "vung_tau", cityKey: "vungtau", postCode: "78000" },
  { cityName: "ben_tre", cityKey: "bentre", postCode: "86000" },
  { cityName: "binh_dinh", cityKey: "binhdinh", postCode: "55000" },
  { cityName: "binh_phuoc", cityKey: "binhphuoc", postCode: "75000" },
  { cityName: "binh_thuan", cityKey: "binhthuan", postCode: "77000" },
  { cityName: "ca_mau", cityKey: "camau", postCode: "98000" },
  { cityName: "cao_bang", cityKey: "caobang", postCode: "21000" },
  { cityName: "da_nang", cityKey: "danang", postCode: "50000" },
  { cityName: "dac_nong", cityKey: "dacnong", postCode: "65000" },
  { cityName: "dien_bien_phu", cityKey: "dienbienphu", postCode: "32000" },
  { cityName: "dong_thap", cityKey: "dongthap", postCode: "81000" },
  { cityName: "gia_lai", cityKey: "gialai", postCode: "61000" },
  { cityName: "ha_giang", cityKey: "hagiang", postCode: "20000" },
  { cityName: "ha_nam", cityKey: "hanam", postCode: "18000" },
  // { cityName: "ha_noi", cityKey: "hanoi", postCode: "10000" },
  { cityName: "ha_tinh", cityKey: "hatinh", postCode: "23000" },
  { cityName: "hai_duong", cityKey: "haiduong", postCode: "03000" },
  { cityName: "hai_phong", cityKey: "haiphong", postCode: "04000" },
  { cityName: "hau_giang", cityKey: "haugiang", postCode: "95000" },
  { cityName: "ho_chi_minh", cityKey: "hochiminh", postCode: "70000" },
  { cityName: "hoa_binh", cityKey: "hoabinh", postCode: "36000" },
  { cityName: "hue", cityKey: "hue", postCode: "49000" },
  { cityName: "hung_yen", cityKey: "hungyen", postCode: "17000" },
  { cityName: "khanh_hoa", cityKey: "khanhhoa", postCode: "57000" },
  { cityName: "kien_giang", cityKey: "kiengiang", postCode: "91000" },
  { cityName: "kom_tum", cityKey: "komtum", postCode: "60000" },
  { cityName: "lai_chau", cityKey: "laichau", postCode: "30000" },
  { cityName: "lam_dong", cityKey: "lamdong", postCode: "66000" },
  { cityName: "lang_son", cityKey: "langson", postCode: "25000" },
  { cityName: "lao_cai", cityKey: "laocai", postCode: "31000" },
  { cityName: "long_an", cityKey: "longan", postCode: "82000" },
  { cityName: "nam_dinh", cityKey: "namdinh", postCode: "07000" },
  { cityName: "nghe_an", cityKey: "nghean", postCode: "43000" },
  { cityName: "ninh_binh", cityKey: "ninhbinh", postCode: "08000" },
  { cityName: "ninh_thuan", cityKey: "ninhthuan", postCode: "59000" },
  { cityName: "phu_tho", cityKey: "phutho", postCode: "35000" },
  { cityName: "phu_yen", cityKey: "phuyen", postCode: "56000" },
  { cityName: "quang_binh", cityKey: "quangbinh", postCode: "47000" },
  { cityName: "quang_nam", cityKey: "quangnam", postCode: "51000" },
  { cityName: "quang_ngai", cityKey: "quangngai", postCode: "53000" },
  { cityName: "quang_ninh", cityKey: "quangninh", postCode: "01000" },
  { cityName: "quang_tri", cityKey: "quangtri", postCode: "48000" },
  { cityName: "soc_trang", cityKey: "soctrang", postCode: "96000" },
  { cityName: "son_la", cityKey: "sonla", postCode: "34000" },
  { cityName: "tay_ninh", cityKey: "tayninh", postCode: "80000" },
];

const languages = [
  { outputLanguage: "vi" }, // Ngôn ngữ đầu tiên
  { outputLanguage: "en" }, // Ngôn ngữ thứ hai (thay thế bằng ngôn ngữ bạn muốn)
];

// Danh sách các file cần chạy
const scriptsArray = [
  "readExcel.js",
  "convertGroupData.js",
  "pushDataByCity.js",
  "exportFileKey.js",
  "translateAuto.js",
  // Thêm các file khác nếu cần
];

// Chạy các file theo thứ tự
async function runScripts() {
  for (const script of provinces) {
    process.env.CITY_NAME = script.cityName;
    process.env.CITY_KEY = script.cityKey;
    process.env.POST_CODE = script.postCode;
    process.env.INPUT_LANGUAGE = "vi";
    console.log(
      `Chạy cho tỉnh: ${script.cityName} (KEY: ${script.cityKey}, POST CODE: ${script.postCode})`
    );

    try {
      for (const scriptName of scriptsArray) {
        console.log("city-Name", script.cityName);

        await runScript(scriptName); // Chờ cho script hoàn thành
      }

      // Chạy translateAuto.js hai lần với các ngôn ngữ khác nhau
      for (const lang of languages) {
        process.env.OUTPUT_LANGUAGE = lang.outputLanguage; // Đặt ngôn ngữ đầu ra
        console.log(
          `Chạy translateAuto.js với OUTPUT_LANGUAGE=${lang.outputLanguage}`
        );
        await runScript("translateAuto.js");
      }
    } catch (error) {
      console.error(`Có lỗi xảy ra khi chạy ${script}:`, error);
      break; // Dừng lại nếu có lỗi
    }
  }
}

runScripts();
