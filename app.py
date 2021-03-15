import json
from flask import Flask, render_template, jsonify
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

import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import plotly.graph_objects as go
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
    #=======Nick Starts============
@app.route("/prime_rate")
def prime_rate():
    #read records 
    prime_rate=pd.read_csv("../Stock-market/static/data/MPRIME.csv")
    prime_rate['Date'] = pd.to_datetime(prime_rate['Date'])

    # change datatype of date column to datetime
    prime_rate['Date'] = pd.to_datetime(prime_rate['Date'])

    # Filter data for 15 years
    filtered_prime_rate = prime_rate.loc[(prime_rate['Date'] >= '2006-01-01') ]

    # set Date column as index 
    filtered_prime_rate_df = filtered_prime_rate.set_index('Date')

    # GROUP THE PRIME RATE BY YEAR AND AGRREGATE BY AVERAGE
    prime_rate_grouped_avg = filtered_prime_rate_df.groupby(lambda x: x.year)['MPRIME'].agg(['mean'])
   
    # Effective Federal Funds Rate
    # Federal funds rate is the target interest rate set by the Federal Open Market Committee (FOMC) at which commercial banks borrow and lend their excess reserves to each other overnight

    fed_funds_rate = quandl.get("FRED/EFFR", authtoken = API_key)
   
    # reset index 
    fed_funds_rate=fed_funds_rate.reset_index()
    
    # filter feds funds rate to 15 years
    fed_funds_rate_filter = fed_funds_rate.loc[(fed_funds_rate['Date'] >= '2006-01-01') ]
                        
    # set Date as index
    fed_funds_rate_filter =fed_funds_rate_filter.set_index('Date')
    fed_funds_rate_filter.tail()
    
    # # Oil prices
    # DESCRIPTION: Reference Price for the OPEC Crude Oil Basket. Currently includes: Saharan Blend (Algeria), Girassol (Angola), Oriente (Ecuador), Iran Heavy (Islamic Republic of Iran), Basra Light (Iraq), Kuwait Export (Kuwait), Es Sider (Libya), Bonny Light (Nigeria), Qatar Marine (Qatar), Arab Light (Saudi Arabia), Murban (UAE) and Merey (Venezuela).

    # In[90]:
    oil_prices = quandl.get("OPEC/ORB", authtoken= API_key)

     # reset index
    oil_prices_df=oil_prices.reset_index()
   
    # Filter data for 15 years
    filtered_oil_prices = oil_prices_df.loc[(oil_prices_df['Date'] >= '2006-01-01') ]
                        
    # set index
    filtered_oil_prices_df =filtered_oil_prices.set_index('Date')

    # create figure and axis objects with subplots() for prime rates
    fig,ax = plt.subplots(figsize =(12,6))

    # make a plot
    ax.plot(fed_funds_rate_filter.Value, color="MediumBlue",label ="fed funds rate")
    ax.plot(filtered_prime_rate_df.MPRIME, color="red",label ="prime rate")

    ax.set_xlabel("Date",fontsize=14)
    # set y-axis label
    ax.set_ylabel(" rate (%)",fontsize=14)
    ax.set_title("prime rate")
 
    # twin object for two different y-axis on the sample plot
    ax2 = ax.twinx()

    # make a plot with different y-axis using second axis object  by add oil_data to same plot
    ax2.plot(filtered_oil_prices_df.Value,  color="LimeGreen", label = "oil price")
    ax2.set_ylabel("oil price ($)", color="green", fontsize=14)
    ax.set_title("prime rate compared to OPEC oil_prices")

    ax.plot(np.nan, '-g', label = 'oil price')
    ax.legend(loc=0)

    ax.grid()
    plt.show()
    # save the plot as a file
    fig.savefig('prime_rate_compared_to_OPEC_oil_prices.jpg',
            format='jpeg',
            dpi=150,
            bbox_inches='tight')


    # #Misery index
    # Misery_index = quandl.get("USMISERY/INDEX", authtoken = API_key)

    # #reset index
    # Misery_index_df=Misery_index.reset_index()
    
    # # Filter data for 15 years
    # Misery_index_filtered = Misery_index_df.loc[(Misery_index_df['Date'] >= '2006-01-01') ]
    # #set index
    # Misery_index_filtered_df = Misery_index_filtered.set_index('Date')   

    # # GROUP THE MISERY INDEX BY YEAR AND AGRREGATE BY AVERAGE
    # misery_index_grouped_avg = Misery_index_filtered_df.groupby(lambda x: x.year)['Misery Index'].agg(['mean'])            
   
    # # PLOT PRIME RATE AND MISERY INDEX
    # # create bar plot for misery index
    # # create line plot for prime rate
    # fig = plt.figure(figsize=(10,6))
    # ax = Misery_index_filtered_df['Misery Index'].plot(kind='bar', use_index=True,color='blue')
    # ax.set_title('prime rate compared to misery index', fontsize=16)
    # ax.set_xlabel('Date', fontsize=16)
    # ax.set_ylabel('misery index', fontsize=16, color='blue')

    # ax2 = ax.twinx()
    # ax2.plot(filtered_prime_rate_df['MPRIME'].values, linestyle='-', linewidth=2.0, color='red')
    # ax2.set_xlabel('Date', fontsize=16)
    # ax2.set_ylabel('rate(%)', fontsize=16, color='red')

    # # change prime rate Dataframe to json
    # data_data = filtered_prime_rate_df.to_json(orient="records") 
    
    # return data_data
    
    # #change oil Data to json
    # data_data = filtered_oil_prices_df.to_json(orient ="records")
    
    # return data_data

    # # change misery data to json
    # data_data = Misery_index_filtered_df.to_json(orient = "records")
    
    # return data_data

    
    # #=======Nick Ends==============

if __name__ == "__main__":
    app.run(debug=True)