import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dirsource = path.join(__dirname, "..", "..");

export const ifnull = (pre: any, cur: any) => {
  return pre ? pre : cur;
};

export const source_template = (file: any) => {
  return __dirsource + "/template/" + file + ".xlsx";
};

export const source_mail= () => {
  return __dirsource + "/common/mail/mail.html";
};
