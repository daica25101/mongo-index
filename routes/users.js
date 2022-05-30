var express = require('express');
var router = express.Router();
const User = require('../models/user')

router.post('/' , async (req, res) => {
    const bulk = User.db.collection('users').initializeUnorderedBulkOp();
    for (let i =0 ;i< 1000000; i++) {
        const createdUser = {
            name: `user${i}`, email: `user${i}.gmail.com`
        }
        i % 2 === 0 && (createdUser.isBlocked = true);
        i % 2 === 0 ? (createdUser.status = 1) : (createdUser.status = 0);
        bulk.insert(createdUser)
    }
    await bulk.execute();
    return res.send('Ok done');
})
router.delete('/', async (req, res) => {
    await User.deleteMany();
    return res.send('Ok done');
})
router.post('/email/index' , async (req, res) => {
  await User.db.collection('users').createIndex({
    email: 1
  })
  return res.send('Ok done');
})

router.post('/compound/index', async (req, res) => {
    await User.db.collection('users').createIndex({
        status: 1,
        email: 1
    })
})
router.post('/spare/index', async (req, res) => {
    await User.db.collection('users').createIndex({
        isBlocked: 1
    }, {sparse: true})
    return res.send('Ok done')
})
router.delete('/index' , async (req, res) => {
  await User.db.collection('users').dropIndexes();
  res.send('Ok done');
})

router.get('/', async (req, res) => {
    let params = req.query;
    console.log('Params', params);
    params = JSON.parse(JSON.stringify(params));
    const data = await User.find({
        ...params
    });
    const executionTime = await User.find({
        ...params
    }).explain();
    return res.send({dataCount: data.length, time: `${executionTime.executionStats.executionTimeMillis}ms`});
})
module.exports = router;
