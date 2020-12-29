'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */

//bringing in model
const Post = use('App/Models/Post')
//bringing in Validator
const {validate} = use('Validator')

class PostController {
    /**
     * Show a list of all posts.
     * GET posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({request, response, view}) {
        //pegar todos os posts
        const posts = await Post.all()

        //usado para redirecionar para uma pagina, posts.index eh o mesmo que posts/index
        return view.render('posts.index', {
            title: "Parametros da Página Inicial",
            posts: posts.toJSON()
        })

    }

    /**
     * Render a form to be used for creating a new post.
     * GET posts/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

    //metodo usado para adicionar posts na bd
    async create({request, response, view}) {
        //redirecionar na pagina add
        return view.render('posts.add')
    }

    /**
     * Create/save a new post.
     * POST posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

    //metodo para validar as informacoes e add
    async store({request, response, session}) {
        //Validando as entradas
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        });

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        //criando a instancia do post
        const post = new Post();

        //aceitando os inputs
        post.title = request.input('title')
        post.body = request.input('body')

        //salvar todos inputs
        await post.save()

        //mostrar uma mensagem depois de cadastrar
        session.flash({notification: 'Post adicionado!'})

        //redirecionar a pagina
        return response.redirect('/posts')

    }

    /**
     * Display a single post.
     * GET posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

    //method used for showing post based on id
    //metodo usado para mostrar dados com o id informado
    async show({params, request, response, view}) {
        const post = await Post.find(params.id)

        //redirecionr para a pagina de detalhes
        return view.render('posts.details', {
            post: post
        })
    }

    /**
     * Render a form to update an existing post.
     * GET posts/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

    //mostrar post apartir da bd dentro do input
    async edit({params, request, response, view}) {
        //carregando da bd
        const post = await Post.find(params.id)

        //redirecionar a pagina de edicao de dados
        return view.render('posts.edit', {
            post: post
        })

    }

    /**
     * Update post details.
     * PUT or PATCH posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

    //actualizando post
    async update({params, request, response, session}) {
        //validando inputs
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:355',
            body: 'required|min:3'
        });

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        //actualizando dados a partir do id
        const post = await Post.find(params.id)

        //aceitando os inputs
        post.title = request.input('title')
        post.body = request.input('body')

        //salvar todos inputs
        await post.save()

        //mostrar uma mensagem depois de cadastrar
        session.flash({notification: 'Post actualizado!'})

        //redirecionar a pagina
        return response.redirect('/posts')

    }

    /**
     * Delete a post with id.
     * DELETE posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    //metodo de exclusao de dados
    async destroy({params, request, response, session}) {
        const post = await Post.find(params.id)

        //excluindo dados
        await post.delete()

        //mostrar uma mensagem apos a exclusao
        session.flash({notification: 'Post Excluído!'})


        //redirecionar para a pagina principal
        return response.redirect('/posts')

    }
}

module.exports = PostController
