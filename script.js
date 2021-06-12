let modalQT = 1;
let cart = [];
let modalKey = 0;

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

        //PEGANDO A PIZZA CLICADA  ===============================
        modalKey = key

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

//ADICIONANDO A PIZZA NO CARRINHO ===============================
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    //CRIANDO UM IDENTIFICADOR PARA AS PIZZAS ===============================
    let identifier = pizzaJson[modalKey].id + '@' + size;

    //PROCURANDO DENTRO DO CART AS PIZZAS COM O MESMO ID E SIZE ===============================
    let key = cart.findIndex((item) => item.identifier == identifier);

    //JUNTANDO AS PIZZAS ACHADAS COM O MESMO ID E SIZE ===============================
    if(key > -1) {
        cart[key].qt += modalQT;
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQT
        });   
    }

    updateCart();
    closeModal(); 
});

c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0){
        c('aside').style.left = '0';
    }   
});

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
})

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        //ABRINDO O CARRINHO ===============================
        c('aside').classList.add('show');
            
        //LIMPANDO O CARRINHO ===============================
        c('.cart').innerHTML = '';

        for(let i in cart) {
            //PEGANDO A PIZZA DO CARRINHO ===============================
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            //PEGANDO O PREÇO DAS PIZZAS DO CARRINHO ===============================
            subtotal += pizzaItem.price * cart[i].qt;

            //CLONANDO O MODELO DA PIZZA ===============================
            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            })

            //COLOCANDO O MODELO DA PIZZA DENTRO DO CARRINHO ===============================
            c('.cart').append(cartItem);

            desconto = subtotal * 0.1;
            total = subtotal - desconto;
            
            c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
            c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        }
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';

    }
}



