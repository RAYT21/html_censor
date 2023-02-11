import pymorphy2 as pymorphy


class RegexCreator:
    def create():
        return

    def createRegEx(word):
        morph = pymorphy.MorphAnalyzer()
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
    
