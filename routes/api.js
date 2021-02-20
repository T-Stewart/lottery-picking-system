const LotteryEntrant = require('../models/loteryEntrant')

const express = require('express');

const router = express.Router();

//Routes
router.get('/', (req, res) => {
   
LotteryEntrant.find({ })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch(error => {
         console.log('Error: ', error)
    });
});

router.get('/name', (req, res) => {
    console.log('Name', req.name)
    res.json(data)
});

router.post('/save', (req, res) => {
    console.log('Body: ', req.body)

    const data = req.body;

    const newLotteryEntrant = new LotteryEntrant(data)

    newLotteryEntrant.save((error) => {
        if(error) {
            res.status(500).json({ msg: 'Sorry, internal server error'});
            return;
        }; 
           return res.json({
            msg: 'we recieved your data'
            });
    });
});

module.exports = router;