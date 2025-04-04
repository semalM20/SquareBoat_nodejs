const express = require('express');
const { getJobs, postJob, getApplicants } = require('../controllers/jobController');
const { applyJob, getMyApplications } = require('../controllers/applicationController');
const { login, signUp } = require('../controllers/usersController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();


//user login
router.post('/login', login);

//user register
router.post('/signUp', signUp);

// get all jobs
router.get('/jobs', authMiddleware, getJobs);

// add job
router.post('/jobs', authMiddleware, postJob);

// see applicants who applied to jobs
router.get('/applications/applicants', authMiddleware, getApplicants);


// apply jobs
router.post('/applyJobs', authMiddleware, applyJob);

// get candidate application
router.get('/getApplication', authMiddleware, getMyApplications);


module.exports = router;