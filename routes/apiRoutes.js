const router = require('express').Router();
const { notStrictEqual } = require('assert');
const { json } = require('express');
const { writeFile, readFromFile } = require('fs');
let store = require('../db/db.json');
const uuid = require('../helpers/uuid');


router.get('/notes', (req, res) => res.json(store));

router.post('/notes', ({ body }, res) => {

    body.id = uuid();
    store.push(body)

    writeFile('./db/db.json',
        JSON.stringify(store),
        err => {
            if (err) console.log("error: ", err);
            res.json(store)
        }
    );
});

router.get('/api/notes/:id', (req, res) => {
     const note_id = req.params.id;
     readFromFile('./db/db.json')
     .then((data) => JSON.parse(data))
     then((json) => {
        const result = json.filter((note) => note.id === note_id);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
     });
});


router.delete('/notes/:id', ({ params: id }, res) => {
    
    storeTmp = store.filter(obj => obj.id !== id);
    console.log('database: ', storeTmp);
    
    writeFile('./db/db.json',
        JSON.stringify(store),
        err => {
            if (err) console.log(err);
            res.json(`note has been deleted`);
        }
    )
});

module.exports = router;



// router.delete('/notes/:id', (req, res) => {
//     const notesId = req.params.id;
//     readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//         const result = json.filter((notes) => notes.id !== notesId);
//         writeToFile('./db/db.json', result);
//         res.json(`${notesId} has been deleted`);
//     });
// });