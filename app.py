import json
from flask import Flask, render_template, jsonify
import pandas as pd
import os
import requests
import datetime
# import geopandas as gpd
import re
# SQL Alchemy
from sqlalchemy import create_engine
# PyMySQL 
import pymysql
pymysql.install_as_MySQLdb()
# Config variables
from config import remote_db_endpoint, remote_db_port
from config import remote_db_name, remote_db_user, remote_db_pwd

#======MEAKIN STARTS=======
import quandl
from config import API_key
#=====MEAKIN ENDS==========
from config import api_key
# %%
# Cloud MySQL Database Connection on AWS
pymysql.install_as_MySQLdb()
cloud_engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
# Create a remote database engine connection
# cloud_conn = cloud_engine.connect()
# %%
app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return render_template('index.html')

# =========== VERA STARTS =========
@app.route("/tickerlist")
def tickerlist(): 
    
    cwd = os.getcwd()
    
    tickerlist = pd.read_csv("static/data/tickerlist_industries.csv")
    tickerlist_json = tickerlist.to_json(orient='records')   #orient='columns'
    
    return tickerlist_json

    #=======MEAKIN STARTS==========

@app.route("/ticker_returns")
def ticker_returns():
    quandl.ApiConfig.api_key = API_key
    start_date = '2008-01-01'
    EOD = quandl.get('EOD/AAPL', start_date = start_date).reset_index()
    EOD['Returns'] =EOD['Close'].pct_change(1)
    EOD["Cum_returns"] = (EOD['Returns']+1).cumprod()
    EOD.head()

    EOD =EOD[['Date','Open', 'High', 'Low', 'Returns', 'Cum_returns']]
    EOD['Date'] = EOD['Date'].dt.strftime('%Y-%m-%d')

    data_data = EOD.to_json(orient="records")
    
    return data_data   

@app.route("/gold_returns")
def gold_returns():
    quandl.ApiConfig.api_key = API_key
    start_date = '2008-01-01'
    gold = quandl.get('LBMA/GOLD', start_date='2008-01-01').reset_index()
    
    gold['Returns'] =gold['USD (PM)'].pct_change(1)
    gold["Cum_returns"] = (gold['Returns']+1).cumprod()
   
    gold =gold[['Date','USD (AM)','USD (PM)', 'Returns', 'Cum_returns']]
    gold['Date'] = gold['Date'].dt.strftime('%Y-%m-%d')
   
    data_data= gold.to_json(orient="records") 

    return data_data 

    #=======MEAKIN ENDS============
    #=======NICKS STARTS===========
   
@app.route("/dataPrime") 
def dataPrime():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from us_prime_rate",cloud_conn)
    data_prime =query.to_json(orient ="records")
  
    print(query)
    cloud_conn.close()
    # return data
    return data_prime

@app.route("/dataOil") 
def dataOil():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from oil_prices",cloud_conn)
    data_oil =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_oil

@app.route("/dataMisery") 
def dataMisery():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from misery_index",cloud_conn)
    data_misery =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_misery
   
#=======NICKS END===========
#=======REGINA STARTS===========

@app.route("/dataPrimer") 
def dataPrimer():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from us_prime_rate",cloud_conn)
    data_primer =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()

    #return data
    return data_primer

@app.route("/yearMortgage_30") 
def yearMortgage_30():
    cloud_conn = cloud_engine.connect()
    query = pd.read_sql("select * from mortgage30y_rates",cloud_conn)
    data_30yrs =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_30yrs

@app.route("/yearMortgage_15") 
def yearMortgage_15():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from mortgage15y_rates",cloud_conn)
    data_15yrs =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_15yrs

@app.route("/dataPrime5yrs") 
def dataPrime5yrs():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from us_5yprime_rate",cloud_conn)
    data_5yrs =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_5yrs

@app.route("/yearMortgage_7") 
def yearMortgage_7():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from mortgage7y_rates",cloud_conn)
    data_7yrs =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_7yrs

@app.route("/yearMortgage_5") 
def yearMortgage_5():
    cloud_conn = cloud_engine.connect()

    query = pd.read_sql("select * from mortgage5y_rates",cloud_conn)
    data_5yrs =query.to_json(orient ="records")

    print(query)
    cloud_conn.close()
    # return data
    return data_5yrs

#=======REGINA END===========

if __name__ == "__main__":
    app.run(debug=True)