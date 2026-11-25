const grid = document.querySelector('#productGrid');
const filters = document.querySelector('#filters');
const search = document.querySelector('#searchInput');
const empty = document.querySelector('#emptyState');
const resultCount = document.querySelector('#resultCount');
const drawer = document.querySelector('#cartDrawer');
const mask = document.querySelector('#drawerMask');
const items = document.querySelector('#cartItems');
const cartOpen = document.querySelector('#cartOpen');
const cartClose = document.querySelector('#cartClose');
const cartCopy = document.querySelector('#cartCopy');
const cartClear = document.querySelector('#cartClear');
const toast = document.querySelector('#toast');
const categories = [['special', '推荐'], ['all', '全部'], ['toast', '吐司'], ['jianshui', '碱水'], ['oubao', '欧包'], ['rice', '米面包'], ['cakebox', '蛋糕盒'], ['other', '其他']];
const catalog = BakeryCart.createCatalog(PRODUCTS);
const storageKey = 'duck_bakery_cart_v2';
const imageSizes = '(max-width: 540px) calc((100vw - 48px)/2), (max-width: 860px) calc((100vw - 74px)/2), (max-width: 1160px) calc((100vw - 100px)/3), 354px';
const safe = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
let active = 'special';
let state = loadState();

function readJson(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

function loadState() {
  const saved = readJson(storageKey);
  if (saved?.version === 2 && Array.isArray(saved.items)) {
    const selected = Object.create(null);
    if (saved.selected && typeof saved.selected === 'object') {
      for (const [productId, variantId] of Object.entries(saved.selected)) {
        if (BakeryCart.findVariant(catalog, productId, variantId)) selected[productId] = variantId;
      }
    }
    return { version: 2, items: BakeryCart.normalizeItems(saved.items, catalog), selected };
  }
  return { version: 2, items: BakeryCart.migrateLegacy(readJson('duck_bakery_cart_v1'), catalog), selected: Object.create(null) };
}

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); }
  catch { notify('当前浏览器无法保存购物袋，关闭页面前请复制清单'); }
}

function selectedVariant(product) {
  if (product.variants.length === 1) return product.variants[0];
  const selected = BakeryCart.findVariant(catalog, product.id, state.selected[product.id]);
  if (selected) return selected;
  const purchased = state.items.filter(item => item.productId === product.id && item.variantId);
  return purchased.length === 1 ? BakeryCart.findVariant(catalog, product.id, purchased[0].variantId) : null;
}

function quantityFor(productId, variantId) {
  return state.items.find(item => item.productId === productId && item.variantId === variantId)?.quantity || 0;
}

function productActions(product) {
  return `<div class="product-actions" role="group" aria-label="${safe(product.name)} 的购物袋数量">
    <button type="button" class="quantity-decrease" data-adjust="-1" aria-label="减少 ${safe(product.name)} 的数量" hidden>−</button>
    <span class="product-quantity" aria-live="polite" aria-atomic="true" hidden>0</span>
    <button type="button" class="add-btn" data-adjust="1" aria-label="将 ${safe(product.name)} 加入购物袋">＋</button>
  </div>`;
}

function productOptions(product) {
  if (product.variants.length === 1) {
    const variant = product.variants[0];
    return `<div class="single-price">${variant.label === '1份' ? '' : `<span class="single-spec">${safe(variant.label)}</span>`}<span class="price">${BakeryCart.shortMoney(variant.priceCents)}</span></div>`;
  }
  return `<div class="variant-options" role="group" aria-label="${safe(product.name)} 的规格">${product.variants.map(variant => `
    <button type="button" class="variant-option" data-variant="${safe(variant.id)}" aria-pressed="false">
      <span class="variant-label">${safe(variant.label.replace('个/份', '个装'))}<span class="variant-in-cart" aria-hidden="true" hidden></span></span>
      <strong>${BakeryCart.shortMoney(variant.priceCents)}</strong>
    </button>`).join('')}</div>`;
}

function productImage(product, index) {
  const sources = PRODUCT_IMAGES[product.image];
  if (!sources?.length) return `<img src="images-styled/${safe(encodeURI(product.image))}" alt="${safe(product.name)}" width="720" height="720" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async">`;
  const source = sources.find(image => image.width >= 720) || sources.at(-1);
  const srcset = sources.map(image => `${image.src} ${image.width}w`).join(', ');
  return `<img src="${safe(source.src)}" srcset="${safe(srcset)}" sizes="${imageSizes}" alt="${safe(product.name)}" width="${source.width}" height="${source.height}" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'auto'}">`;
}

function matchesCategory(product) {
  if (active === 'all') return true;
  if (active === 'other') return !['toast', 'jianshui', 'oubao', 'rice', 'cakebox'].some(category => product.category.includes(category));
  return product.category.includes(active);
}

function render() {
  const query = search.value.trim().toLowerCase();
  const shown = PRODUCTS.filter(product => matchesCategory(product) && (!query || `${product.name} ${product.keywords} ${product.tag}`.toLowerCase().includes(query)));
  resultCount.textContent = `${shown.length} 款面包`;
  empty.hidden = shown.length > 0;
  grid.hidden = !shown.length;
  grid.innerHTML = shown.map((product, index) => `<article class="product-card" data-product="${safe(product.id)}">
    <div class="product-image">${productImage(product, index)}</div>
    <div class="product-body">
      <h2>${safe(product.name)}</h2>
      ${product.description?.trim() ? `<p class="description">${safe(product.description)}</p>` : ''}
      <div class="product-order">${productOptions(product)}<div class="product-bottom">${productActions(product)}</div></div>
    </div>
  </article>`).join('');
  updateProductActions();
}

function updateFilters() {
  filters.querySelectorAll('button').forEach(button => {
    const selected = button.dataset.filter === active;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function updateProductActions() {
  grid.querySelectorAll('[data-product]').forEach(card => {
    const product = catalog.get(card.dataset.product);
    const variant = selectedVariant(product);
    const quantity = variant ? quantityFor(product.id, variant.id) : 0;
    card.querySelectorAll('[data-variant]').forEach(button => {
      const option = BakeryCart.findVariant(catalog, product.id, button.dataset.variant);
      const chosen = option.id === variant?.id;
      const purchased = quantityFor(product.id, option.id);
      button.classList.toggle('active', chosen);
      button.setAttribute('aria-pressed', String(chosen));
      button.setAttribute('aria-label', `${option.label}，${BakeryCart.money(option.priceCents)}${purchased ? `，购物袋中 ${purchased} 份` : ''}`);
      const badge = button.querySelector('.variant-in-cart');
      badge.textContent = `×${purchased}`;
      badge.hidden = !purchased;
    });
    const control = card.querySelector('.product-actions');
    const minus = control.querySelector('[data-adjust="-1"]');
    const plus = control.querySelector('[data-adjust="1"]');
    const value = control.querySelector('.product-quantity');
    if (!quantity && document.activeElement === minus) plus.focus();
    control.classList.toggle('has-items', quantity > 0);
    control.setAttribute('aria-label', `${product.name}${variant ? ` ${variant.label}` : ''} 的购物袋数量`);
    minus.hidden = value.hidden = quantity < 1;
    value.textContent = quantity;
    plus.disabled = !variant;
    plus.setAttribute('aria-label', variant ? `将 ${product.name} ${variant.label} 加入购物袋` : `请先为 ${product.name} 选择规格`);
    minus.setAttribute('aria-label', `减少 ${product.name} ${variant?.label || ''} 的数量`);
  });
}

function renderCart() {
  const summary = BakeryCart.summarize(state.items, catalog);
  const previousFocus = drawer.contains(document.activeElement) ? {
    action: document.activeElement.dataset.cartAction,
    index: Number(document.activeElement.dataset.cartIndex),
  } : null;
  document.querySelector('#cartCount').textContent = summary.quantity;
  document.querySelector('#cartTotal').textContent = summary.quantity;
  document.querySelector('#cartAmount').textContent = summary.totalCents === null ? '待确认' : BakeryCart.money(summary.totalCents);
  const pending = document.querySelector('#cartPending');
  pending.hidden = !summary.pending;
  pending.textContent = summary.pending ? `${summary.pending} 项待确认，请补选规格或移除后复制清单。` : '';
  cartCopy.disabled = !summary.canCopy;
  cartClear.disabled = !summary.lines.length;
  items.innerHTML = summary.lines.length ? summary.lines.map((line, index) => {
    const name = safe(line.name);
    const label = line.variant ? `${line.name} ${line.variant.label}` : line.name;
    const details = line.variant
      ? `<p class="cart-meta">${safe(line.variant.label)} · 单价 ${BakeryCart.money(line.variant.priceCents)}</p>`
      : line.product
        ? `<select class="cart-spec" data-cart-action="variant" data-cart-index="${index}" aria-label="为 ${name} 选择规格"><option value="">选择规格</option>${line.product.variants.map(variant => `<option value="${safe(variant.id)}">${safe(variant.label)} · ${BakeryCart.money(variant.priceCents)}</option>`).join('')}</select>`
        : '<p class="cart-meta">暂不在菜单中，请移除后重新选择</p>';
    return `<div class="cart-row"><div class="cart-detail"><p>${name}</p>${details}</div><strong class="line-subtotal">${line.subtotalCents === null ? '待确认' : BakeryCart.money(line.subtotalCents)}</strong>
      <div class="cart-row-bottom"><button class="remove" type="button" data-cart-action="remove" data-cart-index="${index}" aria-label="移除 ${safe(label)}">移除</button>
      <div class="qty"><button type="button" data-cart-action="decrease" data-cart-index="${index}" aria-label="减少 ${safe(label)} 的数量">−</button><span>${line.quantity}</span><button type="button" data-cart-action="increase" data-cart-index="${index}" aria-label="增加 ${safe(label)} 的数量">＋</button></div></div></div>`;
  }).join('') : '<div class="cart-empty">购物袋还是空的</div>';
  updateProductActions();
  if (previousFocus?.action) {
    const index = Math.max(0, Math.min(previousFocus.index, state.items.length - 1));
    const target = [...items.querySelectorAll('[data-cart-action]')].find(button => button.dataset.cartAction === previousFocus.action && Number(button.dataset.cartIndex) === index);
    (target || items.querySelector('button') || cartClose).focus();
  }
}

function notify(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 1600);
}

function openCart(on = true) {
  const wasOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', on);
  drawer.inert = !on;
  drawer.setAttribute('aria-hidden', String(!on));
  if (on) drawer.setAttribute('aria-modal', 'true');
  else drawer.removeAttribute('aria-modal');
  document.querySelector('.site-header').inert = on;
  document.querySelector('main').inert = on;
  cartOpen.setAttribute('aria-expanded', String(on));
  mask.hidden = !on;
  document.body.style.overflow = on ? 'hidden' : '';
  if (on) requestAnimationFrame(() => { if (drawer.classList.contains('open')) cartClose.focus(); });
  else if (wasOpen) cartOpen.focus();
}

filters.innerHTML = categories.map(([id, label]) => `<button type="button" class="filter-btn ${id === active ? 'active' : ''}" data-filter="${id}" aria-pressed="${id === active}">${label}</button>`).join('');
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  active = button.dataset.filter;
  updateFilters();
  render();
});
search.addEventListener('input', () => {
  if (search.value && active !== 'all') { active = 'all'; updateFilters(); }
  render();
});

grid.addEventListener('click', event => {
  const card = event.target.closest('[data-product]');
  if (!card) return;
  const product = catalog.get(card.dataset.product);
  const option = event.target.closest('[data-variant]');
  if (option) {
    state.selected[product.id] = option.dataset.variant;
    const pendingIndex = state.items.findIndex(item => item.productId === product.id && !item.variantId);
    if (pendingIndex >= 0) state.items = BakeryCart.resolveVariant(state.items, catalog, pendingIndex, option.dataset.variant);
    save();
    renderCart();
    return;
  }
  const button = event.target.closest('[data-adjust]');
  if (!button) return;
  const variant = selectedVariant(product);
  if (!variant) return;
  try {
    const delta = Number(button.dataset.adjust);
    state.items = BakeryCart.adjust(state.items, catalog, product.id, variant.id, delta);
    save();
    renderCart();
    if (delta > 0) notify('已加入购物袋');
  } catch (error) { notify(error.message); }
});

grid.addEventListener('error', event => {
  const image = event.target;
  if (image.tagName !== 'IMG' || image.dataset.fallback) return;
  image.dataset.fallback = 'true';
  image.removeAttribute('srcset');
  image.src = PRODUCT_IMAGES['comingsoon.png'][0].src;
}, true);

items.addEventListener('click', event => {
  const button = event.target.closest('button[data-cart-action]');
  if (!button) return;
  const index = Number(button.dataset.cartIndex);
  try {
    if (button.dataset.cartAction === 'remove') state.items = state.items.filter((_, i) => i !== index);
    else state.items = BakeryCart.changeLineQuantity(state.items, catalog, index, button.dataset.cartAction === 'increase' ? 1 : -1);
    save();
    renderCart();
  } catch (error) { notify(error.message); }
});
items.addEventListener('change', event => {
  const select = event.target.closest('select[data-cart-action="variant"]');
  if (!select?.value) return;
  const index = Number(select.dataset.cartIndex);
  const productId = state.items[index]?.productId;
  state.items = BakeryCart.resolveVariant(state.items, catalog, index, select.value);
  state.selected[productId] = select.value;
  save();
  renderCart();
});

cartOpen.onclick = () => openCart();
cartClose.onclick = () => openCart(false);
mask.onclick = () => openCart(false);
document.addEventListener('keydown', event => {
  if (!drawer.classList.contains('open')) return;
  if (event.key === 'Escape') openCart(false);
  if (event.key === 'Tab') {
    const focusable = [...drawer.querySelectorAll('button,select,[tabindex="0"]')].filter(element => !element.disabled && element.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
cartClear.onclick = () => { state.items = []; save(); renderCart(); };
cartCopy.onclick = async () => {
  try {
    const text = BakeryCart.orderText(state.items, catalog);
    try { await navigator.clipboard.writeText(text); notify('清单已复制'); }
    catch { prompt('复制订购清单', text); }
  } catch (error) { notify(error.message); }
};

window.addEventListener('storage', event => {
  if (event.key === storageKey) { state = loadState(); renderCart(); }
});

render();
renderCart();
