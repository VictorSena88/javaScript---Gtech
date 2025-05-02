// cep.onkeyup = () => {
//     if (cep.value.length == 8) {
//         console.log("digitou o cep")
//         fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
//             .then(resposta => resposta.json())
//             .then(resposta2 => {
//                 rua.value = resposta2.logradouro;
//                 bairro.value = resposta2.bairro;
//                 cidade.value = resposta2.localidade;
//                 estado.value = resposta2.uf;
//             })
//     }

// }

// function buscarCidades() {
//     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/rn/municipios")
//         .then(res => res.json())
//         .then(res => {
//             res.map(regiao => {
//                 municipios.innerHTML += `<option>${regiao.nome}</option>`;
//             })
//         })
// }


// buscarCidades();


// function buscarEstados() {
//     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
//         .then(res => res.json())
//         .then(res => {
//             res.map(regiao => {
//                 estados.innerHTML += `<option>${regiao.sigla}</option>`;
//             })
//         })
// }


// buscarEstados();

// Referência aos selects
const selectEstados = document.getElementById('estados');
const selectMunicipios = document.getElementById('municipios');

// Carrega os estados ao iniciar a página
async function carregarEstados() {
    const resposta = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    const estados = await resposta.json();

    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla; // Ex: "PE", "SP"
        option.textContent = estado.nome;
        selectEstados.appendChild(option);
    });
}

// Quando o estado mudar, carregar os municípios
selectEstados.addEventListener('change', async function () {
    const uf = this.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

    const resposta = await fetch(url);
    const municipios = await resposta.json();

    selectMunicipios.innerHTML = '<option value="">Selecione o município</option>';

    municipios.forEach(municipio => {
        const option = document.createElement('option');
        option.value = municipio.nome;
        option.textContent = municipio.nome;
        selectMunicipios.appendChild(option);
    });
});

// Inicializar
carregarEstados();

cep.onkeyup = () => {
    if (cep.value.length == 8) {
        console.log("digitou o cep")
        fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
            .then(resposta => resposta.json())
            .then(resposta2 => {
                rua.value = resposta2.logradouro;
                bairro.value = resposta2.bairro;
                cidade.value = resposta2.localidade;
                estado.value = resposta2.uf;
            })
    }

}