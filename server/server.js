const express=require('express');
//const sequelize=require('sequelize');

var bodyparser = require('body-parser');
var app=express();
var mysql=require("mysql");
var cors=require('cors');
app.use(cors());

// var flag=false;

var con=mysql.createConnection({
   host: "localhost",
    user: "root",
    password: "",
    database: "dbtest"
});
// con.connect();
con.connect(function (err) {

    app.use(bodyparser.urlencoded({
        extended: true
    }));
app.get('/city',(req,res)=>{

            var id = req.query.id;
            //console.log(id);
            var s = "select cid,cname from tblcity where sid='" + id + "'";
            //console.log(s);
            con.query(s, function (err, result) {
                if (err) {
                    throw err;
                }
                //console.log(result);
                res.send(result);
                //con.end();
            });
        });

app.get("/display",(req,res)=>{

    var sql="select t1.did,t1.firstname,t1.lastname,t1.email,t2.sname as state,t3.cname as city from tbldata t1,tblstate t2,tblcity t3 where t1.state=t2.sid and t1.state=t3.sid and t1.city=t3.cid and t2.sid=t3.sid and t1.flag='true' order by t1.firstname asc";

    con.query(sql,(err, result) =>{
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

app.delete("/delete",(req,res)=>{

   var id=req.query.id;

   var sql="update tbldata set flag='false' where did='"+ id +"'";

   con.query(sql,(err,result)=>{
      if(err){
          throw err;
      }
      //console.log(result);
      res.send(result);
   });
});

    app.get("/getdata",(req,res)=>{
        var id=req.query.id;

        var sql="select * from tbldata where did='"+ id +"'";
        // var sql="select t1.*,t3.cname as city from tbldata t1,tblcity t3 where did='"+ id +"' and t1.city=t3.cid";
        con.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            //console.log(result);
            res.send(result);
        });
    });

    app.put("/update",(req,res)=>{
        var id=req.query.id;

        var fname=req.body.fname;
        var lname=req.body.lname;
        var email=req.body.email;
        var state=req.body.state;
        var city=req.body.city;

        //console.log(id+" "+fname+ " "+city);
        var sql="update tbldata set firstname='"+ fname +"', lastname='"+ lname +"',email='"+ email +"',state='"+ state +"',city='"+ city +"' where did='"+ id +"'";
        // console.log(id);
        con.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            // console.log(result);
            res.send(result);
        });
    });

app.post("/insert",(req,res)=>{

        var fname=req.body.fname;
        var lname=req.body.lname;
        var email=req.body.email;
        var state=req.body.state;
        var city=req.body.city;

        var s = "insert into tbldata(firstname,lastname,email,state,city) values('"+fname+"','"+lname+"','"+email+"','"+state+"','"+city+"')";
        // console.log(s);
        con.query(s, function (err, result) {
            if (err) {
                throw err;
            }
            //console.log(result);
            res.send(result);
            //con.end();
        });
    // });
});
});

app.listen(3001,()=>{
   console.log("Connect to the server");
});

