/**
 * Created by zk on 14-9-27.
 */

var mongodb = require('./db');
var _ = require('../public/underscore/underscore-min.js');
var ObjectId = require('mongodb').ObjectID;

function Property(){
}

module.exports = Property;

Property.prototype.update = function(product,id,property,callback){
    //要存入数据库的商品

    if(property.length !=0){
        for (value in property){
            product[value] = property[value];
        }
    }
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({'_id':new ObjectId(id)
            },product,function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};