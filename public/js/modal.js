(function () {
  const data = window.__DATA__ || { products: [] };
  const modal = document.getElementById('productModal');
  if (!modal) return;

  function toBnDigits(number) {
    return Number(number).toLocaleString('bn-BD');
  }

  function buildWaUrl(product, qty) {
    const message = `আসসালামু আলাইকুম! 🙏\nআমি নিচের পণ্যটি অর্ডার করতে চাই:\n\n📦 পণ্যের নাম: ${product.name}\n🔖 পণ্য ID: ${product.id}\n💰 মূল্য: ৳${toBnDigits(product.price)}\n📊 পরিমাণ: ${qty} টি\n\nদয়া করে বিস্তারিত জানান। ধন্যবাদ!`;
    return `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
  }

  function saveRecent(productId) {
    const raw = localStorage.getItem('recentProducts');
    const list = raw ? JSON.parse(raw) : [];
    const next = [productId, ...list.filter((id) => id !== productId)].slice(0, 6);
    localStorage.setItem('recentProducts', JSON.stringify(next));
  }

  function renderRecent(currentId) {
    const raw = localStorage.getItem('recentProducts');
    if (!raw) return '';
    const ids = JSON.parse(raw).filter((id) => id !== currentId).slice(0, 3);
    if (!ids.length) return '';
    const thumbs = ids
      .map((id) => data.products.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => `<img src="${p.image}" alt="${p.nameEn}" data-open-id="${p.id}" />`)
      .join('');

    return `<div class="recent-view"><p>সম্প্রতি দেখেছেন</p><div class="recent-thumbs">${thumbs}</div></div>`;
  }

  function openModal(productId) {
    const product = data.products.find((item) => item.id === productId);
    if (!product) return;

    saveRecent(product.id);
    const images = product.images && product.images.length ? product.images : [product.image];

    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-left">
          <img class="modal-main-image" src="${images[0]}" alt="${product.nameEn}" id="modalMainImage" />
          <div class="modal-thumbs">
            ${images.map((img, idx) => `<img src="${img}" class="${idx === 0 ? 'active' : ''}" data-thumb="${idx}" alt="thumb" />`).join('')}
          </div>
        </div>
        <div class="modal-right">
          <div class="modal-top">
            <div>
              <span class="modal-id">#${product.id}</span>
              <button class="icon-btn" id="modalCopyId" type="button"><i class="fa-regular fa-copy"></i></button>
            </div>
            <button class="modal-close" id="modalClose" type="button">✕</button>
          </div>

          <h3 class="modal-name">${product.name}</h3>
          <p class="modal-rating">★★★★★ <span>(${toBnDigits(product.reviewCount)}টি রিভিউ)</span></p>

          <div class="modal-price">
            <strong>৳${toBnDigits(product.price)}</strong>
            <del>৳${toBnDigits(product.originalPrice)}</del>
            <p class="badge badge-sale">৳${toBnDigits(product.originalPrice - product.price)} সাশ্রয়</p>
          </div>

          <div class="modal-specs">
            <div class="modal-spec"><span>উপাদান</span><span>${product.material}</span></div>
            <div class="modal-spec"><span>ফিনিশ</span><span>${product.finish}</span></div>
            <div class="modal-spec"><span>মাপ</span><span>${product.dimensions}</span></div>
            <div class="modal-spec"><span>রঙ</span><span>${product.color}</span></div>
            <div class="modal-spec"><span>ওজন</span><span>${product.weight}</span></div>
            <div class="modal-spec"><span>স্টক অবস্থা</span><span style="color:${product.inStock ? 'var(--forest)' : 'var(--ember)'}">${product.inStock ? '✅ পাওয়া যাচ্ছে' : '❌ স্টক আউট'}</span></div>
          </div>

          <p style="margin-top:10px;color:var(--cream-dim)">${product.description}</p>

          <div class="qty-wrap">
            <span>পরিমাণ</span>
            <button class="qty-btn" id="qtyMinus" type="button">−</button>
            <span class="qty-display" id="qtyDisplay">02</span>
            <button class="qty-btn" id="qtyPlus" type="button">+</button>
          </div>

          <a class="btn-wa-large full" id="modalWaBtn" href="${buildWaUrl(product, 2)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp এ অর্ডার করুন</a>
          <button class="btn-outline full" id="copyProductInfo" type="button">পণ্যের তথ্য কপি করুন</button>

          ${renderRecent(product.id)}
        </div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    let qty = 2;
    const qtyDisplay = modal.querySelector('#qtyDisplay');
    const waBtn = modal.querySelector('#modalWaBtn');

    function updateQty(next) {
      qty = Math.max(1, Math.min(99, next));
      qtyDisplay.textContent = String(qty).padStart(2, '0');
      waBtn.href = buildWaUrl(product, qty);
    }

    modal.querySelector('#qtyMinus').addEventListener('click', () => updateQty(qty - 1));
    modal.querySelector('#qtyPlus').addEventListener('click', () => updateQty(qty + 1));

    modal.querySelectorAll('[data-thumb]').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const idx = Number(thumb.getAttribute('data-thumb'));
        modal.querySelector('#modalMainImage').src = images[idx];
        modal.querySelectorAll('[data-thumb]').forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    modal.querySelector('#modalClose').addEventListener('click', closeModal);
    modal.querySelector('#modalCopyId').addEventListener('click', () => navigator.clipboard.writeText(product.id));

    modal.querySelector('#copyProductInfo').addEventListener('click', async () => {
      const txt = `${product.name} (${product.id})\n৳${toBnDigits(product.price)}\n${product.description}`;
      await navigator.clipboard.writeText(txt);
    });

    modal.querySelectorAll('[data-open-id]').forEach((img) => {
      img.addEventListener('click', () => openModal(img.getAttribute('data-open-id')));
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const cardTrigger = e.target.closest('.product-modal-trigger');
    const card = e.target.closest('.product-card');
    const direct = e.target.closest('[data-product-id]');

    if (cardTrigger || card) {
      const host = cardTrigger || card;
      const closest = host.closest('[data-product-id]') || direct;
      if (!closest) return;
      openModal(closest.getAttribute('data-product-id'));
    }

    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
