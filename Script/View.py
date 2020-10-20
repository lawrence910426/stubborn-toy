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

with open("VIEW_" + str(today), 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['行號', '帳號', '姓名', '金額'])
    
    mycursor = mydb.cursor()
    mycursor.execute("SELECT bank_id, bank_account, name, balance FROM users WHERE withdraw = 1 ")
    myresult = mycursor.fetchall()

    for x in myresult:
        print(x)
