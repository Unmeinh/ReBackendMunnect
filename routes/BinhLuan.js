var express = require('express');
var router = express.Router();
var binhLuanCtrl = require('../controllers/BinhLuan');

router.get('/DanhSach', binhLuanCtrl.list);

router.post('/ThemBinhLuan', binhLuanCtrl.addUser);

// router.put('/SuaBinhLuan/:idBinhLuan', binhLuanCtrl.updateUser);

// router.get('/XoaBinhLuan/:idBinhLuan', binhLuanCtrl.updateUser);

module.exports = router;