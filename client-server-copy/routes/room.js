const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const fs = require('fs')
const uuid = require('uuid')
const {error} = require('console')

router.get('/',(request,response)=>{
    const statement = `select pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no,room.type,room.capacity,room.availability from room inner join patient on room.pid = patient.pid`
    db.pool.execute(
        statement,(error,result) =>{
            response.send(utils.createResult(error,result))
        }
    )
})

router.post('/',(request,response)=>{
    const {pid,type,capacity,availability} = request.body;
    const statement = `INSERT INTO room (pid, type, capacity, availability) VALUES (?, ?, ?, ?)`;

    db.pool.execute(statement, [pid, type, capacity, availability], (error, result) => {
        response.send(utils.createResult(error, result));
    }
);
});

module.exports = router