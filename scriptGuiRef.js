//IMC
//1. capturar valores - OK
//2. calcular o IMC - OK
//3. gerar classificação do IMC - OK
//4. organizar as informações - Ok
//5. salvar os dados na lista - OK
//6. Ler a lista com os dados - OK
//7. Renderizar o conteúdo no HTML(tabela) - OK
//8. Botão de limpar os registros (Clear (LocalStorage))

//responsável por chamar todas as outras funções
function CalcularValores(event) {
    event.preventDefault();

    let dadosUsuario = CapturarValores();

    let imc = CalcularImc(dadosUsuario.altura, dadosUsuario.peso);

    let classificacao = ClassificarImc(imc);

    let dadosUsuariosCompleto  = OrganizarDados(dadosUsuario, imc, classificacao);

    CadastrarUsuario(dadosUsuariosCompleto);

    window.location.reload();
}

function CapturarValores() {
    const nome = document.getElementById('name').value;
    const altura = document.getElementById('height').value;
    const peso = document.getElementById('weight').value;

    const dadosUsuario = {
        nome: nome,
        altura: altura,
        peso: peso
    }

    return dadosUsuario;
}

function CalcularImc(altura, peso) {
    const imc = peso / (altura * altura)

    return imc
}

function ClassificarImc(imc) {
    if (imc < 18.5) {
        return " abaixo do peso! "
    } else if (imc < 25) {
        return "peso normal!"
    } else if (imc < 30) {
        return "sobrepeso"
    } else {
        return "obesidade"
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc) {

    const dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    const dadosUsuarioCompleto = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioCompleto;
}

function CadastrarUsuario(usuario) {
    //cria um array vazio para armazenar os valores do usuário 
    let listaUsuario = [];

    //verifica se dentro do localStorage eu tenho as informações do usuário
    if (localStorage.getItem("usuariosCadastrados")) {
        //se sim, eu guardo as informações dentro do array
        //parse => de JSON para object
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    //cadastrar usuário dentro do array
    listaUsuario.push(usuario);

    //casao contrário, eu crio um novo item no localStorage
    //stringfy => objeto para JSON
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario))
}

function carregarUsuarios() {
    let listaUsuario = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuario.length == 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `
            <tr class="linha-mensagem"> 
                <td colspan='6' > Nenhum usuário cadastrado </td>
            </tr>
        `

    } else {
        montarTabela(listaUsuario)
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios())

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById('corpo-tabela')

    let template = "";

    listaDeCadastrados.forEach(pessoa => {
        template += `
            <tr>
                <td data-cell="nome" > ${pessoa.nome} </td>
                <td data-cell="altura" > ${pessoa.altura} </td>
                <td data-cell="peso" > ${pessoa.peso} </td>
                <td data-cell="imc"> ${pessoa.imc} </td>
                <td data-cell="classificacao"> ${pessoa.classificacao} </td>
                <td data-cell="dataCadastro> ${pessoa.dataCadastro} </td>
            </tr>
        `
    });

    tabela.innerHTML = template;
}