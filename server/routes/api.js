const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { sequelize } = require("../models");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require("../models/user");
const Workspace = require("../models/workspace");


const router = express.Router();

router.get("/workspaces", isLoggedIn, async (req, res, next) => {
  try {
    const workspaces = await Workspace.findAll({
      where: { OwnerId: req.user.id },
    })
    // const workspaces = await Workspace.findAll({
    //   include: [
    //     {
    //       model: User,
    //       as: "Members",
    //       attributes: ["id"],
    //       through: {
    //         where: { UserId: req.user.id },
    //         attributes: ["UserId"],
    //       },
    //     },
    //   ],
    // });
    return res.json(workspaces)
  } catch (error) {
    next(error);
  }
});

router.post("/workspaces", isLoggedIn, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const workspace = await Workspace.create(
      {
        title: req.body.title,
        content: req.body.content,
        OwnerId: req.user.id,
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    return res.json(workspace);
  } catch (error) {
    await t.rollback();
    next(error);
  }
});

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

router.get("/users", (req, res, next) => {
  return res.json(req.user || false);
});

router.post("/users", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post("/users/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(
        await User.findOne({
          where: { id: user.id },
          attributes: ["id", "nickname", "email"],
        })
      );
    });
  })(req, res, next);
});

router.post("/users/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
