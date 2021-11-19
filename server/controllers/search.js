const axios = require("axios");
require('dotenv').config();

// FETCHING DATA FROM YOUTUBE API 
exports.getSearch = async(req, res, next) => {
    try {
        const searchQuery = req.query.search_query;
        const url = `${process.env.API_URL}/search?key=${process.env.API_KEY}&type=video&part=snippet&q=${searchQuery}`;
    
        const response = await axios.get(url);
        const titles = response.data.items.map((item) => item.snippet.title);
    
        res.send(titles);
      } 
      
      catch (err) {
        next(err);
      }
}

// FOR PAGINATION OF FETCHED DATA
exports.page = async(req, res, next) => {
    try {
        const searchQuery = req.query.search_query;
        const url = `${process.env.API_URL}/search?key=${process.env.API_KEY}&type=video&part=snippet&q=${searchQuery}`;
    
        const response = await axios.get(url);
        const titles = response.data.items.map((item) => item.snippet.title);

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
    
        const startIndex = (page - 1) * limit
        const lastIndex = page * limit
    
        const results = {}
    
        if(lastIndex < titles.length ) {
            results.next = {
            page: page + 1,
            limit: limit
        }}
    
        if(startIndex > 0){
        results.previous = {
            page:  page - 1,
            limit: limit
        }}
    
        results.results = titles.slice(startIndex, lastIndex)
        res.json(results)


        next();
    }
    catch (error) {
        next(err)
    }
}
