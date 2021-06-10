const c = (e) => document.querySelector(e);
const ca = (e) => document.querySelectorAll(ca);

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

        //PUXANDO OS DADOS DA PIZZA CLICADA E MOSTRANDO NO MODAL PAGE  ===============================
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name; 
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description; 
        c('.pizzaBig img').src = pizzaJson[key].img;
        

    })

    //MOSTRANDO OS MODELOS DE PIZZA NA TELA ===============================
    c('.pizza-area').append(pizzaItem);
});