const applicationModal = require("../modals/applicationModal");
const jobModal = require("../modals/jobModal");
const UserModal = require('../modals/UserModal');
const nodemailer = require('nodemailer');

const applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        console.log('Job ID:', jobId);

        const application = new applicationModal({
            candidate: req.user._id,
            job: jobId,
        });

        await application.save();

        const job = await jobModal.findById(jobId).populate('postedBy');
        console.log("job--->", job);
        const candidate = await UserModal.findById(req.user._id);
        console.log("candidate", candidate)

        // recruiterEmail = job.postedBy.email;
        // emailPass = job.postedBy.password;

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: recruiterEmail,
        //         pass: emailPass,
        //     },
        // });

        // const mailOptions = {
        //     from: recruiterEmail,
        //     to: `${candidate.email}, ${job.recruiter.email}`,
        //     subject: 'New Job Application Received',
        //     text: `📩 Candidate ${candidate.email} has applied for the job: "${job.title}".`,
        // };

        // await transporter.sendMail(mailOptions);

        res.status(201).json({
            application,
            message: 'Applied Successfully',
        });

    } catch (error) {
        console.error('Error applying for job:', error.message);
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = { applyJob };


const getMyApplications = async (req, res) => {
    try {

        const apps = await applicationModal.find({ candidate: req.user._id }).populate('job');
        console.log(apps)

        if (apps.length === 0) {
            return res.status(201).json({
                message: "No Applications Found"
            })
        }

        res.status(200).json({
            apps,
            message: "Applications Fetched Successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error,
        })
    }
}


module.exports = { applyJob, getMyApplications };
