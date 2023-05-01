from inspect import getcallargs
import re
from multipledispatch import dispatch
import psycopg2 as postgre

class DataBase:

    DB_HOST = 'localhost'
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
        conn.close()
        return result

    def getUserRegEx(user_id: int):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        SELECT word FROM regular_exceptions 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})

        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

    def getUserSettings(user_id: int):
        conn = DataBase.getConnection()
        cur = conn.cursor()


        cur.execute("""
        SELECT settings FROM settings 
        WHERE user_id = %(user_id)s;
        """,
        {'user_id': user_id})

        result = cur.fetchone()
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



    def getPasswordHash(login: str):
        conn = DataBase.getConnection()
        cur = conn.cursor()

        cur.execute("""
        SELECT password_hash FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})

        result = cur.fetchone()
        cur.close()
        conn.close()
        return result

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

        cur.execute("""
        SELECT id FROM users 
        WHERE login = %(login)s;
        """,
        {'login': login})
        try:
            user_id = cur.fetchone()[0]
        except:
            user_id = "NIHUYA"
        print(user_id)
        print("vseOKK 4")
        cur.execute("""
        INSERT INTO settings (user_id, settings) 
        VALUES (%(user_id)s, %(settings)s);
        """,
        {'user_id': user_id, 'settings': DataBase.DEFAULT_JSON})

        print("vseOKK 5")
        conn.commit()
        cur.close()
        conn.close()
        return user_id
    
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
            result = ""
        cur.close()
        conn.close()
        return result

    def getUserRegEx(user_id):
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


print(DataBase.getUserId('Nemo'))

print(DataBase.getUserWords(2))

print(DataBase.saveNewUser('niger','tiger'))

user_info = DataBase.findUser('Admin')
print(user_info[0])
print(user_info[1])
print(user_info[2])


print(DataBase.getUserRegEx('Admin'))

