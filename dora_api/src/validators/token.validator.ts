import * as jwt from "jsonwebtoken"

export const isTokenExpired = (token: string) => {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired
}

export const decode = (token: string) => {
    var decoded = jwt.verify(token, process.env.PRIVATE_TOKEN);
  }