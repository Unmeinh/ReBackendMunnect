var fs = require('fs');
var baiVietModel = require('../models/BaiViet');

exports.list = async (req, res, next) => {
  var reqFilter = null;
  var reqSearch = null;
  var values = req.query;

  if (typeof (values.idNguoiDung) != 'undefined') {
    reqFilter = { idNguoiDung: values.idNguoiDung };
  }

  if (typeof (values.inputSearch) != 'undefined') {
    var inputValue = values.inputSearch;
    var inputRegex = new RegExp(inputValue);
    reqSearch = { noiDung: inputRegex };
  }

  try {
    let listBaiViet = await baiVietModel.find(reqFilter).find(reqSearch).populate('idNguoiDung').sort({ thoiGian: -1 });
    return res.status(200).json({
      success: true,
      data: {
        listBaiViet: listBaiViet,
        // listTuongTac: listTuongTac,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.add = async (req, res, next) => {
  if (req.method == 'POST') {
    var body = req.body;
    var objData = fillObj(body);

    console.log(req.body);
    if (req.file != undefined) {
      fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
      let imagePath = 'https://backend-munnect.herokuapp.com/uploads/' + req.file.originalname;
      console.log('/uploads/' + req.file.originalname);
      objData.anhBaiViet = imagePath;
    }

    console.log(objData);
    if (objData != {}) {
      try {
        await objData.save();
        return res.status(201).json({
          success: true,
          data: {},
        });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  }
}

exports.update = (req, res, next) => {

  res.status(200).json({
    success: true,
    data: {},
  });
}

function fillObj(body) {
  let objData = new baiVietModel();
  objData.idNguoiDung = body.idNguoiDung;
  objData.noiDung = body.noiDung;
  objData.phongChu = body.phongChu;
  objData.anhBaiViet = body.anhBaiViet;
  objData.thoiGian = body.thoiGian;
  objData.viTriBaiViet = body.viTriBaiViet;
  objData.arr_binhLuan = body.arr_binhLuan;
  objData.arr_dongTinh = body.arr_dongTinh;
  objData.arr_phanDoi = body.arr_phanDoi;
  objData.soLuongChiaSe = body.soLuongChiaSe;
  objData.soLuongBaoCao = body.soLuongBaoCao;
  return objData;
}
