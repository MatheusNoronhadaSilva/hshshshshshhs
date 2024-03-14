'use strict'

export async function postFilme (filme) {
    const url = 'http://localhost:5080/v2/acmeFilmes/filmes'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (filme)
    }

    const response = fetch(url, options)

    return response.ok
}