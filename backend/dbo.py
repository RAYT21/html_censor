from inspect import getcallargs
from multipledispatch import dispatch
import psycopg2 as postgre
from regexCreator import RegexCreator


class DataBase:

    DB_HOST = 'POSTGRES'
    DB_NAME = 'diplomDB'
    DB_USER = 'admin'
    DB_PASSWORD = 'admin'
    DB_PORT = '5432'

    DEFAULT_JSON = '{"jojo": "mail"}'



    def getConnection():
        conn = postgre.connect( host=DataBase.DB_HOST,
                                port=DataBase.DB_PORT,
                                dbname=DataBase.DB_NAME,
                                user=DataBase.DB_USER,
                                password=DataBase.DB_PASSWORD)
        return conn


# save data methods
    def saveNewUser(login: str, password_hash: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        print("vseOKK 1")

        cur.execute("""
        INSERT INTO users (login, password_hash) 
        VALUES (%(login)s, %(password_hash)s);
        """,
        {'login': login, 'password_hash': password_hash})
        print("vseOKK 2")
        conn.commit()
        print("vseOKK 3")
 
        user_id = DataBase.getUserId(cur,login)
        
        print("vseOKK 4")
        cur.execute("""
        INSERT INTO settings (user_id, settings_json) 
        VALUES (%(user_id)s, %(settings_json)s);
        """,
        {'user_id': user_id, 'settings_json': DataBase.DEFAULT_JSON})

        print("vseOKK 5")
        conn.commit()
        cur.close()
        conn.close()
        return user_id
        
        


    def updateUserSettings(user_id: int, settings: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        UPDATE settings 
        SET settings = %(settings)s)
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id, 'settings': settings})

        conn.commit()
        cur.close()
        conn.close()
        return True



    def saveWord(user_id: int, word: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        regular_exception = RegexCreator.createRegEx(word)

        cur.execute("""
        INSERT INTO regular_exceptions (user_id, word, regular_exception) 
        VALUES (%(user_id)s, %(word)s, %(regular_exception)s);
        """,
        {'user_id': user_id, 'word': word, 'regular_exception': regular_exception})
        
        conn.commit()
        cur.close()
        conn.close()

        return True


    def deleteWord(user_id: int, word: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        DELETE FROM regular_exceptions WHERE user_id=%(user_id)s AND word=%(word)s;
        """,
        {'user_id': user_id, 'word': word})
        
        conn.commit()
        cur.close()
        conn.close()

        return True
    

    def saveImportingDictWords(user_id: int, words):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        for let in words:
            cur.execute("""
            INSERT INTO regular_exceptions (user_id, word, regular_exception) 
            VALUES (%(user_id)s, %(word)s, %(regular_exception)s);
            """,
            {'user_id': user_id, 'word': let.word, 'regular_exception': let.regular_exception})
        
        conn.commit()
        cur.close()
        conn.close()


    @dispatch(str)
    def getUserId(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        cur.execute("""
        SELECT id FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})
        try:
            result = cur.fetchone()[0]
        except:
            result = ""
        cur.close()
        conn.close()
        return result

    @dispatch(object, str)
    def getUserId(cur, login: str):
        cur.execute("""
        SELECT id FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})
        try:
            result = cur.fetchone()[0]
        except:
            result = ""
        return result

    def getUserWord(user_id: int, word: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        try:
            cur.execute("""
            SELECT word FROM regular_exceptions 
            WHERE user_id = %(user_id)s AND word =  %(word)s;
            """,
            {'user_id': user_id,'word': word})
            result = cur.fetchone()[0]
        except:
            result = ""
        cur.close()
        conn.close()
        return result

    def getUserWords(user_id: int):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        result = []
        cur.execute("""
        SELECT word FROM regular_exceptions 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})
        table_data = cur.fetchall()
        for num, row in enumerate(table_data):
            result.append(row[0])
        cur.close()
        conn.close()
        return result

    def getUserSettings(user_id: int):
        conn = DataBase.getConnection()
        cur = conn.cursor()


        cur.execute("""
        SELECT settings_json FROM settings 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})

        result = cur.fetchone()[0]
        cur.close()
        conn.close()
        return result

    def getUserModelPath(user_id: int):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        SELECT path_to_model FROM ml_models 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})

        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

    def findUser(login):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        cur.execute("""
        SELECT * FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})
        try:
            result = cur.fetchone()
        except:
            result = [-1,'-1','-1']
        cur.close()
        conn.close()
        return result

    def getUserRegExes(user_id):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        result = []
        cur.execute("""
        SELECT regular_exception FROM regular_exceptions 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})
        table_data = cur.fetchall()
        for num, row in enumerate(table_data):
            result.append(row[0])
        cur.close()
        conn.close()
        return result
    
    def getUserStatistic(user_id):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        result = []
        cur.execute("""
        SELECT * FROM statistic 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})
        table_data = cur.fetchall()
        for num, row in enumerate(table_data):
            result.append(row[0])
        cur.close()
        conn.close()
        return result
    
    def saveUserStatistic(user_id, website_url, counter_banned_words, banned_words):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        INSERT INTO statistic (user_id, website_url, counter_banned_words, banned_words) 
        VALUES (%(user_id)s, %(website_url)s, %(counter_banned_words)s, %(banned_words)s);
        """,
        {'user_id': user_id, 'website_url': website_url, 'counter_banned_words': counter_banned_words, 'banned_words': banned_words})
        
        conn.commit()
        cur.close()
        conn.close()

        return True

