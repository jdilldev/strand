from . import models

def get_dmc(session):
    res = []
    for thread in session.query(models.DmcThread):
        res.append({'code':thread.dmc_code,'color':thread.color, 'description':thread.description, 'brand':'dmc', 'variant':thread.variant })
    return res

def get_anchor(session):
    res = []
    for thread in session.query(models.AnchorThread):
        res.append({'code':thread.anchor_code,'color':thread.color, 'description':thread.description, 'brand':'anchor' })
    return res


def get_weeks_dye_works(session):
    res = []
    for thread in session.query(models.WeeksDyeWorksThread):
        res.append({'color':thread.color, 'description':thread.weeks_dye_works_description, 'brand':'weeksDyeWorks' })
    return res


def get_classic_colorworks(session):
    res = []
    for thread in session.query(models.ClassicColorworksThread):
        res.append({'color':thread.color, 'description':thread.classic_colorworks_description,'brand':'classicColorworks' })
    return res


def add_dmc_thread(session, dmc_code, color, description, anchor_code=None, weeks_dye_works_description=None, classic_colorworks_description=None, variant = '6-strand'):
    print('adding DMC thread')
    print('anchor ',anchor_code)
    score = models.DmcThread(
        dmc_code = dmc_code,
        anchor_code=anchor_code,
        classic_colorworks_description=classic_colorworks_description,
        weeks_dye_works_description=weeks_dye_works_description,
        description = description,
        variant = variant,
        color = color,
    )
    session.add(score)
    session.flush()
    session.commit()
    return session.refresh(score)

def add_anchor_thread(session, anchor_code, color, anchor_description,dmc_code=None):
    print('adding anchor thread')
    score = models.AnchorThread(
        dmc_code = dmc_code,
        color = color,
        anchor_code =  anchor_code,
        description = anchor_description
   
    )
    session.add(score)
    session.commit()

def add_weeks_dye_works_thread(session, description, color, dmc_code=None):
    print('adding weeks dye works thread')
    score = models.WeeksDyeWorksThread(
        dmc_code = dmc_code,
        color = color,
        weeks_dye_works_description = description,
    )
    session.add(score)
    session.commit()

def add_classic_colorworks_thread(session, description, color, dmc_code=None):
    print('adding classic colorworks thread')
    score = models.ClassicColorworksThread(
        dmc_code = dmc_code,
        classic_colorworks_description = description,
        color=color
    )
    session.add(score)
    session.commit()