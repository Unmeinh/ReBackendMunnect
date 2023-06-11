var db = require('../Modules/db');

const ThongBaoSchema = new db.mongoose.Schema(
  {
    idNguoiDung: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
      required: true,
    },
    idBaiViet: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "BaiViet",
      required: true,
    },
    noiDungTB: { type: String, required: true, },
    thoiGianTB: { type: Date, required: true, },
    anhThongBao: { type: String, required: false, },
  },
  { collection: "Thong_Bao" }
);

module.exports = db.mongoose.model("ThongBao", ThongBaoSchema);
