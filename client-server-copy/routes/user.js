const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const cryptoJs = require('crypto-js')

router.post('/signin',(request,response)=>{
    const {pemail,ptpassword} = request.body

    const statement =`select pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no from patient where pemail=? and ptpassword=?`;
    db.pool.execute(statement,[pemail,ptpassword],(error,patient)=>{
        if(error){
            response.send(utils.createError(error))
        }else{
            if(patient.length == 0) {
                response.send(utils.createError('patient does not exist'))
            }else{
                const {pid,pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no} = patient[0]

                const payload = {
                    pid,
                    pname,
                    pemail,
                    ptpassword,dob,
                    gender,mob_no,age,idproof,
                    idproof_no
                }

                const token = jwt.sign(payload, config.secret)
                response.send(
                    utils.createSuccess({
                        token,
                        pname,
                        pemail,
                        ptpassword,dob,gender,mob_no,
                        age,idproof,idproof_no
                    })
                )
            }
        }
    })
})

router.post('/signup',(request,response)=>{
    const {pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no} = request.body

    const statement1 = `Insert INTO patient(pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no) VALUES(?,?,?,?,?,?,?,?,?)`
    db.pool.execute(statement1,[pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no],(error,result) =>{
        response.json(utils.createResult(error,result))
    }
)
})
module.exports = router