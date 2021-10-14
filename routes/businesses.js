const express = require("express");
const router1 = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const Business = require("../models/business");

//경로 /businesses/cos
router1.post("/cos", (req, res, next) => {
  let newUser = new Business({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    birth: req.body.birth,
    licenseNum: req.body.licenseNum,
  });

  Business.getUserByLicense(newUser.licenseNum, (err, licenseNum) => {
    if (err) throw err;
    if (licenseNum) {
      return res.json({
        success: false,
        msg: "동일한 사업자 번호가 존재합니다.",
      });
    } else {
      Business.getUserByUsername(newUser.username, (err, user) => {
        if (user) {
          return res.json({
            success: false,
            msg: "동일한 아이디가 존재합니다.",
          });
        } else {
          Business.addUser(newUser, (err, user) => {
            if (err) {
              return res.json({
                success: false,
                msg: "생년월일을 확인해주세요.",
              });
            } else {
              return res.json({ success: true, msg: "회원가입 성공" });
            }
          });
        }
      });
    }
  });
});

// /businesses/authenticate
router1.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const licenseNum = req.body.licenseNum;

  Business.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "등록되지 않은 아이디입니다." });
    }

    Business.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        if (licenseNum == user.licenseNum) {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800, // 1 week
          });

          res.json({
            success: true,
            token: token,
            user: {
              // 패스워드를 제외한 나머지 필요한 정보를 리턴
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              birth: user.birth,
              licenseNum: user.licenseNum,
            },
          });
        } else {
          return res.json({
            success: false,
            msg: "사업자번호가 일치하지 않습니다.",
          });
        }
      } else {
        return res.json({
          success: false,
          msg: "비밀번호가 일치하지 않습니다.",
        });
      } //60
    }); //58
  });
});

//  접근은 로그인 상태에서만 토큰을 이용하여 접근하도록 설정
router1.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: {
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        birth: req.user.birth,
        licenseNum: req.user.licenseNum,
      },
    });
  }
);

router1.get("/list", (req, res, next) => {
  Business.getAll((err, businesses) => {
    if (err) throw err;
    res.json(businesses);
  });
});
module.exports = router1;
