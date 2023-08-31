from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Enum
from sqlalchemy.sql.sqltypes import INT, ARRAY

Base = declarative_base()

class DmcThread(Base):
    __tablename__ = 'dmc'
    dmc_code = Column(INT, primary_key=True, nullable=False)
    description = Column(String, nullable=False)
    notes = Column(String)
    variant = Column(Enum('6-strand','diamant','metallic','variegated','satin'))
    color = Column(String, nullable=False)
    anchor_codes = Column(ARRAY(INT))
    weeks_dye_works = Column(ARRAY(String))
    classic_colorworks = Column(String)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class AnchorThread(Base):
    __tablename__ = 'anchor'
    anchor_code = Column(INT, primary_key=True, nullable=False)
    description = Column(String, nullable=False)
    notes = Column(String)
    color = Column(String, nullable=False)
    dmc_code = Column(INT)

class WeeksDyeWorksThread(Base):
    __tablename__ = 'weeks_dye_works'
    description = Column(String, primary_key=True)
    notes = Column(String)
    color = Column(String, nullable=False)
    dmc_code = Column(INT)

class ClassicColorworksThread(Base):
    __tablename__ = 'classic_colorworks'
    description = Column(String, primary_key=True)
    notes = Column(String)
    color = Column(String, nullable=False)
    dmc_codes = Column(ARRAY(INT))
