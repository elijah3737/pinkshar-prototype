/* ============================================================
   PINKSHAR — shell.js
   Общая логика: topbar + role-switcher, форматтеры, табы,
   модалка/drawer, инициализация. Без внешних зависимостей.
   Графики страницы подключают ECharts через CDN сами.
   ============================================================ */
(function () {
  'use strict';

  var ROLES = [
    { href: 'index.html',    label: 'Витрина' },
    { href: 'client.html',   label: 'Клиент' },
    { href: 'partner.html',  label: 'Подрядчик' },
    { href: 'platform.html', label: 'Платформа' }
  ];

  /* ---------- ФОРМАТТЕРЫ ---------- */
  // 18900 -> "18 900 ₽"
  function money(n) {
    if (n == null || isNaN(n)) return '—';
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }
  // 1842500 -> "1,84 млн ₽" (компактно для KPI)
  function moneyShort(n) {
    if (n == null) return '—';
    if (n >= 1e6) return (n / 1e6).toFixed(2).replace('.', ',') + ' млн ₽';
    if (n >= 1e3) return Math.round(n / 1e3) + ' тыс ₽';
    return money(n);
  }
  // число с разрядами без валюты
  function num(n) {
    if (n == null || isNaN(n)) return '—';
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  // '2026-06-24' -> "24 июня"
  var MONTHS = ['янв','фев','мар','апр','мая','июня','июля','авг','сен','окт','ноя','дек'];
  var MONTHS_FULL = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  function dateShort(iso) {
    if (!iso) return '—';
    var p = iso.split('-');
    return parseInt(p[2], 10) + ' ' + MONTHS_FULL[parseInt(p[1], 10) - 1];
  }
  function dateNum(iso) {
    if (!iso) return '—';
    var p = iso.split('-');
    return p[2] + '.' + p[1] + '.' + p[0].slice(2);
  }
  // инициалы для аватара: "Екатерина Жукова" -> "ЕЖ"
  function initials(name) {
    if (!name) return '?';
    var parts = name.replace(/[«»"]/g, '').trim().split(/\s+/);
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }
  // экранирование для безопасной вставки текста
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------- ХЕЛПЕРЫ ДОСТУПА К ДАННЫМ ---------- */
  var P = window.PINK || {};
  function serviceById(id) { return (P.services || []).find(function (s) { return s.id === id; }); }
  function occasionById(id) { return (P.occasions || []).find(function (o) { return o.id === id; }); }
  function contractorById(id) { return (P.contractors || []).find(function (c) { return c.id === id; }); }
  function orderById(id) { return (P.orders || []).find(function (o) { return o.id === id; }); }
  function threadByOrder(id) { return (P.chatThreads || []).find(function (t) { return t.orderId === id; }); }
  function statusBadge(status) {
    var L = (P.labels && P.labels.status) || {};
    var cls = (P.labels && P.labels.statusClass && P.labels.statusClass[status]) || 'neutral';
    return '<span class="badge badge--' + cls + '">' + esc(L[status] || status) + '</span>';
  }

  /* ---------- ХЕЛПЕРЫ ССЫЛОК (статический прототип через query) ---------- */
  function tovarHref(id)   { return 'tovar.html?id=' + encodeURIComponent(id); }
  function partnerHref(id) { return 'partner-profile.html?id=' + encodeURIComponent(id); }
  function uslugiHref(slug){ return slug ? 'uslugi.html?s=' + encodeURIComponent(slug) : 'uslugi.html'; }
  function povodHref(slug) { return slug ? 'povod.html?o=' + encodeURIComponent(slug) : 'povod.html'; }
  // P1: карточка пакета-композита и услуги-агрегатора
  function paketHref(id)   { return id ? 'paket.html?id=' + encodeURIComponent(id) : 'pakety.html'; }
  function uslugaHref(slug){ return slug ? 'usluga.html?s=' + encodeURIComponent(slug) : 'uslugi.html'; }
  // чтение query-параметра
  function qparam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  /* ---------- КОРЗИНА-СТЕЙТ (localStorage) ----------
     Структура: [{ id: productId, qty: n }]. Один источник правды — localStorage.
     P0: только стейт + бейдж в шапке. Корзина/чекаут — P1. */
  var CART_KEY = 'pinkshar_cart';
  function cartRead() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function cartWrite(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    updateCartBadge();
    try { window.dispatchEvent(new CustomEvent('pinkshar:cart', { detail: { items: items } })); } catch (e) {}
  }
  function cart() { return cartRead(); }
  function cartCount() {
    return cartRead().reduce(function (n, it) { return n + (it.qty || 1); }, 0);
  }
  function addToCart(productId, qty) {
    qty = qty || 1;
    var items = cartRead();
    var row = items.find(function (it) { return it.id === productId; });
    if (row) { row.qty = (row.qty || 1) + qty; }
    else { items.push({ id: productId, qty: qty }); }
    cartWrite(items);
    return cartCount();
  }
  function removeFromCart(productId) {
    cartWrite(cartRead().filter(function (it) { return it.id !== productId; }));
  }
  // cartItems(): позиции корзины, обогащённые товаром (product) и подрядчиком
  // (contractor). Для мультивендорной корзины P1: разбивка по подрядчику, итог.
  function cartItems() {
    var byId = (P.productById) || function () { return null; };
    return cartRead().map(function (it) {
      var prod = byId(it.id);
      var contractor = prod ? contractorById(prod.contractorId) : null;
      var qty = it.qty || 1;
      var price = prod ? (prod.price || 0) : 0;
      return {
        id: it.id, qty: qty, product: prod, contractor: contractor,
        price: price, lineTotal: price * qty
      };
    });
  }
  // cartTotal(): сумма по позициям корзины, ₽ (комиссия 15% уже в цене — не показываем)
  function cartTotal() {
    return cartItems().reduce(function (sum, it) { return sum + (it.lineTotal || 0); }, 0);
  }
  // cartClear(): полностью очистить корзину
  function cartClear() { cartWrite([]); }
  // cartSetQty(id, qty): задать количество позиции; qty<=0 удаляет позицию
  function cartSetQty(id, qty) {
    qty = parseInt(qty, 10) || 0;
    var items = cartRead();
    if (qty <= 0) {
      cartWrite(items.filter(function (it) { return it.id !== id; }));
      return cartCount();
    }
    var row = items.find(function (it) { return it.id === id; });
    if (row) { row.qty = qty; } else { items.push({ id: id, qty: qty }); }
    cartWrite(items);
    return cartCount();
  }
  // productById(): прокидываем на уровень SHELL (страницы P1 ищут товар через S)
  function productById(id) {
    return (P.productById) ? P.productById(id) : null;
  }
  // packageById() / offersByService(): прокидываем на SHELL для страниц P1
  function packageById(id) { return (P.packageById) ? P.packageById(id) : null; }
  function offersByService(slug) { return (P.offersByService) ? P.offersByService(slug) : []; }
  // обновление бейджа-счётчика в шапке
  function updateCartBadge() {
    var n = cartCount();
    document.querySelectorAll('[data-cart-badge]').forEach(function (b) {
      b.textContent = n;
      b.classList.toggle('is-empty', n === 0);
    });
  }

  /* ---------- ХЛЕБНЫЕ КРОШКИ ----------
     S.crumbs([{label, href?}, ...]) → HTML строки крошек.
     Последний элемент рендерится как текущий (без ссылки). */
  function crumbs(items) {
    if (!items || !items.length) return '';
    var last = items.length - 1;
    var inner = items.map(function (it, i) {
      var node = (it.href && i !== last)
        ? '<a href="' + esc(it.href) + '">' + esc(it.label) + '</a>'
        : '<span class="mkt-breadcrumb__cur">' + esc(it.label) + '</span>';
      var sep = i < last ? '<span class="mkt-breadcrumb__sep" aria-hidden="true">/</span>' : '';
      return node + sep;
    }).join('');
    return '<nav class="mkt-breadcrumb" aria-label="Хлебные крошки">' + inner + '</nav>';
  }

  /* ---------- TOPBAR + ROLE SWITCHER ---------- */
  function logoMarkSVG() {
    return '<svg class="logo__mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M12 3c3.6 0 6.5 2.7 6.5 6.3 0 4.2-4.3 7.6-6.2 8.9a.5.5 0 0 1-.6 0C9.8 16.9 5.5 13.5 5.5 9.3 5.5 5.7 8.4 3 12 3Z" fill="var(--pink)"/>' +
      '<path d="M11 19.2h2l.7 2.3a.6.6 0 0 1-.57.78h-2.26a.6.6 0 0 1-.57-.78L11 19.2Z" fill="var(--plum)"/>' +
      '</svg>';
  }
  function renderTopbar() {
    var host = document.querySelector('[data-topbar]');
    if (!host) return;
    var path = (location.pathname.split('/').pop() || 'index.html');
    if (path === '') path = 'index.html';
    var links = ROLES.map(function (r) {
      var active = r.href === path ? ' class="active"' : '';
      return '<a href="' + r.href + '"' + active + '>' + r.label + '</a>';
    }).join('');
    host.innerHTML =
      '<div class="topbar__inner">' +
        '<a class="logo" href="index.html" aria-label="Pinkshar — на главную">' +
          logoMarkSVG() + 'Pinkshar<span class="dot">.</span>' +
        '</a>' +
        '<nav class="role-switcher" aria-label="Роль">' + links + '</nav>' +
        '<div class="topbar__end" data-topbar-end></div>' +
      '</div>';
  }

  /* ---------- TABS (сегментированные/подчёркнутые) ----------
     Разметка: контейнер с [data-tabs], кнопки с [data-tab="key"],
     панели с [data-panel="key"]. Клик переключает active + видимость.   */
  function initTabs(root) {
    (root || document).querySelectorAll('[data-tabs]').forEach(function (group) {
      var btns = group.querySelectorAll('[data-tab]');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-tab');
          btns.forEach(function (b) { b.classList.toggle('active', b === btn); });
          var scope = group.getAttribute('data-tabs-scope');
          var panelHost = scope ? document.querySelector(scope) : document;
          panelHost.querySelectorAll('[data-panel]').forEach(function (p) {
            p.classList.toggle('hide', p.getAttribute('data-panel') !== key);
          });
          if (typeof window.onTabChange === 'function') window.onTabChange(key, group);
        });
      });
    });
  }

  /* ---------- MODAL / DRAWER ----------
     Любой элемент [data-open="#id"] открывает оверлей с этим id.
     Любой [data-close] закрывает ближайший оверлей. Esc и клик по scrim — закрытие. */
  function openOverlay(el) {
    if (!el) return;
    el.classList.add('open');
    var scrim = document.querySelector('[data-scrim]');
    if (scrim) scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeOverlays() {
    document.querySelectorAll('.modal.open,.drawer.open').forEach(function (o) {
      o.classList.remove('open');
    });
    var scrim = document.querySelector('[data-scrim]');
    if (scrim) scrim.classList.remove('open');
    document.body.style.overflow = '';
  }
  function initOverlays(root) {
    (root || document).addEventListener('click', function (e) {
      var opener = e.target.closest('[data-open]');
      if (opener) {
        var sel = opener.getAttribute('data-open');
        openOverlay(document.querySelector(sel));
        return;
      }
      if (e.target.closest('[data-close]')) { closeOverlays(); return; }
      if (e.target.hasAttribute && e.target.hasAttribute('data-scrim')) closeOverlays();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeOverlays();
    });
  }
  // гарантируем наличие scrim
  function ensureScrim() {
    if (!document.querySelector('[data-scrim]')) {
      var s = document.createElement('div');
      s.className = 'scrim';
      s.setAttribute('data-scrim', '');
      document.body.appendChild(s);
    }
  }

  /* ============================================================
     МАРКЕТИНГ-СЛОЙ (.mkt-*) — общая шапка/футер + хелперы.
     Единый источник правды для 6 публичных страниц.
     ============================================================ */

  // --- МЕГАМЕНЮ «Поводы» (7) → povod.html?o=slug
  var MEGA_OCCASIONS = [
    { slug: 'den-rozhdeniya', label: 'День рождения',      emoji: '🎂' },
    { slug: 'vypiska',        label: 'Выписка из роддома', emoji: '👶' },
    { slug: 'gender-pati',    label: 'Гендер-пати',        emoji: '🩷' },
    { slug: 'devichnik',      label: 'Девичник',           emoji: '💞' },
    { slug: 'vypusknoy',      label: 'Выпускной',          emoji: '🎓' },
    { slug: 'svadba',         label: 'Свадьба',            emoji: '💍' },
    { slug: 'yubiley',        label: 'Юбилей',             emoji: '🥂' }
  ];

  // --- МЕГАМЕНЮ «Услуги» (11, Шары первыми) → uslugi.html?s=slug
  // sub — 3–4 ходовые подпозиции (визуальные ярлыки, ведут в листинг категории)
  var MEGA_SERVICES = [
    { slug: 'balloons',  label: 'Шары и оформление', emoji: '🎈', sub: ['Цифры', 'Фотозоны', 'Арки', 'Гирлянды'] },
    { slug: 'desserts',  label: 'Десерты и торты',   emoji: '🍰', sub: ['Бенто-торты', 'Капкейки', 'Кенди-бар'] },
    { slug: 'flowers',   label: 'Цветы',             emoji: '💐', sub: ['Букеты', 'Композиции', 'Цветы в коробке'] },
    { slug: 'photo',     label: 'Фото и видео',      emoji: '📸', sub: ['Репортаж', 'Съёмка момента', 'Reels'] },
    { slug: 'kidshow',   label: 'Детское шоу',       emoji: '🫧', sub: ['Мыльные пузыри', 'Крио-шоу', 'Научное шоу'] },
    { slug: 'animators', label: 'Аниматоры и ведущие', emoji: '🎭', sub: ['Персонажи', 'Ведущий', 'Тамада'] },
    { slug: 'decor',     label: 'Декор и неон',      emoji: '✨', sub: ['Неон-надписи', 'Арки', 'Текстиль'] },
    { slug: 'catering',  label: 'Кейтеринг',         emoji: '🥂', sub: ['Фуршет', 'Канапе', 'Напитки'] },
    { slug: 'cleanup',   label: 'Уборка после',      emoji: '🧹', sub: ['Уборка площадки', 'Демонтаж декора'] },
    { slug: 'cert',      label: 'Сертификат',        emoji: '🎁', sub: ['От 1 000 ₽', 'На любой повод'] },
    { slug: 'courier',   label: 'Курьер-сюрприз',    emoji: '🚙', sub: ['Доставка-сюрприз', 'К роддому'] }
  ];

  // верхнеуровневые ссылки шапки (между мегаменю и кнопками)
  var MKT_NAV = [
    { href: 'pakety.html',      label: 'Пакеты' },
    { href: 'o-platforme.html', label: 'Как работает' }
  ];

  function currentFile() {
    var p = (location.pathname.split('/').pop() || 'index.html');
    return p === '' ? 'index.html' : p;
  }

  // SVG-логотип (тот же знак, что в кабинетах)
  function mktLogoSVG() {
    return '<svg class="mkt-logo__mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M12 3c3.6 0 6.5 2.7 6.5 6.3 0 4.2-4.3 7.6-6.2 8.9a.5.5 0 0 1-.6 0C9.8 16.9 5.5 13.5 5.5 9.3 5.5 5.7 8.4 3 12 3Z" fill="var(--pink)"/>' +
      '<path d="M11 19.2h2l.7 2.3a.6.6 0 0 1-.57.78h-2.26a.6.6 0 0 1-.57-.78L11 19.2Z" fill="var(--plum)"/>' +
      '</svg>';
  }

  /* ---------- mktHeader(): демо-бар + sticky-хедер + мобменю ----------
     Рендерит в элемент [data-mkt-header]. Подсвечивает активный пункт
     по имени файла. Бургер открывает .mkt-mobnav. */
  function mktHeader() {
    var host = document.querySelector('[data-mkt-header]');
    if (!host) return;
    var cur = currentFile();

    // --- мегапанель «Поводы»: 7 плиток
    var megaOcc = MEGA_OCCASIONS.map(function (o) {
      return '<a class="mkt-mega__item" href="' + povodHref(o.slug) + '">' +
        '<span class="mkt-mega__emoji" aria-hidden="true">' + o.emoji + '</span>' +
        '<span class="mkt-mega__label">' + esc(o.label) + '</span></a>';
    }).join('');

    // --- мегапанель «Услуги»: 11 категорий с подпунктами (Шары первыми)
    var megaSvc = MEGA_SERVICES.map(function (s) {
      var subs = (s.sub || []).map(function (t) {
        return '<a class="mkt-mega__sub" href="' + uslugiHref(s.slug) + '">' + esc(t) + '</a>';
      }).join('');
      return '<div class="mkt-mega__cat">' +
        '<a class="mkt-mega__cathead" href="' + uslugiHref(s.slug) + '">' +
          '<span class="mkt-mega__emoji" aria-hidden="true">' + s.emoji + '</span>' +
          '<span class="mkt-mega__label">' + esc(s.label) + '</span></a>' +
        (subs ? '<div class="mkt-mega__subs">' + subs + '</div>' : '') +
        '</div>';
    }).join('');

    var nav = MKT_NAV.map(function (n) {
      var a = n.href === cur ? ' class="is-active" aria-current="page"' : '';
      return '<a href="' + n.href + '"' + a + '>' + esc(n.label) + '</a>';
    }).join('');

    // --- мобменю: аккордеон-секции поводов/услуг
    var mobOcc = MEGA_OCCASIONS.map(function (o) {
      return '<a href="' + povodHref(o.slug) + '"><span class="mkt-mobnav__e">' + o.emoji + '</span>' + esc(o.label) + '</a>';
    }).join('');
    var mobSvc = MEGA_SERVICES.map(function (s) {
      return '<a href="' + uslugiHref(s.slug) + '"><span class="mkt-mobnav__e">' + s.emoji + '</span>' + esc(s.label) + '</a>';
    }).join('');
    var mobNav = MKT_NAV.map(function (n) {
      return '<a href="' + n.href + '">' + esc(n.label) + '</a>';
    }).join('');

    var cartN = cartCount();
    var cartIcon =
      '<a class="mkt-cart" href="korzina.html" aria-label="Корзина">' +
        '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
          '<path d="M3 4h2l1.6 9.4a1 1 0 0 0 1 .85h7.9a1 1 0 0 0 1-.82L19 7H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<circle cx="8.5" cy="18" r="1.3" fill="currentColor"/><circle cx="16" cy="18" r="1.3" fill="currentColor"/></svg>' +
        '<span class="mkt-cart__badge' + (cartN === 0 ? ' is-empty' : '') + '" data-cart-badge>' + cartN + '</span>' +
      '</a>';

    host.innerHTML =
      '<div class="mkt-demobar"><div class="mkt-demobar__inner">' +
        '<span class="mkt-demobar__dot" aria-hidden="true"></span>' +
        '<span class="mkt-demobar__label">Интерактивный прототип Pinkshar — посмотрите изнутри:</span>' +
        '<span class="mkt-demobar__links">' +
          '<a href="client.html">Клиент</a><span class="mkt-demobar__sep">·</span>' +
          '<a href="partner.html">Подрядчик</a><span class="mkt-demobar__sep">·</span>' +
          '<a href="platform.html">Платформа</a>' +
        '</span>' +
      '</div></div>' +
      '<header class="mkt-header" data-mkt-mega-root><div class="mkt-header__inner">' +
        '<a class="mkt-logo" href="index.html" aria-label="Pinkshar — на главную">' +
          mktLogoSVG() + 'Pinkshar<span class="dot">.</span></a>' +
        '<nav class="mkt-nav" aria-label="Разделы">' +
          // мегапункт «Поводы»
          '<div class="mkt-nav__mega" data-mega="occ">' +
            '<button type="button" class="mkt-nav__trigger" data-mega-trigger="occ" aria-expanded="false">' +
              'Поводы <span class="mkt-nav__chev" aria-hidden="true"></span></button>' +
            '<div class="mkt-mega" data-mega-panel="occ" role="menu">' +
              '<div class="mkt-mega__inner"><div class="mkt-mega__grid mkt-mega__grid--occ">' + megaOcc + '</div>' +
              '<a class="mkt-mega__all" href="povod.html">Все поводы →</a></div>' +
            '</div>' +
          '</div>' +
          // мегапункт «Услуги»
          '<div class="mkt-nav__mega" data-mega="svc">' +
            '<button type="button" class="mkt-nav__trigger" data-mega-trigger="svc" aria-expanded="false">' +
              'Услуги <span class="mkt-nav__chev" aria-hidden="true"></span></button>' +
            '<div class="mkt-mega mkt-mega--wide" data-mega-panel="svc" role="menu">' +
              '<div class="mkt-mega__inner"><div class="mkt-mega__grid mkt-mega__grid--svc">' + megaSvc + '</div>' +
              '<a class="mkt-mega__all" href="uslugi.html">Все услуги (11) →</a></div>' +
            '</div>' +
          '</div>' +
          nav +
        '</nav>' +
        '<div class="mkt-header__end">' +
          '<button class="mkt-header__search" type="button" aria-label="Поиск" data-mkt-search>' +
            '<svg width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.7"/><path d="M13 13l4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>' +
          '</button>' +
          '<span class="mkt-header__geo" aria-label="Город">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.5c2.2 0 4 1.7 4 3.9 0 2.6-2.7 4.8-3.8 5.6a.3.3 0 0 1-.4 0C5.7 10.2 3 8 3 5.4 3 3.2 4.8 1.5 7 1.5Z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5.3" r="1.3" fill="currentColor"/></svg>' +
            'Москва</span>' +
          cartIcon +
          '<a class="mkt-header__login" href="client.html">Войти</a>' +
          '<a class="btn btn--primary" href="pakety.html">Собрать праздник</a>' +
          '<button class="mkt-burger" type="button" data-mkt-burger aria-label="Меню" aria-expanded="false">' +
            '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>' +
      '</div></header>' +
      // мобильное меню (вне потока, выезжает справа)
      '<div class="mkt-mobnav" data-mkt-mobnav>' +
        '<div class="mkt-mobnav__head">' +
          '<span class="mkt-logo">' + mktLogoSVG() + 'Pinkshar<span class="dot">.</span></span>' +
          '<button class="icon-btn" type="button" data-mkt-mobclose aria-label="Закрыть">' +
            '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="mkt-mobnav__cap">Поводы</div>' + mobOcc +
        '<div class="mkt-mobnav__cap">Услуги</div>' + mobSvc +
        '<div class="mkt-mobnav__cap">Платформа</div>' + mobNav +
        '<div class="mkt-mobnav__cta">' +
          '<a class="btn btn--ghost btn--block" href="korzina.html">Корзина</a>' +
          '<a class="btn btn--ghost btn--block" href="client.html">Войти</a>' +
          '<a class="btn btn--primary btn--block" href="pakety.html">Собрать праздник</a>' +
        '</div>' +
      '</div>';

    // --- интерактив мегаменю (hover на десктопе + click/тач) ---
    var megaRoot = host.querySelector('[data-mkt-mega-root]');
    function closeMega() {
      host.querySelectorAll('.mkt-nav__mega').forEach(function (m) { m.classList.remove('open'); });
      host.querySelectorAll('[data-mega-trigger]').forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
    }
    function openMega(key) {
      host.querySelectorAll('.mkt-nav__mega').forEach(function (m) {
        var on = m.getAttribute('data-mega') === key;
        m.classList.toggle('open', on);
        var t = m.querySelector('[data-mega-trigger]');
        if (t) t.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }
    host.querySelectorAll('.mkt-nav__mega').forEach(function (m) {
      var key = m.getAttribute('data-mega');
      m.addEventListener('mouseenter', function () { openMega(key); });
      m.addEventListener('mouseleave', function () { closeMega(); });
      var trig = m.querySelector('[data-mega-trigger]');
      if (trig) trig.addEventListener('click', function (e) {
        e.preventDefault();
        if (m.classList.contains('open')) closeMega(); else openMega(key);
      });
    });
    // закрытие по клику вне и по Esc
    document.addEventListener('click', function (e) {
      if (megaRoot && !megaRoot.contains(e.target)) closeMega();
    });

    // --- интерактив бургера ---
    var mob = host.querySelector('[data-mkt-mobnav]');
    function openMob() { if (mob) { mob.classList.add('open'); var s = document.querySelector('[data-scrim]'); if (s) s.classList.add('open'); document.body.style.overflow = 'hidden'; } }
    function closeMob() { if (mob) { mob.classList.remove('open'); var s = document.querySelector('[data-scrim]'); if (s) s.classList.remove('open'); document.body.style.overflow = ''; } }
    host.addEventListener('click', function (e) {
      if (e.target.closest('[data-mkt-burger]')) { openMob(); }
      else if (e.target.closest('[data-mkt-mobclose]') || e.target.closest('.mkt-mobnav a')) { closeMob(); }
      // поиск-иконка: в P0 ведёт на индекс услуг (полноценный поиск — P1)
      else if (e.target.closest('[data-mkt-search]')) { location.href = 'uslugi.html'; }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMob(); closeMega(); } });
    var scrim = document.querySelector('[data-scrim]');
    if (scrim) scrim.addEventListener('click', closeMob);

    updateCartBadge();
  }

  /* ---------- mktFooter(): мега-футер ----------
     Рендерит в [data-mkt-footer]. Колонки строятся из window.PINK. */
  function mktFooter() {
    var host = document.querySelector('[data-mkt-footer]');
    if (!host) return;
    var occ = (P.occasions || []).slice(0, 6).map(function (o) {
      return '<li><a href="povod.html">' + esc(o.name) + '</a></li>';
    }).join('');
    var svc = (P.serviceCatalog || P.services || []).slice(0, 6).map(function (s) {
      return '<li><a href="uslugi.html">' + esc(s.name) + '</a></li>';
    }).join('');

    host.innerHTML =
      '<div class="mkt-footer__inner">' +
        '<div class="mkt-footer__top">' +
          '<div class="mkt-footer__brand">' +
            '<span class="mkt-logo">' + mktLogoSVG() + 'Pinkshar<span class="dot">.</span></span>' +
            '<p>Повод-центричный маркетплейс праздника. Шары, десерты, цветы, съёмка и шоу — в одной заявке и одном чеке. Москва.</p>' +
            '<ul class="mkt-footer__guarantees">' +
              '<li>Оплата в эскроу до выполнения</li>' +
              '<li>Возврат, если подрядчик подвёл</li>' +
              '<li>Модерация всех исполнителей</li>' +
            '</ul>' +
          '</div>' +
          '<div class="mkt-footer__col"><h4>Поводы</h4><ul>' + occ + '</ul></div>' +
          '<div class="mkt-footer__col"><h4>Услуги</h4><ul>' + svc + '</ul></div>' +
          '<div class="mkt-footer__col"><h4>Платформа</h4><ul>' +
            '<li><a href="o-platforme.html">О платформе</a></li>' +
            '<li><a href="pakety.html">Пакеты</a></li>' +
            '<li><a href="platform.html">Аналитика площадки</a></li>' +
            '<li><a href="client.html">Кабинет клиента</a></li>' +
          '</ul></div>' +
          '<div class="mkt-footer__col"><h4>Подрядчикам</h4><ul>' +
            '<li><a href="partneram.html">Стать подрядчиком</a></li>' +
            '<li><a href="partner.html">Кабинет подрядчика</a></li>' +
            '<li><a href="partneram.html">Комиссия 15%</a></li>' +
            '<li><a href="o-platforme.html">Москва · доставка от 700 ₽</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="mkt-footer__legal">' +
          '<span>© 2026 Pinkshar · маркетплейс праздника · Москва</span>' +
          '<span>Мин. заказ 3 500 ₽ · комиссия с подрядчика 15%</span>' +
        '</div>' +
      '</div>';
  }

  /* ---------- mktPhoto(): <img> с onerror-фолбэком на брендовую плитку ----------
     g = {src,label,emoji}. zoom=true добавляет hover-зум. extraClass — доп. классы.
     При onerror плитка получает класс --fallback (показывает label + emoji). */
  function mktPhoto(g, zoom, extraClass) {
    g = g || {};
    var cls = 'mkt-photo' + (zoom ? ' mkt-photo--zoom' : '') + (extraClass ? ' ' + extraClass : '');
    var emoji = g.emoji || '🎈';
    var label = esc(g.label || '');
    var fallback = "this.closest('.mkt-photo').classList.add('mkt-photo--fallback')";
    return '<figure class="' + cls + '" data-emoji="' + esc(emoji) + '">' +
      '<img src="' + esc(g.src || '') + '" alt="' + label + '" loading="lazy" ' +
        'onerror="' + fallback + '">' +
      (label ? '<figcaption class="mkt-photo__cap">' + label + '</figcaption>' : '') +
      '</figure>';
  }

  /* ---------- scroll-reveal: элементы [.mkt-reveal] появляются при скролле ----------
     Анимируем только transform/opacity. Уважает prefers-reduced-motion. */
  function initReveal(root) {
    var els = (root || document).querySelectorAll('.mkt-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    // above-the-fold не должен мигать: всё, что уже в первом экране, показываем сразу
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    els.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < vh * 0.92) el.classList.add('is-in');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { if (!el.classList.contains('is-in')) io.observe(el); });
    // страховка: что бы ни случилось с наблюдателем — через 900мс весь контент видим
    setTimeout(function () { els.forEach(function (el) { el.classList.add('is-in'); }); }, 900);
  }

  /* ---------- FAQ accordion: клик по [.mkt-faq__q] раскрывает .mkt-faq__item ---------- */
  function initFaq(root) {
    (root || document).querySelectorAll('.mkt-faq__q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.mkt-faq__item');
        if (item) item.classList.toggle('open');
      });
    });
  }

  /* ---------- ИНИЦИАЛИЗАЦИЯ ---------- */
  function init() {
    renderTopbar();
    mktHeader();
    mktFooter();
    ensureScrim();
    initTabs(document);
    initOverlays(document);
    // страница может объявить window.renderPage() — вызовем после shell-инициализации
    if (typeof window.renderPage === 'function') {
      try { window.renderPage(); } catch (err) { console.error('renderPage error:', err); }
    }
    // повторно инициализируем табы/overlay-кнопки, отрисованные renderPage
    initTabs(document);
    // маркетинг-хелперы: scroll-reveal и FAQ-аккордеон (после renderPage)
    initReveal(document);
    initFaq(document);
    // корзина: синхронизируем бейдж (renderPage мог отрисовать свои бейджи)
    updateCartBadge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  /* ---------- ПУБЛИЧНЫЙ API ---------- */
  window.SHELL = {
    money: money, moneyShort: moneyShort, num: num,
    dateShort: dateShort, dateNum: dateNum,
    initials: initials, esc: esc,
    serviceById: serviceById, occasionById: occasionById,
    contractorById: contractorById, orderById: orderById,
    threadByOrder: threadByOrder, statusBadge: statusBadge,
    openOverlay: openOverlay, closeOverlays: closeOverlays,
    initTabs: initTabs, renderTopbar: renderTopbar,
    months: MONTHS,
    // --- маркетинг-слой (.mkt-*)
    mktHeader: mktHeader, mktFooter: mktFooter, mktPhoto: mktPhoto,
    initReveal: initReveal, initFaq: initFaq,
    // --- P0: хлебные крошки
    crumbs: crumbs,
    // --- P0: хелперы ссылок
    tovarHref: tovarHref, partnerHref: partnerHref,
    uslugiHref: uslugiHref, povodHref: povodHref, qparam: qparam,
    // --- P1: хелперы ссылок пакета/услуги-агрегатора
    paketHref: paketHref, uslugaHref: uslugaHref,
    // --- P0: корзина-стейт
    cart: cart, addToCart: addToCart, removeFromCart: removeFromCart,
    cartCount: cartCount, cartItems: cartItems, updateCartBadge: updateCartBadge,
    // --- P1: корзина-операции + доступ к данным
    cartTotal: cartTotal, cartClear: cartClear, cartSetQty: cartSetQty,
    productById: productById, packageById: packageById, offersByService: offersByService
  };
})();
