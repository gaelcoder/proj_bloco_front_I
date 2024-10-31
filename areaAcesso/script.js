const toggleFormButton = document.getElementById('toggleButton');
const formTitle = document.getElementById('formTitle');
const userForm = document.getElementById('formAcesso');
const externalText = document.getElementById('textoExterno');

let users = JSON.parse(localStorage.getItem('users')) || {};

let loginCheck = JSON.parse(localStorage.getItem('activeUser'));

if (loginCheck) {
    window.location.href = '../index.html';
}

function registerUser(event) {
    event.preventDefault();

    let validacao = true;

    const name = document.getElementById('name')?.value;
    const nameInput = document.getElementById('name')
    const avisoNome = document.getElementById('avisoNome')
    const surname = document.getElementById('surname')?.value;
    const surnameInput = document.getElementById('surname')
    const avisoSobrenome = document.getElementById('avisoSobrenome')
    const email = document.getElementById('email')?.value;
    const emailInput = document.getElementById('email')
    const avisoEmail = document.getElementById('avisoEmail')
    const username = document.getElementById('username').value;
    const usernameInput = document.getElementById('username')
    const avisoUser = document.getElementById("avisoUsuario")
    const password = document.getElementById('password').value;
    const passwordInput = document.getElementById('password')
    const avisoSenha= document.getElementById("avisoSenha")
    const isAdmin = document.getElementById('isAdmin')?.checked;

    if (!surname) {
        avisoSobrenome.innerHTML = "Sobrenome não pode estar vazio!"
        avisoSobrenome.style.display = 'block';
        avisoSobrenome.style.fontSize = "12px";
        surnameInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoSobrenome.innerHTML = ""
        surnameInput.style = 'none'
    }

    if (!name) {
        avisoNome.innerHTML = "Nome não pode estar vazio!"
        avisoNome.style.display = 'block';
        avisoNome.style.fontSize = "12px";
        nameInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoNome.innerHTML = ""
        nameInput.style = 'none'
    }

    if (!password) {
        avisoSenha.innerHTML = "Insira uma senha!"
        avisoSenha.style.display = 'block';
        avisoSenha.style.fontSize = "12px";
        passwordInput.style.border = '2px solid red';
        validacao = false;
    } else if (password < 8) {
        avisoSenha.innerHTML = "Senha deve ser maior que 8 dígitos."
        avisoSenha.style.display = 'block';
        avisoSenha.style.fontSize = "12px";
        passwordInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoSenha.innerHTML = ""
        avisoSenha.style = 'none';
    }

    if (users[username]) {
        avisoUser.innerHTML = "Nome de usuário já existe!"
        avisoUser.style.display = 'block';
        avisoUser.style.fontSize = "12px";
        usernameInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoUser.innerHTML = ""
        usernameInput.style = 'none'
    }

    if (!username) {
        avisoUser.innerHTML = "Nome de usuário não pode estar vazio!"
        avisoUser.style.display = 'block';
        avisoUser.style.fontSize = "12px";
        usernameInput.style.border = '2px solid red';
        validacao = false;
    } else if (username.length < 3) {
        avisoUser.innerHTML = "Usuário deve ser maior que 3 caracteres!"
        avisoUser.style.display = 'block';
        avisoUser.style.fontSize = "12px";
        usernameInput.style.border = '2px solid red';
        validacao = false;
    } else if (!/^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]*[a-zA-Z0-9]$/.test(username)) {
        avisoUser.innerHTML = "Usuário não pode ter, nem iniciar com caracteres especiais (exceto '_' ou '.')"
        avisoUser.style.display = 'block';
        avisoUser.style.fontSize = "12px";
        usernameInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoUser.innerHTML = ""
        usernameInput.style = 'none'
    }

    if (Object.values(users).some(user => user.email === email)) {
        avisoEmail.innerHTML = "Email já cadastrado!"
        avisoEmail.style.display = 'block';
        avisoEmail.style.fontSize = "12px";
        emailInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoEmail.innerHTML = "";
        emailInput.style = ''
    }

    if (!email) {
        avisoEmail.innerHTML = "Insira um email!"
        avisoEmail.style.display = 'block';
        avisoEmail.style.fontSize = "12px";
        emailInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoEmail.innerHTML = "";
        emailInput.style = ''
    }

    if (validacao) {

        const newUser = {
            nome: name,
            sobrenome: surname,
            email: email,
            usuario: username,
            isAdmin: isAdmin,
            senha: password,
            enderecos: [],
            cartoes: [],
            pedidos: []
        };

        users[username] = newUser;

        localStorage.setItem('users', JSON.stringify(users));

        alert('Cadastro realizado com sucesso!');
        userForm.reset();
    }
}

function loginUser(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('username').value;
    const loginPassword = document.getElementById('password').value;

    const user = users[loginUsername];

    if (user && user.senha === loginPassword) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        window.location.href = '../index.html';
    } else {
        document.getElementById('avisoLogin').innerHTML = "Dados incorretos ou usuário inexistente."
    }
}

toggleFormButton.addEventListener('click', () => {
    if (formTitle.textContent === 'Login') {
        formTitle.textContent = 'Cadastrar';
        userForm.innerHTML = `
            <input type="text" id="name" placeholder="Nome" required>
            <p id="avisoNome" style="display: none"></p>
            <input type="text" id="surname" placeholder="Sobrenome" required>
            <p id="avisoSobrenome" style="display: none"></p>
            <input type="text" id="username" placeholder="Usuário" required>
            <p id="avisoUsuario" style="display: none"></p>
            <input type="email" id="email" placeholder="Email" required>
            <p id="avisoEmail" style="display: none"></p>
            <input type="password" id="password" placeholder="Senha" required>
            <p id="avisoSenha" style="display: none"></p>
            <label>
                <input type="checkbox" id="isAdmin"> Administrador
            </label>
            <button type="button" id="registerButton">Cadastrar</button>
        `;;
        toggleFormButton.textContent = 'Acessar';
        externalText.textContent = 'Já tem uma conta?';
        document.querySelector('#gridAcesso img').style.margin = '151px 0px 0px 10px'
        document.getElementById('registerButton').addEventListener('click', registerUser);

    } else {
        formTitle.textContent = 'Login';
        userForm.innerHTML = `
            <input type="text" id="username" placeholder="Usuário" required>
            <input type="password" id="password" placeholder="Senha" required>
            <p id="avisoLogin"></p>
            <button type="submit" id="loginButton">Entrar</button>
        `;
        toggleFormButton.textContent = 'Cadastrar';
        externalText.textContent = 'Ainda não tem uma conta?';

        document.querySelector('#gridAcesso img').style = ''
        document.getElementById('loginButton').addEventListener('click', loginUser);
    }
});

document.getElementById('loginButton')?.addEventListener('click', loginUser);

