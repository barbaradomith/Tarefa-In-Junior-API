
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

o
const formulario = document.getElementById("form-adicionar");


fetch(`http://localhost:3001/products/${id}`)
  .then(res => {
    if (!res.ok) {
      throw new Error("Produto não encontrado");
    }
    return res.json();
  })
  .then(produto => {
   
    formulario.nome.value = produto.name;
    formulario.imagem.value = produto.image;
    formulario.descricao.value = produto.description;
    formulario.preco.value = produto.price;
    formulario.categoria.value = produto.category;
    formulario.avaliacao.value = produto.rating;
  })
  .catch(error => {
    alert("Erro ao carregar o produto: " + error.message);
  });


formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const produtoAtualizado = {
    name: formulario.nome.value,
    image: formulario.imagem.value,
    description: formulario.descricao.value,
    price: parseFloat(formulario.preco.value),
    category: formulario.categoria.value,
    rating: parseFloat(formulario.avaliacao.value),
    inStock: true 
  };

  fetch(`http://localhost:3001/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produtoAtualizado)
  })
    .then(res => {
      if (res.ok) {
        alert("Produto atualizado com sucesso!");
        window.location.href = "../Home/index.html"; 
      } else {
        alert("Erro ao atualizar o produto.");
      }
    })
    .catch(() => alert("Erro ao conectar com o servidor."));
});
