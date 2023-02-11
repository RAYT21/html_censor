from inspect import getcallargs
from multipledispatch import dispatch
import psycopg2 as postgre
from regexCreator import RegexCreator
from contextAnalizer import ContextAnalizer
import requests


class DataBase:

    DB_HOST = 'localhost'
    DB_NAME = 'diplomDB'
    DB_USER = 'admin'
    DB_PASSWORD = 'admin'
    DB_PORT = '5432'

    DEFAULT_JSON = ""



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

        cur.execute("""
        INSERT INTO users (login, password_hash) 
        VALUES (%(login)s, %(password_hash)s);
        """,
        {'login': login, 'password_hash': password_hash})

        conn.commit()

        user_id = DataBase.getUserId(cur, login)

        cur.execute("""
        INSERT INTO settings (user_id, password_hash) 
        VALUES (%(user_id)s, %(settings_json)s);
        """,
        {'user_id': user_id, 'settings_json': DataBase.DEFAULT_JSON})
        conn.commit()
        cur.close()
        conn.close()
        
        


    def updateUserSettings(user_id: int, settings_json: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        UPDATE settings 
        SET settings_json = %(settings_json)s)
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id, 'settings_json': settings_json})

        conn.commit()
        cur.close()
        conn.close()



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

    def saveImportingDictWords(user_id: int, words: requests.json):
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




    def saveModel(user_id: int):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        path_to_model = ContextAnalizer.setPath() ################# change it

        cur.execute("""
        INSERT INTO ml_models (user_id, path_to_model) 
        VALUES (%(user_id)s, %(path_to_model)s);
        """,
        {'user_id': user_id,'path_to_model': path_to_model})
        
        conn.commit()
        cur.close()
        conn.close()


# get data methods

    @dispatch(str)
    def getUserId(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()
        cur.execute("""
        SELECT user_id FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})
        result = cur.fetchone()[0]
        cur.close()
        conn.close()
        return result

    @dispatch(object, str)
    def getUserId(cur, login: str):
        cur.execute("""
        SELECT user_id FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})
        return cur.fetchone()[0]

    def getUserWords(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        user_id = DataBase.getUserId(cur,login)

        cur.execute("""
        SELECT word FROM regular_exceptions 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})
        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

    def getUserRegEx(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        user_id = DataBase.getUserId(cur,login)

        cur.execute("""
        SELECT word FROM regular_exceptions 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})
        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

    def getUserSettings(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        user_id = DataBase.getUserId(cur,login)

        cur.execute("""
        SELECT settings_json FROM settings 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})

        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

    def getUserModelPath(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        user_id = DataBase.getUserId(cur,login)

        cur.execute("""
        SELECT path_to_model FROM ml_models 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})

        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

