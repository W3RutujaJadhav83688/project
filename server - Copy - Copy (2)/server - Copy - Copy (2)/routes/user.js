const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const cryptoJs = require('crypto-js')

router.post('/signin' ,(request,response) =>{

    const {email,password}= request.body

    //const encryptedPassword =String(cryptoJs.SHA256(password))

    const statement =`select eid,ename,gender,address,city,state ,mob_no,position from employee where
    email=? and password=?`;
    db.pool.execute(statement,[email,password],(error,employees)=>{
        if (error) {
            response.send(utils.createError(error))
        } else {
            if (employees.length == 0) {
               
                response.send(utils.createError('Employee does not exist'))
              } else {
        
                const {eid, ename,gender,address,city,state ,mob_no,position} = employees[0]
        
              
                const payload = {
                    eid,
                    ename,
                    gender,
                    address,city,
                    state ,
                    mob_no,position
                }
        
              
                const token = jwt.sign(payload, config.secret)
                response.send(
                  utils.createSuccess({
                    token,
                    eid,
                    ename,
                    gender,
                    address,
                    city,
                    state,mob_no,position
                  })
                )
              }

        }
    })

})


router.post('/signup',(request,response)=>{
  const {ename,email,sal,gender,mobno,address,state,city,pinno,idproof,idproofno,password,position,qualification,department} = request.body

  const statement1 = `INSERT INTO employee(ename, email,password, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no,position,qualification,department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?) `
  db.pool.execute(
      statement1,[ename,email,password,sal,gender,mobno,address,state,city,pinno,idproof,idproofno,position,qualification,department] ,(error,result) =>{
          response.json(utils.createResult(error,result))
      }
  )
})

module.exports = router


