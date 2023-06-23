var express = require('express');
var router = express.Router();
const multer  = require('multer');
const uploader = multer({dest: './public/temp'});
var baiVietCtrl = require('../../controllers/admin/BaiViet');

router.get('/DanhSach', baiVietCtrl.list);
router.get('/DanhSachTang', baiVietCtrl.listUp);

router.get('/ChiTiet/:idBaiViet', baiVietCtrl.detail);
router.post('/ChiTiet/:idBaiViet', baiVietCtrl.detail);

// router.get('/DanhSach/NguoiDung/:idND',  baiVietCtrl.getLatest);

// router.post('/BaiVietMoi', uploader.single('anhBaiViet'), baiVietCtrl.add);

// router.put('/SuaBaiViet/:idBaiViet', uploader.single('anhBaiViet'), baiVietCtrl.update);

router.get('/XoaBaiViet/:idBaiViet', baiVietCtrl.delete);
router.post('/XoaBaiViet/:idBaiViet', baiVietCtrl.delete);

module.exports = router;