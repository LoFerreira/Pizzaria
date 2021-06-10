const c = (e) => document.querySelector(e);
const ca = (e) => document.querySelectorAll(ca);

pizzaJson.map((item, index) => {
    //PREENCHER AS INFORMAÇÕES EM pizzaItem ===============================
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //NOME, DESCRIÇÃO, PREÇO E IMAGEM DAS PIZZAS ===============================
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `RS ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    })

    //MOSTRANDO OS MODELOS DE PIZZA NA TELA ===============================
    c('.pizza-area').append(pizzaItem);
});