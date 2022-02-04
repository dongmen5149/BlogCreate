const express = require('express');
const router = express.Router();

const { Review } = require('../models/Review');

//=================================
//             Review
//=================================


router.post("/contents", (req, res) => {
    const reivew = new Review(req.body);

    reivew.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

module.exports = router;