'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
    up() {
        this.create('posts', (table) => {
            table.increments()
            table.string('title')
            table.string('body')
            table.timestamps()

            table.engine('INNODB')
            table.charset('utf8')
        })
    }

    down() {
        this.drop('posts')
    }
}

module.exports = PostSchema
