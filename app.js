//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

//Lógica de execução - Projeto Challenger Amigo Secreto Alura

// Criar um array vazio para receber os nomes dos amigos

const nameFriends = [];

//Definição das variáveis de manipulação do html

const nameInput = document.getElementById('amigo'); // Campo da entrada de Texto
const listFriends = document.getElementById('listaAmigos'); // Lista onde os nomes serão exibidos
const errorMessage = document.getElementById('errorMessage');// Mensagem de erro a ser apresentada
const resultElement = document.getElementById('result');// Resultado do Sorteio


/* Criar uma função para inserir e verificar se o nome inserido é válido, se não for, exibir uma mensagem de erro
    - O nome válido deve ter mais de um caractere, não pode conter unicamente espaços, não podem conter caracteres especiais, nem números
    - verificar se o nome incluído já consta na lista
*/

function verifyNames() {
    const name = nameInput.value.trim(); // Para garantir uniformidade do valor digitado, remove espaços antes e depois

    // Verificação de tamanho e validade do nome digitado, não pode ter apenas espaços ou apenas um caractere
    if (!name || name.length < 2) {
        errorMessage.textContent = 'O nome precisa conter mais de um caractere válido!';
        return false;
    }

    // Expressão regular para verificação de caracteres especiais
    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    // Condicional para caracteres especiais
    if (!regex.test(name)) {
        errorMessage.textContent = 'O nome não pode conter números ou caracteres especiais!';
        return false;
    }

    // Verifica se o nome incluído já está na lista (case-insensitive)
    const nameNormalized = name.toLowerCase(); // Converte o nome para minúsculas
    const existingName = nameFriends.some((nome) => nome.toLowerCase() === nameNormalized);

    if (existingName) {
        errorMessage.textContent = 'Este nome já foi adicionado!';
        return false;
    }

    return true;
}

/*Criar uma função para manipular o html e exibir os nomes em uma lista visível na tela
Criar uma função para remover os amigos inseridos, clicando no X
Criar função para verificar a quantidade de amigos, sortear apenas se a quantidade for maior ou igual a 2
Criar uma função para realizar um sorteio aleatório entre os nomes incluídos
Criar uma função para exibir o nome sorteado abaixo da lista de nomes
*/

function addFriend() {
    // Função de verificação de nome é iniciada
    if (verifyNames()) {
        const name = nameInput.value.trim();
        nameFriends.push(name); // Adiciona o nome ao array

        // Cria um elemento <li> dentro de <ul> para exibir os nomes
        const li = document.createElement('li');

        // Define o conteúdo da lista com os nomes incluídos
        li.textContent = name;

        // Cria um ícone de "X" para excluir o nome
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/x-icon.png'; // Caminho da imagem do "X"
        deleteIcon.alt = 'Excluir';
        deleteIcon.classList.add('delete-icon');

        // Adiciona um evento de clique ao ícone para excluir o nome
        deleteIcon.addEventListener('click', () => {
            removeFriend(name, li); // Chama a função para remover o nome
        });

        // Adiciona o ícone ao <li>
        li.appendChild(deleteIcon);

        // Adiciona o <li> à lista <ul> existente no HTML
        listFriends.appendChild(li);

        // Limpa o campo de entrada após adição do nome
        nameInput.value = '';
        errorMessage.textContent = ''; // Limpa a mensagem de erro após adicionar o nome
    }
}

// Função para remover um nome da lista
function removeFriend(name, liElement) {
    // Remove o nome do array
    const index = nameFriends.indexOf(name);
    if (index !== -1) {
        nameFriends.splice(index, 1);
    }

    // Remove o <li> da lista no HTML
    liElement.remove();
}

function checkNumberFriends() {
    if (nameFriends.length < 2) {
        errorMessage.textContent = 'Adicione pelo menos 2 amigos para sortear!';
        return false;
    }
    return true;
}

function drawFriend() {
    if (!checkNumberFriends()) {
        return;
    }

    // Seleciona um nome aleatório da lista
    const nameDraw = nameFriends[Math.floor(Math.random() * nameFriends.length)];

    // Limpa o conteúdo anterior do resultado
    while (resultElement.firstChild) {
        resultElement.removeChild(resultElement.firstChild);
    }

    // Exibe o nome sorteado
    const p = document.createElement('p');
    p.textContent = nameDraw;
    resultElement.appendChild(p);
}
// Função para reiniciar a lista
function restart() {
    // Limpa o array de nomes
    nameFriends.length = 0;

    // Limpa a lista de nomes no DOM
    while (listFriends.firstChild) {
        listFriends.removeChild(listFriends.firstChild);
    }

    // Limpa o resultado do sorteio no DOM
    while (resultElement.firstChild) {
        resultElement.removeChild(resultElement.firstChild);
    }

    // Limpa o campo de entrada
    nameInput.value = '';
    errorMessage.textContent = '';
}
