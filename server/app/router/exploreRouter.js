import express from "express";

//modules..
import controller from '../controller/exploreController.js';

const exploreRouter = express.Router();//definindo o objeto rota..

exploreRouter.get('/:searchParam', async (req, res) => {

    try {

        const results = await controller.search(req.params.searchParam, Number(req.query.page) || 1, Number(req.query.limit) || 10);
        res.json(results);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching' });
    }

});

export default exploreRouter;