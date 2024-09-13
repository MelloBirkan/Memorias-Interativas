let photos = [{
  url: "https://static.itdg.com.br/images/360-240/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-1-.jpg",
  tag: "pudim"
}, {
  url: "https://coisadefotografa.com/wp-content/uploads/2021/09/como-ter-fotos-mais-nitidas-scaled.jpg",
  tag: "criança"
}, {
  url: "https://static.itdg.com.br/images/1200-630/749b72864d0cca0d369a14866ac1aa9a/shutterstock-290834552.jpg",
  tag: "maçãs"
}, {
  url: "https://static-cse.canva.com/blob/759728/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.994bef93.jpg",
  tag: "selfie"
},];

// define a listra de fotos filtradas
// como sendo a propria lista de fotos
// por padrao
let filteredPhotos = photos;

// ao carregar a tela chama a funcao updateList
window.onload = updateList;

function registrar() {
  //obtendo elementos do formulario de registro
  const urlInput = document.getElementById("photo-input");
  const tagInput = document.getElementById("tag-input");

  //le os valores dos inputs
  const url = urlInput.value;
  const tag = tagInput.value;

  //limpa campos do formulário
  urlInput.value = "";
  tagInput.value = "";

  //adiciona no vetor
  photos.push({
    url, tag
  });

  //limpa o filtro e
  //atualiza a lista
  cleanFilter();
}


function updateList() {
  //obtendo a lista
  let list = document.getElementById("list");
  //limpando a lista
  list.innerHTML = "";

  //varrendo o vetor de photos para
  //adicionar na tela
  for (let i = 0; i < filteredPhotos.length; i++) {
    //construindo html
    let html = `
    <section class="card">
      <img src="${filteredPhotos[i].url}" />
      <p>${filteredPhotos[i].tag}</p>
    </section>`;

    // concatena o html com o resto da lista
    list.innerHTML += html;
  }
}

function filterPhotos() {
  //obtem texto do filtro
  let filterText = document.getElementById("filter-text").value;

  // filtra os dados
  filteredPhotos = photos.filter((photo) => {
    return photo.tag.includes(filterText);
  });

  updateList();
}

function cleanFilter() {
  document.getElementById("filter-text").value = "";
  filteredPhotos = photos;
  updateList();
}