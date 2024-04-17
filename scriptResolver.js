// IMC
// 1.Capturar valores - ok
// 2.Calcular o IMC - ok
// 3.Gerar classificação do IMC - ok
// 4.Organizar as informaçoes - ok
// 5.Salvar os dados na lista andament
// 6.Ler a lista com os dados
// 7.Renderizar o conteúdo no HTML(tabela)
// 8.Botão de limpar os registros (Clear (LocalStorage))




function CalcularValores(event) {
    event.preventDefault();

    let dadosUsuario = CapturarValores();

    let imc = CalcularImc(dadosUsuario.altura, dadosUsuario.peso)
    
    let classificacao = ClassificarImc(imc)

    let dadosUsuarioCompleto = OrganizarDados(dadosUsuario, imc, classificacao)

    CadastrarUsuario(dadosUsuarioCompleto)

    window.location.reload();
}


function CapturarValores() {
    // get getElementById("name").value - o get pega o valor pelo ID name do HTML
    const nome = document.getElementById("name").value;
    const altura = document.getElementById("height").value;
    const peso = document.getElementById("weight").value;

    const dadosUsuario = {
        //esta armazenando os dados que CAPTURAR VALORES pegou
        //e atribuindo a variável dadosUsuario
        nome: nome,
        altura: altura,
        peso: peso
    }
    return dadosUsuario;
}

function CalcularImc(altura, peso) {
    const imc = peso / (altura * altura)
    
    //retur ira retornar essas informaçoes para o imc
    return imc
}

function ClassificarImc(imc) {
    if (imc < 18.5) {
        return "abaixo do peso!"
    } else if (imc < 25){
        return "peso normal!"
    }else if (imc < 30){
        return "sobrepeso"
    }else{
        return "obesidade"
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc) {
    const dataHoraAtual = intl.DateTimeFormat("pt-BR", {timeStyle: "long", dataStyle: "short"}).format(Date.now());
    const dadosUsuarioCompleto = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual 
    }
    
    return dadosUsuarioCompleto;
}


//... = Operador rest

function CadastrarUsuario(usuario) {
//cria um array vazio para armazenar os valores do usuario
let listaUsuario = [];

//verifica swe dentro do localStorage eu tenho as informaçoes do usuario
if (localStorage.getItem("usuariosCadastrados")) {
  //se sim, eu guardo as informaçoes dentro do array
  //parse => de JSON para OBJECT
  listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"))  
}
//cadastrar usuário dentro do array
listaUsuario.push(usuario)

//caso contrário, eu crio um novo item no localStorage
localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario))
//stringfy OBJECT em STRING

    
}

function CarregarUsuarios() {
    //é possivel usar listaUsuario por ser outro escopo (Outra função) ele so sera executado dentro da função onde esta, por isso é possivel utiliza-lo denovo
    let listaUsuario = []

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"))
        } 
    if (listaUsuario.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        //innerHTML 
       tabela.innerHTML = `
       <tr class="linha-mensagem">
            <td colspan="6"> Nenhum usuário cadastrado </td>
       </tr>
       `

    } else {
        montarTabela(listaUsuario)
    }
}

window.addEventListener(`DOMcontentLoaded`, () => CarregarUsuarios())

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela")

    let template = "";

    listaDeCadastrados.forEach(pessoa => {
        template += `
       <tr> 
            <td data-cell="nome"> ${pessoa.nome}</td>
            <td data-cell="altura"> ${pessoa.altura}</td>
            <td data-cell="peso"> ${pessoa.peso}</td>
            <td data-cell="imc"> ${pessoa.imc}</td>
            <td data-cell="classificacao"> ${pessoa.classificacao}</td>
            <td data-cell="dataCadastro"> ${pessoa.dataCadastro}</td>
       </tr> 
         `
    })
    
    tabela.innerHTML = template;

}