let loginCheck = JSON.parse(localStorage.getItem('activeUser'));

if(!loginCheck){
    window.location.href = '../../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('activeUser'));
    
    if (!usuario || !usuario.pedidos || usuario.pedidos.length === 0) {
        document.getElementById('listaPedidos').innerText = 'Nenhum pedido encontrado.';
        return;
    }

    const listaPedidos = document.getElementById('listaPedidos');
    
    usuario.pedidos.forEach((pedido, index) => {
        const pedidoDiv = document.createElement('div');
        pedidoDiv.classList.add('pedido');

        
        let endereco;
        try {
            endereco = pedido.endereco && pedido.entregaOpcao !== 'Retirada' ? JSON.parse(pedido.endereco) : null;
        } catch (error) {
            endereco = null;
        }

        const itensExibidos = pedido.itens.slice(0, 3);
        
        pedidoDiv.innerHTML = `
            <h2>Pedido ${index + 1} | Feito em ${pedido.dataHora}</h2>
            <p>Total: R$${pedido.total.toFixed(2)}</p>
            <p>Opção de Recebimento: ${pedido.entregaOpcao}</p>
            ${pedido.entregaOpcao === 'Retirada' ? '' : `<p>Endereço: ${endereco.rua}, ${endereco.numero} - CEP ${endereco.cep}</p>`}
            ${pedido.pagamentoOpcao === 'cartao' ? `<p>Forma de Pagamento: Cartão</p>` : `Forma de Pagamento: ${pedido.pagamentoOpcao}`}
            ${pedido.pagamentoOpcao === 'cartao' ? `<p>Cartão Final ${pedido.cartao.numero.slice(-4)}</p>` : ''}
            <h3>Itens:</h3>
            <ul>
                ${itensExibidos.map(item => `
                    <li>
                        ${item.nome} - ${item.artista} - R$${item.valor.toFixed(2)} (Quantidade: ${item.quantidade})
                    </li>
                `).join('')
            }
                ${pedido.itens.length > 3 ? `<li>...</li>` : ''}
            </ul>
            ${pedido.itens.length > 3 ? `<button class="ver-tudo" data-index="${index}">Ver tudo</button>` : ''}
        `;

        listaPedidos.prepend(pedidoDiv);
    });


    listaPedidos.addEventListener('click', (e) => {
        if (e.target.classList.contains('ver-tudo')) {
            const pedidoIndex = e.target.getAttribute('data-index');
            const pedidoCompleto = usuario.pedidos[pedidoIndex];
            
            let endereco;
        try {
            endereco = pedidoCompleto.endereco && pedidoCompleto.entregaOpcao !== 'Retirada' ? JSON.parse(pedidoCompleto.endereco) : null;
        } catch (error) {
            endereco = null;
        }


            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup">&times;</span>
                    <h2>Pedido Completo | Feito em ${pedidoCompleto.dataHora}</h2>
                    <p>Total: R$${pedidoCompleto.total.toFixed(2)}</p>
                    <p>Opção de Recebimento: ${pedidoCompleto.entregaOpcao}</p>
                    ${pedidoCompleto.entregaOpcao === 'Retirada' ? '' : `<p>Endereço: ${endereco.rua}, ${endereco.numero} - CEP ${endereco.cep}</p>`}
                    ${pedidoCompleto.pagamentoOpcao === 'cartao' ? `<p>Forma de Pagamento: Cartão</p>` : `Forma de Pagamento: ${pedidoCompleto.pagamentoOpcao}`}
                    ${pedidoCompleto.pagamentoOpcao === 'cartao' ? `<p>Cartão Final ${pedidoCompleto.cartao.numero.slice(-4)}</p>` : ''}
                    <h3>Itens:</h3>
                    <ul>
                        ${pedidoCompleto.itens.map(item => `
                            <li>
                                ${item.nome} - ${item.artista} - R$${item.valor.toFixed(2)} (Quantidade: ${item.quantidade})
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            document.body.appendChild(popup);

            document.querySelector('.close-popup').addEventListener('click', () => {
                document.body.removeChild(popup);
            });
        }
    });
});

const ultimos = document.getElementById("listaPedidos");
const btnNext = document.getElementById("prox");
const btnPrev = document.getElementById("anterior");

function updateSlider() {
    const containerWidth = ultimos.getBoundingClientRect().width;

    btnNext.onclick = () => {
        ultimos.scrollLeft += containerWidth;
    };

    btnPrev.onclick = () => {
        ultimos.scrollLeft -= containerWidth;
    };
}

updateSlider();
window.addEventListener('resize', updateSlider); 

window.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const userGreeting = document.getElementById('userGreeting');

    if (activeUser) {
        userGreeting.innerHTML = `Olá, ${activeUser.nome} <div class="dropdown-menu">
            <a href="../configuracoes.html">Configurações</a>
            ${activeUser.isAdmin ? '<a href="../../areaAdm/administracao.html">Administração</a>' : ''}
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
