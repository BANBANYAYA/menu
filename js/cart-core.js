const BakeryCart = (() => {
  function createCatalog(products) {
    const catalog = new Map();
    for (const product of products) {
      if (!product.id || catalog.has(product.id) || !product.variants?.length) throw new Error('商品规格资料不完整');
      const ids = new Set();
      for (const variant of product.variants) {
        if (ids.has(variant.id) || !Number.isSafeInteger(variant.priceCents) || variant.priceCents < 0) throw new Error('商品价格或规格无效');
        ids.add(variant.id);
      }
      catalog.set(product.id, product);
    }
    return catalog;
  }

  const findVariant = (catalog, productId, variantId) => catalog.get(productId)?.variants.find(variant => variant.id === variantId);
  const key = item => JSON.stringify([item.productId, item.variantId || null]);
  const validQuantity = quantity => Number.isSafeInteger(quantity) && quantity > 0;
  const money = cents => '$' + (cents / 100).toFixed(2);
  const shortMoney = cents => money(cents).replace(/\.00$/, '');

  function normalizeItems(raw, catalog) {
    if (!Array.isArray(raw)) return [];
    const merged = new Map();
    for (const candidate of raw) {
      if (!candidate || typeof candidate.productId !== 'string' || !validQuantity(candidate.quantity)) continue;
      const product = catalog.get(candidate.productId);
      const variant = findVariant(catalog, candidate.productId, candidate.variantId);
      const item = { productId: candidate.productId, variantId: variant?.id || null, quantity: candidate.quantity };
      if (!product) item.legacyName = typeof candidate.legacyName === 'string' ? candidate.legacyName : candidate.productId;
      const itemKey = key(item);
      const previous = merged.get(itemKey);
      const quantity = (previous?.quantity || 0) + item.quantity;
      if (!validQuantity(quantity) || (variant && !Number.isSafeInteger(variant.priceCents * quantity))) continue;
      if (previous) previous.quantity = quantity;
      else merged.set(itemKey, item);
    }
    return [...merged.values()];
  }

  function migrateLegacy(legacy, catalog) {
    if (!legacy || typeof legacy !== 'object' || Array.isArray(legacy)) return [];
    const byName = new Map([...catalog.values()].map(product => [product.name, product]));
    return normalizeItems(Object.entries(legacy).map(([name, quantity]) => {
      const product = byName.get(name);
      return { productId: product?.id || name, variantId: product?.variants.length === 1 ? product.variants[0].id : null, quantity, ...(!product ? { legacyName: name } : {}) };
    }), catalog);
  }

  function describe(item, catalog) {
    const product = catalog.get(item.productId);
    const variant = findVariant(catalog, item.productId, item.variantId);
    return { ...item, product, variant, name: product?.name || item.legacyName || item.productId, subtotalCents: variant ? variant.priceCents * item.quantity : null };
  }

  function summarize(items, catalog) {
    const lines = items.map(item => describe(item, catalog));
    const quantity = lines.reduce((sum, line) => sum + line.quantity, 0);
    const pending = lines.filter(line => !line.variant).length;
    const confirmedCents = lines.reduce((sum, line) => sum + (line.subtotalCents || 0), 0);
    if (!Number.isSafeInteger(confirmedCents) || !Number.isSafeInteger(quantity)) throw new Error('订单数量过大');
    return { lines, quantity, pending, confirmedCents, totalCents: pending ? null : confirmedCents, canCopy: lines.length > 0 && pending === 0 };
  }

  function adjust(items, catalog, productId, variantId, delta) {
    const variant = findVariant(catalog, productId, variantId);
    if (!variant || !Number.isSafeInteger(delta)) throw new Error('请先选择规格');
    const current = items.find(item => item.productId === productId && item.variantId === variantId);
    const quantity = (current?.quantity || 0) + delta;
    if (quantity > 0 && (!validQuantity(quantity) || !Number.isSafeInteger(quantity * variant.priceCents))) throw new Error('订单数量过大');
    const remaining = items.filter(item => item !== current);
    if (!current) return quantity > 0 ? normalizeItems([...remaining, { productId, variantId, quantity }], catalog) : remaining;
    return normalizeItems(items.flatMap(item => item !== current ? [item] : quantity > 0 ? [{ ...item, quantity }] : []), catalog);
  }

  function resolveVariant(items, catalog, index, variantId) {
    const item = items[index];
    if (!item || !findVariant(catalog, item.productId, variantId)) throw new Error('请选择有效规格');
    return normalizeItems(items.map((line, i) => i === index ? { ...line, variantId } : line), catalog);
  }

  function changeLineQuantity(items, catalog, index, delta) {
    const item = items[index];
    if (!item || !Number.isSafeInteger(delta)) return items;
    const quantity = item.quantity + delta;
    return normalizeItems(items.flatMap((line, i) => i !== index ? [line] : quantity > 0 ? [{ ...line, quantity }] : []), catalog);
  }

  function orderText(items, catalog) {
    const summary = summarize(items, catalog);
    if (!summary.canCopy) throw new Error(summary.pending ? '请先补选购物袋中的规格' : '购物袋还是空的');
    return ['Duck Bakery 订购清单', '', ...summary.lines.flatMap(line => [
      `${line.name} · ${line.variant.label}`,
      `单价 ${money(line.variant.priceCents)} × ${line.quantity} 份 = ${money(line.subtotalCents)}`, '',
    ]), `共 ${summary.quantity} 份`, `商品合计：${money(summary.totalCents)}`].join('\n');
  }

  return { createCatalog, findVariant, normalizeItems, migrateLegacy, describe, summarize, adjust, resolveVariant, changeLineQuantity, orderText, money, shortMoney, key };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = BakeryCart;
