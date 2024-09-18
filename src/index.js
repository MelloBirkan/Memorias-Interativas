let photos = [{
  url: "https://cdn.midjourney.com/c152dc9b-66ff-40dc-a007-3e34b88c1212/0_0.png",
  tag: "Pudim"
}, {
  url: "https://coisadefotografa.com/wp-content/uploads/2021/09/como-ter-fotos-mais-nitidas-scaled.jpg",
  tag: "Criança"
}, {
  url: "https://static.itdg.com.br/images/1200-630/749b72864d0cca0d369a14866ac1aa9a/shutterstock-290834552.jpg",
  tag: "Maçãs"
}, {
  url: "https://static-cse.canva.com/blob/759728/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.994bef93.jpg",
  tag: "Selfie"
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
    <section> 
      <img class="w-full aspect-square object-cover" src="${filteredPhotos[i].url}" />
      <p class="pl-1 text-lg font-semibold leading-8 tracking-tight text-white">${filteredPhotos[i].tag}</p>
      <p class="pl-1 text-sm leading-6 text-gray-500 mb-3">Toronto, Canada</p>
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