const express = require("express");
const db = require("../db");
const utils = require("../utils");
const router = express.Router();

router.get("/", (request, response) => {
  const statement = `SELECT ename, email, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no, position, qualification, department FROM employee`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.put("/", (request, response) => {
  const { sal, mob_no, address, state, city, pin_no, department } = request.body;
  const statement1 = `UPDATE doctor d JOIN employee e ON d.eId = e.eid SET e.sal = ?, e.mob_no = ?, e.address = ?, e.state = ?, e.city = ?, e.pin_no = ?, d.department = ? WHERE d.did = ?`;
  db.pool.execute(statement1, [sal, mob_no, address, state, city, pin_no, department, request.user.eid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/me", (request, response) => {
  const statement = `SELECT ename, email, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no, position, qualification, department FROM employee WHERE eid = ?`;
  db.pool.execute(statement, [request.user.eid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/position", (request, response) => {
  const statement = `SELECT ename, email, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no, position, qualification, department FROM employee WHERE position = ?`;
  db.pool.execute(statement, [request.user.position], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/position/doctor", (request, response) => {
  const statement = `SELECT ename, email, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no, position, qualification, department FROM employee WHERE position = 'Doctor'`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/position/nurse", (request, response) => {
  const statement = `SELECT ename, email, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no, position, qualification, department FROM employee WHERE position = 'Nurse'`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/position/receiptionist", (request, response) => {
  const statement = `SELECT ename, email, sal, gender, mob_no, address, state, city, pin_no, idproof, idproof_no, position, qualification, department FROM employee WHERE position = 'Receiptionist'`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/patientdetails", (request, response) => {
  const statement = `
    SELECT
      p.pname,
      e1.ename AS nurse_name,
      e2.ename AS doctor_name,
      t.testtype,
      r.type AS room_type,
      b.totalamount
    FROM
      patient p
    LEFT JOIN
      bill b ON p.pid = b.pid
    LEFT JOIN
      employee e1 ON p.nurseid = e1.eid
    LEFT JOIN
      employee e2 ON p.doctorid = e2.eid
    LEFT JOIN
      testreport t ON b.testid = t.testid
    LEFT JOIN
      room r ON b.roomid = r.roomid
    WHERE
      (e1.position = 'Nurse' OR e1.position IS NULL)
      AND (e2.position = 'Doctor' OR e2.position IS NULL)
  `;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.post("/testreport", (request, response) => {
  const { testtype, amount, pname } = request.body;
  const statement1 = `INSERT INTO testreport (testtype, amount, pid) SELECT ?, ?, pid FROM patient WHERE pname = ?`;
  db.pool.execute(statement1, [testtype, amount, pname], (error, result) => {
    response.json(utils.createResult(error, result));
  });
});

router.post("/room", (request, response) => {
  const { type, amount, pname } = request.body;
  const statement1 = `INSERT INTO room (type, capacity, amount, availability, pid) SELECT ?, 4, ?, 'Yes', pid FROM patient WHERE pname = ?`;
  db.pool.execute(statement1, [type, amount, pname], (error, result) => {
    response.json(utils.createResult(error, result));
  });
});

router.put("/assign/nursedoctor", (request, response) => {
  const { doctorname, nursename, pname } = request.body;
  const statement1 = `
    UPDATE patient
    SET doctorid = (SELECT eid FROM employee WHERE ename = ? AND position = 'Doctor'),
        nurseid = (SELECT eid FROM employee WHERE ename = ? AND position = 'Nurse')
    WHERE pname = ?
  `;
  db.pool.execute(statement1, [doctorname, nursename, pname], (error, result) => {
    response.json(utils.createResult(error, result));
  });
});

router.post("/bill", (request, response) => {
  const { pname, testtype, type } = request.body;
  const statement1 = `
    INSERT INTO bill (pid, testid, roomid, totalamount)
    SELECT p.pid, t.testid, r.roomid, (t.amount + r.amount) AS totalamount
    FROM patient p
    JOIN testreport t ON p.pid = t.pid
    JOIN room r ON p.pid = r.pid
    WHERE p.pname = ? AND t.testtype = ? AND r.type = ?
  `;
  db.pool.execute(statement1, [pname, testtype, type], (error, result) => {
    response.json(utils.createResult(error, result));
  });
});

router.get("/testreport", (request, response) => {
  const statement = `SELECT DISTINCT testtype, amount FROM testreport`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/room", (request, response) => {
  const statement = `SELECT DISTINCT type, amount FROM room`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;