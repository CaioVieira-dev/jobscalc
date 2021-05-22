const express = require("express");
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
//const views = __dirname + "/views/" //depois de alterar o path no server, essa linha não é mais necessaria


//o ejs ja procura a pasta views por padrao, na pasta raiz
//se o views tiver dentro do src tem que dar um miguezinho
//const basePath = __dirname + "/views";    //usar sem o ejs

//request, response
//pedir a pagina no get
//pedir a pagina no get
//routes.get('/', (request, response) => response.render(basePath + "/index.html")) //rota sem ejs
routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)    //:id parametro
routes.post('/job/:id', JobController.update)    //:id parametro
routes.post('/job/delete/:id', JobController.delete)    //:id parametro
routes.get('/profile', ProfileController.index) //segundo parametro é um objeto
routes.post('/profile', ProfileController.update)

module.exports = routes;