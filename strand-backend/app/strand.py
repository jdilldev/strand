from . import models
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import update

def convert_to_dict(obj):
 dictionary = dict(obj.__dict__)
 dictionary.pop('_sa_instance_state', None)

 return dictionary


def get_thread(session, brand, id):
    res = 'ERROR'
    if (brand == 'dmc'):
        try:
            res = session.query(models.DmcThread).get(id)
            res = convert_to_dict(res)
        except:
            res = "Not Found"
    if (brand == 'anchor'):
        try:
            res = session.query(models.AnchorThread).get(id)
            res = convert_to_dict(res)
        except:
            res = "Not Found"  
    if (brand == 'weeksDyeWorks'):
        try:
            res = session.query(models.WeeksDyeWorksThread).get(id)
            res = convert_to_dict(res)
        except:
            res = "Not Found"
    if (brand == 'classicColorworks'):
        try:
            res = session.query(models.ClassicColorworksThread).get(id)
            res = convert_to_dict(res)
        except:
            res = "Not Found"  

    return res

def delete_thread(session, brand, id):
    res = 'ERROR'
    if (brand == 'dmc'):
        try:
            to_delete = session.query(models.DmcThread).get(id)
            session.delete(to_delete)
            res ='deleted'
        except:
            res = "Not Found"
    if (brand == 'anchor'):
        try:
            to_delete = session.query(models.AnchorThread).get(id)
            session.delete(to_delete)
            res ='deleted'
        except:
            res = "Not Found"  
    if (brand == 'weeksDyeWorks'):
        try:
            to_delete = session.query(models.WeeksDyeWorksThread).get(id)
            session.delete(to_delete) 
            res ='deleted'
        except:
            res = "Not Found"
    if (brand == 'classicColorworks'):
        try:
            to_delete = session.query(models.ClassicColorworksThread).get(id)
            session.delete(to_delete)
            res ='deleted'
        except:
            res = "Not Found"  

    session.flush()
    session.commit()
    return res


def get_dmc(session):
    res = []
    for thread in session.query(models.DmcThread):
        dmc_thread = get_thread(session,'dmc',thread.dmc_code)
        res.append(dmc_thread)
    return res

def get_anchor(session):
    res = []
    for thread in session.query(models.AnchorThread):
        anchor_thread = get_thread(session,'anchor',thread.anchor_code)
        res.append(anchor_thread)
    return res


def get_weeks_dye_works(session):
    res = []
    for thread in session.query(models.WeeksDyeWorksThread):
        weeks_dye_works_thread = get_thread(session, 'weeksDyeWorks', thread.description)
        res.append(weeks_dye_works_thread)
    return res


def get_classic_colorworks(session):
    res = []
    for thread in session.query(models.ClassicColorworksThread):
        classic_colorworks_thread = get_thread(session, 'classicColorworks', thread.description)
        res.append(classic_colorworks_thread)
    return res


def add_dmc_thread(session, color, dmc_code, description, keywords, anchor_codes=None, weeks_dye_works=None, classic_colorworks=None, variant = '6-strand'):
    print('adding DMC thread')
    score = models.DmcThread(
        color = color,
        dmc_code = dmc_code,
        description = description,
        variant = variant,
        keywords = keywords,
        anchor_codes=anchor_codes,
        weeks_dye_works=weeks_dye_works,
        classic_colorworks=classic_colorworks,
    )
    session.add(score)
    session.flush()
    session.commit()
    return session.refresh(score)

def add_anchor_thread(session, color, anchor_code, description, keywords, dmc_code=None):
    print('adding anchor thread')
    score = models.AnchorThread(
        color = color,
        anchor_code=anchor_code,
        description = description,
        keywords = keywords,
        dmc_code = dmc_code,
    )
    session.add(score)
    session.commit()

def add_weeks_dye_works_thread(session, description, color, keywords, dmc_code=None):
    print('adding weeks dye works thread')
    score = models.WeeksDyeWorksThread(
        color = color,
        description = description,
        keywords = keywords,
        dmc_code = dmc_code,
    )
    
    session.add(score)
    session.commit()

def add_classic_colorworks_thread(session, color, description, keywords, dmc_codes=None):
    print('adding classic colorworks thread')
    score = models.ClassicColorworksThread(
        color = color,
        description = description,
        keywords = keywords,
        dmc_codes = dmc_codes,
    )
    session.add(score)
    session.commit()

#session.query(Clients).filter(Clients.id == client_id_list).update({'status': status})
#session.commit()

#session.execute(update(stuff_table, values={stuff_table.c.foo: stuff_table.c.foo + 1}))
#session.commit()

#q = dbsession.query(Toner)
#q = q.filter(Toner.toner_id==1)
#record = q.one()
#record.toner_color = 'Azure Radiance'

#dbsession.commit() 

def update_dmc_thread(session, data):
    print(data)
    session.execute(update(models.DmcThread).where(models.DmcThread.dmc_code==data['dmc_code']).values(data))

    session.commit()   

def update_anchor_thread(session, data):
    print(data)
    session.execute(update(models.AnchorThread).where(models.AnchorThread.anchor_code==data['anchor_code']).values(data))
    
    session.commit()   

def update_weeks_dye_works_thread(session, data):
    print(data)
    session.execute(update(models.WeeksDyeWorksThread).where(models.WeeksDyeWorksThread.description==data['description']).values(data))
    """     if (data['dmc_code']):
        del data['description'] #dont want to change dmc_description in dmc table
        session.execute(update(models.DmcThread).where(models.DmcThread.dmc_code==data['dmc_code']).values(data)) """

    session.commit()    


def update_classic_colorworks_thread(session, data):
    print(data)
    session.execute(update(models.ClassicColorworksThread).where(models.ClassicColorworksThread.description==data['description']).values(data))
    session.commit()    
