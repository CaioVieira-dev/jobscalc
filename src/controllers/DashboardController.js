const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(request, response) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            //ajustes no job
            //calculo do tempo
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress';

            /*
            if (status == 'done') {
                statusCount.done++
            } else if (status == 'progress') {
                statusCount.progress++
            }*/
            statusCount[status] += 1

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;
            /*
            if (status == 'progress') {
                jobTotalHours += Number(job['daily-hours'])
            }
            */
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
        })

        //quantidade de horas que quero trabalhar 
        //menos a quantidade de horas dia de cada job em progress

        const freeHours = profile['hours-per-day'] - jobTotalHours;

        return response.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }

}