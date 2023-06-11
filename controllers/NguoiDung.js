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
