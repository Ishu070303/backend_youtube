const express = require('express')
const router = express.Router()

const { getSearch, page, } = require('../controllers/search')

// SEARCH ROUTE
router.route('/search').get(getSearch)
// PAGINATION ROUTE
router.route('/page').get(page)

module.exports = router