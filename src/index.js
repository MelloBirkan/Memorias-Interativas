let photos = [{
  url: "https://cdn.midjourney.com/4014b415-e4aa-448f-9f6a-78b2e1327c67/0_0.png",
  tag: "Cloud Strife",
  date: "2000-08-11",
}, {
  url: "https://www.cnet.com/a/img/resize/34fe1a54ec1c129958f1ca7e9fa71b10e4d591de/hub/2024/02/05/1d7f1f40-5b3c-42db-9d21-bf8dbe80cc97/ffvii-rebirth-december-keyart-16x9-png-jpgcopy.jpg?auto=webp&fit=crop&height=675&width=1200",
  tag: "Final Fantasy 7 Rebirth",
  date: "2024-02-29",
}, {
  url: "https://gh.cdn.sewest.net/assets/ident/pulse/a218ace0/FFVIIRINTERGRADE_Available_Now-1vq9ttoa5.jpg?quality=65",
  tag: "Final Fantasy 7 Remake",
  date: "2020-04-10",
}, {
  url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/07/final-fantasy-7-party-members-artwork.jpg",
  tag: "Final Fantasy 7 (OG)",
  date: "1997-01-31",
},  {
  url: "https://scontent.fcgh15-1.fna.fbcdn.net/v/t39.30808-6/374687907_796256409167381_1206474237528333574_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=TnfqKP74BAsQ7kNvgG_z75C&_nc_ht=scontent.fcgh15-1.fna&_nc_gid=Al5hmZ74a7v-uAX5yBhKQdc&oh=00_AYDU9HNTGR66aKPzmICJ9FT685LpvThjF4bFaSWli6ZbrA&oe=66F10AFA",
  tag: "Final Fantasy 7 Ever Crisis)",
  date: "2023-09-07",
},  {
  url: "https://sm.ign.com/ign_nordic/review/c/crisis-cor/crisis-core-final-fantasy-7-reunion-review_s594.jpg",
  tag: "Final Fantasy 7 Crisis Core",
  date: "2007-09-13",
},  {
  url: "https://cdn.midjourney.com/d9148e38-57ac-4a8b-81fb-0cc74451fa53/0_0.png",
  tag: "Aerith Gainsborough",
  date: "1999-02-07",
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
    toggleButton.classList.remove('bg-slate-600');
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
    toggleButton.classList.add('bg-gray-600');

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