// IMC
// 1.Capturar valores - ok
// 2.Calcular o IMC - ok
// 3.Gerar classificação do IMC - ok
// 4.Organizar as informaçoes - ok
// 5.Salvar os dados na liosta
// 6.Ler a lista com os dados
// 7.Renderizar o conteúdo no HTML(tabela)
// 8.Botão de limpar os registros (Clear (LocalStorage))

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