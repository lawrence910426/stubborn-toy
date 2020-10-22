import csv
from datetime import date

import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode

mydb = mysql.connector.connect(
    host="localhost",
    user="stubbornnews",
    password="2rjurrru",
    database="stubborntoy"
)

today = date.today()
mydb.autocommit = False

with open("OUTPUT/EXPORT_" + str(today) + ".csv", 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['行號', '帳號', '姓名', '金額'])
    
    try:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT bank_id, bank_account, name, balance FROM users WHERE withdraw = 1")
        myresult = mycursor.fetchall()
        mycursor.execute("INSERT INTO transfers (user_id, reason, amount, datetime) SELECT U.id, 'Withdrawl', -U.balance, CURRENT_TIMESTAMP FROM users AS U WHERE U.withdraw = 1")
        mycursor.execute("UPDATE users AS U SET U.balance = 0 WHERE U.withdraw = 1")
        
        for x in myresult:
            writer.writerow(x)
            print(x)
        
        mydb.commit()
    except mysql.connector.Error as error :
        print("Failed to update record to database rollback: {}".format(error))
        # reverting changes because of exception
        conn.rollback()
    
