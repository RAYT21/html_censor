
from dbo import DataBase
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
        string_settings = DataBase.getUserSettings(user_id)
        return Settings(
            True if string_settings[0] == '1' else False,
            True if string_settings[1] == '1' else False,
            True if string_settings[2] == '1' else False,
            True if string_settings[3] == '1' else False, 
        )
    
    def getUserRegExes(user_id):
        return DataBase.getUserRegExes(user_id)
    
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
                                    counter
                                )
                            )  
            DataBase.saveUserStatistic(user_id, website_url, len(tmp_array), { 'banned_words': tmp_array })   
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