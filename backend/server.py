from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields
import pymorphy3
import re


app = Flask(__name__)
api = Api(app = app, version='0.1', title='REST API',
    description='RegularExpressions creater'
)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_AS_ASCII'] = False

regexGenerator = api.namespace('regexGenerator', description='WordBack')


@regexGenerator.route("/<word>",methods=['GET'])
class uidClaassTypes(Resource):
	@cross_origin()
	def get(self,word):
		regex = createRegEx(word)
		return make_response(jsonify({'word': word,'regex': regex}), 200)
		 
def createRegEx(word):
	morph = pymorphy3.MorphAnalyzer()
	array = []
	for i in morph.parse(word):
		print(i)
		for n in i.lexeme:
			print(n.word,end=' ')
			if n.word not in array: 
				array.append(n.word)
		print('\n')
	
	print(array)
	subarray = [[]]
	print(subarray)
	indx = 0
	
	for i in range(0, len(array)):
		for j in range(0, len(array[i])):
			if len(subarray) <= j:
				subarray.append([])
			if array[i][j] in subarray[j]:
				continue;
			else:
				subarray[j].append(array[i][j])
	
	min_len = len(min(array, key=len))
	print(min_len)
	print(subarray)
	
	regex_string = ''
	
	for i in range(0, len(subarray)):
		regex_string+="["
		for j in range(0,len(subarray[i])):
			regex_string+=subarray[i][j]
		regex_string+="]"
		if  len(subarray[i]) >= 1 and i >= min_len:
			regex_string+="?"
	return regex_string 
	