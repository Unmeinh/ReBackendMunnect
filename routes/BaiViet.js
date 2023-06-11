var express = require('express');
var router = express.Router();
var baiVietCtrl = require('../controllers/BaiViet');

router.get('/DanhSach', baiVietCtrl.list);

router.post('/ThemBaiViet', baiVietCtrl.add);

router.put('/SuaBaiViet/:idBaiViet', baiVietCtrl.update);

// router.get('/XoaBaiViet/:idBaiViet', baiVietCtrl.delete);

module.exports = router;