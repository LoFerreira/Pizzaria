let modalQT = 1;

const c = (e) => document.querySelector(e);
const ca = (ca) => document.querySelectorAll(ca);

//lISTAGEM DAS PIZZAS ===============================
pizzaJson.map((item, index) => {

    //PREENCHER AS INFORMAÇÕES EM pizzaItem ===============================
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //NOME, DESCRIÇÃO, PREÇO, IMAGEM DAS PIZZAS E O INDEX ===============================
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `RS ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.setAttribute('data-key', index);
    
    //MOSTRANDO A MODAL PAGE NA TELA  ===============================
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        //ABRINDO O MODAL PAGE  ===============================
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);

        //PEGANDO O ID DA PIZZA CLICADA  ===============================
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        //RESETANDO A QUANTIDADE DE PIZZAS DA MODAL PAGE  ===============================
        modalQT = 1;

        //PUXANDO OS DADOS DA PIZZA CLICADA E MOSTRANDO NO MODAL PAGE  ===============================
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name; 
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description; 
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--actualPrice').innerHTML = `RS ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        ca('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQT;
    });

    //MOSTRANDO OS MODELOS DE PIZZA NA TELA ===============================
    c('.pizza-area').append(pizzaItem);
});


// ============================== EVENTOS DO MODAL ===============================


//FECHANDO O MODAL ===============================
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

ca('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})


//BOTÕES DE QUANTIDADE DE PIZZAS ===============================
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQT >=2) {
        modalQT--;
        c('.pizzaInfo--qt').innerHTML = modalQT;
    }
})

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQT++;
    c('.pizzaInfo--qt').innerHTML = modalQT;
})

//SELEÇÃO DOS TAMANHO DAS PIZZAS ===============================
ca('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});





