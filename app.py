import json
import geojson
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


if __name__ == "__main__":
    app.run(debug=True)