from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import dotenv 
import os

dotenv.load_dotenv()


app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST") 
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] =os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DATABASE") 


mysql = MySQL(app)

app.app_context()
cursor = mysql.connection.cursor()
cursor.execute('''Select * from financial_items;''')
#mysql.connection.commit()
data = cursor.fetchall()
cursor.close()