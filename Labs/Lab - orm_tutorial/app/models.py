from app import db

class Customer(db.model):
	id = db.Column(db.Integer, primary_key=True)
	company = db.Column(db.String(120), unique=False)
	email = db.Column(db.String(120))

	def __repr__(self):
		return '<customer %r>' % self.id