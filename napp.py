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

@app.route("/dataOil") 
def dataOil():
    query = pd.read_sql("select * from oil_prices",conn)
    data_oil =query.to_json(orient ="records")

    print(query)
    # return data
    return data_oil

@app.route("/dataMisery") 
def dataMisery():
    query = pd.read_sql("select * from misery_index",conn)
    data_misery =query.to_json(orient ="records")

    print(query)
    # return data
    return data_misery


if __name__ == "__main__":
    app.run(debug=True)
