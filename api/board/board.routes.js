
const express = require('express');
const {requireAuth}=require('../../middlewares/requireAuth.middleware');
const {addBoard,getBoards,getBoard,deleteBoard,updateBoard} = require('./board.controller');
const router = express.Router()

router.get('/',getBoards);
router.get('/:id',getBoard);
router.post('/',addBoard);
router.put('/:id',updateBoard);
router.delete('/:id',requireAuth,deleteBoard);

module.exports=router;