import re
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields
from dbo import DataBase
from contentChanger import ContentChanger
import regexCreator
import dbo


app = Flask(__name__)
api = Api(app = app, version='0.1', title='REST API',
    description='RegularExpressions creater'
)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_AS_ASCII'] = False

contentSpace = api.namespace('contentChanger', description='DBworker')
accountSpace = api.namespace('accountManager', description='ManagingAccount')
statisticSpace = api.namespace('userStatistic', description='UserStatistic')

@accountSpace.route("/words/<user_id>&<word>",methods=['GET'])
class WordSaver(Resource):
	@cross_origin()
	def get( self, user_id, word):
		try:
			result = DataBase.getUserWord( user_id, word)
			if result == "":
				result = DataBase.saveWord( user_id, word)
			else:
				result = False
		except:
			result = False
		return make_response(jsonify({'result': result}), 200)

@accountSpace.route("/deleteWord/<user_id>&<word>",methods=['GET'])
class WordDeleter(Resource):
	@cross_origin()
	def get( self, user_id, word):
		try:
			result = DataBase.deleteWord( user_id, word)
		except:
			result = False
		return make_response(jsonify({'result': result}), 200)

@accountSpace.route("/words/<user_id>",methods=['GET'])
class AccauntWordsGet(Resource):
	@cross_origin()
	def get(self,user_id):
		try:
			result = DataBase.getUserWords(user_id)
		except:
			result = False
		return make_response(jsonify({'result': result}), 200)
	
@statisticSpace.route("/statistic/<user_id>",methods=['GET'])
class StatisticGet(Resource):
	@cross_origin()
	def get(self,user_id):
		try:
			result, res_bool = DataBase.getUserStatistic(user_id)
			if not res_bool:
				result = 'Статистика пока не собиралась'
		except:
			result = False
		return make_response(jsonify({'result': result, 'res_bool': res_bool}), 200)
		 

@accountSpace.route("/registration/<login>&<password_hash>",methods=['GET'])
class AccauntRegister(Resource):
	@cross_origin()
	def get(self,login,password_hash):
		try:
			result = DataBase.getUserId(login)
			if result == "":
				result = DataBase.saveNewUser(login,password_hash)
			else:
				result = -1
		except:
			result = -1
		return make_response(jsonify({'result': result}), 200)


@accountSpace.route("/authorization/<login>&<password_hash>",methods=['GET'])
class AccauntAuth(Resource):
	@cross_origin()
	def get(self,login,password_hash):
		try:
			user_info = DataBase.findUser(login)
			if user_info[1]==login and user_info[2]==password_hash:
				result = user_info[0]
				settings = DataBase.getUserSettings(user_info[0])
			else:
				settings = -1
				result = -1


		except:
			settings = -1
			result = -1
		return make_response(jsonify({'result': result, 'settings': settings}), 200)

@accountSpace.route("/settings/<user_id>&<json>",methods=['GET'])
class AccauntSettingsUpdage(Resource):
	@cross_origin()
	def get(self,user_id,json):
		try:
			result = DataBase.updateUserSettings(user_id, json)
		except:
			result = False
		return make_response(jsonify({'result': result}), 200)

@accountSpace.route("/settings/<user_id>",methods=['GET'])
class AccauntSettingsGet(Resource):
	@cross_origin()
	def get(self,user_id):
		try:
			result = DataBase.getUserSettings(user_id)
		except:
			result = False
		return make_response(jsonify({'result': result}), 200)


@contentSpace.route("/changeContent",methods=['POST'])
class AnalizeContentFromJSON(Resource):
	@cross_origin()
	def post(self):
		try:
			request_data = request.get_json()
			resp_res = ContentChanger.getChangedHTML(request_data['website_url'],request_data['user_id'], request_data['analize_text'])
			result_response = True
		except:
			result_response = False
		return make_response(jsonify({'result': resp_res, 'result_response': result_response}), 200)







		 




	