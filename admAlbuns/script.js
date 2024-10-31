let albumsReg = []
const storage = localStorage.getItem('album')

if (storage != null) {
    albumsReg = JSON.parse(storage)
}

function renderAlbum() {
    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = '';

    albumsReg.forEach((album, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${index}</td>
            <td><img src="${album.capa}" width="50px"></td>
            <td>${album.nome}</td>
            <td>${album.artista}</td>
            <td>${album.genero}</td>
            <td>${album.ano}</td>
            <td>R$${album.valor.toFixed(2)}</td>
            <td><button onclick="deletarAlbum(${index})">Deletar</button></td>
        `;
        corpoTabela.appendChild(novaLinha);
    });
}

function deletarAlbum(index) {
    albumsReg.splice(index, 1);
    localStorage.setItem('album', JSON.stringify(albumsReg));
    renderAlbum();
}

renderAlbum();

window.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const userGreeting = document.getElementById('userGreeting');

    if (activeUser) {
        userGreeting.innerHTML = `Olá, ${activeUser.nome} <div class="dropdown-menu">
            <a href="../areaConfiguracoes/configuracoes.html">Configurações</a>
            ${activeUser.isAdmin ? '<a href="/cadastros.html">Administração</a>' : ''}
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