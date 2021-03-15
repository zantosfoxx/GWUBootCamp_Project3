import json,pymysql
from flask import Flask, render_template
from sqlalchemy import create_engine
import pandas as pd
import config

from config import remote_db_endpoint, remote_db_port
from config import remote_db_name, remote_db_user, remote_db_pwd
import mysql.connector

engine = create_engine(f'mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}')
conn = engine.connect()
app = Flask(__name__)

@app.route("/")
def index():

    return render_template('index.html')  
@app.route("/dataPrime") 
def dataPrime():
    query = pd.read_sql("select * from us_prime_rate",conn)
    data_prime =query.to_json(orient ="records")

    print(query)
    # return data
    return data_prime



@app.route("/yearMortgage_30") 
def yearMortgage_30():
    query = pd.read_sql("select * from mortgage30y_rates",conn)
    data_30yrs =query.to_json(orient ="records")

    print(query)
    # return data
    return data_30yrs

@app.route("/yearMortgage_15") 
def yearMortgage_15():
    query = pd.read_sql("select * from mortgage15y_rates",conn)
    data_15yrs =query.to_json(orient ="records")

    print(query)
    # return data
    return data_15yrs

@app.route("/dataPrime5yrs") 
def dataPrime5yrs():
    query = pd.read_sql("select * from us_5yprime_rate",conn)
    data_5yrs =query.to_json(orient ="records")

    print(query)
    # return data
    return data_5yrs

@app.route("/yearMortgage_7") 
def yearMortgage_7():
    query = pd.read_sql("select * from mortgage7y_rates",conn)
    data_7yrs =query.to_json(orient ="records")

    print(query)
    # return data
    return data_7yrs

@app.route("/yearMortgage_5") 
def yearMortgage_5():
    query = pd.read_sql("select * from mortgage5y_rates",conn)
    data_5yrs =query.to_json(orient ="records")

    print(query)
    # return data
    return data_5yrs
    
    
    
if __name__ == "__main__":
    app.run(debug=True)
