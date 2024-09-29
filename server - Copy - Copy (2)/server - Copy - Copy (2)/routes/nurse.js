const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const fs = require('fs')
const uuid = require('uuid')
const { error } = require('console')


router.get('/',(request,response)=>{
    const statement = `select ename,email,sal,gender,mob_no,address,state,city,pin_no,idproof,idproof_no from nurse  inner join employee on nurse.eId = employee.eid `
    db.pool.execute(
        statement ,(error,result) =>{
            response.send(utils.createResult(error,result))
        }
    )
})

router.post('/',(request,response)=>{
    const {} = request.body

    const statement = `INSERT INTO doctor(eid,qualification,department)
           SELECT e.eid,'${qualification}',${department}
           FROM doctor d WHERE e.eid=1`
   
    db.pool.execute(
        statement,[] ,(error,result) =>{
            response.send(utils.createResult(error,result))
        }
    )
})


router.get('/me',(request,response) =>{

    const statement =`
    select  ename,email,sal,gender,mob_no,address,state,city,pin_no,idproof,idproof_no from nurse  inner join employee on nurse.eId = employee.eid where employee.eid=?`

    db.pool.execute(statement,[request.user.eid],(error,result) =>{
        response.send(utils.createResult(error,result))
    })
})


router.put('/',(request,response)=>{
    const {sal,mob_no,address,state,city,pin_no,department} = request.body
    const statement1 = `UPDATE nurse n
JOIN employee e ON n.eId = e.eid
SET e.sal =?,
    e.mob_no = ?,
    e.address = ?,
    e.state = ?,
    e.city = ?,
    e.pin_no = ?,
WHERE n.nid = ?;`
    db.pool.execute(
        statement1,[sal,mob_no,address,state,city,pin_no,department,request.user.eid] ,(error,result) =>{
            response.send(utils.createResult(error,result))
        }
    )
})



module.exports = router