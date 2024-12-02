const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const fs = require('fs')
const uuid = require('uuid')
const {error} = require('console')
const { request } = require('http')

router.get("/",(request,response)=>{
    const statement = `select pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no,testreport.testtype,testreport.amount,testreport.result from testreport inner join patient on testreport.pid = patient.pid`;
    db.pool.execute(statement,(error,result)=>{
        response.send(utils.createResult(error,result));
    })
})
router.post("/",(request,response)=>{
    const {pid,testtype,amount,result} = request.body;
    const statement = `insert into testreport(pid,testtype,amount,result) values(?,?,?,?)`;
    db.pool.execute(statement,[pid,testtype,amount,result],(error,result)=>{
        response.send(utils.createResult(error,result))
    }
)
})
module.exports = router;