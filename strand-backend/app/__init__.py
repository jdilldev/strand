from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import create_engine, select, text, insert
from . import models
from . import strand
from sqlalchemy.orm import Session

app = Flask(__name__)
CORS(app)

load_dotenv()

engine = create_engine(os.getenv('DB_URI'))
engine.connect()

dmc = models.DmcThread

#session.query(Clients).filter(Clients.id == client_id_list).update({'status': status})
#session.commit()

#session.execute(update(stuff_table, values={stuff_table.c.foo: stuff_table.c.foo + 1}))
#session.commit()

#q = dbsession.query(Toner)
#q = q.filter(Toner.toner_id==1)
#record = q.one()
#record.toner_color = 'Azure Radiance'

#dbsession.commit()

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

@app.route("/get_thread/<brand>/<id>", methods=['GET'])
def getThread(brand, id):
    with Session(engine) as session:
       m = strand.get_thread(session,brand, id)

    response = jsonify(m)

    return response


@app.route("/add_thread", methods=['POST'])
def addThread():
    print(request.json)
    with Session(engine) as session:
        brand = request.json['brand']
        color =  request.json['hex']
        description =  request.json['description']
        variant = '6-strand'
        keywords = request.json['keywords']
            
        match brand:
            case 'dmc':
                dmc_code = request.json['dmc_code']
                anchor_codes = request.json['anchor_codes'] if 'anchor_codes' in request.json else []
                weeks_dye_works= request.json['weeks_dye_works'] if 'weeks_dye_works' in request.json else []
                classic_colorworks= request.json['classic_colorworks'] if 'classic_colorworks' in request.json else None
                strand.add_dmc_thread(session=session, color=color,dmc_code=dmc_code, description=description, variant=variant,  keywords=keywords, anchor_codes=anchor_codes, weeks_dye_works=weeks_dye_works, classic_colorworks=classic_colorworks)
            case 'anchor':
                dmc_code = request.json['dmc_code']
                anchor_code = request.json['anchor_code']
                strand.add_anchor_thread(session=session ,color=color, anchor_code=anchor_code, description=description,keywords=keywords, dmc_code=dmc_code)
            case 'weeksDyeWorks':
                dmc_code = request.json['dmc_code']
                strand.add_weeks_dye_works_thread(session=session,description=description, color=color, keywords=keywords, dmc_code=dmc_code)
            case 'classicColorworks':
                dmc_codes = request.json['dmc_codes']
                strand.add_classic_colorworks_thread(session=session, color=color, description=description, keywords=keywords, dmc_codes=dmc_codes)
    
    return jsonify('m')

