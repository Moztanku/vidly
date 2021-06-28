const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('Use /api/genres')
});

module.exports = router;