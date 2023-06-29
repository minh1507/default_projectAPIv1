import { Request, Response } from "express";
import * as service from "../services/user.service.ts";
import message from "../common/message/message.common.ts";
import { responseAPISucess } from "../common/message/response.common.ts";
import { validationResult } from "express-validator";
import ExcelJS from "exceljs";

import { fileURLToPath } from "url";
import path from "path";
import { name_baocao, font_style_head, alignment_style_head, timer, border, image_ex } from "../common/static/excel.static.ts";
import { source_template } from "../common/static/tool.static.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dirsource = path.join(__dirname, "..");

export const findAll = async (req: Request, res: Response) => {
  let { start, item } = req.query;
  let result = await service.findAll(start, item);

  let release = {
    data: result,
    mes: message.SUCCESS,
  };
  return res.status(200).json(responseAPISucess(release));
};

export const applyMail = async (req: Request, res: Response) => {
  let data: any = req.body;
  let response = validationResult(req);

  if (response.isEmpty()) {
    await service.create(data);
    let release = {
      data: true,
      mes: message.MAIL_SENT_SUCCESS,
    };
    return res.status(200).json(responseAPISucess(release));
  }

  return res.status(200).json({ errors: response.array() });
}

export const me = async (req: Request, res: Response) => {
  let authorization: any = req.headers["authorization"];
  let token = authorization.split(" ")[1];

  let result = await service.me(token);

  let release = {
    data: result,
    mes: message.SUCCESS,
  };
  return res.status(200).json(responseAPISucess(release));
};

export const create = async (req: Request, res: Response) => {
  let data: any = req.body;
  let response = validationResult(req);

  if (response.isEmpty()) {
    let result = await service.create(data);
    let release = {
      data: result,
      mes: message.CREATE_ACCOUNT_SUCCESS,
    };
    return res.status(200).json(responseAPISucess(release));
  }

  return res.status(200).json({ errors: response.array() });
};

export const export_template = async (req: Request, res: Response) => {
  let response = validationResult(req);

  if (response.isEmpty()) {
    var workbook = new ExcelJS.Workbook();
    var { tuNgay, denNgay } = req.body;

    let result: any = await service.export_all({ tuNgay: tuNgay, denNgay: denNgay });
    result = result.data;

    await workbook.xlsx.readFile(source_template("Template_User"));

    workbook.eachSheet(async function (worksheet, sheetId) {
      let TT = 1;
      let col_start = 1;
      let col_end = 8;
      let row_start = 6;
      let code = 4;
      let k = 0;

      let row_code = worksheet.getRow(code);

      // ve excel
      worksheet.getCell("A1").value = "BÁO CÁO SỐ LIỆU NGƯỜI DÙNG";
      worksheet.mergeCells("A1:H1");
      worksheet.getCell("A1").font = font_style_head;
      worksheet.getCell("A1").alignment = alignment_style_head;

      worksheet.getCell("A2").value = timer(tuNgay, denNgay);
      worksheet.mergeCells("A2:H2");
      worksheet.getCell("A2").alignment = alignment_style_head;

      // fill data
      if (result && result.length) {
        for (var r = 0; r < result.length; r++) {
          let row = worksheet.getRow(row_start + k);
          for (var i = col_start; i <= col_end; i++) {
            let code_text: any = row_code.getCell(i).value;
            if (i == 1) {
              row.getCell(i).value = TT;
            } else {
              row.getCell(i).value = result[r][code_text];
            }

            row.getCell(i).border = border;
          }
          k++;
          TT++;
        }

        let row_count = worksheet.getRow(row_start + result.length + 3);
        let sub_row_count = worksheet.getRow(row_start + result.length + 4);

        row_count.getCell(3).value = "Số lượng (người dùng)";
        row_count.getCell(3).border = border;
        sub_row_count.getCell(3).value = result.length;
        sub_row_count.getCell(3).border = border;
      }

      // an cot code
      row_code.hidden = true;
    });

    res.setHeader("Content-Type", name_baocao.baoCaoSoLieuNguoiDung);
    res.setHeader("Content-Disposition", "attachment; filename=" + name_baocao.baoCaoSoLieuNguoiDung);
    return workbook.xlsx.write(res).then(function (data) {
      res.end();
    });
  }

  return res.status(200).json({ errors: response.array() });
};
