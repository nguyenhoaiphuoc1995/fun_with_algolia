const express = require('express')
const { getQuery, postSyncDataToAlgolia } = require('../controllers/test.controller')
const router = express.Router()

router.get("/query", getQuery)
router.post("/sync", postSyncDataToAlgolia)


module.exports = router;