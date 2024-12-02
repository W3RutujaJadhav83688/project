const express = require("express");
const db = require("../db");
const utils = require("../utils");
const router = express.Router();

router.get("/",(request,response) => {
    const statement = `select pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no from patient`;
    db.pool.execute(statement,(error,result) =>{
        response.send(utils.createResult(error,result));
  });
});
/*
router.post("/",(request,response)=>{
  const {pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no} = request.body
  const statement = `INSERT into patient(did,pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no) select d.did,'${pname}' ,'${pemail}','${ptpassword}','${dob}','${gender}','${mob_no},'${age}','${idproof}','${idproof_no}' from patient p where d.did = 1`

  db.pool.execute(
    statement,[pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no],(error,result)=>{
      response.json(utils.createResult(error,result))
    }
  )
})*/
router.put("/",(request,response)=>{
  const {pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no} = request.body
  const statement = `update patient set pname =?,pemail=?,ptpassword=?,dob=?,gender=?,mob_no=?,age=?,idproof=?,idproof_no=?;`
  db.pool.execute(
    statement,[pname,pemail,ptpassword,dob,gender,mob_no,age,idproof,idproof_no],(error,result)=>{
      response.send(utils.createResult(error,result))
    }
  ) 
})
module.exports =router
