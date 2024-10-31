let albumsReg = []
const storage = localStorage.getItem('album')

if (storage != null) {
    albumsReg = JSON.parse(storage)
}

let users = JSON.parse(localStorage.getItem('users')) || {};


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


const ultimos = document.getElementById("albumContainer");
const recomendacaoDoDia = document.getElementById("escolhidoHoje")
const btnNext = document.getElementById("prox");
const btnPrev = document.getElementById("anterior");

window.addEventListener('scroll', () => {
    const header = document.getElementById('topo');
    const lancamentos = document.getElementById('secaoLancamentos');
    const headerHeight = header.offsetHeight;

    const lancamentosRect = lancamentos.getBoundingClientRect();

    if (window.scrollY > lancamentosRect.top + headerHeight) {
        header.style.display = 'block';
    } else {
        header.style.display = 'none';
    }
});


function renderLancamentos() {
    const ultimosAlbums = albumsReg.slice(-10);

    ultimosAlbums.forEach((album) => {
        const originalIndex = albumsReg.indexOf(album);
        const nome = album.nome.length > 26 ? album.nome.slice(0, 26) + "..." : album.nome;
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
        ultimos.prepend(novoCard);
    });
}

function updateSlider() {
    const containerDimensions = ultimos.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    btnNext.addEventListener('click', () => {
        ultimos.scrollLeft += containerWidth;
    });

    btnPrev.addEventListener('click', () => {
        ultimos.scrollLeft -= containerWidth;
    });
}

const LAST_RENDER_DATE_KEY = 'lastRenderDate';
const RANDOM_ALBUM_INDEX_KEY = 'randomAlbumIndex';


function renderEscolhido() {
    const lastRenderDate = localStorage.getItem(LAST_RENDER_DATE_KEY);
    const today = new Date().toDateString();
    let randomIndex;

    if (!lastRenderDate || lastRenderDate !== today) {
        randomIndex = Math.floor(Math.random() * albumsReg.length);
        localStorage.setItem(RANDOM_ALBUM_INDEX_KEY, randomIndex);
        localStorage.setItem(LAST_RENDER_DATE_KEY, today);
    } else {
        randomIndex = parseInt(localStorage.getItem(RANDOM_ALBUM_INDEX_KEY), 10);
    }

    const escolhido = albumsReg[randomIndex];
    const nome = escolhido.nome.length > 26 ? escolhido.nome.slice(0, 20) + "..." : escolhido.nome;

    const novoCard = document.createElement('section');
    novoCard.className = 'cardAlbumDoDia';
    novoCard.innerHTML = `
        <article>
            <img src="${escolhido.capa}" width="250px">
        </article>
        <article>
            <h2>${nome}</h2>
            <h3>${escolhido.artista}</h3>
            <h4>${escolhido.genero}</h4>
            <p>Mais informações:</p>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. 
            Nullam scelerisque nec tortor et pulvinar. Mauris dui odio, cursus non ornare vitae, tempus at augue. Integer ac tellus faucibus, eleifend ligula eget, imperdiet nibh. Nulla eu mi condimentum, porttitor sapien vitae, venenatis eros. 
            Morbi vitae erat turpis. Quisque condimentum in sem eget tincidunt.</h5>
            <h6 onclick="addToCart(${randomIndex})"><span class="material-symbols-outlined" style="font-size: 16px">
            shopping_cart_checkout
            </span> R$${escolhido.valor.toFixed(2)}</h6>
        </article>
   `;
    recomendacaoDoDia.prepend(novoCard);
}

updateSlider();

window.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const userGreeting = document.getElementById('userGreeting');

    if (activeUser) {
        userGreeting.innerHTML = `Olá, ${activeUser.nome} <div class="dropdown-menu">
            <a href="areaConfiguracoes/configuracoes.html">Configurações</a>
            ${activeUser.isAdmin ? '<a href="areaAdm/administracao.html">Administração</a>' : ''}
            <a href="#" id="logoutButton">Logout</a>
        </div>`;

        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.removeItem('activeUser');
            location.reload();
            let carrinho = [];
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
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

document.addEventListener('DOMContentLoaded', () => {
    const storage = localStorage.getItem('album');
    if (storage) {
        albumsReg = JSON.parse(storage);
        renderLancamentos();
        renderEscolhido();
    }
});
