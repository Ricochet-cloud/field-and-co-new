// js/script.js  —  덮어쓰기용 (NO <script> 태그 포함 금지)

const ITEMS = {
  item1: { id:'item1', name:'M-65 FIELD JACKET', price:89000, img:'images/item1.jpg', desc:'1970s 빈티지 M-65 필드 자켓. 오리지널 패치와 자연스러운 페이딩.' },
  item2: { id:'item2', name:'DENIM WORK SHIRT', price:59000, img:'images/item2.jpg', desc:'빈티지 데님 워크 셔츠. 내구성 좋은 코튼.' },
  item3: { id:'item3', name:'CANVAS TOTE BAG', price:39000, img:'images/item3.jpg', desc:'튼튼한 캔버스 토트.' },
  item4: { id:'item4', name:'VINTAGE CREWNECK', price:49000, img:'images/item4.jpg', desc:'빈티지 크루넥 스웨트셔츠.' }
};

function viewDetail(id){
  localStorage.setItem('selectedItem', id);
  window.location.href = 'product-detail.html';
}

function loadDetail(){
  const id = localStorage.getItem('selectedItem') || 'item1';
  const it = ITEMS[id];
  if(!it) return;
  const imgEl = document.getElementById('product-img');
  const nameEl = document.getElementById('product-name');
  const priceEl = document.getElementById('product-price');
  const descEl = document.getElementById('product-desc');

  if(imgEl) imgEl.src = it.img;
  if(nameEl) nameEl.textContent = it.name;
  if(priceEl) priceEl.textContent = '₩' + it.price.toLocaleString();
  if(descEl) descEl.textContent = it.desc;
}

function addToCart(){
  // 여기에 로컬스토리지 장바구니 로직을 넣을 수 있음 (지금은 샘플)
  alert('장바구니에 추가되었습니다.');
}

// 팝업 & 초기화는 DOMContentLoaded 이후에 안전하게 실행
document.addEventListener('DOMContentLoaded', () => {
  // 1) 상품 상세페이지 로드 처리 (product-detail.html 전용)
  if (window.location.pathname.includes('product-detail.html')) {
    loadDetail();
  }

  // 2) 팝업 처리 (index.html에 popup 요소가 있을 때만)
  const popup = document.getElementById('popup');
  if (popup) {
    // 팝업 표시 지연(로딩 안정화)
    setTimeout(() => {
      popup.classList.add('active');
    }, 800);

    // 닫기 버튼 안전하게 찾기
    const closeBtn = document.getElementById('closePopup');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => popup.classList.remove('active'));
    }

    // 오버레이 클릭 시 닫기
    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.remove('active');
    });
  }
});

// 외부에서 호출할 수 있도록 전역으로 노출 (HTML onclick에서 호출 가능)
window.viewDetail = viewDetail;
window.addToCart = addToCart;


// script.js 카테고리
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const productCards = document.querySelectorAll(".product-card");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const category = e.target.textContent.toLowerCase();
      if (category === "all") {
        productCards.forEach(card => card.style.display = "block");
      } else {
        productCards.forEach(card => {
          card.style.display = card.dataset.category === category ? "block" : "none";
        });
      }
    });
  });
});

/* ===========================
   🪶 검색 기능
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "검색어를 입력하세요...";
  searchInput.className = "search-input";
  document.querySelector(".navbar .container").appendChild(searchInput);

  // 처음엔 숨김
  searchInput.style.display = "none";

  searchBtn.addEventListener("click", () => {
    const isVisible = searchInput.style.display === "block";
    searchInput.style.display = isVisible ? "none" : "block";
    if (!isVisible) searchInput.focus();
  });

  // 검색 실행
  searchInput.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "block" : "none";
    });
  });
});

/* ===========================
   🛒 장바구니 기능
=========================== */
document.addEventListener("click", (e) => {
  if (e.target.closest(".add-to-cart")) {
    const card = e.target.closest(".product-card");
    const name = card.querySelector("h3").textContent;
    const price = card.querySelector("p").textContent;
    const image = card.querySelector("img").src;

    // 로컬스토리지에 저장
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name}이(가) 장바구니에 추가되었습니다.`);
  }
});

/* ===========================
   🧾 장바구니 보기
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.querySelector(".cart-btn");
  cartBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("장바구니가 비어 있습니다 🛍️");
      return;
    }

    let message = "🛒 장바구니 목록:\n\n";
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} — ${item.price}\n`;
    });

    alert(message);
  });
});