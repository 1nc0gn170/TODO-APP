const db = require("./db.js")
const express = require("express")
const app = express()

app.set('view engine', 'ejs');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));




var randId = () => {
	var charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var randstr = "";
	for(var i=0;i<7;i++){

	randstr+=charset.charAt(Math.round(Math.random(10)*100)%charset.length);

	}
	return randstr;
}

//------------------------------API------------------------------------------------------------------

app.get("/api/notes",(req,res,next) => {
	db.query("SELECT * FROM mynotes;",(err,result,f) => {
		if (err){throw err;}
		res.send(JSON.stringify({"status":"success","error":null,"response":result}));
	});

})

app.get("/api/notes/:id",(req,res,next) => {
	db.query("SELECT * FROM mynotes WHERE id=?;",[req.params.id],(err,result,f) => {
		if (err){throw err;}
		res.send(JSON.stringify({"status":"success","error":null,"response":result}));
	});

})

app.post("/api/notes",(req,res,next) => {
	if (req.body.note){

		data = {id:randId(),note :req.body.note,complete:0};
		db.query("INSERT INTO mynotes SET ?;",data,(err,result,f) => {
			if (err){throw err;}
			res.send(JSON.stringify({"status":"success","error":null,"response":result}));
		});
	}

})

app.put("/api/notes/:id",(req,res,next) => {
	if (req.body.note){

		db.query("UPDATE mynotes SET note =? WHERE id=?;",[req.body.note,req.params.id],(err,result,f) => {
			if (err){throw err;}
			res.send(JSON.stringify({"status":"success","error":null,"response":result}));
		});
	}

})

app.delete("/api/notes/:id",(req,res,next) => {

		
	db.query("DELETE FROM mynotes WHERE id=?;",[req.params.id],(err,result,f) => {
		if (err){throw err;}
		res.send(JSON.stringify({"status":"success","error":null,"response":result}));
	});


})


//--------------------------------------------------------------------------------------------------------

app.get("/update/remove/completed",(req,res,next) => {
	db.query("DELETE FROM mynotes WHERE complete =1;",(err,result,f) => {
		if (err){throw err;}
		res.redirect("/");
	});
})

app.get("/update/:noteId/status/remove",(req,res,next) => {
	noteId  = req.params.noteId;
	db.query("DELETE FROM mynotes WHERE id =?;",[noteId],(err,result,f) => {
		if (err){throw err;}
		res.redirect("/");
	});


})

app.get("/update/:noteId/status/done",(req,res,next) => {
	noteId  = req.params.noteId;
	db.query("UPDATE mynotes SET complete = 1 WHERE id=?",[noteId],(err,result,f) => {
		if (err){throw err;}
		res.redirect("/");
	});

})


app.get("/update/remove/all",(req,res,next) => {
	db.query("TRUNCATE mynotes;",(err,result,f) => {
		if (err){throw err;}
		res.redirect("/");
	});

})

app.post("/add",(req,res,next) => {
	var newId = randId();
	var newNote = req.body.note;
	db.query("INSERT INTO mynotes VALUES(?,?,?)",[newId,newNote,0],(err,result,f) => {
		if (err){throw err;}
		res.redirect("/");
	});

})


app.get("/",(req,res,next) => {
	db.query("SELECT * FROM mynotes;",(err,result,f) => {
		if (err){throw err;}
		res.render("note",{notes:result});
	})

});


app.listen(3000,()=>{
	console.log("Server Started....");
});
