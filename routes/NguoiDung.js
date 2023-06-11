var express = require('express');
var router = express.Router();
var nguoiDungCtrl = require('../controllers/NguoiDung');

router.get('/DanhSach', nguoiDungCtrl.list);

// router.post('/DangNhap', nguoiDungCtrl.add);

router.post('/DangKy', nguoiDungCtrl.add);

router.put('/SuaNguoiDung/:idNguoiDung', nguoiDungCtrl.update);

router.put('/DoiMatKhau/:idNguoiDung', nguoiDungCtrl.update);

// router.get('/XoaNguoiDung/:idNguoiDung', nguoiDungCtrl.updateUser);

module.exports = router;