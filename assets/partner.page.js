/* ============================================================
   PINKSHAR — partner.page.js
   Кабинет ПОДРЯДЧИКА. Залогинен: Студия «Гелий» (c1),
   шары — ядро Pinkshar, исполнитель почти в каждом заказе.
   Рендерит весь экран в #view через window.renderPage().
   Использует только window.PINK + window.SHELL.
   ============================================================ */
(function () {
  'use strict';

  var S = window.SHELL, P = window.PINK;
  var ME = 'c1';                          // текущий подрядчик
  var me = S.contractorById(ME);
  var TODAY = '2026-06-22';               // currentDate прототипа

  /* ---------- выборки заказов, где участвует наша студия ---------- */
  function myItem(order) {
    return (order.items || []).find(function (it) { return it.contractorId === ME; });
  }
  function myOrders() {
    return P.orders.filter(myItem);
  }
  var ALL = myOrders();
  var INCOMING = ALL.filter(function (o) { return o.status === 'new'; });
  var ACTIVE = ALL.filter(function (o) {
    return o.status === 'confirmed' || o.status === 'paid' || o.status === 'inwork';
  });
  var DONE = ALL.filter(function (o) { return o.status === 'done'; });

  /* ---------- финансы по нашей студии ---------- */
  // заработок = сумма наших позиций по выполненным; за вычетом комиссии 15%
  function myEarnGross(list) {
    return list.reduce(function (s, o) { var it = myItem(o); return s + (it ? it.amount : 0); }, 0);
  }
  var doneGross = myEarnGross(DONE);
  var COMM = me.commission;                       // 15
  var doneCommission = Math.round(doneGross * COMM / 100);
  var doneNet = doneGross - doneCommission;
  // к выводу: наши позиции в заказах со статусом эскроу (оплачено/в работе) минус комиссия
  var escrowGross = myEarnGross(ALL.filter(function (o) { return o.paymentStatus === 'escrow'; }));
  var pendingPayout = escrowGross - Math.round(escrowGross * COMM / 100);

  var e = S.esc, m = S.money;

  /* ============================================================ РЕНДЕР */
  window.renderPage = function () {
    var view = document.getElementById('view');
    view.innerHTML =
      '<div class="wrap page">' +
        hero() +
        kpis() +
        tabsBar() +
        '<div id="pp-panels">' +
          '<section data-panel="incoming">' + incomingPanel() + '</section>' +
          '<section data-panel="active" class="hide">' + activePanel() + '</section>' +
          '<section data-panel="chat" class="hide">' + chatPanel() + '</section>' +
          '<section data-panel="finance" class="hide">' + financePanel() + '</section>' +
          '<section data-panel="profile" class="hide">' + profilePanel() + '</section>' +
          '<section data-panel="calendar" class="hide">' + calendarPanel() + '</section>' +
        '</div>' +
      '</div>' +
      overlays();

    wireUp();
  };

  /* ---------- HERO ---------- */
  function hero() {
    return '' +
      '<div class="pp-hero">' +
        '<div class="pp-hero__id">' +
          '<span class="avatar avatar--lg avatar--plum">' + e(S.initials(me.name)) + '</span>' +
          '<div>' +
            '<h1>' + e(me.name) + '</h1>' +
            '<div class="pp-hero__meta">' +
              '<span class="tag-core">ядро Pinkshar · шары</span>' +
              '<span class="dotsep"></span>' +
              '<span class="rating"><span class="star">★</span> ' + me.rating.toFixed(1) +
                ' <span class="count">' + me.reviews + ' отзывов</span></span>' +
              '<span class="dotsep"></span>' +
              '<span>Аккаунт активен</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<span class="pp-demand">🎈 Спрос от платформы: <b>' + INCOMING.length +
          '</b> новых заявок ждут ответа</span>' +
      '</div>';
  }

  /* ---------- KPI ---------- */
  function kpis() {
    return '' +
      '<div class="stat-grid pp-kpis">' +
        statCard('Оборот за месяц', m(me.turnover), 'up', '+18% к маю', '38 заказов выполнено') +
        statCard('К выводу', m(pendingPayout), null, null, 'после удержания комиссии') +
        statCard('SLA — вовремя', me.sla + '%', 'up', '+2 п.п.', 'доставка в срок') +
        statCard('Рейтинг', me.rating.toFixed(1).replace('.', ',') + ' / 5', null, null, me.reviews + ' оценок') +
      '</div>';
  }
  function statCard(label, value, dir, delta, sub) {
    return '<div class="card"><div class="stat">' +
      '<span class="stat__label">' + e(label) + '</span>' +
      '<span class="stat__value">' + e(value) + '</span>' +
      (delta ? '<span class="stat__delta ' + dir + '">' + (dir === 'up' ? '▲' : '▼') + ' ' + e(delta) + '</span>'
             : '<span class="stat__sub">' + e(sub) + '</span>') +
      (delta && sub ? '<span class="stat__sub">' + e(sub) + '</span>' : '') +
      '</div></div>';
  }

  /* ---------- TABS ---------- */
  function tabsBar() {
    var items = [
      ['incoming', 'Входящие заявки', INCOMING.length],
      ['active',   'Активные заказы', ACTIVE.length],
      ['chat',     'Чат', null],
      ['finance',  'Финансы', null],
      ['profile',  'Витрина / профиль', null],
      ['calendar', 'Календарь', null]
    ];
    return '<div class="tabs pp-tabs" data-tabs data-tabs-scope="#pp-panels">' +
      items.map(function (it, i) {
        var badge = it[2] != null ? ' <span class="badge badge--ghost" style="height:18px;padding:0 7px;font-size:11px">' + it[2] + '</span>' : '';
        return '<button data-tab="' + it[0] + '"' + (i === 0 ? ' class="active"' : '') + '>' +
          e(it[1]) + badge + '</button>';
      }).join('') +
      '</div>';
  }

  /* ============================================================ ВХОДЯЩИЕ */
  function incomingPanel() {
    if (!INCOMING.length) {
      return emptyState('🎈', 'Пока нет новых заявок',
        'Когда у клиента появится повод и нужны шары — Pinkshar пришлёт заявку сюда.');
    }
    var intro = '<p class="muted measure" style="margin-bottom:var(--s-4)">' +
      'Заявки приходят от платформы — спрос уже подтверждён. Примите, отклоните ' +
      'или предложите свою смету.</p>';
    return intro + '<div class="pp-list">' + INCOMING.map(reqCard).join('') + '</div>';
  }

  function reqCard(o) {
    var occ = S.occasionById(o.occasion) || {};
    var it = myItem(o);
    return '<div class="card">' +
      '<div class="pp-req__top">' +
        '<div class="pp-req__occ">' +
          '<span class="pp-req__emoji">' + e(occ.emoji || '🎉') + '</span>' +
          '<div>' +
            '<div class="pp-req__title">' + e(occ.name || 'Праздник') + '</div>' +
            '<div class="pp-req__sub">Заявка ' + e(o.id) + ' · ' + e(o.client) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pp-req__budget">' +
          '<div class="l">Ваша часть</div>' +
          '<div class="price price--big">' + m(it.amount) + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="pp-need">' +
        '<div class="pp-need__l">Что нужно от вас</div>' +
        '<div class="pp-need__v">🎈 ' + e(it.label) + '</div>' +
      '</div>' +

      '<div class="pp-meta-grid">' +
        meta('Дата праздника', S.dateShort(o.date)) +
        meta('Адрес', o.address) +
        meta('Бюджет заказа', m(o.total)) +
        meta('Комиссия Pinkshar', COMM + '% · ' + m(Math.round(it.amount * COMM / 100))) +
      '</div>' +

      '<div class="pp-actions">' +
        '<button class="btn btn--primary btn--sm" data-accept="' + e(o.id) + '">Принять заявку</button>' +
        '<button class="btn btn--ghost btn--sm" data-open="#m-estimate" data-est="' + e(o.id) + '">Предложить смету</button>' +
        '<button class="btn btn--danger btn--sm" data-reject="' + e(o.id) + '">Отклонить</button>' +
      '</div>' +
    '</div>';
  }

  function meta(l, v) {
    return '<div><div class="pp-meta__l">' + e(l) + '</div><div class="pp-meta__v">' + e(v) + '</div></div>';
  }

  /* ============================================================ АКТИВНЫЕ */
  var STEP_LABELS = ['Подтверждён', 'Оплата', 'В работе', 'Готово'];
  function activePanel() {
    if (!ACTIVE.length) {
      return emptyState('📦', 'Активных заказов нет',
        'Принятые заявки появятся здесь — со статусом, чатом и загрузкой фото на согласование.');
    }
    // сортируем по дате праздника
    var list = ACTIVE.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    return '<div class="pp-list">' + list.map(activeCard).join('') + '</div>';
  }

  function activeCard(o) {
    var occ = S.occasionById(o.occasion) || {};
    var it = myItem(o);
    // стадия: confirmed=1 paid=2 inwork=3
    var stage = o.status === 'confirmed' ? 1 : (o.status === 'paid' ? 2 : 3);
    var steps = STEP_LABELS.map(function (lbl, i) {
      var st = i < stage ? 'done' : (i === stage ? 'current' : '');
      return '<div class="pp-step ' + st + '"></div>';
    }).join('');

    var canUpload = o.status === 'inwork';
    var payNote = o.paymentStatus === 'escrow'
      ? '<span class="badge badge--paid">Оплата в эскроу</span>'
      : '<span class="badge badge--confirmed">Ожидает оплаты</span>';

    return '<div class="card">' +
      '<div class="pp-active__head">' +
        '<div class="pp-req__occ">' +
          '<span class="pp-req__emoji">' + e(occ.emoji || '🎉') + '</span>' +
          '<div>' +
            '<div class="pp-req__title">' + e(occ.name) + ' · ' + e(o.client) + '</div>' +
            '<div class="pp-req__sub">' + e(o.id) + ' · 🎈 ' + e(it.label) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="row gap">' + S.statusBadge(o.status) + payNote + '</div>' +
      '</div>' +

      '<div class="pp-steps">' + steps + '</div>' +
      '<div class="pp-stepl">' +
        STEP_LABELS.map(function (l) { return '<span>' + e(l) + '</span>'; }).join('') +
      '</div>' +

      '<div class="pp-meta-grid">' +
        meta('Дата', S.dateShort(o.date)) +
        meta('Адрес', o.address) +
        meta('Ваша часть', m(it.amount)) +
        meta('К получению (−' + COMM + '%)', m(it.amount - Math.round(it.amount * COMM / 100))) +
      '</div>' +

      '<div class="pp-actions">' +
        (canUpload
          ? '<button class="btn btn--primary btn--sm" data-open="#m-upload" data-up="' + e(o.id) + '">Загрузить фото на согласование</button>'
          : '<button class="btn btn--soft btn--sm" disabled style="opacity:.55;cursor:default">Фото — после старта работ</button>') +
        '<button class="btn btn--ghost btn--sm" data-gochat="' + e(o.id) + '">Открыть чат</button>' +
        '<button class="btn btn--ghost btn--sm" data-open="#d-order" data-order="' + e(o.id) + '">Детали и статус</button>' +
      '</div>' +
    '</div>';
  }

  /* ============================================================ ЧАТ */
  // у нашей студии есть живой тред — PS-2614 (Екатерина Жукова)
  function chatPanel() {
    var thread = (P.chatThreads || []).find(function (t) { return t.contractorId === ME; });
    if (!thread) {
      return emptyState('💬', 'Активных переписок нет', 'Чат откроется, когда клиент задаст вопрос по заказу.');
    }
    var ord = S.orderById(thread.orderId) || {};
    var occ = S.occasionById(ord.occasion) || {};
    return '<div class="card card--flush pp-chat-card">' +
      '<div class="pp-chat-head">' +
        '<div class="row gap">' +
          '<span class="avatar">' + e(S.initials(thread.client)) + '</span>' +
          '<div>' +
            '<div style="font-weight:700">' + e(thread.client) + '</div>' +
            '<div class="pp-req__sub">' + e(thread.orderId) + ' · ' + e(occ.emoji || '') + ' ' + e(occ.name || '') + '</div>' +
          '</div>' +
        '</div>' +
        S.statusBadge(ord.status || 'inwork') +
      '</div>' +
      '<div class="pp-chat-scroll"><div class="chat">' +
        thread.messages.map(bubble).join('') +
      '</div></div>' +
      '<div class="chat-input">' +
        '<input class="input" id="pp-chat-field" placeholder="Сообщение клиенту…" autocomplete="off">' +
        '<button class="btn btn--primary" id="pp-chat-send">Отправить</button>' +
      '</div>' +
    '</div>';
  }

  function bubble(msg) {
    // мы — подрядчик: out = наши (partner), in = клиент, platform = системные
    if (msg.from === 'platform') {
      return '<div class="bubble bubble--platform">' + e(msg.text) +
        '<div class="bubble__meta">' + e(msg.time) + '</div></div>';
    }
    var out = msg.from === 'partner';
    var attach = msg.attachment
      ? '<div class="bubble__attach">📎 ' + e(msg.attachment) + '</div>' : '';
    return '<div class="bubble bubble--' + (out ? 'out' : 'in') + '">' +
      e(msg.text) + attach +
      '<div class="bubble__meta">' + (out ? 'Вы · ' : e(msg.from === 'client' ? 'Клиент · ' : '')) + e(msg.time) + '</div>' +
    '</div>';
  }

  /* ============================================================ ФИНАНСЫ */
  function financePanel() {
    var txs = (P.payments || []).filter(function (t) {
      var o = S.orderById(t.orderId);
      return o && myItem(o);
    });

    return '<div class="pp-fin-grid">' +
      // левая: метрики + выплата + история
      '<div class="stack" style="gap:var(--s-5)">' +
        '<div class="stat-grid">' +
          finStat('Заработано (выполнено)', m(doneNet), 'после комиссии') +
          finStat('Удержано Pinkshar', m(doneCommission), COMM + '% комиссии') +
          finStat('В эскроу по вашим заказам', m(escrowGross), 'придёт после выполнения') +
        '</div>' +

        '<div class="card">' +
          '<div class="pp-payout">' +
            '<div>' +
              '<div class="stat__label">Баланс к выводу</div>' +
              '<div class="stat__value" style="font-size:30px;margin-top:6px">' + m(pendingPayout) + '</div>' +
              '<div class="pp-commission-note">💳 Выплата на карту •••• 4417 в течение 1 рабочего дня после подтверждения выполнения.</div>' +
            '</div>' +
            '<button class="btn btn--primary" data-open="#m-payout">Вывести средства</button>' +
          '</div>' +
        '</div>' +

        '<div class="card card--flush">' +
          '<div class="card__head" style="padding:var(--s-4) var(--s-5) 0">' +
            '<span class="card__title">История операций</span>' +
            '<span class="muted" style="font-size:12.5px">июнь 2026</span>' +
          '</div>' +
          '<div class="table-wrap"><table class="table">' +
            '<thead><tr><th>Операция</th><th>Заказ</th><th>Дата</th>' +
              '<th class="num">Сумма</th><th>Статус</th></tr></thead>' +
            '<tbody>' + txs.map(txRow).join('') + '</tbody>' +
          '</table></div>' +
        '</div>' +
      '</div>' +

      // правая: разбивка одного чека
      '<div class="card">' +
        '<div class="card__head"><span class="card__title">Как считается выплата</span></div>' +
        '<div class="divide">' +
          payoutRow('Сумма ваших позиций', m(escrowGross), false) +
          payoutRow('Комиссия Pinkshar ' + COMM + '%', '− ' + m(Math.round(escrowGross * COMM / 100)), false) +
          payoutRow('К выводу', m(pendingPayout), true) +
        '</div>' +
        '<div class="pp-commission-note" style="margin-top:var(--s-4)">' +
          '🛡️ Деньги клиента держит эскроу Pinkshar и переводит вам только после ' +
          'подтверждённого выполнения — без риска неоплаты.' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function finStat(l, v, sub) {
    return '<div class="card"><div class="stat">' +
      '<span class="stat__label">' + e(l) + '</span>' +
      '<span class="stat__value" style="font-size:22px">' + e(v) + '</span>' +
      '<span class="stat__sub">' + e(sub) + '</span>' +
    '</div></div>';
  }
  function payoutRow(l, v, strong) {
    return '<div class="between" style="padding:2px 0">' +
      '<span style="' + (strong ? 'font-weight:700' : 'color:var(--muted)') + '">' + e(l) + '</span>' +
      '<span class="price ' + (strong ? 'price--big' : '') + '"' + (strong ? ' style="color:var(--pink-strong)"' : '') + '>' + e(v) + '</span>' +
    '</div>';
  }
  function txRow(t) {
    var L = (P.labels && P.labels.txType) || {};
    var cls = t.status === 'escrow' ? 'badge--paid' : (t.type === 'refund' ? 'badge--rejected' : 'badge--done');
    var lab = t.status === 'escrow' ? 'В эскроу' : (t.type === 'refund' ? 'Возврат' : 'Проведено');
    var sign = t.type === 'commission' || t.type === 'refund' ? '−' : '';
    return '<tr>' +
      '<td>' + e(L[t.type] || t.type) + '</td>' +
      '<td class="mono" style="font-size:12.5px;color:var(--muted)">' + e(t.orderId) + '</td>' +
      '<td>' + e(S.dateShort(t.date)) + '</td>' +
      '<td class="num">' + sign + e(S.num(t.amount)) + ' ₽</td>' +
      '<td><span class="badge ' + cls + '">' + e(lab) + '</span></td>' +
    '</tr>';
  }

  /* ============================================================ ВИТРИНА / ПРОФИЛЬ */
  function profilePanel() {
    var portfolio = [
      { emoji: '🎈', cap: 'Фотозона «пудра»' },
      { emoji: '✨', cap: 'Неон + арка' },
      { emoji: '🩷', cap: 'Гендер-сюрприз' },
      { emoji: '👶', cap: 'Выписка из роддома' },
      { emoji: '🎂', cap: 'Детский день рождения' },
      { emoji: '🥂', cap: 'Юбилей премиум' }
    ];
    var standards = [
      ['✓', 'Доставка в срок', 'SLA ' + me.sla + '% — приезжаем за 2 часа до события'],
      ['✓', 'Гелий держит 12+ часов', 'Обработка Hi-Float, шары не сдуваются к вечеру'],
      ['✓', 'Замена при браке', 'Лопнувший шар меняем на месте бесплатно'],
      ['✓', 'Безопасные материалы', 'Латекс без запаха, безопасно для детей']
    ];

    return '<div class="pp-profile-grid">' +
      // карточка-витрина (как видит клиент)
      '<div class="card">' +
        '<div class="card__head"><span class="card__title">Как вас видит клиент</span>' +
          '<span class="badge badge--gold">Проверенный партнёр</span></div>' +
        '<div class="row gap" style="margin-bottom:var(--s-4)">' +
          '<span class="avatar avatar--lg avatar--plum">' + e(S.initials(me.name)) + '</span>' +
          '<div>' +
            '<div style="font-weight:700;font-size:17px">' + e(me.name) + '</div>' +
            '<div class="rating" style="margin-top:2px"><span class="star">★</span> ' +
              me.rating.toFixed(1) + ' <span class="count">· ' + me.reviews + ' отзывов · ' + me.orders + ' заказов</span></div>' +
          '</div>' +
        '</div>' +
        '<p class="muted measure" style="font-size:14px">Оформляем праздники шарами с 2019 года. ' +
          'Фотозоны, арки, фонтаны и цифры — собираем под повод и привозим готовое.</p>' +
        '<div class="row gap" style="flex-wrap:wrap;margin-top:var(--s-2)">' +
          '<span class="tag-core">ядро Pinkshar</span>' +
          '<span class="tag-agg">от ' + S.num(S.serviceById('balloons').from) + ' ₽</span>' +
          '<span class="tag-agg">Москва · выезд</span>' +
        '</div>' +
        '<div class="divider"></div>' +
        '<div class="card__title" style="margin-bottom:var(--s-3)">Портфолио</div>' +
        '<div class="pp-portfolio">' +
          portfolio.map(function (p) {
            return '<div class="media"><div class="media__emoji">' + e(p.emoji) + '</div></div>';
          }).join('') +
        '</div>' +
        '<button class="btn btn--soft btn--sm btn--block" style="margin-top:var(--s-4)">Редактировать витрину</button>' +
      '</div>' +

      // сервис-стандарт
      '<div class="card">' +
        '<div class="card__head"><span class="card__title">Сервис-стандарт Pinkshar</span></div>' +
        '<p class="muted measure" style="font-size:14px;margin-bottom:var(--s-4)">Эти обещания платформа ' +
          'показывает клиенту в карточке — соблюдение влияет на ваш рейтинг и поток заявок.</p>' +
        '<div class="divide">' +
          standards.map(function (s) {
            return '<div class="pp-std">' +
              '<span class="pp-std__ic">' + e(s[0]) + '</span>' +
              '<div><div class="pp-std__t">' + e(s[1]) + '</div>' +
                '<div class="pp-std__d">' + e(s[2]) + '</div></div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="divider"></div>' +
        '<div class="between">' +
          '<div><div class="pp-meta__l">Ваша комиссия</div>' +
            '<div class="pp-meta__v">' + COMM + '% с заказа</div></div>' +
          '<div><div class="pp-meta__l">Статус модерации</div>' +
            '<div class="pp-meta__v" style="color:var(--good)">Активен</div></div>' +
          '<div><div class="pp-meta__l">SLA</div>' +
            '<div class="pp-meta__v">' + me.sla + '%</div></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ============================================================ КАЛЕНДАРЬ */
  function calendarPanel() {
    // занятые даты = даты заказов нашей студии (кроме отклонённых)
    var busy = {};
    ALL.forEach(function (o) {
      if (o.status === 'rejected') return;
      var d = o.date;                       // YYYY-MM-DD
      (busy[d] = busy[d] || []).push(o);
    });

    return '<div class="pp-fin-grid">' +
      '<div class="card">' +
        '<div class="card__head">' +
          '<span class="card__title">Июнь 2026</span>' +
          '<span class="muted" style="font-size:12.5px">Занято — есть заказ, синяя рамка — сегодня</span>' +
        '</div>' +
        calMonth(2026, 6, busy) +
        '<div class="pp-cal-legend">' +
          '<span><i class="pp-leg-dot" style="background:var(--pink-soft)"></i> Есть заказ</span>' +
          '<span><i class="pp-leg-dot" style="background:var(--card);box-shadow:inset 0 0 0 2px var(--pink)"></i> Сегодня</span>' +
          '<span><i class="pp-leg-dot" style="background:var(--card);border:1px solid var(--line)"></i> Свободно</span>' +
        '</div>' +
      '</div>' +

      '<div class="card">' +
        '<div class="card__head"><span class="card__title">Ближайшие выезды</span></div>' +
        '<div class="divide">' +
          ALL.filter(function (o) { return o.status !== 'rejected' && o.status !== 'done'; })
             .sort(function (a, b) { return a.date < b.date ? -1 : 1; })
             .map(function (o) {
               var occ = S.occasionById(o.occasion) || {};
               return '<div class="between" style="padding:2px 0">' +
                 '<div class="row gap">' +
                   '<span class="pp-req__emoji" style="font-size:20px">' + e(occ.emoji || '🎉') + '</span>' +
                   '<div><div style="font-weight:600">' + e(S.dateShort(o.date)) + ' · ' + e(occ.name) + '</div>' +
                     '<div class="pp-req__sub">' + e(o.id) + ' · ' + e(o.client) + '</div></div>' +
                 '</div>' +
                 S.statusBadge(o.status) +
               '</div>';
             }).join('') +
        '</div>' +
        '<button class="btn btn--ghost btn--sm btn--block" style="margin-top:var(--s-4)">Закрыть дату для заявок</button>' +
      '</div>' +
    '</div>';
  }

  function calMonth(year, month, busy) {
    var DOW = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    var first = new Date(year, month - 1, 1);
    var startDow = (first.getDay() + 6) % 7;        // Пн=0
    var days = new Date(year, month, 0).getDate();
    var cells = DOW.map(function (d) { return '<div class="pp-cal__dow">' + d + '</div>'; });

    for (var i = 0; i < startDow; i++) cells.push('<div class="pp-day muted-day"></div>');
    for (var d = 1; d <= days; d++) {
      var iso = year + '-06-' + String(d).padStart(2, '0');
      var ords = busy[iso];
      var isToday = iso === TODAY;
      var cls = 'pp-day' + (ords ? ' busy' : '') + (isToday ? ' today' : '');
      var dot = ords ? '<span class="pp-day__dot" title="' + e(ords.length) + ' заказ"></span>' : '';
      cells.push('<div class="' + cls + '">' + d + dot + '</div>');
    }
    return '<div class="pp-cal">' + cells.join('') + '</div>';
  }

  /* ============================================================ ОВЕРЛЕИ */
  function overlays() {
    return '' +
      // смета
      '<div class="modal" id="m-estimate">' +
        '<div class="modal__head"><h3>Предложить смету</h3><button class="icon-btn" data-close>✕</button></div>' +
        '<div class="modal__body">' +
          '<p class="muted" style="font-size:13.5px">Заявка <b id="est-id" class="mono"></b>. Укажите свою цену и комментарий — клиент увидит предложение через Pinkshar.</p>' +
          '<div class="field"><label>Ваша цена за позицию, ₽</label>' +
            '<input class="input mono" id="est-price" inputmode="numeric" placeholder="например, 7 500"></div>' +
          '<div class="field"><label>Комментарий клиенту</label>' +
            '<textarea class="textarea" placeholder="Например: добавлю бесплатную цифру и фольгированное сердце."></textarea>' +
            '<span class="hint">Pinkshar удержит ' + COMM + '% комиссии от итоговой суммы.</span></div>' +
          '<div class="row gap" style="justify-content:flex-end">' +
            '<button class="btn btn--ghost" data-close>Отмена</button>' +
            '<button class="btn btn--primary" data-close>Отправить смету</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // загрузка фото
      '<div class="modal" id="m-upload">' +
        '<div class="modal__head"><h3>Фото готового на согласование</h3><button class="icon-btn" data-close>✕</button></div>' +
        '<div class="modal__body">' +
          '<p class="muted" style="font-size:13.5px">Заказ <b id="up-id" class="mono"></b>. Клиент подтвердит — и оформление можно везти. Pinkshar уведомит его автоматически.</p>' +
          '<div class="card card--tight" style="border-style:dashed;text-align:center;background:var(--pink-ghost)">' +
            '<div style="font-size:34px">📷</div>' +
            '<div style="font-weight:600;margin-top:4px">Перетащите фото сюда</div>' +
            '<div class="muted" style="font-size:12.5px">JPG/PNG до 10 МБ · до 6 фото</div>' +
          '</div>' +
          '<div class="field" style="margin-top:var(--s-4)"><label>Комментарий к работе</label>' +
            '<textarea class="textarea" placeholder="Готово по макету, цвета — пудра и белый."></textarea></div>' +
          '<div class="row gap" style="justify-content:flex-end">' +
            '<button class="btn btn--ghost" data-close>Отмена</button>' +
            '<button class="btn btn--primary" data-close>Отправить на согласование</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // вывод средств
      '<div class="modal" id="m-payout">' +
        '<div class="modal__head"><h3>Вывод средств</h3><button class="icon-btn" data-close>✕</button></div>' +
        '<div class="modal__body">' +
          '<div class="card card--tight" style="background:var(--pink-ghost);text-align:center">' +
            '<div class="stat__label">Доступно к выводу</div>' +
            '<div class="stat__value" style="margin-top:4px">' + m(pendingPayout) + '</div>' +
          '</div>' +
          '<div class="field" style="margin-top:var(--s-4)"><label>Счёт получателя</label>' +
            '<select class="select"><option>Карта •••• 4417 (Сбербанк)</option><option>Расчётный счёт ИП</option></select></div>' +
          '<p class="muted" style="font-size:12.5px">Деньги поступят в течение 1 рабочего дня. Комиссия за вывод — 0 ₽.</p>' +
          '<div class="row gap" style="justify-content:flex-end">' +
            '<button class="btn btn--ghost" data-close>Отмена</button>' +
            '<button class="btn btn--primary" data-close>Вывести ' + m(pendingPayout) + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // drawer: детали заказа со статус-таймлайном
      '<div class="drawer" id="d-order">' +
        '<div class="drawer__head"><h3 id="dro-title">Детали заказа</h3><button class="icon-btn" data-close>✕</button></div>' +
        '<div class="drawer__body" id="dro-body"></div>' +
      '</div>';
  }

  /* ============================================================ ИНТЕРАКТИВ */
  function wireUp() {
    var view = document.getElementById('view');

    // принять / отклонить заявку (мок: меняем карточку на месте)
    view.addEventListener('click', function (ev) {
      var acc = ev.target.closest('[data-accept]');
      var rej = ev.target.closest('[data-reject]');
      if (acc) { resolveReq(acc, 'accept'); return; }
      if (rej) { resolveReq(rej, 'reject'); return; }

      // «открыть чат» / «детали» с активной карточки
      var go = ev.target.closest('[data-gochat]');
      if (go) {
        var tabChat = document.querySelector('[data-tab="chat"]');
        if (tabChat) tabChat.click();
        return;
      }

      // подставить id в модалки/drawer
      var est = ev.target.closest('[data-est]');
      if (est) {
        setText('#est-id', est.getAttribute('data-est'));
        // сброс полей сметы, чтобы значения не «перетекали» между заявками
        var ep = document.getElementById('est-price'); if (ep) ep.value = '';
        var et = document.querySelector('#m-estimate .textarea'); if (et) et.value = '';
      }
      var up = ev.target.closest('[data-up]');
      if (up) { setText('#up-id', up.getAttribute('data-up')); }
      var dord = ev.target.closest('[data-order]');
      if (dord) { fillDrawer(dord.getAttribute('data-order')); }
    });

    // отправка сообщения в чат (мок)
    view.addEventListener('click', function (ev) {
      if (!ev.target.closest('#pp-chat-send')) return;
      sendChat();
    });
    view.addEventListener('keydown', function (ev) {
      if (ev.target.id === 'pp-chat-field' && ev.key === 'Enter') { ev.preventDefault(); sendChat(); }
    });
  }

  function resolveReq(btn, action) {
    var card = btn.closest('.card');
    var ok = action === 'accept';
    card.style.transition = 'opacity .2s ease';
    card.style.opacity = '0';
    setTimeout(function () {
      card.style.opacity = '';
      card.innerHTML =
        '<div class="row gap" style="align-items:flex-start">' +
          '<span class="pp-req__emoji" style="font-size:24px">' + (ok ? '✅' : '↩️') + '</span>' +
          '<div><div class="pp-req__title">' + (ok ? 'Заявка принята' : 'Заявка отклонена') + '</div>' +
            '<div class="pp-req__sub">' + (ok
              ? 'Заказ перешёл в «Активные». Pinkshar уведомил клиента и держит оплату в эскроу.'
              : 'Pinkshar предложит заявку другому подрядчику. Клиент уведомлён.') + '</div>' +
          '</div>' +
        '</div>';
    }, 200);
  }

  function sendChat() {
    var field = document.getElementById('pp-chat-field');
    var scroll = document.querySelector('.pp-chat-scroll .chat');
    if (!field || !scroll) return;
    var txt = field.value.trim();
    if (!txt) return;
    // дата прототипа (TODAY) + текущее время — без магической строки
    var dm = TODAY.split('-');
    var now = dm[2] + '.' + dm[1] + ' ' + new Date().toTimeString().slice(0, 5);
    var html = '<div class="bubble bubble--out">' + e(txt) +
      '<div class="bubble__meta">Вы · ' + now + '</div></div>';
    scroll.insertAdjacentHTML('beforeend', html);
    field.value = '';
    scroll.parentElement.scrollTop = scroll.parentElement.scrollHeight;
  }

  function fillDrawer(id) {
    var o = S.orderById(id);
    if (!o) return;
    var occ = S.occasionById(o.occasion) || {};
    var it = myItem(o);
    setText('#dro-title', o.id);
    var tl = (o.timeline || []).map(function (step, i) {
      var t = (o.times && o.times[i]) || '';
      return '<div class="timeline__item ' + (step.state === 'done' ? 'done' : step.state === 'current' ? 'current' : '') + '">' +
        '<div class="timeline__t">' + e(step.t) + '</div>' +
        (t ? '<div class="timeline__time">' + e(t) + '</div>' : '') +
      '</div>';
    }).join('');

    document.getElementById('dro-body').innerHTML =
      '<div class="row gap" style="margin-bottom:var(--s-4)">' +
        '<span class="pp-req__emoji" style="font-size:24px">' + e(occ.emoji) + '</span>' +
        '<div><div class="pp-req__title">' + e(occ.name) + ' · ' + e(o.client) + '</div>' +
          '<div class="pp-req__sub">' + e(S.dateShort(o.date)) + ' · ' + e(o.address) + '</div></div>' +
      '</div>' +
      '<div class="row gap" style="margin-bottom:var(--s-5)">' + S.statusBadge(o.status) +
        '<span class="badge badge--paid">' + e((P.labels.payment || {})[o.paymentStatus] || '') + '</span></div>' +

      '<div class="pp-need" style="margin:0 0 var(--s-5)">' +
        '<div class="pp-need__l">Ваша позиция</div>' +
        '<div class="pp-need__v">🎈 ' + e(it.label) + '</div>' +
        '<div class="between" style="margin-top:8px">' +
          '<span class="muted" style="font-size:13px">К получению (−' + COMM + '%)</span>' +
          '<span class="price price--big">' + m(it.amount - Math.round(it.amount * COMM / 100)) + '</span>' +
        '</div>' +
      '</div>' +

      '<div class="card__title" style="margin-bottom:var(--s-4)">Статус заказа</div>' +
      '<div class="timeline">' + tl + '</div>';
  }

  function setText(sel, val) { var el = document.querySelector(sel); if (el) el.textContent = val; }

  function emptyState(icon, title, text) {
    return '<div class="card"><div class="empty">' +
      '<div class="empty__icon">' + e(icon) + '</div>' +
      '<div class="empty__title">' + e(title) + '</div>' +
      '<p>' + e(text) + '</p>' +
    '</div></div>';
  }
})();
