// Seleção dos elementos do DOM
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector("#currency-to");
const numberInput = document.querySelector('input[type="number"]');

// Função para lidar com a tecla "Enter"
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        convertValues(); // Chama a função convertValues() quando a tecla "Enter" é pressionada
    }
});

// Coloca o foco no input ao carregar o site
window.onload = function() {
    document.querySelector(".input-currency").focus();
};

// Evita a entrada da letra "e", "E", "+", e "-" no input
numberInput.addEventListener('keydown', function (event) {
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
        event.preventDefault();
    }
});

// Função para converter os valores das moedas
function convertValues() { 
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");
    const erro = document.querySelector(".erro");

    const dolarToday = 6.09;
    const euroToday = 6.38;
    const libraToday = 7.65;
    const bitcoinToday = 593708.33;

    erro.textContent = ''; // Limpar qualquer erro existente

    if (!inputCurrencyValue || inputCurrencyValue <= 0) {
        erro.textContent = "Por favor, insira um valor válido!";
        erro.style.color = "red"; // Mensagem de erro em vermelho
        return;
    }
    
     // Conversão para o Dólar
    if(currencySelect.value === "USD") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday).replace("$", "$ ");
    }

    // Conversão para o Euro
    if(currencySelect.value === "EUR") {
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

    // Conversão para o Bitcoin (não usa Intl, faz a divisão e exibe o símbolo manualmente)
    if (currencySelect.value === "BTC") {
        const bitcoinValue = (inputCurrencyValue / bitcoinToday).toFixed(2); // Limitar para 2 casas decimais
        currencyValueConverted.innerHTML = `₿ ${bitcoinValue}`;
    }

    // Valor da moeda brasileira
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}

// Função para trocar a imagem da moeda e o nome da moeda
function changeCurrency() {
    const currencyName = document.querySelector("#currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if(currencySelect.value === "USD") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = './assets/dolar.png'
    }

    if(currencySelect.value === "EUR") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = './assets/euro.png'
    }

    if(currencySelect.value === "GBP") {
        currencyName.innerHTML = "Libra";
        currencyImage.src = './assets/libra.png'
    }

    if(currencySelect.value === "BTC") {
        currencyName.innerHTML = "Bitcoin";
        currencyImage.src = './assets/bitcoin.png'
    }

    convertValues();
}

// Chamada dos eventos
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);