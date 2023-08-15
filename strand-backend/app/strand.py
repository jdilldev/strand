from . import models

def get_dmc(session):
    res = []
    for thread in session.query(models.DmcThread):
        print (thread.dmc_code)
        res.append({'code':thread.dmc_code,'color':thread.color, 'desc':thread.description })
    return res

def add_dmc_thread(session, code, color, description, variant = '6-strand'):
    print('adding DMC thread')
    score = models.DmcThread(
        dmc_code = code,
        description = description,
        variant = variant,
        color = color,
    )
    session.add(score)
    session.flush()
    session.commit()
    return session.refresh(score)

def add_anchor_thread(session, anchor_code, color, dmc_code, description):
    print('adding anchor thread')
    score = models.AnchorThread(
        dmc_code = dmc_code,
        description =  description,
        color = color,
        anchor_code =  anchor_code,
   
    )
    session.add(score)
    session.commit()

def add_weeks_dye_works_thread(session, description, color, code=None):
    print('adding weeks dye works thread')
    score = models.WeeksDyeWorksThread(
        dmc_code = code,
        description = description,
        color = color,
        weeks_dye_works_description = description,
    )
    session.add(score)
    session.commit()

def add_classic_colorworks_thread(session, description, color, code=None):
    print('adding classic colorworks thread')
    score = models.ClassicColorworksThread(
        dmc_code = code,
        classic_dyeworks_description = description,
        color=color
    )
    session.add(score)
    session.commit()