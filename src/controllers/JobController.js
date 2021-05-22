const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async save(request, response) {
        //  const jobs = await Job.get();
        //   const lastId = jobs[jobs.length - 1]?.id || 0;

        await Job.create({
            // id: lastId + 1,   //o banco de dados ja coloca o id automatico
            name: request.body.name,
            "daily-hours": request.body['daily-hours'],
            "total-hours": request.body['total-hours'],
            created_at: Date.now()
        }) //colocar o que veio do formulario na aray jobs
        return response.redirect('/')
    },
    create(request, response) {
        return response.render("job")
    },
    async show(req, res) {

        const jobs = await Job.get();
        const profile = await Profile.get();

        const jobId = req.params.id  //depois do params tem que ser o nome do parametro que foi passado no get

        const job = jobs.find(job => Number(job.id) === Number(jobId)) //encontra o job com o id do parametro e joga ele na constante
        if (!job) {
            return res.send('Job not found!')
        }
        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render("job-edit", { job })
    },
    async update(req, res) {
        const jobId = req.params.id  //depois do params tem que ser o nome do parametro que foi passado no get
        /*
        const jobs = await Job.get();

        const job = jobs.find(job => Number(job.id) === Number(jobId)) //encontra o job com o id do parametro e joga ele na constante
        if (!job) {
            return res.send('Job not found!')
        }
        */

        const updatedJob = {
            //  ...job,
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours'],
        }
        /*
        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            return job
        })
        */

        Job.update(updatedJob, jobId);
        res.redirect('/job/' + jobId)

    },
    async delete(req, res) {

        const jobId = req.params.id

        //Job.data = jobs.filter(job => Number(job.id) !== Number(jobId)) //filter mantem os resultados verdadeiros e retira os falsos

        await Job.delete(jobId)

        return res.redirect('/')
    }

}
