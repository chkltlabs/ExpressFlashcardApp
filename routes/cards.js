const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards }= data;

router.get('/', (req, res) => {
    const num = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${num}`);
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    if(!side){
        res.redirect(`/cards/${id}?side=question`);
    }else {
        const name = req.cookies.username;
        const text = cards[id][side];
        const {hint} = cards[id];
        let nextId = parseInt(id) + 1;
        if (nextId === cards.length) {
            nextId = 0
        }

        const templateData = {text, id, nextId, name, side};

        if (side === 'question') {
            templateData.hint = hint;
            templateData.side2 = 'answer';
        } else if (side === 'answer') {
            templateData.side2 = 'question'
        } else {
            res.redirect(`/cards/${id}?side=question`);
        }
        res.render('card', templateData);
    }
});

module.exports = router;