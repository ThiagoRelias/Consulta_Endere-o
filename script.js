
const cep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const localidade = document.getElementById("localidade");
const uf = document.getElementById("uf");

let ultimaConsulta = "";

cep.addEventListener("input", async () => {
    let numeroCep = cep.value.replace(/\D/g, "").slice(0, 8);

    cep.value = numeroCep.length > 5
        ? numeroCep.slice(0, 5) + "-" + numeroCep.slice(5)
        : numeroCep;

    limparCampos();
    mensagem.textContent = "";
    mensagem.style.color = "red";

    if (numeroCep.length === 0) {
        ultimaConsulta = "";
        return;
    }
    if (numeroCep.length < 8) {
        ultimaConsulta = "";
        mensagem.textContent = "CEP inválido! Digite os 8 números.";
        return;
    }
    if (numeroCep === ultimaConsulta) {
        return;
    }
    ultimaConsulta = numeroCep;
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${numeroCep}/json/`);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o CEP. Tente novamente.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            throw new Error("CEP não encontrado!");
        }

        logradouro.value = dados.logradouro || "";
        bairro.value = dados.bairro || "";
        localidade.value = dados.localidade || "";
        uf.value = dados.uf || "";

        mensagem.style.color = "green";
        mensagem.textContent = "CEP encontrado com sucesso!";
    } catch (erro) {
        mensagem.style.color = "red";
        mensagem.textContent = erro.message;
    }
});

function limparCampos() {
    logradouro.value = "";
    bairro.value = "";
    localidade.value = "";
    uf.value = "";
}
