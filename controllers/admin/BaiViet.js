var fs = require('fs');
var baiVietModel = require('../../models/BaiViet');
var tuongTacModel = require('../../models/TuongTac');
var binhLuanModel = require('../../models/BinhLuan');

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
  let countFilter = await baiVietModel.find(reqFilter).find(reqSearch).count();
  let countAll = await baiVietModel.count();
  let listBaiViet = await baiVietModel.find(reqFilter).find(reqSearch).populate('idNguoiDung').sort({ thoiGian: -1 });
  let listBaiVietUp = await baiVietModel.find(reqFilter).find(reqSearch).populate('idNguoiDung').sort({ thoiGian: 1 });
  return res.render('BaiViet/listBaiViet', { listBaiViet: listBaiViet,listBaiVietUp:listBaiVietUp,countFilter:countFilter, countAll: countAll })

}

exports.listUp = async (req, res, next) => {
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
  let countFilter = await baiVietModel.find(reqFilter).find(reqSearch).count();
  let countAll = await baiVietModel.count();
  
  let listBaiVietUp = await baiVietModel.find(reqFilter).find(reqSearch).populate('idNguoiDung').sort({ thoiGian: 1 });
  return res.render('BaiViet/listBaiVietUp', { listBaiVietUp:listBaiVietUp,countFilter:countFilter, countAll: countAll })

}

exports.detail = async (req, res, next) => {
  var objId = req.params.idBaiViet;
 
  var objBV = await baiVietModel.findById(objId).populate('idNguoiDung');
  console.log(" obj: "+ objBV);
  res.render('BaiViet/detailBaiViet',{objBV:objBV}); 
}

exports.delete = async (req, res, next) => {
  var objId = req.params.idBaiViet;
  
  if (req.method == 'POST') {
    
    
    if (typeof (objId) != 'undefined') {
      try {

        await baiVietModel.findByIdAndDelete(objId);
        let listBinhLuan = await binhLuanModel.find({idBaiViet: objId});
        let listTuongTac = await tuongTacModel.find({idBaiViet: objId});
        if (listBinhLuan.length > 0) {
          for (let i = 0; i < listBinhLuan.length; i++) {
            await binhLuanModel.findByIdAndDelete(listBinhLuan[i]._id);
          }
        }
        if (listTuongTac.length > 0) {
          for (let i = 0; i < listTuongTac.length; i++) {
            await tuongTacModel.findByIdAndDelete(listTuongTac[i]._id);
          }
        }
        return res.redirect('/Admin/BaiViet/DanhSach')
      } catch (error) {
        console.log(error.message);
        console.log("chưa xóa được bài viết");
      }
    }
  }
  res.render('BaiViet/delBaiViet');
}


