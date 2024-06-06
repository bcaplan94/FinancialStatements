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

def test2():
    session = Session()
            
    objects1 = session.query(financialItem).filter(financialItem.as_of_date == datetime.datetime.strptime('2024-06', '%Y-%m')).order_by(financialItem.itemOrder).all()
    objects2 = session.query(financialItem).filter(financialItem.as_of_date == datetime.datetime.strptime('2024-07', '%Y-%m')).order_by(financialItem.itemOrder).all()
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
            name2id1[newName] = [ob['id']]
        item = {'item2ID':'', 'item':ob['item'],'amount1':ob['amount'],'amount2':0,'treeheight':ob['treeHeight'],'notes1':ob['notes'],'notes2':''}
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
            name2id2[newName] = [ob['id']]
        if newName in name2id1:
            id1 = name2id1[newName]
            for i in range(len(itemList)):
                if id1 == itemList[i]['id']:
                    break
            itemList[i]['amount2'] = ob['amount']
            itemList[i]['notes2'] = ob['notes']
            itemList[i]['item2ID'] = ob['id']  
        else:          
            item = {'item2ID':ob['id'],'item':ob['item'],'amount1':0,'amount2':ob['amount'],'treeheight':ob['treeHeight'],'notes1':'','notes2':ob['notes']}
            for i in range(len(itemList)):
                if ob['parent'] == itemList[i]['item2ID']:
                    break
            itemList.insert(i+1,item)

    # serializing as JSON
    session.close()
    return jsonify(itemList)