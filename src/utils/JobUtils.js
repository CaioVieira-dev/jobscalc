module.exports = {
    remainingDays(job) {
        //calculo do tempo restante
        const remaingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remaingDays)
        const dueDate = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDate - Date.now()
        //transformar milissegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        // restam x dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
}