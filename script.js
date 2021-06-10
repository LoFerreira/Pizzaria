const c = (e) => document.querySelector(e);
const ca = (e) => document.querySelectorAll(ca);

pizzaJson.map((item, index) => {
    //PREENCHER AS INFORMAÇÕES EM pizzaItem
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `RS ${item.price.toFixed(2)}`

    //MOSTRANDO OS MODELOS DE PIZZA NA TELA
    c('.pizza-area').append(pizzaItem);
});