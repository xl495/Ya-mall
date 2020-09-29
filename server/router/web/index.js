module.exports = app => {

    const express = require('express');


    const router = express.Router({
        mergeParams: true
    })


    // mongoose start

    const Article = require('../../models/Article');

    // mongoose ane end


    router.get('/', async(req, res) => {

        const articleList = await Article.find().limit(5).sort({ views: 1 })

        res.send({
            list: articleList
        })
    })

    app.use('/web/api', router)
}