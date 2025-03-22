let listaAlterEgos = [];
let offset = 50;
let limit = 5; 

fetch(`https://akabab.github.io/superhero-api/api/all.json`)
    .then(response => response.json())
    .then(data => {
        popularAlterEgo(data);
        calcularTamanhoFirstAppearance(data);
        heroisDcComics(data);
        organizarHeroisPorTamanhoDoNome(data)    
    });

function popularAlterEgo(data) {
    listaAlterEgos = data.map(heroi => heroi.biography.alterEgos);
    const listaAlterEgosLimitados = listaAlterEgos.slice(offset, offset + limit);
    console.log("----------Lista dos AlterEgos----------", listaAlterEgosLimitados);
}

function calcularTamanhoFirstAppearance(data) {
    const MarvelHerois = data.filter(heroi => heroi.biography.publisher === "Marvel Comics");
    const tamanhoTotal = MarvelHerois.reduce((acumulador, heroi) => {
        const firstAppearance = heroi.biography.firstAppearance || ""; 
        return acumulador + firstAppearance.length;
    }, 0);
    console.log("Tamanho total de todos os 'firstAppearance' da Marvel:", tamanhoTotal);
}

function heroisDcComics(data) {
    const DcHerois = data.filter(heroi => heroi.biography.publisher === "DC Comics");
    const heroisLimitados = DcHerois.slice(offset, offset + limit);
    console.log("----------Heróis da DC----------", heroisLimitados);
}

function organizarHeroisPorTamanhoDoNome(data) {
    limit = 100;
    const nomesOrdenados = data
        .sort((a, b) => a.name.length - b.name.length)
        .map(heroi => heroi.name);
        const nomesOrdenadosLimitados = nomesOrdenados.slice(offset, offset + limit);
    console.log("Nomes organizados pelo tamanho:", nomesOrdenadosLimitados);
}

