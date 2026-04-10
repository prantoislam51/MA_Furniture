(function () {
  const auth = document.getElementById('adminAuth');
  const shell = document.getElementById('adminShell');
  if (!auth || !shell) return;

  const username = 'admin';
  const password = 'admin2024';
  const loginForm = document.getElementById('adminLoginForm');
  const userInput = document.getElementById('adminUsername');
  const passInput = document.getElementById('adminPassword');
  const tabs = Array.from(document.querySelectorAll('.admin-tab-btn'));
  const tabPanels = Array.from(document.querySelectorAll('.admin-tab'));
  const tableBody = document.getElementById('adminTableBody');
  const searchInput = document.getElementById('adminSearch');
  const pagination = document.getElementById('adminPagination');
  const statsWrap = document.getElementById('adminStats');
  const addForm = document.getElementById('addProductForm');
  const addCatSelect = document.getElementById('addCategorySelect');
  const catList = document.getElementById('adminCategoryList');
  const copyProductsBtn = document.getElementById('copyProductsBtn');
  const copyCategoriesBtn = document.getElementById('copyCategoriesBtn');
  const exportOutput = document.getElementById('exportOutput');

  let products = [...(window.__DATA__?.products || [])];
  const categories = [...(window.__DATA__?.categories || [])];
  let page = 1;
  const pageSize = 20;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredUser = (userInput.value || '').trim();
    if (enteredUser !== username || passInput.value !== password) {
      if (userInput) {
        userInput.value = '';
        userInput.placeholder = 'ভুল ইউজারনেম';
      }
      passInput.value = '';
      passInput.placeholder = 'ভুল পাসওয়ার্ড';
      return;
    }
    auth.classList.add('hidden');
    shell.classList.remove('hidden');
    init();
  });

  function renderStats() {
    const featured = products.filter((p) => p.isFeatured).length;
    const top = products.filter((p) => p.isTopSelling).length;
    statsWrap.innerHTML = `
      <article class="admin-stat"><p>Total Products</p><h4>${products.length}</h4></article>
      <article class="admin-stat"><p>Categories</p><h4>${categories.length}</h4></article>
      <article class="admin-stat"><p>Featured</p><h4>${featured}</h4></article>
      <article class="admin-stat"><p>Top Selling</p><h4>${top}</h4></article>
    `;
  }

  function normalizeProduct(product) {
    return {
      ...product,
      price: Number(product.price || 0),
      originalPrice: Number(product.originalPrice || product.price || 0),
      inStock: Boolean(product.inStock),
      isFeatured: Boolean(product.isFeatured),
      isTopSelling: Boolean(product.isTopSelling),
      isNew: Boolean(product.isNew)
    };
  }

  function getFiltered() {
    const q = (searchInput.value || '').toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q));
  }

  function renderTable() {
    const filtered = getFiltered();
    const start = (page - 1) * pageSize;
    const rows = filtered.slice(start, start + pageSize);

    tableBody.innerHTML = rows
      .map((p) => {
        const cat = categories.find((c) => c.id === p.categoryId);
        return `
          <tr data-row-id="${p.id}">
            <td>${p.id}</td>
            <td><img src="${p.image}" alt="${p.nameEn}" /></td>
            <td>${p.name}</td>
            <td>${cat ? cat.name : p.categoryId}</td>
            <td>৳${Number(p.price).toLocaleString('en-US')}</td>
            <td>${p.inStock ? 'In Stock' : 'Out'}</td>
            <td>
              <button data-action="edit" data-id="${p.id}"><i class="fa-regular fa-pen"></i></button>
              <button data-action="delete" data-id="${p.id}"><i class="fa-regular fa-trash"></i></button>
            </td>
          </tr>
        `;
      })
      .join('');

    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    pagination.innerHTML = '';
    for (let i = 1; i <= pages; i += 1) {
      const btn = document.createElement('button');
      btn.textContent = String(i);
      if (i === page) btn.classList.add('active');
      btn.addEventListener('click', () => {
        page = i;
        renderTable();
      });
      pagination.appendChild(btn);
    }
  }

  function renderCategoryTab() {
    const counts = categories.map((cat) => ({
      ...cat,
      count: products.filter((p) => p.categoryId === cat.id).length
    }));

    catList.innerHTML = counts
      .map((cat) => `<article class="admin-cat-item"><span>${cat.name}</span><strong>${cat.count} products</strong></article>`)
      .join('');
  }

  function populateCategoryOptions() {
    addCatSelect.innerHTML = categories.map((cat) => `<option value="${cat.id}">${cat.name}</option>`).join('');
  }

  async function handleAdd(e) {
    e.preventDefault();
    const fd = new FormData(addForm);
    const payload = {
      id: fd.get('id'),
      name: fd.get('name'),
      nameEn: fd.get('nameEn'),
      categoryId: fd.get('categoryId'),
      price: Number(fd.get('price')),
      originalPrice: Number(fd.get('originalPrice') || fd.get('price')),
      image: fd.get('image') || '/img/chair%2001.jpg',
      images: [fd.get('image') || '', fd.get('image2') || '', fd.get('image3') || ''].filter(Boolean),
      material: fd.get('material') || 'সেগুন কাঠ',
      finish: fd.get('finish') || 'ম্যাট ওয়ালনাট',
      dimensions: fd.get('dimensions') || 'N/A',
      color: fd.get('color') || 'গাঢ় বাদামী',
      weight: fd.get('weight') || 'N/A',
      description: fd.get('description') || '',
      inStock: !!fd.get('inStock'),
      isFeatured: !!fd.get('isFeatured'),
      isTopSelling: !!fd.get('isTopSelling'),
      isNew: !!fd.get('isNew'),
      rating: 4.5,
      reviewCount: 0,
      tags: []
    };

    const res = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (!json.ok) {
      alert(json.message || 'Failed to add product');
      return;
    }

    products = json.products.map(normalizeProduct);
    addForm.reset();
    page = 1;
    renderAll();
  }

  async function onTableClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    const row = btn.closest('tr');
    const current = products.find((p) => p.id === id);
    if (!current) return;

    if (action === 'delete') {
      const ok = confirm('এই পণ্যটি মুছে ফেলতে চান?');
      if (!ok) return;

      const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.ok) {
        products = json.products.map(normalizeProduct);
        renderAll();
      }
      return;
    }

    if (action === 'edit') {
      row.innerHTML = `
        <td>${id}</td>
        <td><img src="${current.image}" alt="${current.nameEn}" /></td>
        <td><input data-edit="name" value="${current.name}" /></td>
        <td>${current.categoryId}</td>
        <td><input data-edit="price" type="number" value="${current.price}" /></td>
        <td><input data-edit="inStock" type="checkbox" ${current.inStock ? 'checked' : ''} /></td>
        <td>
          <button data-action="save" data-id="${id}">Save</button>
        </td>
      `;
      return;
    }

    if (action === 'save') {
      const name = row.querySelector('[data-edit="name"]').value;
      const price = Number(row.querySelector('[data-edit="price"]').value);
      const inStock = row.querySelector('[data-edit="inStock"]').checked;

      const res = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, inStock })
      });

      const json = await res.json();
      if (json.ok) {
        products = json.products.map(normalizeProduct);
        renderAll();
      }
    }
  }

  function setupTabs() {
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        tabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        tabPanels.forEach((panel) => panel.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active');
      });
    });
  }

  function setupExport() {
    copyProductsBtn.addEventListener('click', async () => {
      const txt = JSON.stringify(products, null, 2);
      exportOutput.textContent = txt;
      await navigator.clipboard.writeText(txt);
    });

    copyCategoriesBtn.addEventListener('click', async () => {
      const txt = JSON.stringify(categories, null, 2);
      exportOutput.textContent = txt;
      await navigator.clipboard.writeText(txt);
    });
  }

  function renderAll() {
    renderStats();
    renderTable();
    renderCategoryTab();
  }

  function init() {
    populateCategoryOptions();
    setupTabs();
    setupExport();
    renderAll();

    searchInput.addEventListener('input', () => {
      page = 1;
      renderTable();
    });

    addForm.addEventListener('submit', handleAdd);
    tableBody.addEventListener('click', onTableClick);
  }
})();
