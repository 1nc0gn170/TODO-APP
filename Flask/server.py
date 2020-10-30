#!/usr/bin/python3

from flask import Flask,render_template,request,redirect
from string import printable
from random import choice
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.sqlite3"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.debug = 1
db = SQLAlchemy(app)

class todo(db.Model):
	id = db.Column("id",db.String(7),primary_key=1)
	note = db.Column(db.String(500))
	complete = db.Column(db.Boolean, default=False)

	def __init__(self,id,note,complete):
		self.id = id
		self.note = note
		self.complete = complete


def generateId():
	newId = ""
	for i in range(7):
		newId+=choice(printable[:-39])
	return newId




@app.route("/update/remove/completed")
def deleteCompleted():
	todo.query.filter_by(complete = 1).delete()
	db.session.commit()

	return redirect("/")



@app.route("/update/remove/all",methods=["GET"])
def removeAll():
	todo.query.delete()
	db.session.commit()
	return redirect("/")

@app.route("/update/<noteId>/status/done")
def complete(noteId):
	change = todo.query.filter_by(id=noteId).first()
	change.complete = not change.complete
	db.session.add(change)
	db.session.commit()
	return redirect("/")

@app.route("/update/<noteId>/status/remove")
def delete(noteId):
	change = todo.query.filter_by(id=noteId).delete()
	db.session.commit()
	
	return redirect("/")


@app.route("/add",methods=["POST"])
def add():
	noteId = generateId()
	title = request.form.get("title")
	if (title):
		data = todo(noteId,title,0)
		db.session.add(data)
		db.session.commit()

	return redirect("/")


@app.route("/")
def main():
	return render_template("note.html",notes=todo.query.all())


db.create_all()
app.run()
