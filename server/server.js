const express=require('express');
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
            console.log(s);
            con.query(s, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log(result);
                res.send(result);
                //con.end();
            });
        });

app.get("/display",(req,res)=>{

    var sql="select t1.did,t1.firstname,t1.lastname,t1.email,t2.sname as state,t3.cname as city from tbldata t1,tblstate t2,tblcity t3 where t1.state=t2.sid and t1.state=t3.sid and t1.city=t3.cid and t2.sid=t3.sid";
    //var sql="select t1.*,t2.sname,t3.cname from tbldata t1,tblstate t2,tblcity t3 ";
    con.query(sql,(err, result) =>{
        if (err) {
            throw err;
        }
        console.log(result);
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
        console.log(s);
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

