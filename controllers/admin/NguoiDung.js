var fs = require('fs');
var nguoiDungModel = require('../../models/NguoiDung');

exports.list = async (req, res, next) => {
  var reqFilter = null;
  var reqSearch = null;
  var values = req.query;

  if (typeof (values.inputID) != 'undefined') {
    console.log(values.inputID);
    reqFilter = { _id: values.inputID };
  }

  if (typeof (values.inputSearch) != 'undefined') {
    var inputValue = values.inputSearch;
    var inputRegex = new RegExp(inputValue);
    reqSearch = { tenTaiKhoan: inputRegex };
  }
  let listNguoiDung = await nguoiDungModel.find(reqFilter).find(reqSearch);
  let countFilter = await nguoiDungModel.find(reqFilter).find(reqSearch).count();
  let countAll = await nguoiDungModel.count();
  return res.render('NguoiDung/listNguoiDung', { listNguoiDung:listNguoiDung,countFilter:countFilter, countAll: countAll })
  
}



