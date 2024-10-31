let albumsReg = []
const storage = localStorage.getItem('album')

if (storage != null) {
    albumsReg = JSON.parse(storage)
}

let loginCheck = JSON.parse(localStorage.getItem('activeUser'));

if(!loginCheck){
    window.location.href = '../../index.html';
} else if (!loginCheck.isAdmin){
    window.location.href = '../../index.html';
}


function albumExistente(nomeAlbum, nomeArtista) {
    const found = albumsReg.some(album => (album.nome === nomeAlbum) && (album.artista === nomeArtista));
    return found;
}

function adicionarDisco() {

    let album = document.getElementById("nomeAlbum").value, artista = document.getElementById("artista").value, genero = document.getElementById("genero").value, ano = document.getElementById("ano").value,
        valor = Number(document.getElementById("valor").value), img = document.getElementById("linkImagem").value;

        genero = genero.replace('Alternativo', 'Alternativa');
        genero = genero.replace('alternativo', 'Alternativa');

    let albumCompleto = {
        nome: album,
        artista: artista,
        ano: ano,
        valor: valor,
        genero: genero.toUpperCase(),
        capa: img,
    }

    const jaExiste = document.getElementById("alertaJaExiste");
    const inputAlbum = document.getElementById("nomeAlbum");
    const inputArtista = document.getElementById("artista");
    const inputAno = document.getElementById("ano");
    const inputGenero = document.getElementById("genero");
    const inputValor = document.getElementById("valor");
    const inputImg = document.getElementById("linkImagem");
    const avisoalbum = document.getElementById("albumaviso");
    const avisoartista = document.getElementById("artistaaviso");
    const avisoano = document.getElementById("anoaviso");
    const avisogenero = document.getElementById("generoaviso");
    const avisovalor = document.getElementById("valoraviso");
    const avisoimg = document.getElementById("imagemaviso");
    const ultimos = document.getElementById("secaoUltimosRegistros");

    avisovalor.innerHTML = "";
    avisoimg.innerHTML = "";
    avisoano.innerHTML = "";
    avisoartista.innerHTML = "";
    avisoalbum.innerHTML = "";
    inputAlbum.style.border = '';
    inputAno.style.border = '';
    inputArtista.style.border = '';
    inputValor.style.border = '';
    inputImg.style.border = '';

    const novoCard = document.createElement('section');
    novoCard.className = 'cardAlbum'
    novoCard.innerHTML = `
    <article>
        <img src="${img}" width="250px">
    </article>
    <article>
        <h2>${album}</h2>
        <h3>${artista}<h3>
        <h4>${genero}</h4>
        <h4>Ano: ${ano}</h4>
        <p>R$${valor}</p>
    </article>
   `;

    if (!album) {
        avisoalbum.innerHTML = `O álbum não pode estar vazio!`
        inputAlbum.style.border = '2px solid red';
    }

    if (!genero) {
        avisogenero.innerHTML = `O gênero não pode estar vazio!`
        inputGenero.style.border = '2px solid red';
    }

    if (!artista) {
        avisoartista.innerHTML = `O nome do artista não pode estar vazio!`
        inputArtista.style.border = '2px solid red';
    } 

    if (ano < 1900 || !ano) {
        avisoano.innerHTML = `O ano deve ser maior que 1900!`
        inputAno.style.border = '2px solid red';
    } 

    if (valor <= 0 || !valor) {
        avisovalor.innerHTML = `O valor deve ser superior a 0!`
        inputValor.style.border = '2px solid red';
    }

    if (!img) {
        avisoimg.innerHTML = `Insira um link para a imagem do álbum!`
        inputImg.style.border = '2px solid red';
    }


    if (album && artista && genero && ano > 1900 && valor > 0 && img) {

        if(albumExistente(album, artista)){

            jaExiste.innerHTML = "Esse álbum já existe!";
            avisovalor.innerHTML = "";
            avisoimg.innerHTML = "";
            avisoano.innerHTML = "";
            avisogenero.innerHTML = "";
            avisoartista.innerHTML = "";
            avisoalbum.innerHTML = "";
            inputAlbum.style.border = '';
            inputAno.style.border = '';
            inputArtista.style.border = '';
            inputGenero.style.border = '';
            inputValor.style.border = '';
            inputImg.style.border = '';

        } else {

            jaExiste.innerHTML = "";
            avisovalor.innerHTML = "";
            avisoimg.innerHTML = "";
            avisoano.innerHTML = "";
            avisogenero.innerHTML = "";
            avisoartista.innerHTML = "";
            avisoalbum.innerHTML = "";
            inputAlbum.style.border = '';
            inputAno.style.border = '';
            inputArtista.style.border = '';
            inputGenero.style.border = '';
            inputValor.style.border = '';
            inputImg.style.border = '';
            albumsReg.push(albumCompleto)
            localStorage.setItem('album', JSON.stringify(albumsReg))
            ultimos.prepend(novoCard);
        }
    }

}

function renderAlbum() {

    const ultimos = document.getElementById("sessaoUltimosRegistros");

        if (!ultimos) {
            return;
        }

    albumsReg.forEach(album => {

        if((album.nome).length > 16){
            nome = album.nome.slice(0, 26) + "..."
        } else {
            nome = album.nome
        }


        const novoCard = document.createElement('section');
        novoCard.className = 'cardAlbum'
        novoCard.innerHTML = `
        <article>
            <img src="${album.capa}" width="250px">
        </article>
        <article>
            <h2>${nome}</h2>
            <h3>${album.artista}<h3>
            <h4>${album.genero}</h4>
            <h4>Ano: ${album.ano}</h4>
            <p>R$${album.valor.toFixed(2)}</p>
        </article>
   `;
        ultimos.prepend(novoCard);
    });

}

renderAlbum();

window.addEventListener('DOMContentLoaded', () => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const userGreeting = document.getElementById('userGreeting');

    if (activeUser) {
        userGreeting.innerHTML = `Olá, ${activeUser.nome} <div class="dropdown-menu">
        <a href="../../areaConfiguracoes/configuracoes.html">Configurações</a>
            ${activeUser.isAdmin ? '<a href="../administracao.html">Administração</a>' : ''}
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