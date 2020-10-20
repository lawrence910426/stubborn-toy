import csv
from datetime import date
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode

today = date.today()

with open("VIEW_" + str(today), 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['行號', '帳號', '金額'])

