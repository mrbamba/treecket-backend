const logger = require("../../services/logger.service");
const boardService = require('./board.service');

async function getBoards(req,res){
    try{
        const boards = await boardService.query(req.body);
        res.send(boards);
    }catch(err){
        logger.error("cannot get Boards", err);
        res.status(500).send({error:'Cannot get boards'});
    }
}

async function getBoard(req,res){
    try{
        const board = await boardService.getById(req.params.id);
        res.send(board);

    }catch(err){
        logger.error("cannot get Board", err);
        res.status(500).send({err:'Cannot get board'});
    }
}

async function deleteBoard(req,res){
    try{
        await boardService.remove(req.params.id);
        res.end();
    }catch(err){
        logger.error('Cannot delete board',err);
        res.status(500).send({err:'Cannot delete board'});
    }
}

async function addBoard(req,res){
    try{
        let board=await boardService.add(req.body);
        res.send(board);
    }catch(err){
        logger.error('Cannot add board',err);
        res.status(500).send({err:'Cannot add board'});
    }
}

async function updateBoard(req,res){
    try{
        let board=await boardService.update(req.body);
        res.send(board);

    }catch(err){
        logger.error('Cannot update board',err);
        res.status(500).send({err:'Cannot update board'});
    }
}

module.exports = {
    getBoards,
    getBoard,
    deleteBoard,
    addBoard,
    updateBoard,
};