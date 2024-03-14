'use strict';

const tabelaFilmes = document.getElementById('tabela')
const lixeira = document.getElementById('lixo')
const filmesCadastrados = []
const infoFilmes = {}

async function listarFilmes() {
    console.log('asasassa');
    const filmes = await pegarFilmes()
    console.log(filmes);
    console.log(filmes.filmes[0]);

    filmes.filmes.forEach(filme => {
        
        const tagfilme = document.createElement('div')
        tagfilme.classList.add('filme', 'w-auto', 'min-h-20', 'bg-white', 'mx-2', 'flex', 'flex-row')

        const divCheckbox = document.createElement('div')
        divCheckbox.classList.add('custom-w-25', 'flex', 'items-center', 'ml-1')
        
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.classList.add('h-2/3', 'w-full')

        const linhasEspacotag = [5]
        linhasEspacotag[0] = document.createElement('div')

        linhasEspacotag[1] = document.createElement('div')

        linhasEspacotag[2] = document.createElement('div')

        linhasEspacotag[3] = document.createElement('div')

        linhasEspacotag[4] = document.createElement('div')

        linhasEspacotag.forEach(linha => {
            linha.classList.add('h-full', 'bg-zinc-900', 'w-1', 'ml-2', 'mr-2')
        })

        const id = document.createElement('div')
        id.classList.add('w-12', 'flex', 'items-center', 'text-black', 'text-3xl', 'justify-center')
        id.textContent = filme.id

        const nome = document.createElement('div')
        nome.classList.add('h-full', 'custom-w-nome', 'text-3xl', 'items-center', 'flex', 'justify-center')
        nome.textContent = filme.nome

        const data_lancamento = document.createElement('div')
        data_lancamento.classList.add('flex', 'text-black', 'text-3xl', 'justify-center', 'tems-center', 'w-64', 'justify-center')
        data_lancamento.textContent = filme.data_lancamento

        const valor_alugar = document.createElement('div')
        valor_alugar.classList.add('flex', 'text-black', 'text-3xl', 'justify-center', 'items-center', 'w-52', 'justify-center')
        valor_alugar.textContent = `R$${filme.valor_alugar.toFixed(2)}`

        const valor_comprar = document.createElement('div')
        valor_comprar.classList.add('flex', 'text-black', 'text-3xl', 'justify-center', 'items-center', 'w-40', 'justify-center')
        valor_comprar.textContent = `R$${filme.valor_comprar.toFixed(2)}`

        const espaco_sobrando = document.createElement('div')
        espaco_sobrando.classList.add('flex', 'h-full', 'flex-grow', 'bg-zinc-300', 'justify-end')

        const ultima_linha = document.createElement('div')
        ultima_linha.classList.add('h-full', 'bg-zinc-900', 'w-1', 'ml-2', 'mr-0')

        filmesCadastrados.push(filme.id)

        tabelaFilmes.appendChild(tagfilme)
        tagfilme.replaceChildren(divCheckbox, linhasEspacotag[0], id, linhasEspacotag[1], nome, linhasEspacotag[2], data_lancamento, linhasEspacotag[3], valor_alugar, linhasEspacotag[4], valor_comprar, ultima_linha, espaco_sobrando)
        divCheckbox.appendChild(checkbox)

        console.log(tagfilme);

    });
}

lixeira.addEventListener('click', async function(){

    const divsFilmes = document.querySelectorAll('.filme')
    const lista = []

    divsFilmes.forEach(function(div)){
        
    }
    console.log(filmes);

    const checkboxes = document.querySelectorAll('.tabela input[type="checkbox"]');
    console.log(checkboxes);
    const filmesSelecionados = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Se a checkbox estiver marcada, adiciona o ID do filme aos filmesSelecionados
            filmesSelecionados.push("aaa");
        }
    });

    console.log('Filmes selecionados:', filmesSelecionados);

})

async function apagarfilme(){

}

async function pegarFilmes() {
    const endpoint = 'http://localhost:5080/v2/acmeFilmes/filmes';
    const filmesApi = await fetch(endpoint);
    const listFilmes = await filmesApi.json();
    return listFilmes;
}

listarFilmes();
