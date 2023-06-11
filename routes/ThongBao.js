var express = require('express');
var router = express.Router();
var thongBaoCtrl = require('../controllers/ThongBao');

router.get('/DanhSach', thongBaoCtrl.list);

router.post('/ThongBaoMoi', thongBaoCtrl.addUser);

module.exports = router;