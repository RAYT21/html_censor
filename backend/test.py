from dataclasses import dataclass
import re
from timeit import repeat

@dataclass
class Settings:
    do_work: bool
    hide_content: bool
    colorise_text: bool
    show_on_toggle: bool

@dataclass
class BadWord:
    word: str
    inTag: bool 
    counter: int
    startIndex: int
    endIndex: int





class ContentChanger:
    
    def wordInsideTag(startIndex,endIndex,analize_text):
        a1 = analize_text[:startIndex].rfind('>')
        a2 = analize_text[:startIndex].rfind('<')
        b1 = analize_text[endIndex:].rfind('>')
        b2 = analize_text[endIndex:].rfind('<')
        if ((a1 > a2 and b1 > b2) or ((a1 == a2 == -1) or (b1 == b2 == -1))):
            return False
    
        return True


    def chageContent(analize_text, finded_words, settings):
        for word in finded_words:
            print(word)
            if not word.inTag:
                replacer_word = (
                    "<span "
                    + ("style=\"background-color:#ff0000\" " if settings.colorise_text else "")
                    + ("onMouseOver=\"this.innerHTML='" + word.word + "'\" onMouseOut=\"this.innerHTML='" + '*'*len(word.word) + "'\"" if settings.show_on_toggle else "")
                    
                    +">" 
                    + '*'*len(word.word) 
                    + "</span>"
                )

            else:
                replacer_word = '*'*len(word.word)
            offset = 0
            if word.counter > 1:
                for i in range(0,word.counter-1):
                    tmp = analize_text[offset:].index(word.word) + 1
                    offset = offset if tmp < offset else tmp 
            analize_text = analize_text[:offset] + analize_text[offset:].replace(word.word, replacer_word, 1)
        return analize_text


    def readUserSettings(user_id):
        string_settings = '1101'
        return Settings(
            True if string_settings[0] == '1' else False,
            True if string_settings[1] == '1' else False,
            True if string_settings[2] == '1' else False,
            True if string_settings[3] == '1' else False, 
        )
    
    def getUserRegExes(user_id):
        return [
"[(О|о|O|o|0)][(Г|г|G|g|r)][(У|у|Y|y|U|u)][(Р|р|P|p|R|r)][(Е|е|Ё|ё|E|e)(Ц|ц|С|с|C|c)][(Ц|ц|С|с|C|c)(А|а|A|a|@)(У|у|Y|y|U|u)(О|о|O|o|0)(Е|е|Ё|ё|E|e)(Ы|ы|\|Ь|\|ь|\|b|bi)][(М|м|M|m)(В|в|B|V|v|W|w)(Х|х|X|x|H|h|}{)]?[(И|и|Й|й|I|i|U|u|1)]?"
        ]#DataBase.getUserRegExes(user_id)
    
    def detectBadWordsInHTML(analize_text, user_regexes, website_url, user_id, settings):
        log_of_analise = []
        tmp_array = []
        try:
            for user_regex in user_regexes:
                regex = re.compile(user_regex)
                matched_words = list(set(re.findall(regex, analize_text)))
                for matched_word in matched_words:
                    index = 0
                    while True:
                        finded = re.search(matched_word, analize_text[index:])
                        
                        if finded is None:
                            break
                        else: 
                            startIndex = finded.span()[0]
                            endIndex = finded.span()[1]
                            index = endIndex + index
                            inTag = ContentChanger.wordInsideTag(startIndex, endIndex, analize_text)
                            counter = ContentChanger.getCounter(log_of_analise, matched_word, settings) if matched_word in tmp_array else 1
                            tmp_array.append(matched_word)
                            
                            log_of_analise.append(
                                BadWord(
                                    matched_word,
                                    inTag,
                                    counter,
                                    startIndex,
                                    endIndex
                                )
                            )  
            return log_of_analise
            
        except:
            return log_of_analise

    def getCounter(bad_words, finding_word, settings):
        counter = 1
        for bad_word in reversed(bad_words):
            if bad_word.word == finding_word:
                counter = bad_word.counter + 1 if bad_word.inTag else bad_word.counter if not settings.show_on_toggle else bad_word.counter + 1
                break
        return counter

    def getChangedHTML(website_url,user_id, analize_text): 
        try:
            user_settings = ContentChanger.readUserSettings(int(user_id))
            user_regexes = ContentChanger.getUserRegExes(int(user_id))
            finded_words = ContentChanger.detectBadWordsInHTML(analize_text, user_regexes, website_url, int(user_id), user_settings)
            if user_settings.hide_content:
                changed_text = ContentChanger.chageContent(analize_text, finded_words, user_settings)
                return changed_text
            else: 
                return 'Content not changed'
        except:
            return 'error'
        
text= """
<span text"OGUрец"></span>
<span>Город</span>
<span>   огурец</span>
<span text"огурец"></span>
<span text"*****"></span>
<span>0гуRец</span>
"""



print(ContentChanger.getChangedHTML('www.yandex.ru','1',text))




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







		 




	