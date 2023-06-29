import handlebar from "handlebars";
import * as nodeMailer from "nodemailer";
import fs from "fs";
import { promisify } from "util";
import { source_mail } from "./tool.static.ts";

const readFile = promisify(fs.readFile);
export const mail = async (message: any, coupon: any, email: any) => {
    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL,
          pass: process.env.PASS_GMAIL,
        },
      });
      let html = await readFile(source_mail(), "utf8");

      var template = handlebar.compile(html);
      var replacements = {
        message: message,
        coupon: coupon,
      };
      var htmlToSend = template(replacements);

      var mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: process.env.SUBJECT,
        html: htmlToSend,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          return console.log("Error while sending mail: " + error);
        } else {
          console.log("Message sent: %s", info.messageId);
        }
        transporter.close();
      });
}