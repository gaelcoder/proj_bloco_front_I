let albumsReg = []
const storage = localStorage.getItem('album')

if (storage != null) {
    albumsReg = JSON.parse(storage)
}

let users = JSON.parse(localStorage.getItem('users')) || {};

const ultimosPop = document.getElementById("popLancamentos");
const btnNextPop = document.getElementById("proxPop");
const btnPrevPop = document.getElementById("anteriorPop");

const ultimosRock = document.getElementById("rockLancamentos");
const btnNextRock = document.getElementById("proxRock");
const btnPrevRock = document.getElementById("anteriorRock");

const ultimosRB= document.getElementById("RBLancamentos");
const btnNextRB = document.getElementById("proxRB");
const btnPrevRB = document.getElementById("anteriorRB");

const ultimosIndie= document.getElementById("indieLancamentos");
const btnNextIndie = document.getElementById("proxIndie");
const btnPrevIndie = document.getElementById("anteriorIndie");

const ultimosAlt= document.getElementById("alternativaLancamentos");
const btnNextAlt = document.getElementById("proxAlternativa");
const btnPrevAlt = document.getElementById("anteriorAlternativa");

const ultimosJazz= document.getElementById("JazzLancamentos");
const btnNextJazz = document.getElementById("proxJazz");
const btnPrevJazz = document.getElementById("anteriorJazz");

const ultimosHipHop = document.getElementById("HipHopLancamentos");
const btnNextHipHop = document.getElementById("proxHipHop");
const btnPrevHipHop = document.getElementById("anteriorHipHop");

function addToCart(albumIndex) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const album = albumsReg[albumIndex];
    if (!album) return;

    const usuario = JSON.parse(localStorage.getItem('activeUser'));

    if (!usuario) {
        showLoginModal(albumIndex)
        return;
    }

    const existingItem = carrinho.find(item => item.nome === album.nome);

    if (existingItem) {
        existingItem.quantidade += 1;
    } else {
        carrinho.push({
            nome: album.nome,
            artista: album.artista,
            valor: album.valor,
            capa: album.capa,
            quantidade: 1
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    const card = document.querySelector(`.cardAlbum p[data-index="${albumIndex}"]`).closest('.cardAlbum');
    if (card) {
        card.classList.add('animate');
        setTimeout(() => {
            card.classList.remove('animate');
        }, 500);
    }
}

const toggleFormButton = document.getElementById('toggleButton');
const formTitle = document.getElementById('formTitle');
const userForm = document.getElementById('formAcesso');
const externalText = document.getElementById('textoExterno');
const interacaoText = document.getElementById('textoInteragindo')

let selectedAlbumIndex = null;

function showLoginModal(albumIndex) {
    selectedAlbumIndex = albumIndex;
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';

    toggleFormButton.addEventListener('click', toggleForm);
    
    toggleForm('login');
}

function toggleForm(defaultForm = 'login') {
    if (defaultForm === 'login' || formTitle.textContent === 'Cadastrar') {
        formTitle.textContent = 'Login';
        interacaoText.innerHTML = "Parece que você quer comprar alguma coisa... Faça login para continuar!";
        userForm.innerHTML = `
            <input type="text" id="username" placeholder="Usuário" required>
            <input type="password" id="password" placeholder="Senha" required>
            <p id="avisoLogin"></p>
            <button type="submit" id="loginButton">Entrar</button>
        `;
        toggleFormButton.textContent = 'Cadastrar';
        externalText.textContent = 'Ainda não tem uma conta?';

        document.getElementById('loginButton').onclick = () => loginUser(selectedAlbumIndex);

    } else {
        formTitle.textContent = 'Cadastrar';
        interacaoText.innerHTML = "Parece que você quer comprar alguma coisa... Cadastre-se para continuar!";
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
        `;
        toggleFormButton.textContent = 'Acessar';
        externalText.textContent = 'Já tem uma conta?';


        document.getElementById('registerButton').onclick = (event) => registerUser(event, selectedAlbumIndex);
    }
}

function registerUser(event, albumIndex) {
    event.preventDefault();
    
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

    let validacao = true;

    if(!surname){
        avisoSobrenome.innerHTML = "Sobrenome não pode estar vazio!"
        avisoSobrenome.style.display = 'block';
        avisoSobrenome.style.fontSize = "12px";
        surnameInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoSobrenome.innerHTML = ""
        surnameInput.style = 'none'
    }

    if(!name){
        avisoNome.innerHTML = "Nome não pode estar vazio!"
        avisoNome.style.display = 'block';
        avisoNome.style.fontSize = "12px";
        nameInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoNome.innerHTML = ""
        nameInput.style = 'none'
    }

    if(!password){
        avisoSenha.innerHTML = "Insira uma senha!"
        avisoSenha.style.display = 'block';
        avisoSenha.style.fontSize = "12px";
        passwordInput.style.border = '2px solid red';
        validacao = false;
    } else if (password < 8){
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

    if(!username){
        avisoUser.innerHTML = "Nome de usuário não pode estar vazio!"
        avisoUser.style.display = 'block';
        avisoUser.style.fontSize = "12px";
        usernameInput.style.border = '2px solid red';
        validacao = false;
    } else if(username.length < 3){
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

    if (!email){
        avisoEmail.innerHTML = "Insira um email!"
        avisoEmail.style.display = 'block';
        avisoEmail.style.fontSize = "12px";
        emailInput.style.border = '2px solid red';
        validacao = false;
    } else {
        avisoEmail.innerHTML = "";
        emailInput.style = ''
    }

    if(validacao){

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

    let usuario = JSON.stringify(newUser)

    localStorage.setItem('activeUser', usuario);
    alert('Cadastro realizado com sucesso! Você está logado.');

    document.getElementById('loginModal').style.display = 'none';

    addToCart(albumIndex);
    userForm.reset();
    location.reload();
    }
}

function loginUser(albumIndex) {
    const loginUsername = document.getElementById('username').value;
    const loginPassword = document.getElementById('password').value;

    const user = users[loginUsername];

    if (user && user.senha === loginPassword) {

        localStorage.setItem('activeUser', JSON.stringify(user));

        document.getElementById('loginModal').style.display = 'none';


        addToCart(albumIndex);
        userForm.reset();
        location.reload();
    } else {
        document.getElementById('avisoLogin').innerHTML = "Dados incorretos ou usuário inexistente."
    }
}


document.getElementById('closeModal').onclick = function () {
    document.getElementById('loginModal').style.display = 'none';
};

window.onclick = function (event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};



function updateSliderPop() {
    const containerDimensions = ultimosPop.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextPop.addEventListener('click', () => {
        ultimosPop.scrollLeft += containerWidth;
    });

    btnPrevPop.addEventListener('click', () => {
        ultimosPop.scrollLeft -= containerWidth;
    });
}

function updateSliderRock() {
    const containerDimensions = ultimosRock.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextRock.addEventListener('click', () => {
        ultimosRock.scrollLeft += containerWidth;
    });

    btnPrevRock.addEventListener('click', () => {
        ultimosRock.scrollLeft -= containerWidth;
    });
}

function updateSliderRB() {
    const containerDimensions = ultimosRB.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextRB.addEventListener('click', () => {
        ultimosRB.scrollLeft += containerWidth;
    });

    btnPrevRB.addEventListener('click', () => {
        ultimosRB.scrollLeft -= containerWidth;
    });
}

function updateSliderIndie() {
    const containerDimensions = ultimosIndie.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextIndie.addEventListener('click', () => {
        ultimosIndie.scrollLeft += containerWidth;
    });

    btnPrevIndie.addEventListener('click', () => {
        ultimosIndie.scrollLeft -= containerWidth;
    });
}

function updateSliderAlternativa() {
    const containerDimensions = ultimosAlt.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextAlt.addEventListener('click', () => {
        ultimosAlt.scrollLeft += containerWidth;
    });

    btnPrevAlt.addEventListener('click', () => {
        ultimosAlt.scrollLeft -= containerWidth;
    });
}

function updateSliderJazz() {
    const containerDimensions = ultimosJazz.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextJazz.addEventListener('click', () => {
        ultimosJazz.scrollLeft += containerWidth;
    });

    btnPrevJazz.addEventListener('click', () => {
        ultimosJazz.scrollLeft -= containerWidth;
    });
}


function updateSliderHipHop() {
    const containerDimensions = ultimosHipHop.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNextHipHop.addEventListener('click', () => {
        ultimosHipHop.scrollLeft += containerWidth;
    });

    btnPrevHipHop.addEventListener('click', () => {
        ultimosHipHop.scrollLeft -= containerWidth;
    });
}

function renderRecomendados(genero, lista, quantidade = 12) {
        const albumsFiltrados = albumsReg.filter(album => album.genero.includes(genero));

        console.log(`Álbuns filtrados para ${genero}:`, albumsFiltrados);

        const albumsAleatorios = albumsFiltrados.sort(() => Math.random() - 0.5).slice(0, quantidade);


        exibirRecomendados(albumsAleatorios, lista);
    }

function exibirRecomendados(albums, lista) {
    const listaRecomendados = lista;
    listaRecomendados.innerHTML = '';

    albums.forEach((album => {

        const originalIndex = albumsReg.indexOf(album);

        if((album.nome).length > 26){
            nome = album.nome.slice(0, 26) + "..."
        } else {
            nome = album.nome
        }


        const novoCard = document.createElement('section');
        novoCard.className = 'cardAlbum';
        novoCard.innerHTML = `
        <article>
            <img src="${album.capa}" width="250px">
        </article>
        <article>
            <h2>${nome}</h2>
            <h3>${album.artista}</h3>
            <p data-index="${originalIndex}" onclick="addToCart(${originalIndex})"><span class="material-symbols-outlined" style="font-size: 16px">
            shopping_cart_checkout
            </span> R$${album.valor.toFixed(2)}</p>
        </article>
        `;
        listaRecomendados.appendChild(novoCard);
    }));
}

updateSliderPop();
updateSliderRock();
updateSliderRB();
updateSliderIndie();
updateSliderAlternativa();
updateSliderJazz();
updateSliderHipHop();
renderRecomendados("ROCK", ultimosRock);
renderRecomendados("POP", ultimosPop);
renderRecomendados("R&B", ultimosRB);
renderRecomendados("JAZZ", ultimosJazz);
renderRecomendados("ALTERNATIVA", ultimosAlt);
renderRecomendados("HIP-HOP", ultimosHipHop);
renderRecomendados("INDIE", ultimosIndie);

window.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const userGreeting = document.getElementById('userGreeting');

    if (activeUser) {
        userGreeting.innerHTML = `Olá, ${activeUser.nome} <div class="dropdown-menu">
        <a href="../areaConfiguracoes/configuracoes.html">Configurações</a>
            ${activeUser.isAdmin ? '<a href="../areaAdm/administracao.html">Administração</a>' : ''}
            <a href="#" id="logoutButton">Logout</a>
        </div>`;

        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.removeItem('activeUser');
            location.reload(); 
        });

        userGreeting.addEventListener('click', () => {
            const dropdownMenu = userGreeting.querySelector('.dropdown-menu');
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });


    } else {
        document.getElementById('cart').style.display = 'none';
    }
    }
);