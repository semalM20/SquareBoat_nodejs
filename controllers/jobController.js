const applicationModal = require("../modals/applicationModal");
const jobModal = require("../modals/jobModal");

const getJobs = async (req, res) => {
    try {

        const jobs = await jobModal.find();

        if (jobs.length === 0) {
            return res.status(500).json({
                message: "No Jobs Available"
            })
        }

        res.status(200).json({
            jobs,
            message: "These Jobs are available"
        });

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
};

const postJob = async (req, res) => {
    try {

        const job = new jobModal({ ...req.body, postedBy: req.user._id });
        await job.save();

        res.status(201).json({
            job,
            message: "Job Created Successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
};

const getApplicants = async (req, res) => {
    try {

        const jobs = await jobModal.find({ postedBy: req.user._id });
        console.log("jobs----->", jobs);

        const jobIds = jobs.map(job => job._id);
        console.log("jobId's---->", jobIds);

        const applications = await applicationModal.find({ job: { $in: jobIds } }).populate('candidate job');
        console.log("applications---->", applications);

        res.status(200).json({
            jobs,
            applications,
            message: "Applicants Details Fetched Successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

module.exports = { getJobs, postJob, getApplicants };