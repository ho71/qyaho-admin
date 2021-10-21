const express = require("express");
const router = express.Router();
const Cus_num = require("../models/customer_num");

router.get("/cus_nums", async (req, res) => {
  const customer = await Cus_num.find();
  try {
  } catch (error) {}
  res.json(customer);
});

router.post("/cus_nums", async (req, res) => {
  const customer = new Cus_num(req.body);
  console.log(customer);
  ntime = new Date().getTime();
  qrtime = req.body.time; //qr
  username = req.body.username; //qr
  nid = await Cus_num.findOne({ username: username }); //cus num db에서 같은 username의 쿼리문 찾기

  if (nid == null) {
    // db에서 같은 username의 쿼리문 없으면 null 값
    //null이면 신규 등록
    if (qrtime >= ntime - 120000 && qrtime <= ntime + 120000) {
      await customer.save();
      return res.send({
        success: true,
        title: "대기등록 성공!",
        msg: "잠시만 기다려주세요!",
      });
    } else {
      return res.send({
        success: false,
        title: "유효 기간이 지난 QRCODE입니다.",
        msg: "QRcode를 재발급 해주세요!",
      });
    }
  } else if (nid.username == username) {
    //같은 username의 쿼리문 있으면 대기자 명단에서 삭제
    await Cus_num.deleteMany({ username: username });
    return res.send({
      success: false,
      title: "대기등록 종료!",
      msg: "대기를 취소했습니다!",
    });
  } else {
    return res.send({
      success: false,
      title: "알 수 없는 오류 발생",
      msg: "에러 코드 2740.",
    });
  }
});

router.post("/cus_nums1", async (req, res) => {
  username = req.body.username;
  nam = req.body.name;
  const nno = await Cus_num.findOne().sort({ no: 1 }).limit(1);
  nid = await Cus_num.findOne({ username: username }); //cus num db에서 같은 username의 쿼리문 찾기

  if (nid !== null) {
    if (nno.no == nid.no) {
      //같은 username의 쿼리문 있으면 대기자 명단에서 삭제
      await Cus_num.deleteMany({ username: username });
      return res.send({
        success: true,
        title: "환영합니다!",
        msg: nam + "님의 차례입니다!",
      });
    } else {
      return res.send({
        success: false,
        title: "차례를 확인해주세요!",
        msg: nam + "님의 차례가 아닙니다!",
      });
    }
  } else {
    return res.send({
      success: false,
      title: "대기자가 아닙니다!",
      msg: "입구에서 대기 등록을 해주세요!",
    });
  }
});

router.delete("/remove", async (req, res) => {
  await Cus_num.deleteMany();
  res.json({
    message: "ok",
  });
});


router.delete("/:id", async (req, res) => {
  await Cus_num.findByIdAndDelete(req.params.id);
  res.json({
    message: "ok",
  });
});

module.exports = router;
