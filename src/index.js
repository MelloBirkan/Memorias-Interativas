let photos = [{
  url: "https://cdn.midjourney.com/c152dc9b-66ff-40dc-a007-3e34b88c1212/0_0.png",
  tag: "Pudim",
  date: "2023-12-15",
}, {
  url: "https://coisadefotografa.com/wp-content/uploads/2021/09/como-ter-fotos-mais-nitidas-scaled.jpg",
  tag: "Criança",
  date: "2032-12-24",
}, {
  url: "https://static.itdg.com.br/images/1200-630/749b72864d0cca0d369a14866ac1aa9a/shutterstock-290834552.jpg",
  tag: "Maçãs",
  date: "2021-12-03",
}, {
  url: "https://static-cse.canva.com/blob/759728/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.994bef93.jpg",
  tag: "Selfie",
  date: "2024-01-14",
},];

// define a listra de fotos filtradas
// como sendo a propria lista de fotos
// por padrao
let filteredPhotos = photos;
const sortByDate = (a, b) => new Date(a.date) - new Date(b.date)
const sortByTag = (a, b) => a.tag.localeCompare(b.tag);

const currentYearReminders = () => filteredPhotos.filter((photo) => new Date(photo.date).getFullYear() === 2024);
const oldestReminderDate = () =>  filteredPhotos.reduce((oldest, photo) => {
  const year = new Date(photo.date).getFullYear();
  return year < oldest ? year : oldest;
}, new Date().getFullYear());

// Pegando os elementos
const toggleButton = document.getElementById('toggleButton');
const toggleCircle = document.getElementById('toggleCircle');
const iconOn = document.getElementById('iconOn');
const iconOff = document.getElementById('iconOff');

// Função de alternância
toggleButton.addEventListener('click', function() {
  const isChecked = toggleButton.getAttribute('aria-checked') === 'true';

  if (isChecked) {
    // Se estiver ativado, desative
    toggleButton.setAttribute('aria-checked', 'false');
    toggleButton.classList.remove('bg-indigo-600');
    toggleButton.classList.add('bg-gray-200');

    toggleCircle.classList.remove('translate-x-5');
    toggleCircle.classList.add('translate-x-0');

    iconOn.classList.remove('opacity-100');
    iconOn.classList.add('opacity-0');
    iconOff.classList.remove('opacity-0');
    iconOff.classList.add('opacity-100');
  } else {
    // Se estiver desativado, ative
    toggleButton.setAttribute('aria-checked', 'true');
    toggleButton.classList.remove('bg-gray-200');
    toggleButton.classList.add('bg-indigo-600');

    toggleCircle.classList.remove('translate-x-0');
    toggleCircle.classList.add('translate-x-5');

    iconOn.classList.remove('opacity-0');
    iconOn.classList.add('opacity-100');
    iconOff.classList.remove('opacity-100');
    iconOff.classList.add('opacity-0');
  }

  updateList();
});

// ao carregar a tela chama a funcao updateList
window.onload = () => {
  updateList();
};


const buildFooter = () => {
  let footer = document.querySelector('footer');

  let oldNode = footer.querySelector('p') || null;

  // Cria um novo parágrafo
  let node = document.createElement('p');
  let text = document.createTextNode(`Total de lembranças registradas: ${filteredPhotos.length} | Lembranças tiradas em 2024: ${currentYearReminders().length} | Data da lembrança mais antiga: ${oldestReminderDate()}`);
  node.appendChild(text);

  if (oldNode) {
    footer.replaceChild(node, oldNode);
  } else {
    footer.appendChild(node);
  }
}

function registrar() {
  //obtendo elementos do formulario de registro
  const urlInput = document.getElementById("photo-input");
  const tagInput = document.getElementById("tag-input");
  const dateInput = document.getElementById("date-input");

  //le os valores dos inputs
  const url = urlInput.value;
  const tag = tagInput.value;
  const date = dateInput.value;

  //limpa campos do formulário
  urlInput.value = "";
  tagInput.value = "";
  dateInput.value = "";

  //adiciona no vetor
  photos.push({
    url, tag, date
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

  filteredPhotos.toSorted(toggleButton.getAttribute('aria-checked') === 'true' ? sortByTag : sortByDate).forEach(buildRemembranceList);

  buildFooter()
}

const buildRemembranceList = (photo) => {
  //construindo html
  let html = `
    <section class="md:bg-gray-800 md:px-3 md:py-5 rounded-2xl"> 
      <img class="w-full aspect-square object-cover md:size-72 md:rounded-2xl" src="${photo.url}" />
      <p class="pl-1 text-md font-semibold leading-8 tracking-tight text-white">${photo.tag}</p>
      <p class="pl-1 text-sm leading-6 text-gray-500 mb-3">${new Date(photo.date).toLocaleDateString("pt-BR")}</p>
    </section>`;

  // concatena o html com o resto da lista
  list.innerHTML += html;
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