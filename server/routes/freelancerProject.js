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

router.get('/get-allProjects', async (req, res) => {
    try {
        const projects = await Freelancer.find().populate('client_id')
        res.status(201).json(projects)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err })
    }
})

router.patch('/add-seeker-proposal', checkAuthentication, async (req, res) => {
    try {

        const { mobile, coverLetter, bidAmount, deliveryTime, currentStatus, projectId } = req.body;
        const project = await Freelancer.findById(projectId);
        if (!project.proposals.find((p) => p.seeker_id == req.user._id)) {
            project.proposals.push({ seeker_id: req.user._id, seeker_phoneno: mobile, seeker_currentStatus: currentStatus, coverLetter, bidAmount, deliveryTime });
            await project.save();
            return res.status(200).json({ message: "Applied Successfully!", projectId: project._id })
        }
        return res.status(200).json({ error: "You Already apply this form!" })

    } catch (err) {
        // console.log(err)
        res.status(500).json({ message: err })
    }
})



router.get('/get-allProposals', checkAuthentication, async (req, res) => {
    try {
        const { projectid } = req.headers;
        const project = await Freelancer.findOne({ _id: projectid }).populate('proposals.seeker_id');
        res.status(200).json(project)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err })
    }
})


router.patch('/accept-proposal', async (req, res) => {
    try {
        const { _id, proposalId } = req.body
        const project = await Freelancer.findById(_id);
        const seeker = project.proposals.find((proposal) => proposal._id.toString() === proposalId);
        seeker.status = "Accepted";
        project.status = "Assigned";
        project.assignedFreelancerId = seeker.seeker_id;
        console.log(project)
        await project.save();
        res.status(200).json(project)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err })
    }
})

router.patch('/reject-proposal', async (req, res) => {
    try {
        const { _id, proposalId } = req.body
        const project = await Freelancer.findById(_id);
        const seeker = project.proposals.find((proposal) => proposal._id.toString() === proposalId);
        seeker.status = "Rejected";
        await project.save();
        res.status(200).json(project)
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
