from unittest import result
import pymorphy3 as pymorphy



dictionary =   {
    'а' : '(А|а|A|a|@)',
    'б' : '(Б|б|B|b|6)',
    'в' : '(В|в|B|V|v|W|w)',
    'г' : '(Г|г|G|g|r)',
    'д' : '(Д|д|D|d|g)',
    'е' : '(Е|е|Ё|ё|E|e)',
    'ё' : '(Е|е|Ё|ё|E|e)',
    'ж' : '(Ж|ж|ZH|zh|zH|Zh|*|}\|{|}\/{)',
    'з' : '(З|з|Z|z|3)',
    'и' : '(И|и|Й|й|I|i|U|u|1)',
    'й' : '(Й|й|И|и|U|u|I|i)',
    'к' : '(К|к|K|k)',
    'л' : '(Л|л|L|l|1)',
    'м' : '(М|м|M|m)',
    'н' : '(Н|н|N|n|H|h)',
    'о' : '(О|о|O|o|0)',
    'п' : '(П|п|P|p|n)',
    'р' : '(Р|р|P|p|R|r)',
    'с' : '(С|с|C|c|S|s)',
    'т' : '(Т|т|T|t|m)',
    'у' : '(У|у|Y|y|U|u)',
    'ф' : '(Ф|ф|F|f)',
    'х' : '(Х|х|X|x|H|h|}{)',
    'ц' : '(Ц|ц|С|с|C|c)',
    'ч' : '(Ч|ч|CH|Ch|cH|ch|4)',
    'ш' : '(Ш|ш|Щ|щ|SH|Sh|sH|sh)',
    'щ' : '(Ш|ш|Щ|щ|SH|Sh|sH|sh)',
    'ь' : '(Ь|ь|b)',
    'ъ' : '(Ъ|ъ|b)',
    'ы' : '(Ы|ы|\|Ь|\|ь|\|b|bi)',
    'э' : '(Э|э|E|e)',
    'ю' : '(Ю|ю|IO|Io|iO|io)',
    'я' : '(Я|я|YA|Ya|yA|ya|9)'
}


class RegexCreator:
    def modifyRegEx(regex):
        result_string = ""
        for char in regex:
            if char in dictionary:
                result_string += dictionary[char]
            else:
                result_string +=char
        return result_string

    def generateRegExByWord(word):
        morph = pymorphy.MorphAnalyzer()
        array = []
        for i in morph.parse(word):
            for n in i.lexeme:
                if n.word not in array: 
                    array.append(n.word)
        subarray = [[]]

        for i in range(0, len(array)):
            for j in range(0, len(array[i])):
                if len(subarray) <= j:
                    subarray.append([])
                if array[i][j] in subarray[j]:
                    continue;
                else:
                    subarray[j].append(array[i][j])

        min_len = len(min(array, key=len))

        regex_string = ''

        for i in range(0, len(subarray)):
            regex_string+="["
            for j in range(0,len(subarray[i])):
                regex_string+=subarray[i][j]
            regex_string+="]"
            if  len(subarray[i]) >= 1 and i >= min_len:
                regex_string+="?"
        return regex_string 

    def createRegEx(word):
        word = word.lower()
        regex  = RegexCreator.generateRegExByWord(word)
        return RegexCreator.modifyRegEx(regex)


    
