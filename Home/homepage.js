const container = document.getElementById("produtos"); 
const paginacao = document.getElementById("paginacao"); 

let produtos = [];
let paginaAtual = 1;
const itensPorPagina = 9;

function carregarProdutos() {
  fetch("http://localhost:3001/products")
    .then(response => response.json())
    .then(data => {
      produtos = data;
      mostrarPagina(paginaAtual);
      criarPaginacao();
    })
    .catch(error => {
      console.error("Erro ao buscar produtos:", error);
      container.innerHTML = "<p>Erro ao carregar produtos.</p>";
    });
}


function mostrarPagina(pagina){
  container.innerHTML = "";

  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosPagina = produtos.slice(inicio, fim);

  produtosPagina.forEach(produto => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="topo-card">
      <span class="rating">
        ${produto.rating.toFixed(1)}
        <img src="../Assets/Star 1.png" alt="Estrela" class="icone-estrela" />
      </span>
      <div class="icones">
        <button class="delete-btn">
          <img src="../Assets/delete_svgrepo.com.png" alt="Excluir" />
        </button>
        <a href="../Editar/editar.html?id=${produto.id}" class="edit-btn">
          <img src="../Assets/editar.png" alt="Editar" />
        </a>
      </div>
    </div>

    <img src="https://www.jardelatacadao.com.br/lojas/00050181/prod/camisa_tradicional_poliester_verzzolo_branco_xgg_jardel_atacadao_000003A.jpg" alt="${produto.name}">
    <div class="info-card">
      <h3>${produto.name.toUpperCase()}</h3>
      <p class="categoria">${produto.category.toUpperCase()}</p>
      <p class="descricao">${produto.description}</p>
      <p class="preco">R$ ${produto.price.toFixed(2)}</p>
    </div>
  `;
  
  const botaoExcluir = card.querySelector(".delete-btn");
  botaoExcluir.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir esta peça?")) {
      fetch(`http://localhost:3001/products/${produto.id}`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.ok) {
            alert("Peça excluída com sucesso!");
            carregarProdutos(); 
          } else {
            alert("Erro ao excluir a peça.");
          }
        })
        .catch(() => alert("Erro ao conectar com o servidor."));
    }
    
  });
  container.appendChild(card);
});
}


function criarPaginacao() {
  paginacao.innerHTML = "";
 
  const botaoAnterior = document.createElement("button");
    botaoAnterior.classList.add("seta");
    botaoAnterior.innerHTML = "&lt;";
    botaoAnterior.addEventListener("click", () => {
      if (paginaAtual > 1) {
        paginaAtual--;
        mostrarPagina(paginaAtual);
        criarPaginacao();
      }
  });
  paginacao.appendChild(botaoAnterior);


  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement("button");
    botao.innerText = i;
    botao.classList.add("botao-pagina");

    if (i === paginaAtual) {
      botao.classList.add("ativo");
    }

    botao.addEventListener("click", () => {
      paginaAtual = i;
      mostrarPagina(paginaAtual);
      criarPaginacao();
    });

    paginacao.appendChild(botao);
  }

  const botaoProxima = document.createElement("button");
    botaoProxima.classList.add("seta");
    botaoProxima.innerHTML = "&gt;";
    botaoProxima.addEventListener("click", () => {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        mostrarPagina(paginaAtual);
        criarPaginacao();
      }
  });
  paginacao.appendChild(botaoProxima);
}

  document.getElementById("adicionar").addEventListener("click", () => {
  window.location.href = "../Adicionar/adicionar.html";
});

carregarProdutos();
