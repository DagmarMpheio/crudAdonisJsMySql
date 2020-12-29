'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
/*ROUTA PARA AS API's*/
Route.put('/api/posts/:id', 'PostController.update')
Route.delete('/api/posts/:id', 'PostController.destroy')
Route.post('/api/posts', 'PostController.store')
Route.get('/api/posts', 'PostController.index')
Route.get('/api/posts/:id', 'PostController.show')


/*ROTA PARA A WEB*/
Route.on('/').render('home')
//Rota apontando para o metodo index dentro da classe PostController
//rota para mostrar todos os posts
Route.get('/posts', 'PostController.index')
//rota para add novo post
Route.get('/posts/add', 'PostController.create')
//rota para actualizar a pagina de post
Route.get('/posts/edit/:id', 'PostController.edit')
//rota para mostrar um especifico post
Route.get('/posts/:id', 'PostController.show')
//rota para guardar os posts
Route.post('/posts', 'PostController.store')
//rota para processar a actualizacao
Route.put('/posts/:id', 'PostController.update')
//rota para excluir dados
Route.delete('/posts/:id', 'PostController.destroy')