var express = require('express');
var router = express.Router();
var tuongTacCtrl = require('../controllers/TuongTac');

router.get('/DanhSach', tuongTacCtrl.list);

router.post('/TuongTacMoi', tuongTacCtrl.addUser);

router.put('/SuaTuongTac/:idTuongTac', tuongTacCtrl.updateUser);

module.exports = router;