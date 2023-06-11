var express = require('express');
var router = express.Router();
var theoDoiCtrl = require('../controllers/TheoDoi');

router.get('/DanhSach', theoDoiCtrl.list);

router.post('/TheoDoiMoi', theoDoiCtrl.addUser);

router.put('/SuaTheoDoi/:idTheoDoi', theoDoiCtrl.updateUser);

module.exports = router;