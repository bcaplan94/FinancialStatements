from flask import Flask, render_template, request, jsonify
from src.financialItem import Session, engine, Base, financialItem, ItemSchema
from sqlalchemy import distinct, select, func, update, delete
from sqlalchemy.dialects.mysql import insert
from flask_mysqldb import MySQL
import dotenv 
import os
from flask_cors import CORS
from marshmallow import fields

from dateutil.relativedelta import relativedelta
import uuid
import datetime

app = Flask(__name__)
CORS(app)
dotenv.load_dotenv()

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST") 
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] =os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DATABASE") 

@app.route('/api/items/get_items')
def get_items():
    session = Session()
    argsParam = request.args.get("as_of_date")
    if argsParam is None:
        item_objects = session.query(financialItem).filter(financialItem.as_of_date ==session.query(func.max(financialItem.as_of_date))).order_by(financialItem.itemOrder).all()
    else:        
        argsParam = argsParam[:7]
        print(argsParam)
        item_objects = session.query(financialItem).filter(financialItem.as_of_date == datetime.datetime.strptime(argsParam, '%Y-%m')).order_by(financialItem.itemOrder).all()

    # transforming into JSON-serializable objects
    schema = ItemSchema(many=True)
    items = schema.dump(item_objects)
    # serializing as JSON
    session.close()
    return jsonify(items)

@app.route('/api/items/save_statement',methods=['PUT'])
def add_items():
    session = Session()
    schema = ItemSchema(many=True)
    
    if len(request.json) > 1 and len(request.json[1]) > 0 :
        deleteSchema = ItemSchema(only=['id'], many=True)
        delete_object = deleteSchema.load(request.json[1])
        ids=[tup['id'] for tup in delete_object]
        session.execute(delete(financialItem).where(financialItem.id.in_(ids)))
    
    #upsert items
    items = schema.load(request.json[0])
    stm = insert(financialItem).values(items)
    update_dict = {x.name: x for x in stm.inserted} 
    dupStm = stm.on_duplicate_key_update(**update_dict)
    
    session.execute(dupStm)
    session.commit()
    session.close()
    return jsonify([])

@app.route('/api/items/get_dates')
def get_dates():
    session = Session()
    dates = session.scalars( select(financialItem.as_of_date).distinct().order_by(financialItem.as_of_date.desc()) ).all() 
    session.close()
    return jsonify(dates)

@app.route('/api/items/create_new_statement')
def create_new_statement():
    session = Session()
    item_objects = session.query(financialItem).filter(financialItem.as_of_date ==session.query(func.max(financialItem.as_of_date))).order_by(financialItem.itemOrder).all()
    if not item_objects:
        items = [{'id':uuid.uuid4(),'as_of_date':datetime.datetime.today().replace(day=1),'item':'Assets','itemOrder':0,'amount':0,'treeHeight':0,'notes':''},
                         {'id':uuid.uuid4(),'as_of_date':datetime.datetime.today().replace(day=1),'item':'Liabilites','itemOrder':1,'amount':0,'treeHeight':0,'notes':''},
                         {'id':uuid.uuid4(),'as_of_date':datetime.datetime.today().replace(day=1),'item':'Networth','itemOrder':2,'amount':0,'treeHeight':0,'notes':''}
                         ]
    else:
        schema = ItemSchema(many=True)
        items = schema.dump(item_objects)
        idMapping = {}
        for item in items:
            idMapping[item['id']] = uuid.uuid4()
            item['id'] = idMapping[item['id']]
            if item['parent'] != None:
                item['parent'] = idMapping[item['parent']]            
            item['as_of_date'] = datetime.datetime.strptime(item['as_of_date'], '%Y-%m-%d') + relativedelta(months=1)
    stm = insert(financialItem).values(items)
    session.execute(stm)
    session.commit()
    dates = session.scalars( select(financialItem.as_of_date).distinct().order_by(financialItem.as_of_date.desc()) ).all() 
    session.close()
    return jsonify(dates)

@app.route('/api/items/delete_statement',methods=['DELETE'])
def delete_statement():
    session = Session()
    argsParam = request.args.get("as_of_date")
    print(argsParam)
    session.execute(delete(financialItem).where(financialItem.as_of_date == argsParam))
    session.commit()
    dates = session.scalars( select(financialItem.as_of_date).distinct().order_by(financialItem.as_of_date.desc()) ).all() 
    session.close()
    return jsonify(dates)

@app.route('/api/items/compare')
def compare():
    session = Session()
    date1 = request.args.get("date1")
    date2 = request.args.get("date2")

    if date1 is None or date2 is None:
        objects1 = session.query(financialItem).filter(financialItem.as_of_date ==session.query(func.max(financialItem.as_of_date))).order_by(financialItem.itemOrder).all()
        objects2 = objects1
    else:        
        date1 = date1[:7]
        date2 = date2[:7]
        objects1 = session.query(financialItem).filter(financialItem.as_of_date == datetime.datetime.strptime(date1, '%Y-%m')).order_by(financialItem.itemOrder).all()
        objects2 = session.query(financialItem).filter(financialItem.as_of_date == datetime.datetime.strptime(date2, '%Y-%m')).order_by(financialItem.itemOrder).all()

    # transforming into JSON-serializable objects
    schema = ItemSchema(many=True)
    items1 = schema.dump(objects1)
    items2 = schema.dump(objects2)

    name2id1 = {}
    id2name1 = {}
    itemList=[]

    for ob in items1:
        if ob['parent'] is None:
            id2name1[ob['id']] = ob['item']
            name2id1[ob['item']] = ob['id']
        else:
            newName = id2name1[ob['parent']] + ob['item']
            id2name1[ob['id']] = newName
            name2id1[newName] = ob['id']
        item = {'item2ID':'','item1ID':ob['id'], 'item':ob['item'],'amount1':ob['amount'],'amount2':0,'treeHeight':ob['treeHeight'],'notes1':ob['notes'],'notes2':''}
        itemList.append(item)

    name2id2 = {}
    id2name2 = {}    
    for ob in items2:
        newName = ob['item']
        if ob['parent'] is None:
            id2name2[ob['id']] = newName
            name2id2[ob['item']] = ob['id']
        else:
            newName = id2name2[ob['parent']] + newName
            id2name2[ob['id']] = newName
            name2id2[newName] = ob['id']
        if newName in name2id1:
            id1 = name2id1[newName]
            for i in range(len(itemList)):
                if id1 == itemList[i]['item1ID']:
                    break
            itemList[i]['amount2'] = ob['amount']
            itemList[i]['notes2'] = ob['notes']
            itemList[i]['item2ID'] = ob['id']  
        else:          
            item = {'item2ID':ob['id'],'item1ID':'','item':ob['item'],'amount1':0,'amount2':ob['amount'],'treeHeight':ob['treeHeight'],'notes1':'','notes2':ob['notes']}
            for i in range(len(itemList)):
                if ob['parent'] == itemList[i]['item2ID']:
                    break
            itemList.insert(i+1,item)

    # serializing as JSON
    session.close()
    return jsonify(itemList)

if __name__ == '__main__':  
    app.run(debug=True, host='0.0.0.0')
