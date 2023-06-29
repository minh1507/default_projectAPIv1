export const creator = "Summer";
export const views = [
  {
    x: 0,
    y: 0,
    width: 10000,
    height: 20000,
    firstSheet: 0,
    activeTab: 1,
    visibility: "visible",
  },
];
export const border: any = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};
export const font_style_head = {
  bold: true,
  name: "Times New Roman",
  size: 15,
};
export const name_baocao = {
  baoCaoSoLieuNguoiDung: "BaoCaoSoLieuNguoiDung.xlsx",
};
export const alignment_style_head: any = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};
export const timer = (tuNgay: Date, denNgay: Date) => {
    tuNgay = new Date(tuNgay)
    denNgay = new Date(denNgay)

    let day_tuNgay = (tuNgay.getDate()) < 10 ? "0" + (tuNgay.getDate()) : (tuNgay.getDate())
    let month_tuNgay = (tuNgay.getMonth() + 1) < 10 ? "0" + (tuNgay.getMonth() + 1) : (tuNgay.getMonth() + 1)
    let year_tuNgay = tuNgay.getFullYear()

    let day_denNgay = (denNgay.getDate()) < 10 ? "0" + (denNgay.getDate()) : (denNgay.getDate()) 
    let month_denNgay = (denNgay.getMonth() + 1) < 10 ? "0" + (denNgay.getMonth() + 1) : (denNgay.getMonth() + 1)
    let year_denNgay = denNgay.getFullYear()

    return "Trong khoảng từ ngày " + day_tuNgay + "-" + month_tuNgay + '-' + year_tuNgay + " đến ngày " + day_denNgay + "-" + month_denNgay + "-" + year_denNgay
}
// export const image_ex = async () => {
//   let image = await axios.get(`http:/localhost:3000/static/avartar/avatar-default-image-male.png`, {responseType: 'arraybuffer'});
//   return Buffer.from(image.data).toString('base64') as string;
// } 

