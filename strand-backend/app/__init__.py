from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

from sqlalchemy import create_engine, select, text
from . import models
from . import strand
from sqlalchemy.orm import Session

DEFAULT_ROUTE_LEADERBOARD = "index"
DEFAULT_ROUTE_PLAYER = "player"

app = Flask(__name__)
CORS(app)

load_dotenv()

engine = create_engine(os.getenv('DB_URI'))
engine.connect()

dmc = models.DmcThread

""" with Session(engine) as session: """

@app.route("/get_dmc", methods=['GET'])
def dmc_all():
    with Session(engine) as session:
       m = strand.get_dmc(session)

    response = jsonify(m)
    """ response.headers.add('Access-Control-Allow-Origin', '*') """

    return response
        

@app.route("/add_thread", methods=['POST'])
def index():
    with Session(engine) as session:
        brand = request.json['brand']
        code = request.json['code']
        description =  request.json['description']
        color =  request.json['hex']

        match brand:
            case 'dmc':
                id = strand.add_dmc_thread(session=session, code=code, description=description, color=color)
            case 'anchor':
                strand.add_anchor_thread(description, color, anchor_code=code)
            case 'weeks_dye_works':
                strand.add_weeks_dye_works_thread(description, color)
            case 'classic_colorworks':
                strand.add_classic_colorworks_thread(description, color)
        
    return jsonify(id)


@app.route('/dmc/<dmc_code>', methods=['POST','GET'])
def dmc_thread(dmc_code):
     with Session(engine) as session:
        data = request.data
        strand.add_dmc_thread(session)
        return jsonify(dmc_code)

"""   meta = MetaData()

    dmc = Table(
    'dmc', meta, 
    Column('dmc_code', Integer, primary_key = True, nullable=False), 
    Column('description', String), 
    Column('color', String),
    )
    meta.create_all(engine) """