const { Op } = require("sequelize");

const cors=require('cors')
// Express Initialisation
const express = require("express");
const app = express();
app.use(cors())
const port = 3001;
//Heroku
app.use(express.static(path.join(__dirname,'build')))
const port = process.env.PORT

// Sequelize Initialisation
const sequelize = require("./sequelize.js");

const JobPosting = require("./models/jobPosting");
const Candidate = require("./models/candidate");

JobPosting.hasMany(Candidate, { as: "Candidates", foreignKey: "jobId" });
Candidate.belongsTo(JobPosting, { foreignKey: "jobId" })

// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Kickstart the Express aplication
app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'table created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//utils functions
const sortMovies = (a, b) => {
    var nameA = a.description.toUpperCase(); // ignore upper and lowercase
    var nameB = b.description.toUpperCase(); // ignore upper and lowercase
    if (nameA <= nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // descriptions must be equal
    return 0;
}

//api calls for the primary entity
app.get('/jobs', async (req, res) => {
    try {
        const jobs = await JobPosting.findAll()
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/jobsSorted', async (req, res) => {
    try {
        const jobs = await JobPosting.findAll()
        movies.sort(sortMovies)
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/jobs', async (req, res, next) => {
    try {

        await JobPosting.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/jobs/:jid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            await job.update(req.body, { fields: ['description', 'deadline'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/jobs/:jid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            await job.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/jobs/:jid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            res.status(200).json(job)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})



//api calls for the secondary entity
app.get('/candidate', async (req, res) => {
    try {
        const candidate = await Candidate.findAll()
        //books.sort(sortBooks)
        res.status(200).json(candidate)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/candidate', async (req, res, next) => {
    try {

        await Candidate.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/candidate/:cid', async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.cid)
        if (candidate) {
            await candidate.update(req.body, { fields: ['name', 'cv', 'email'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/candidate/:cid', async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.cid)
        if (candidate) {
            await candidate.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.get('/candidate/:cid', async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.cid)
        if (candidate) {
            res.status(200).json(candidate)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

//api calls that modify secondary entities based on their foreign key
app.get('/jobs/:jid/candidate', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            const candidate = await job.getCandidates()
            res.status(200).json(candidate)
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/jobs/:jid/candidate', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            const candidate = req.body
            candidate.jobId = job.id
            await Candidate.create(candidate)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/jobs/:jid/candidate/:cid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            const candidates = await job.getCandidates({ id: req.params.cid })
            var candidate = null
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].id == req.params.cid) {
                    candidate = candidates[i];
                }
            }
            if (candidate) {
                candidate.name = req.body.name;
                candidate.cv = req.body.cv;
                candidate.email = req.body.email;
                await candidate.save();
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/jobs/:jid/candidate/:cid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jid)
        if (job) {
            const candidates = await job.getCandidates({ id: req.params.cid })
            var candidate = null
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].id == req.params.cid) {
                    candidate = candidates[i];
                }
            }
            if (candidate) {
                await candidate.destroy()
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

// filtering jobs - return all the jobs that have a certain date and belong to a certain description
app.get('/actionPast2012', async (req, res) => {


    const referenceDate = new Date(2012, 1, 1);
    try {
        const jobs = await JobPosting.findAll(
            {
                where: {
                    description: 'software engineer',
                    dealine: {
                        [Op.gt]: referenceDate
                    }
                }
            }
        )
        jobs.sort(sortMovies)
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/jobsFilter/:mcategory/:myear', async (req, res) => {

    const referenceDate = new Date(`${req.params.myear}-01-01`);
    try {
        const jobs = await JobPosting.findAll(
            {
                where: {
                    description: req.params.mcategory,
                    deadline: {
                        [Op.gt]: referenceDate
                    }
                }
            }
        )
        jobs.sort(sortMovies)
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})