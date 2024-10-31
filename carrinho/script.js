let carrinho;

document.addEventListener('DOMContentLoaded', () => {
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizarCarrinho();
});

let loginCheck = JSON.parse(localStorage.getItem('activeUser'));

if(!loginCheck){
    window.location.href = '../../index.html';
}


function atualizarCarrinho() {
    const totalValor = document.getElementById('totalValor');
    let total = 0;

    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = '';

    if(carrinho == ""){
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td colspan="5">Não há nada no seu carrinho.</td>
        `;
        corpoTabela.appendChild(novaLinha);
    }

    carrinho.forEach((item, index) => {

        const nome = item.nome.length > 60 ? item.nome.slice(0, 38) + "..." : item.nome;

        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><img src="${item.capa}" alt="Imagem do produto" width="50px"></td>
            <td>${nome}</td>
            <td>R$${item.valor.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <button onclick="removerItem(${index})">Remover</button>
        `;
        total += item.valor * item.quantidade;
        corpoTabela.appendChild(novaLinha);
    });

    totalValor.innerText = total.toFixed(2);
}

function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

document.getElementById('limparCarrinho').addEventListener('click', () => {
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
});

document.getElementById('finalizarCompra').addEventListener('click', () => {
    if(carrinho == ""){
        return alert('Seu carrinho está vazio!');
    }
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('finalizacaoCompra').style.display = 'block';
    carregarEnderecos();
    carregarCartoes();
});

function salvarPedido(pedido) {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));
    if (!usuario) return alert('Faça login para continuar.');

    usuario.pedidos = usuario.pedidos || [];
    usuario.pedidos.push(pedido);

    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    users[usuario.usuario] = usuario;

    localStorage.setItem('activeUser', JSON.stringify(usuario));
    localStorage.setItem('users', JSON.stringify(users));
}

function removerEndereco(endereco) {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));
    if (!usuario) return alert('Faça login para continuar.');

    usuario.enderecos = usuario.enderecos.filter(e => e.rua !== endereco.rua || e.numero !== endereco.numero || e.cep !== endereco.cep);
    localStorage.setItem('activeUser', JSON.stringify(usuario));

    let users = JSON.parse(localStorage.getItem('users')) || {};

    users[usuario.usuario] = usuario;

    localStorage.setItem('users', JSON.stringify(users));
    carregarEnderecos(); 
}

function removerCartao(numeroCartao) {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));
    if (!usuario) return alert('Faça login para continuar.');

    usuario.cartoes = usuario.cartoes.filter(cartao => cartao.numero !== numeroCartao);
    localStorage.setItem('activeUser', JSON.stringify(usuario));

    let users = JSON.parse(localStorage.getItem('users')) || {};

    users[usuario.usuario] = usuario;

    localStorage.setItem('users', JSON.stringify(users));
    carregarCartoes(); 
}

function carregarEnderecos() {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));
    if (!usuario) return alert('Faça login para continuar.');

    const enderecosContainer = document.getElementById('listaEnderecos');
    enderecosContainer.innerHTML = '';
    usuario.enderecos.forEach(endereco => {
        const enderecoDiv = document.createElement('div');
        enderecoDiv.innerHTML = `
            <input type="radio" name="endereco" value='${JSON.stringify(endereco)}'>
            ${endereco.rua}, ${endereco.numero} - ${endereco.cep}
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
    if (!usuario) return alert('Faça login para continuar.');

    const cartoesContainer = document.getElementById('listaCartoes');
    cartoesContainer.innerHTML = ''; 
    usuario.cartoes.forEach(cartao => {
        const cartaoDiv = document.createElement('div');
        cartaoDiv.innerHTML = `
            <input type="radio" name="cartao" value='${JSON.stringify(cartao)}'>
            Cartão **** ${cartao.numero.slice(-4)}
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
        if (!usuario) return alert('Faça login para continuar.');

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

document.getElementById('confirmarCompra').addEventListener('click', () => {
    const entregaOpcao = document.getElementById('entregaOpcao').value;
    const pagamentoOpcao = document.getElementById('pagamentoOpcao').value;
    const endereco = entregaOpcao === 'retirada' ? 'Retirada' : document.querySelector('input[name="endereco"]:checked')?.value;

    if (entregaOpcao === 'Entrega' && !endereco) {
        return alert('Por favor, selecione um endereço!');
    }

    if (pagamentoOpcao === 'cartao' && !document.querySelector('input[name="cartao"]:checked')) {
        return alert('Por favor, selecione um cartão para continuar!');
    }

    const cartaoSelecionado = pagamentoOpcao === 'cartao' ? document.querySelector('input[name="cartao"]:checked') : null;

    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    const dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

  
    const pedido = {
        dataHora: dataHoraFormatada,
        itens: carrinho,
        total: parseFloat(document.getElementById('totalValor').innerText),
        entregaOpcao,
        endereco,
        pagamentoOpcao,
        cartao: cartaoSelecionado ? JSON.parse(cartaoSelecionado.value) : null,
    };

    salvarPedido(pedido);
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    alert('Compra confirmada!');
    window.location.href = '../index.html';
});

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

document.getElementById('voltarProCarrinho').addEventListener('click', () => {
    location.reload();
});

