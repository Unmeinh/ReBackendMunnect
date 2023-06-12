var express = require('express');
var router = express.Router();
const multer  = require('multer');
const uploader = multer({dest: './public/temp'});
var nguoiDungCtrl = require('../controllers/NguoiDung');

router.get('/DanhSach', nguoiDungCtrl.list);

// router.post('/DangNhap', nguoiDungCtrl.add);

router.post('/DangKy', nguoiDungCtrl.add);

router.put('/SuaNguoiDung/:idNguoiDung', uploader.array('anhTaiLen', 2), nguoiDungCtrl.updateData);

router.put('/DoiMatKhau/:idNguoiDung', nguoiDungCtrl.updateData);

// router.get('/XoaNguoiDung/:idNguoiDung', nguoiDungCtrl.updateUser);

module.exports = router;