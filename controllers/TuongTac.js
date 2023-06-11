const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const tuongTacService = require("../Service/TuongTac");

const like_or_dislike = async (req, res) => {
  try {
    console.log("Param: ", req.body);
    const { idNguoiDung, idBaiViet, trangThai } = req.body;
    if (idNguoiDung == null) {
      res.status(301).json({
        success: false,
        message: `idNguoiDung trống !`,
      });
    }
    if (idBaiViet == null) {
      res.status(301).json({
        success: false,
        message: `idBaiViet trống !`,
      });
    }
    if (trangThai == null) {
      res.status(301).json({
        success: false,
        message: `trangThai trống !`,
      });
    }
    if (trangThai != "Liked" && trangThai != "Disliked") {
      res.status(301).json({
        success: false,
        message: `trangThai không chính xác !`,
      });
    }
    const newAccount = {
      idNguoiDung,
      idBaiViet,
      trangThai,
    };

    const tuongTac = await tuongTacService.themTuongTac(newAccount);
    if (!tuongTac) {
      return res.status(301).json({
        success: false,
        message: `Thất bại !`,
      });
    }
    const getTuongTac = await tuongTacService.listTuongTac({
      idNguoiDung: new ObjectId(idNguoiDung),
      idBaiViet: new ObjectId(idBaiViet),
    });

    return res.status(200).json({
      success: true,
      message: `Thành công`,
      data: {
        newTuongTac: getTuongTac[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  like_or_dislike,
};
