const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const fs = require('fs')
const uuid = require('uuid')
const {error} = require('console')
const { request } = require('http')

router.get("/",(request,response)=>{
    const statement = `select b.bid as BillID,p.pid AS PatientID,tr.testtype AS TestType,tr.amount AS TestAmount,tr.result AS TestResult,r.type AS RoomType,r.capacity AS RoomCapacity,r.availability AS RoomAvaliability,
    b.totalamount AS TotalAmount
    from bill b
    INNER JOIN
    testreport tr ON b.testid = tr.testid
    INNER JOIN
    room r ON b.roomid = r.roomid
    INNER JOIN
    patient p ON b.pid = p.pid`;
    db.pool.execute(statement,(error,result)=>{
        response.send(utils.createResult(error,result));
    })
})
router.post('/',(request,response)=>{
    const {pid,roomid,testid,totalamount} = request.body
    const statement = `insert into bill(pid,testid,roomid,totalamount) values(?,?,?,?)`;
    db.pool.execute(
        statement,[pid,roomid,testid,totalamount],(error,result)=>{
            response.send(utils.createResult(error,result))
        }
    )
})

module.exports = router;