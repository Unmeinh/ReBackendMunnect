var fs = require('fs');
var nguoiDungModel = require('../models/NguoiDung');

exports.list = async (req, res, next) => {
  var reqFilter = null;

  try {
    let listNguoiDung = await nguoiDungModel.find(reqFilter);

    return res.status(200).json({
      success: true,
      data: {
        listNguoiDung: listNguoiDung,
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
      let imagePath = 'http://192.168.191.7:3000/uploads/' + req.file.originalname;
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

exports.updateData = async (req, res, next) => {
  if (req.method == 'PUT') {
    var body = req.body;
    var objID = req.params.idNguoiDung;
    var objData = fillObj(body);
    objData._id = objID;

    // console.log(req.files.anhTaiLen);
    if (req.files != undefined) {
      req.files.map((file, index, arr) => {
        if (file != {}) {
          fs.renameSync(file.path, './public/uploads/' + file.originalname);
          let imagePath = 'https://backend-munnect.herokuapp.com/uploads/' + file.originalname;
          if (typeof(body.solo) != 'undefined') {
            if (body.solo == 'avatar') {
              objData.anhDaiDien = imagePath;
            }
            if (body.solo == 'wallpaper') {
              objData.anhBia = imagePath;
            }
          } else {
            if (index == 0) {
              objData.anhDaiDien = imagePath;
            } else {
              objData.anhBia = imagePath;
            }
          }
        }
      })
    }

    if (objData != {}) {
      try {
        await nguoiDungModel.findByIdAndUpdate(objID, objData);
        return res.status(200).json({
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

function fillObj(body) {
  let objData = new nguoiDungModel();
  objData.tenTaiKhoan = body.tenTaiKhoan;
  objData.email = body.email;
  objData.sdt = body.sdt;
  objData.matKhau = body.matKhau;
  objData.gioiThieu = body.gioiThieu;
  objData.queQuan = body.queQuan;
  objData.sinhNhat = body.sinhNhat;
  objData.anhDaiDien = body.anhDaiDien;
  objData.anhBia = body.anhBia;
  objData.arr_BaiViet = body.arr_BaiViet;
  objData.arr_AnBaiViet = body.arr_AnBaiViet;
  objData.arr_TheoDoi = body.arr_TheoDoi;
  objData.arr_NguoiTheoDoi = body.arr_NguoiTheoDoi;
  objData.arr_HoiNhom = body.arr_HoiNhom;
  return objData;
}
