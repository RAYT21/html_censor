from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields
import regexCreator
import dbo


app = Flask(__name__)
api = Api(app = app, version='0.1', title='REST API',
    description='RegularExpressions creater'
)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_AS_ASCII'] = False

regexSpace = api.namespace('regexGenerator', description='WordBack')
crudSpace = api.namespace('database', description='DBworker')


@regexSpace.route("/<word>",methods=['GET'])
class uidClaassTypes(Resource):
	@cross_origin()
	def get(self,word):
		regex = regexCreator.RegexCreator.createRegEx(word)
		return make_response(jsonify({'word': word,'regex': regex}), 200)
		 



	