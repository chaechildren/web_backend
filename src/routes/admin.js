const express = require("express");
const Data = require("../schema/Data");
const router = express.Router();
const insert=require("../ManipulateDB/insertDB");
const query=require("../ManipulateDB/queryDB");
const update=require("../ManipulateDB/updateDB");
const bcrypt=require('bcryptjs');  //모듈 설치
const url=require('url');
const server=require('server');

router.get("/", async (req, res, next) => {
  //const datas = await Data.find({});
  
  if(req.session.isLogined){
      const datas = [{id:1,email:"abc",name:"kim",password:"123"},{id:2,email:"zxc",name:"lee",password:"qwe"},{id:3,email:"shw",name:"park",password:"1q2w3e4r"}];
      res.render("admin",{data:datas,name:req.session.name});
  }else{
    res.redirect(url.format({
    pathname:"/admin/login",
    query:{
      err:null,
      saveID:req.cookies.savedID,
      saveCheck:req.cookies.savedCheck
    }    
  }))}
});

router.get("/signUp", async (req, res, next) => {
    //const datas = await Data.find({});
    res.render("adminSignUp",{err:null})
  });

router.post("/signUp",async(req,res,next) => {
    let body=req.body;
    const adminCodeNow='1111'; //임시적 admin code
    const email= body.id;
    const name=body.name;
    const password=body.password;
    const passwordCheck=body.passwordCheck;
    const adminCode=body.adminCode;
    var hashedPassword=null;
    if(password!=passwordCheck){
      res.send("<script>alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');window.location.href='/admin/signUp'</script>");
    }
    if(adminCode!=adminCodeNow){
      res.send("<script>alert('Admin code가 일치하지 않습니다.');window.location.href='/admin/signUp'</script>");
    }
    const queryData={
      tableName:'admin_info',
      email:email
    }
    const queryResult=await query(queryData);
    if(queryResult){
      res.send("<script>alert('이미 존재하는 이메일입니다.');window.location.href='/admin/signUp'</script>");
    }
    hashedPassword=bcrypt.hashSync(password); 
    if(hashedPassword){
      const insertData={
        tableName:'admin_info',
        email:email,
        name:name,
        password:hashedPassword
      };
      await insert(insertData);
      res.send("<script>alert('성공적으로 가입되었습니다.');window.location.href='/admin/login'</script>");
    }
});

  router.get("/login", async (req, res, next) => {
    if(req.session.isLogined){
      res.redirect("/admin");
    }else{
      res.render("adminLogin",{err:null,saveID:req.cookies.savedID,saveCheck:req.cookies.savedCheck});
    }
  });

  router.post("/login",async(req,res,next)=>{
      if(req.session.isLogined){
        console.log("already log in");
        res.redirect("/admin");
      }
      const body=req.body;
      const email=body.id;
      const password=body.password;
      const isSaveID=body.saveID;
      const queryData={
          tableName:'admin_info',
          email:email
      };
      const queryResult=await query(queryData);
      if(!queryResult){
        res.clearCookie('savedID');
        res.clearCookie('savedCheck');
        res.render("adminLogin",{err:"아이디가 존재하지 않습니다.",saveID:req.cookies.savedID,saveCheck:req.cookies.savedCheck});
        //res.send("<script>alert('아이디가 존재하지 않습니다.');window.location.href='/admin/login'</script>")
      }else{
        const queryEmail=queryResult.email;
        const queryName=queryResult.name;
        const queryPassword=queryResult.password;
        if(email==queryEmail){
          if(bcrypt.compareSync(password,queryPassword)){
            if(isSaveID){
              res.cookie('savedID',email,{  //쿠키 savedId에 id 저장
                expires: new Date(Date.now() + 1000*60*60*24*90), //90일 후 만료
                httpOnly: true
              });
              res.cookie('savedCheck',true,{  //쿠키 saveCheck에 check 상태 저장
                expires: new Date(Date.now() + 1000*60*60*24*90),
                httpOnly: true
              });
            }else{
              res.clearCookie('savedID');
              res.clearCookie('savedCheck');
            }

            req.session.sid=queryEmail;
            req.session.name=queryName;
            req.session.isLogined=true;
            
            req.session.save(function(){
              res.redirect("/admin");
            }) 
          }
          else{
            res.clearCookie('savedID');
            res.clearCookie('savedCheck');
            res.render("adminLogin",{err:"아이디 또는 비밀번호가 일치하지 않습니다.",saveID:req.cookies.savedID,saveCheck:req.cookies.savedCheck});  
          }
        }
      }
  });
  /*
  router.get("/logout",async(req,res,next)=>{
    res.redirect(url.format({
      pathname:"/admin/login",
      query:{
        err:null,
        saveID:req.cookies.savedID,
        saveCheck:req.cookies.savedCheck
      }    
    })) 
  });
  */
  router.get("/logout",async(req,res,next)=>{
    if(req.session.isLogined){
      req.session.destroy(
        function(err){
          if(err){
            console.log(err);
            return;
          }
          res.redirect(url.format({
            pathname:"/admin/login",
            query:{
              err:null,
              saveID:req.cookies.savedID,
              saveCheck:req.cookies.savedCheck
            }
          }));
        }
      );
    }else{
        console.log("error: 로그인이 되지 않은 상태에서 로그아웃 실행");
        res.redirect(url.format({
          pathname:"/admin/login",
          query:{
            err:null,
            saveID:req.cookies.savedID,
            saveCheck:req.cookies.savedCheck
          }
        }));
    }
  })

module.exports = router;