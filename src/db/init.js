const Database = require("./config")

const initDb = {
    async init() {   //sempre que for usar await, ele tem que estar dentro de uma 
        //função async (assincrona)
        const db = await Database()  //iniciar a conexão com o banco de dados
        //a cont db pega or resultado da inicialização(a conexão)
        //await para fazer o codigo esperar o banco de dados terminar de abrir
        //antes de continuar o codigo para nao bugar o resto do codigo
        await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
        )`)

        await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
    ) VALUES (
    "Caio",
    'https://avatars.githubusercontent.com/u/68669058?v=4',
    3000,
    5,
    5,
    4,
    70
        )`)

        await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
    ) VALUES (
    "Pizzaria Guloso",
    2,
    60,
    1621603608538
        )`)
        await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
    ) VALUES (
    "OneTwo Project",
    3,
    47,
    1621603608538
        )`)

        await db.close()    //terminar connexão

    }

}

initDb.init()