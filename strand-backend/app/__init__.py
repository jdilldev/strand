from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import create_engine, select, text
from . import models
from . import strand
from sqlalchemy.orm import Session

app = Flask(__name__)
CORS(app)

load_dotenv()

engine = create_engine(os.getenv('DB_URI'))
engine.connect()

dmc = models.DmcThread

""" with Session(engine) as session: """

@app.route("/dmc", methods=['GET'])
def dmc_all():
    with Session(engine) as session:
       m = strand.get_dmc(session)

    response = jsonify(m)
    return response

@app.route("/anchor", methods=['GET'])
def anchor_all():
    with Session(engine) as session:
       m = strand.get_anchor(session)

    response = jsonify(m)

    return response
        

@app.route("/weeks_dye_works", methods=['GET'])
def weeks_dye_works_all():
    with Session(engine) as session:
       m = strand.get_weeks_dye_works(session)

    response = jsonify(m)

    return response
        
@app.route("/classic_colorworks", methods=['GET'])
def classic_colorworks_all():
    with Session(engine) as session:
       m = strand.get_classic_colorworks(session)

    response = jsonify(m)

    return response

@app.route("/add_thread", methods=['POST'])
def index():

    print(request.json)
    with Session(engine) as session:
        brand = request.json['brand']
        dmc_code = request.json['dmcCode']
        dmc_description =  request.json['dmcDescription']
        anchor_code = request.json['anchorCode']
        anchor_description =  request.json['anchorDescription']
        weeks_dye_works_description = request.json['weeksDyeWorksDescription']
        classic_colorworks_description = request.json['classicColorworksDescription']
        color =  request.json['hex']
        variant = request.json['variant']

        match brand:
            case 'dmc':
                id = strand.add_dmc_thread(session=session, description=dmc_description, color=color, variant=variant, dmc_code=dmc_code, anchor_code=anchor_code, weeks_dye_works_description=weeks_dye_works_description, classic_colorworks_description=classic_colorworks_description)
                anchor_code and strand.add_anchor_thread(session=session, color=color, anchor_code=anchor_code, anchor_description=anchor_description, dmc_code=dmc_code)
                weeks_dye_works_description and strand.add_weeks_dye_works_thread(session=session, color=color, description=weeks_dye_works_description, dmc_code=dmc_code)
                classic_colorworks_description and strand.add_classic_colorworks_thread(session=session, color=color, description=classic_colorworks_description, dmc_code=dmc_code)
            case 'anchor':
                id = strand.add_anchor_thread(session, anchor_code,color, anchor_description, dmc_code)
            case 'weeksDyeWorks':
                id = strand.add_weeks_dye_works_thread(session,weeks_dye_works_description, color, dmc_code=dmc_code)
            case 'classicColorworks':
                id = strand.add_classic_colorworks_thread(session,classic_colorworks_description, color, dmc_code=dmc_code)
        
    return jsonify('m')


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