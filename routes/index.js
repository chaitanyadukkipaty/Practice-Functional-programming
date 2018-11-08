var express = require('express');
const Task = require('data.task');
const mongoose = require('mongoose')
const { Record } = require('../models/Record');
const { fetch, fetchOne, saveRecord } = require('../lib/mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req,res)  {
  res.render('index.html');
});
router.post('/', saveData);

function saveData(req,res){
	const state = req.body;
	console.log(state)
	//console.log(req)
	validateInput(state)
		.chain(saveMessage)
		.fork(err => {
			if (err.code && err.code == 'MII')
				return res.status(400).send({code: 'MII', message: 'Missing important information'})

			return res.status(500).send(err)
			}, state => res.status(200).render('index.html'))
	
}

function validateInput (state) {
    if (!state.date || !state.reason || !state.reason)
      return Task.rejected({code: 'MII'})
    return Task.of(state)
  }

function saveMessage (state) {
    return saveRecord(Record, state)
  }
module.exports = router;
