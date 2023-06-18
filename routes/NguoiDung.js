var express = require('express');
var router = express.Router();
const multer  = require('multer');
const uploader = multer({dest: './public/temp'});
var nguoiDungCtrl = require('../controllers/NguoiDung');

router.post('/DangNhap', nguoiDungCtrl.login);

router.post('/DangKy', nguoiDungCtrl.register);

router.get('/DanhSach', nguoiDungCtrl.list);

router.put('/CapNhatThongTin', nguoiDungCtrl.list);

router.get('/SuaArrBaiViet/:idNguoiDung', nguoiDungCtrl.updateArrBV);

router.put('/CapNhatAnh/:idNguoiDung', uploader.array('anhTaiLen', 2), nguoiDungCtrl.updateImage);

// router.put('/DoiMatKhau/:idNguoiDung', nguoiDungCtrl.updateData);

// router.get('/XoaNguoiDung/:idNguoiDung', nguoiDungCtrl.updateUser);

module.exports = router;