const logger = require('../../services/logger.service');
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
};

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board');
    try {
        const boards = await collection.find(criteria).sort({"createdAt":1}).toArray();
        return boards
    } catch (err) {
        console.log("DB/Board Service ERROR: Cannot find boards");
        throw err;
    }
}

async function getById(boardId) {

    const collection = await dbService.getCollection('board');

    try {
        const board = await collection.findOne({"_id":ObjectId(boardId)});
        return board;
    } catch (err) {
        console.log("DB/Board Service ERROR: Cannot find board");
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board');
    try {
        await collection.deleteOne({ _id: ObjectId(boardId) })
    } catch (err) {
        console.log("DB/Board Service ERROR: Cannot remove board");
        throw err;
    }
}

async function update(board) {
    board._id = ObjectId(board._id);
    const collection = await dbService.getCollection('board');

    try {
        await collection.replaceOne({"_id":board._id}, board)
        return board;
    } catch (err) {
        console.log("DB/Board Service ERROR: Cannot update board");
        throw err;
    }
}

async function add(board) {
    const collection = await dbService.getCollection('board');
    try {
        await collection.insertOne(board);
        return board
    }catch(err){
        console.log("DB/Board Service ERROR: Cannot add board");
        throw err;
    }
}

function _buildCriteria(filterBy){
    const criteria = {};
    if(filterBy.title){
        var filterTitle = new RegExp(filterBy.title, 'i');
        criteria.title = {$regex: filterTitle}
    }
    return criteria;
}