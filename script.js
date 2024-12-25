// Seleção dos elementos do DOM
// Botão de conversão, seletor de moeda e input numérico
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector("#currency-to");
const numberInput = document.querySelector('input[type="number"]');

// Função para lidar com a tecla "Enter"
// Executa a conversão ao pressionar "Enter"
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        convertValues(); // Chama a função de conversão
    }
});

// Coloca o foco no input ao carregar o site
window.onload = function() {
    document.querySelector(".input-currency").focus(); // Foco automático no input
};

// Evita a entrada de caracteres inválidos no input
numberInput.addEventListener('keydown', function (event) {
    if (['e', 'E', '+', '-'].includes(event.key)) {
        event.preventDefault(); // Bloqueia essas teclas
    }
});

// Função para converter os valores das moedas
async function convertValues() { 
    // Elementos do DOM para exibir os valores e mensagens de erro
    const inputCurrencyValue = document.querySelector(".input-currency").value; // Valor inserido pelo usuário
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // Valor em BRL
    const currencyValueConverted = document.querySelector(".currency-value"); // Valor convertido
    const erro = document.querySelector(".erro"); // Exibição de erros

    // Chamada à API para obter os valores das moedas
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL")
        .then(response => response.json())
        .catch(() => {
            erro.textContent = "Erro ao acessar a API. Verifique sua conexão.";
            erro.style.color = "red";
            return null;
        });

    if (!data) return; // Interrompe a execução caso a API falhe

    // Captura os valores das moedas retornados pela API
    const dolarToday = data.USDBRL.high;
    const euroToday = data.EURBRL.high;
    const libraToday = data.GBPBRL.high;
    const bitcoinToday = data.BTCBRL.high;

    // Limpa mensagens de erro anteriores
    erro.textContent = '';

    // Validação do valor inserido no input
    if (!inputCurrencyValue || inputCurrencyValue <= 0) {
        erro.textContent = "Por favor, insira um valor válido!";
        erro.style.color = "red";
        return;
    }

    // Conversão para o Dólar
    if (currencySelect.value === "USD") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday).replace("$", "$ ");
    }

    // Conversão para o Euro
    if (currencySelect.value === "EUR") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);
    }

    // Conversão para a Libra
    if (currencySelect.value === "GBP") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday).replace("£", "£ ");
    }

    // Conversão para o Bitcoin
    if (currencySelect.value === "BTC") {
        const bitcoinValue = (inputCurrencyValue / bitcoinToday).toFixed(2); // Limita para 2 casas decimais
        currencyValueConverted.innerHTML = `₿ ${bitcoinValue}`;
    }

    // Atualiza o valor em BRL no DOM
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}

// Função para alterar a imagem e o nome da moeda
function changeCurrency() {
    const currencyName = document.querySelector("#currency-name");
    const currencyImage = document.querySelector(".currency-img");

    // Alteração dinâmica com base na moeda selecionada
    if (currencySelect.value === "USD") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = './assets/dolar.png';
    }

    if (currencySelect.value === "EUR") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = './assets/euro.png';
    }

    if (currencySelect.value === "GBP") {
        currencyName.innerHTML = "Libra";
        currencyImage.src = './assets/libra.png';
    }

    if (currencySelect.value === "BTC") {
        currencyName.innerHTML = "Bitcoin";
        currencyImage.src = './assets/bitcoin.png';
    }

    convertValues(); // Atualiza a conversão automaticamente
}

// Associa os eventos de clique e alteração às funções
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);