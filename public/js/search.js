(function () {
  const data = window.__DATA__ || { products: [], categories: [] };
  const form = document.getElementById('searchPageForm') || document.getElementById('homeSearchForm');
  const resultWrap = document.getElementById('liveResults');
  if (!form) return;

  const debounce = (fn, delay) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }

  function renderCard(product, query) {
    const category = data.categories.find((c) => c.id === product.categoryId);
    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="card-image-wrap">
          <img src="${product.image}" alt="${product.nameEn}" loading="lazy" />
          <div class="card-id">#${product.id}</div>
        </div>
        <div class="card-body">
          <p class="category-pill">${category ? category.name : product.categoryId}</p>
          <h3>${highlight(product.name, query)}</h3>
          <p class="rating">★★★★★ <span>(${product.reviewCount})</span></p>
          <div class="price-row"><strong>৳${Number(product.price).toLocaleString('en-US')}</strong></div>
          <button class="btn-outline full product-modal-trigger" type="button">বিস্তারিত দেখুন</button>
        </div>
      </article>
    `;
  }

  function runLiveSearch() {
    if (!resultWrap) return;
    const fd = new FormData(form);
    const q = String(fd.get('q') || '').trim().toLowerCase();
    const cat = String(fd.get('cat') || '');
    const min = Number(fd.get('min') || 0);
    const max = Number(fd.get('max') || Number.MAX_SAFE_INTEGER);

    const matched = data.products.filter((p) => {
      const byQ = !q || p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const byCat = !cat || p.categoryId === cat;
      const byMin = Number(p.price) >= min;
      const byMax = Number(p.price) <= max;
      return byQ && byCat && byMin && byMax;
    });

    resultWrap.innerHTML = matched.map((p) => renderCard(p, q)).join('');
  }

  const liveInput = form.querySelector('input[name="q"]');
  if (liveInput && resultWrap) {
    liveInput.addEventListener('input', debounce(runLiveSearch, 300));
    form.querySelectorAll('select,input[name="cat"],input[name="min"],input[name="max"]').forEach((el) => {
      el.addEventListener('change', runLiveSearch);
    });
  }
})();
