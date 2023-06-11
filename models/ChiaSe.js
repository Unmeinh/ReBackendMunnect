var db = require('../Modules/db');

const ChiaSeSchema = new db.mongoose.Schema(
  {
    idBaiViet: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "BaiViet",
      required: true,
    },
    idNguoiDung: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
      required: true,
    },
  },
  { collection: "Chia_Se" }
);

module.exports = db.mongoose.model("ChiaSe", ChiaSeSchema);