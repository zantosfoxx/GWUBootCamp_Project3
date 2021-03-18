import json
from flask import Flask, render_template, jsonify, request, make_response, redirect
import pandas as pd
import os
import requests
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

# %%
# Cloud MySQL Database Connection on AWS
cloud_engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
# Create a remote database engine connection
cloud_conn = cloud_engine.connect()
# %%
app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return render_template('index.html')




    #=======MEAKIN STARTS==========
@app.route("/ticker_test")
def ticker_test(): 
    #if methods == "POST"
    quandl.ApiConfig.api_key = API_key
    # start_date = '2019-10-19'
    # end_date = '2020-02-05'
    # ticker = "AAPL"

    # inputs = request.get_json()
    ticker = request.args.get("ticker")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    

    print(ticker)

    response = make_response(jsonify({'message': 'flask is running on POST method'}), 200)
    
    EOD = quandl.get(f'EOD/{ticker}', start_date = f'{start_date}', end_date = f'{end_date}').reset_index()
    EOD['Returns'] =EOD['Close'].pct_change(1)
    EOD["Cum_returns"] = (EOD['Returns']+1).cumprod()
    

    EOD =EOD[['Date','Open', 'High', 'Low', 'Returns', 'Cum_returns']]
    EOD['Date'] = EOD['Date'].dt.strftime('%Y-%m-%d')

    data_data = EOD.to_json(orient="records")

    # print(data_data)

    return data_data

    #elif methods == "GET"

#     #=======MEAKIN STARTS==========
# @app.route("/ticker_test", methods = ["GET", "POST"])
# def ticker_test(): 
#     if methods == "POST"
#     quandl.ApiConfig.api_key = API_key
#     # start_date = '2019-10-19'
#     # end_date = '2020-02-05'
#     # ticker = "AAPL"

#     inputs = request.get_json()
#     ticker = inputs["ticker"]
#     start_date = inputs["start_date"]
#     end_date = inputs["end_date"]
    

#     print(ticker)

#     response = make_response(jsonify({'message': 'flask is running on POST method'}), 200)
    
#     EOD = quandl.get(f'EOD/{ticker}', start_date = f'{start_date}', end_date = f'{end_date}').reset_index()
#     EOD['Returns'] =EOD['Close'].pct_change(1)
#     EOD["Cum_returns"] = (EOD['Returns']+1).cumprod()
    

#     EOD =EOD[['Date','Open', 'High', 'Low', 'Returns', 'Cum_returns']]
#     EOD['Date'] = EOD['Date'].dt.strftime('%Y-%m-%d')

#     data_data = EOD.to_json(orient="records")

#     print(data_data)

#     return data_data

#     elif methods == "GET"
    

@app.route("/ticker_returns")
def ticker_returns():
    quandl.ApiConfig.api_key = API_key
    start_date = '2019-10-19'
    end_date = '2020-02-05'
    ticker = "AAPL"

    # inputs = request.get_json()
    # print(inputs)

    #response = make_response(jsonify({'message': 'flask is running on POST method'}), 200)
   
   

    EOD = quandl.get(f'EOD/{ticker}', start_date = f'{start_date}', end_date = f'{end_date}').reset_index()
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


if __name__ == "__main__":
    app.run(debug=True)