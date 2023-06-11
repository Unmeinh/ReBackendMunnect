var baiVietModel = require('../models/BaiViet');

exports.list = async (req, res, next) => {
  var reqFilter = null;
  var values = req.query;

  if (typeof (values.idNguoiDung) != 'undefined') {
    reqFilter = { idNguoiDung: values.idNguoiDung };
  } 

  try {
    let listBaiViet = await baiVietModel.find(reqFilter).populate('idNguoiDung');

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

exports.add = (req, res, next) => {

  res.status(201).json({
    success: true,
    data: {},
  });
}

exports.update = (req, res, next) => {

  res.status(200).json({
    success: true,
    data: {},
  });
}
