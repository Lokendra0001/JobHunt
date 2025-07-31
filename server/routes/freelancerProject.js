const { Router } = require('express');
const router = Router();
const Freelancer = require('../models/freelance_project_model');
const checkAuthentication = require('../middlewares/auth');


router.post('/create-project', checkAuthentication, async (req, res) => {
    try {
        const { title, description, budgetType, minBudget, maxBudget, category, skills } = req.body;
        const min = Number(minBudget.replace(/,/g, ''));
        const max = Number(maxBudget.replace(/,/g, ''));

        const project = await Freelancer.create({ title, description, client_id: req.user._id, budgetType, minBudget: min, maxBudget: max, category, skills });
        res.status(201).json({ message: "Project Created Successfully!", project })
    } catch (err) {
        // console.log(err)
        res.status(500).json({ message: err })
    }
})

router.get('/get-projects', checkAuthentication, async (req, res) => {
    try {
        const projects = await Freelancer.find({ client_id: req.user._id })
        res.status(201).json(projects)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err })
    }
})

router.get('/:id', checkAuthentication, async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Freelancer.findById(id).populate('client_id');
        res.status(200).json(project)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err })
    }
})



module.exports = router;
