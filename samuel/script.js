// script.js — lógica da loja

// Lista de produtos (imagens públicas) — você pode trocar os caminhos por imagens locais
const produtos = [
  {id:1,title:'amigo amigal',price:59.90,img:'SAAAAAAAAA.jpg'},
  {id:2,title:'LERO LERO',price:29.50,img:'apucasticas.jpg'},
  {id:3,title:'home arenha',price:39.00,img:'abuashabababa3.jpg'},
  {id:4,title:'pato',price:19.90,img:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg'},
  {id:5,title:'mexirica fugitiva',price:79.90,img:'amigo.jpg'},
  {id:6,title:'!@#$@$%&@$!""""Q¨&(*())',price:999,img:'image.png'},
];

const catalogEl = document.getElementById('catalog');
const cartList = document.getElementById('cart-list');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');

let cart = {};

function formatPrice(v){
  return v.toFixed(2);
}

function renderCatalog(items){
  catalogEl.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `\
      <img src="${p.img}" alt="${p.title}">\
      <h3>${p.title}</h3>\
      <div class="price">R$ ${formatPrice(p.price)}</div>\
      <div class="actions">\
        <button data-id="${p.id}" class="add">Adicionar</button>\
        <div class="muted">Frete: R$ 9.90</div>\
      </div>`;
    catalogEl.appendChild(card);
  });

  document.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', ()=>{
      addToCart(Number(btn.dataset.id));
    });
  });
}

function addToCart(id){
  const prod = produtos.find(p=>p.id===id);
  if(!prod) return;
  if(!cart[id]) cart[id] = {...prod, qty:0};
  cart[id].qty++;
  saveCart();
  renderCart();
}

function removeFromCart(id){
  if(!cart[id]) return;
  cart[id].qty--;
  if(cart[id].qty<=0) delete cart[id];
  saveCart();
  renderCart();
}

function saveCart(){
  try{localStorage.setItem('loja_cart', JSON.stringify(cart));}catch(e){}
}
function loadCart(){
  try{const raw = localStorage.getItem('loja_cart'); if(raw) cart = JSON.parse(raw);}catch(e){}
}

function renderCart(){
  cartList.innerHTML = '';
  const keys = Object.keys(cart);
  let total = 0;
  keys.forEach(k => {
    const it = cart[k];
    total += it.price * it.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `\
      <img src="${it.img}" alt="${it.title}">\
      <div style="flex:1">\
        <div style="font-weight:700">${it.title}</div>\
        <div style="font-size:13px">R$ ${formatPrice(it.price)} x ${it.qty} = R$ ${formatPrice(it.price*it.qty)}</div>\
      </div>\
      <div class="qty">\
        <button class="minus" data-id="${it.id}">-</button>\
        <div style="min-width:20px;text-align:center">${it.qty}</div>\
        <button class="plus" data-id="${it.id}">+</button>\
      </div>`;
    cartList.appendChild(div);
  });
  cartCountEl.textContent = keys.reduce((s,k)=>s+cart[k].qty,0) || 0;
  cartTotalEl.textContent = formatPrice(total);

  document.querySelectorAll('.minus').forEach(b=>b.addEventListener('click', ()=> removeFromCart(Number(b.dataset.id))));
  document.querySelectorAll('.plus').forEach(b=>b.addEventListener('click', ()=> addToCart(Number(b.dataset.id))));
}

// pesquisa simples
const searchInput = document.getElementById('search');
if(searchInput){
  searchInput.addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase().trim();
    const filtered = produtos.filter(p=>p.title.toLowerCase().includes(q));
    renderCatalog(filtered);
  });
}

const clearBtn = document.getElementById('clear');
if(clearBtn){
  clearBtn.addEventListener('click', ()=>{
    if(searchInput) searchInput.value = '';
    renderCatalog(produtos);
  });
}

const toggleBtn = document.getElementById('toggle-cart');
if(toggleBtn){
  toggleBtn.addEventListener('click', ()=>{
    const cartEl = document.getElementById('cart');
    if(!cartEl) return;
    cartEl.style.display = (cartEl.style.display === 'none') ? 'block' : 'none';
  });
}

const emptyBtn = document.getElementById('empty');
if(emptyBtn){
  emptyBtn.addEventListener('click', ()=>{
    cart = {}; saveCart(); renderCart();
  });
}



// inicialização
loadCart(); renderCatalog(produtos); renderCart();
