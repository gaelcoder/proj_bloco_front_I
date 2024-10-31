let login = JSON.parse(localStorage.getItem('activeUser'));

if(!login){
    window.location.href = '../index.html';
}

window.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const userGreeting = document.getElementById('userGreeting');

    if (activeUser) {
        userGreeting.innerHTML = `Olá, ${activeUser.nome} <div class="dropdown-menu">
        <a href="configuracoes.html">Configurações</a>
            ${activeUser.isAdmin ? '<a href="../areaAdm/administracao.html">Administração</a>' : ''}
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

mensagem = document.getElementById("boasVindas");
mensagem.innerHTML = `
    Bem-vindo, ${login.nome} ${login.sobrenome}!
`

function removerEndereco(endereco) {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));

    usuario.enderecos = usuario.enderecos.filter(e => e.rua !== endereco.rua || e.numero !== endereco.numero || e.cep !== endereco.cep);
    localStorage.setItem('activeUser', JSON.stringify(usuario));

    let users = JSON.parse(localStorage.getItem('users')) || {};

    users[usuario.usuario] = usuario;

    localStorage.setItem('users', JSON.stringify(users));
    carregarEnderecos(); 
}

function removerCartao(numeroCartao) {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));

    usuario.cartoes = usuario.cartoes.filter(cartao => cartao.numero !== numeroCartao);
    localStorage.setItem('activeUser', JSON.stringify(usuario));

    let users = JSON.parse(localStorage.getItem('users')) || {};

    users[usuario.usuario] = usuario;

    localStorage.setItem('users', JSON.stringify(users));
    carregarCartoes(); 
}

function carregarEnderecos() {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));

    const enderecosContainer = document.getElementById('listaEnderecos');
    enderecosContainer.innerHTML = '';
    usuario.enderecos.forEach(endereco => {
        const enderecoDiv = document.createElement('div');
        enderecoDiv.innerHTML = `
            <p>${endereco.rua}, ${endereco.numero} - CEP ${endereco.cep}</p>
            <button onclick='removerEndereco(${JSON.stringify(endereco).replace(/'/g, "\\'")})'><span class="material-symbols-outlined">
            delete
            </span></button>
        `;
        enderecosContainer.appendChild(enderecoDiv);
    });

    document.getElementById('enderecos').style.display;
}

function carregarCartoes() {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));

    const cartoesContainer = document.getElementById('listaCartoes');
    cartoesContainer.innerHTML = ''; 
    usuario.cartoes.forEach(cartao => {
        const cartaoDiv = document.createElement('div');
        cartaoDiv.innerHTML = `
            <p>Cartão Final ${cartao.numero.slice(-4)}</p>
            <button onclick="removerCartao('${cartao.numero}')"><span class="material-symbols-outlined">
            delete
            </span></button>
        `;
        cartoesContainer.appendChild(cartaoDiv);
    });


    document.getElementById('cartoes').style.display = 'block'; 
}

document.getElementById('novoEndereco').addEventListener('click', () => {
    document.getElementById('novoEnderecoForm').style.display = 'block';
});

document.getElementById('novoCartao').addEventListener('click', () => {
    document.getElementById('novoCartaoForm').style.display = 'block';
});

function adicionarEndereco() {
    const rua = document.getElementById('enderecoRua').value;
    const numero = document.getElementById('enderecoNumero').value;
    const cep = document.getElementById('enderecoCep').value;

    if (rua && numero && cep) {
        const usuario = JSON.parse(localStorage.getItem('activeUser'));

        const novoEndereco = { rua, numero, cep };
        usuario.enderecos = usuario.enderecos || [];
        usuario.enderecos.push(novoEndereco);
        localStorage.setItem('activeUser', JSON.stringify(usuario));

        let users = JSON.parse(localStorage.getItem('users')) || {};

        users[usuario.usuario] = usuario;

        localStorage.setItem('users', JSON.stringify(users));
        carregarEnderecos();
        cancelarEndereco();
    }
}

function cancelarEndereco() {
    document.getElementById('formEndereco').reset();
    document.getElementById('novoEnderecoForm').style.display = 'none';
}

function adicionarCartao() {
    const numero = document.getElementById('cartaoNumero').value;
    const nome = document.getElementById('cartaoNome').value;
    const cpf = document.getElementById('cartaoCpf').value;
    const validade = document.getElementById('cartaoValidade').value;
    const cvv = document.getElementById('cartaoCvv').value;

    if (numero && nome && cpf && validade && cvv) {
        const usuario = JSON.parse(localStorage.getItem('activeUser'));
        if (!usuario) return alert('Faça login para continuar.');

        const novoCartao = { numero, nome, cpf, validade, cvv };
        usuario.cartoes = usuario.cartoes || [];
        usuario.cartoes.push(novoCartao);
        localStorage.setItem('activeUser', JSON.stringify(usuario));

        let users = JSON.parse(localStorage.getItem('users')) || {};
        users[usuario.usuario] = usuario;

        localStorage.setItem('users', JSON.stringify(users));
        carregarCartoes();
        cancelarCartao();
    }
}

function cancelarCartao() {
    document.getElementById('formCartao').reset();
    document.getElementById('novoCartaoForm').style.display = 'none';
}

carregarEnderecos();
carregarCartoes();

function cancelarDelete() {
    document.querySelector('#deletarForm form').reset();
    document.getElementById('deletarForm').style.display = 'none';
    document.getElementById('alertaSenha').innerHTML = "";
}

document.getElementById('botaoDeletar').addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));
    const deletarForm = document.getElementById('deletarForm');
    const alertaSenha = document.getElementById('alertaSenha');

    if (deletarForm.style.display === 'block') {
        const senha = document.getElementById('senha').value;

        if (senha === usuario.senha) {
            const usersObj = JSON.parse(localStorage.getItem('users')) || {};
            delete usersObj[usuario.usuario];
            localStorage.setItem('users', JSON.stringify(usersObj));
            localStorage.removeItem('activeUser');

            alert('Sua conta foi deletada com sucesso.');
            window.location.href = '../index.html';
        } else {
            alertaSenha.innerHTML = "Senha incorreta!";
        }
    } else {
        deletarForm.style.display = 'block';
        alertaSenha.innerHTML = "";
    }
});

document.getElementById('cancelarDelete').addEventListener('click', (e) => {
    e.preventDefault();
    cancelarDelete();
});