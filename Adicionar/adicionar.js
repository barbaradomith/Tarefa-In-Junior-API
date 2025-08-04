const formAdicionar = document.getElementById("form-adicionar");

formAdicionar.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoProduto = {
    name: formAdicionar.nome.value,
    category: formAdicionar.categoria.value,
    description: formAdicionar.descricao.value,
    price: parseFloat(formAdicionar.preco.value),
    image: formAdicionar.imagem.value,
    rating: parseFloat(formAdicionar.avaliacao.value),
    inStock: true
  };

  fetch("http://localhost:3001/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoProduto)
  })
    .then(res => {
      if(res.ok) {
        alert("Produto adicionado com sucesso!");
        formAdicionar.reset();
      } else {
        alert("Erro ao adicionar produto.");
      }
    })
    .catch(() => alert("Erro ao conectar com o servidor."));
});
