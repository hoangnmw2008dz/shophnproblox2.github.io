/* PRODUCTS array: edit to change products */
const products = [
  {
    id: 1,
    name: "Cày Blox Fruits cấp 1–2450",
    image: "assets/cay-bloxfruits.jpg",
    description: "Nhận cày cấp, farm boss, Hỗ trợ tận tình ",
    price: "80K / tài khoản random ",
    category: "bloxfruits"
  },
  {
    id: 2,
    name: "Farm Beli",
    image: "assets/tra-ac-quy.jpg",
    description: "Farm Beli.",
    price: "10k/1m Beli",
    category: "bloxfruits"
  },
  {
    id: 3,
    name: "Cày Grow a Garden",
    image: "assets/grow-garden.jpg",
    description: "Bán pet, Cày pet.",
    price: "70K / tài khoản",
    category: "growagarden"
  },
  {
    id: 4,
    name: "Cày Steal a Brainot",
    image: "assets/steal-brainot.jpg",
    description: "Cày nhanh, hỗ trợ đổi pet.",
    price: "60K / acc",
    category: "stealabrainot"
  },
  {
    id: 5,
    name: "Farm F ",
    inmage: "assests//farm-f.jpg",
    description: "Farm Frag Nhanh Chóng Cho Bạn. ",
    price: "15k/1k frag ",
    category: "bloxfruits"
  }
];
const PRODUCTS = products.map(p => ({ id: p.id.toString(), title: p.name, img: p.image, desc: p.description, price: p.price, category: p.category }));
  
/* Main JS Code */  
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function formatVND(n){
  return new Intl.NumberFormat('vi-VN').format(Number(n)) + ' đ';
}

function renderProducts(filter='all'){
  const container = $('#productsGrid');
  container.innerHTML = '';
  const list = PRODUCTS.filter(p => filter === 'all' ? true : p.category === filter);
  if(list.length === 0){ container.innerHTML = '<p>Không tìm thấy sản phẩm.</p>'; return; }
  list.forEach(p => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'" />
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="price">${formatVND(p.price)}</div>
      <div class="actions">
        <button class="btn" data-buy="${p.id}">Mua ngay</button>
        <button class="nav-btn" data-fav="${p.id}">Yêu thích</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openBuyModal(product){
  const modal = $('#buyModal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h3>Mua: ${product.title}</h3>
    <p>${product.desc}</p>
    <p><b>Giá:</b> ${formatVND(product.price)}</p>
    <p><b>ID sản phẩm:</b> ${product.id}</p>
    <p>Liên hệ nhanh qua: <b>FaceBook</b> / <b>Discord</b> / <b>Roblox</b></p>
  `;
  const contactLink = $('#contactLink');
  contactLink.href = 'https://discord.com';
  contactLink.textContent = 'Mở Discord';
  $('#copyInfo').onclick = () => {
    const text = `Mua ${product.title} | ${product.id} | Giá: ${formatVND(product.price)}`;
    navigator.clipboard.writeText(text).then(()=> alert('Đã sao chép thông tin sản phẩm'));
  }
  modal.classList.remove('hidden');
}

function init(){
  renderProducts('all');
  $$('.nav-btn').forEach(btn => btn.addEventListener('click', e => {
    const f = e.currentTarget.dataset.filter || e.currentTarget.getAttribute('data-filter');
    if(f) renderProducts(f);
  }));
  $('#productsGrid').addEventListener('click', e => {
    const buy = e.target.closest('[data-buy]');
    if(buy){
      const id = buy.dataset.buy;
      const product = PRODUCTS.find(p=>p.id===id);
      if(product) openBuyModal(product);
    }
  });
  $('#modalClose').addEventListener('click', ()=> $('#buyModal').classList.add('hidden'));
  $('#sendContact').addEventListener('click', ()=>{
    alert('Cảm ơn! Tin nhắn của bạn đã được ghi. Liên hệ sẽ trả lời qua kênh đã cung cấp.');
    $('#cName').value='';$('#cContact').value='';$('#cMessage').value='';
  });
  document.getElementById('year').textContent = new Date().getFullYear();
}

window.addEventListener('DOMContentLoaded', init);