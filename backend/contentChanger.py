from array import array
import enum
import re

from dbo import DataBase


class ContentChanger:

    def changePage(json):
        # прочитать джейсон, получить user_id и текст
        # получить из базы слова пользователя
        # получить из базы настройки пользователя
        # если п
        user_id = json.user_id
        text = json.text
        regex_array = DataBase.getUserRegExes(user_id)
        settings = DataBase.getUserSettings(user_id)
        for regex in regex_array:
            match = list(set(re.findall(regex, text)))
            for word in match:
                index = re.search(word, text)
                tmp_string = "<span style=\"background-color:#ff0000\" onMouseOver=\"this.innerHTML='" + index.group() + "'\" onMouseOut=\"this.innerHTML='" + '*'*len(index.group()) + "'\">" + '*'*len(index.group()) + "</span>"
                text = text.replace(index.group(),tmp_string)
        return text
        
    def changeBySettings(text, settings):
        how_to_change=settings.how_to_change
        visibility=settings.visibility
        if ()
    
    def changeDOMelement():
        return

    def readSettings():
        return

    def changeContent(user_id, analize_text):
        return



     

