from sqlalchemy import create_engine, Column, String, Integer, Date, Uuid, Double
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import dotenv 
import os
from marshmallow import Schema, fields

dotenv.load_dotenv()
db_url = 'localhost:3306'
db_name = os.getenv("MYSQL_DATABASE") 
db_user = os.getenv("MYSQL_USER")
db_password = os.getenv("MYSQL_PASSWORD")
engine = create_engine(f'mysql://{db_user}:{db_password}@{db_url}/{db_name}')

Session = sessionmaker(bind=engine)

Base = declarative_base()

class financialItem(Base):

    __tablename__ = 'financial_items'

    id = Column(Uuid, primary_key=True)
    as_of_date = Column(Date)
    parent = Column(Uuid)
    item = Column(String)
    amount = Column(Double)
    notes = Column(String)
    itemOrder = Column(Integer)
    treeHeight = Column(Integer)

class ItemSchema(Schema):
    id = fields.UUID()
    as_of_date = fields.Date()
    parent = fields.UUID(allow_none=True)
    item = fields.Str()
    amount = fields.Number()
    notes = fields.Str()
    itemOrder = fields.Integer()
    treeHeight = fields.Integer()
