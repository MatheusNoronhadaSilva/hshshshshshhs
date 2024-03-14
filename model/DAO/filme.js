/**************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no banco de dados Mysql,
 *         aqui realizamos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//instancia da classe prisma client
const prisma = new PrismaClient()

const pegarUltimoId = async function () {

    let sql_id

    sql_id = 'select cast(last_insert_id() as decimal) as id from tbl_filme limit 1' 

    let pegarId = await prisma.$queryRawUnsafe(sql_id)

    if(pegarId) {
        return pegarId
    } else {
        return false 
    }
}

const insertFilme = async function (dadosFilme) {
    //função para inserir novo filme no banco de dados

    let sql

    try {

        if(dadosFilme.data_relancamento != '' &&
           dadosFilme.data_relancamento != null &&
           dadosFilme.data_relancamento != undefined) {

            sql = `insert into tbl_filme(   nome, 
                sinopse, 
                duracao, 
                data_lancamento, 
                data_relancamento, 
                foto_capa, 
                valor_alugar,
                valor_comprar
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_alugar}',
                '${dadosFilme.valor_comprar}'
    )`;
           } else {
            // dadosFilme.nome = 'teste'
            sql = `insert into tbl_filme(   nome, 
                sinopse, 
                duracao, 
                data_lancamento, 
                data_relancamento, 
                foto_capa, 
                valor_alugar,
                valor_comprar
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_alugar}',
                '${dadosFilme.valor_comprar}'
    )`;
           }

           console.log(sql)
        // $executeRawUnsafe - Serve para executar scripts sem retorno de dados
        //(insert, update e delete)
        // $queryRawunsafe - Serve para executar scripts com retorno de dados (select)

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const updateFilme = async function (id, dadosFilme) {
    //função para atualizar um filme no banco de dados

    try {

        if(dadosFilme.data_relancamento != '' &&
           dadosFilme.data_relancamento != null &&
           dadosFilme.data_relancamento != undefined) {

            let sql = `update tbl_filme set
            nome = '${dadosFilme.nome}',
            sinopse = '${dadosFilme.sinopse}',
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            null,
            foto_capa = '${dadosFilme.foto_capa}',
            valor_alugar = '${dadosFilme.valor_alugar}',
            valor_comprar = '${dadosFilme.valor_comprar}'
            where id = ${id}`

           } else {
            // dadosFilme.nome = 'teste'
            let sql = `update tbl_filme set
            nome = '${dadosFilme.nome}',
            sinopse = '${dadosFilme.sinopse}',
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = '${dadosFilme.data_relancamento}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_alugar = '${dadosFilme.valor_alugar}',
            valor_comprar = '${dadosFilme.valor_comprar}'
            where id = ${id}`
           }

           console.log(sql)
        // $executeRawUnsafe - Serve para executar scripts sem retorno de dados
        //(insert, update e delete)
        // $queryRawunsafe - Serve para executar scripts com retorno de dados (select)

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteFilme = async function (id) {
    //função para excluir um filme no banco de dados
    try {

        let sql = `delete from tbl_filme where id =${id};`

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }

}

const selectAllFilmes = async function () {
    //função para listar todos os filmes do banco de dados

    let sql = 'select * from tbl_filme'

    //$queryRawUnsafe(sql)
    //$queryRawUnsafe('select * from tbl_filme where nome = ' + variavel' )

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    if (rsFilmes.length > 0)
        return rsFilmes
    else
        return false
}

const selectByNameFilme = async function (nome) {


    try {
        let sql = ` select * from tbl_filme where nome like "${nome}%"`


        let nomeFilme = await prisma.$queryRawUnsafe(sql)

        return nomeFilme

    } catch (error) {

        return false

    }
}

const selectByIdFilme = async function (id) {
    //função para buscar um filme do banco de dados pelo id

    try {

        let sql = `select * from tbl_filme where id = ${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        console.log(rsFilme);

        return rsFilme

    } catch (error) {

        return false

    }
}

module.exports = {
    pegarUltimoId,
    selectByNameFilme,
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}