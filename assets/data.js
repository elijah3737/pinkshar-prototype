/* ============================================================
   PINKSHAR — data.js
   Реалистичные моки. Глобально как window.PINK.
   Деньги — целые ₽. Даты — июнь–июль 2026. Без lorem.
   ============================================================ */
(function () {
  // --- УСЛУГИ (kind: 'core' = ядро Pinkshar | 'agg' = агрегат | 'own' = свой продукт)
  var services = [
    { id: 'balloons',  name: 'Шары и оформление', emoji: '🎈', kind: 'core', from: 3500,  desc: 'Гирлянды, цифры, фотозоны, гелий' },
    { id: 'desserts',  name: 'Десерты и бенто-торты', emoji: '🍰', kind: 'agg', from: 2200, desc: 'Капкейки, пряники, торты на заказ' },
    { id: 'flowers',   name: 'Цветы', emoji: '💐', kind: 'agg', from: 2800,  desc: 'Букеты, композиции, цветы в коробке' },
    { id: 'photo',     name: 'Фото и видео', emoji: '📸', kind: 'agg', from: 6000,  desc: 'Репортаж, мобильная съёмка, монтаж' },
    { id: 'kidshow',   name: 'Детское шоу', emoji: '🫧', kind: 'agg', from: 7000,  desc: 'Пузыри, крио-шоу, научное шоу' },
    { id: 'animators', name: 'Аниматоры и ведущие', emoji: '🎭', kind: 'agg', from: 5500,  desc: 'Персонажи, ведущий, тамада' },
    { id: 'decor',     name: 'Декор и неон', emoji: '✨', kind: 'agg', from: 4500,  desc: 'Неоновые надписи, арки, текстиль' },
    { id: 'catering',  name: 'Кейтеринг', emoji: '🥂', kind: 'agg', from: 8500,  desc: 'Фуршет, канапе, напитки' },
    { id: 'cleanup',   name: 'Уборка после', emoji: '🧹', kind: 'agg', from: 2500,  desc: 'Клининг площадки после праздника' },
    { id: 'cert',      name: 'Подарочный сертификат', emoji: '🎁', kind: 'own', from: 1000,  desc: 'Сертификат Pinkshar на любой повод' },
    { id: 'courier',   name: 'Курьер-сюрприз', emoji: '🚙', kind: 'own', from: 700,   desc: 'Доставка-сюрприз с поздравлением' }
  ];

  // --- ПОВОДЫ
  var occasions = [
    { id: 'birthday', name: 'День рождения',       emoji: '🎂', count: 248 },
    { id: 'discharge',name: 'Выписка из роддома',  emoji: '👶', count: 96  },
    { id: 'gender',   name: 'Гендер-пати',         emoji: '🩷', count: 64  },
    { id: 'hen',      name: 'Девичник',            emoji: '💞', count: 71  },
    { id: 'prom',     name: 'Выпускной',           emoji: '🎓', count: 58  },
    { id: 'wedding',  name: 'Свадьба',             emoji: '💍', count: 112 },
    { id: 'jubilee',  name: 'Юбилей',              emoji: '🥂', count: 89  }
  ];

  // --- ПАКЕТЫ «под повод» (шары + услуги, один чек)
  var packages = [
    {
      id: 'pkg-discharge', occasion: 'discharge', name: 'Розовая выписка', emoji: '👶',
      price: 18900, oldPrice: 22400, tag: 'хит',
      desc: 'Чтобы маму встретили красиво — без хлопот для папы.',
      includes: [
        { service: 'balloons', label: 'Гирлянда из 60 шаров + цифра' },
        { service: 'flowers',  label: 'Букет «Нежность», 25 пионов' },
        { service: 'photo',    label: 'Съёмка встречи, 1 час' }
      ],
      // P1: кликабельный состав — реальные ссылки на товары/услуги.
      photos: [ BB + '2/buket-sharov-na-vypisku_pr1015.600x600.png',
                BB + '2/nabor-sharov-na-vypisku-m_pr1241.600x600.png',
                BB + '2/tyulpany-iz-sharov_pr1126.600x600.jpeg' ],
      items: [
        { type: 'product', id: 'p-bln-garland60',  label: 'Гирлянда из 60 шаров + цифра',  price: 6900 },
        { type: 'product', id: 'p-flw-tenderness', label: 'Букет «Нежность», 25 пионов',    price: 5400 },
        { type: 'service', slug: 'photo',          label: 'Съёмка встречи, 1 час',          price: 6600 }
      ]
    },
    {
      id: 'pkg-kids', occasion: 'birthday', name: 'Детский праздник «под ключ»', emoji: '🎈',
      price: 32500, oldPrice: 38000, tag: 'популярное',
      desc: 'Шары, торт, аниматор и шоу пузырей — собрано в один заказ.',
      includes: [
        { service: 'balloons',  label: 'Фотозона + 2 фонтана шаров' },
        { service: 'desserts',  label: 'Бенто-торт + 12 капкейков' },
        { service: 'animators', label: 'Аниматор, 2 часа' },
        { service: 'kidshow',   label: 'Шоу мыльных пузырей, 40 мин' }
      ],
      photos: [ BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg',
                BB + '2/buket-iz-sharov-s-edinorog_pr1194.600x600.jpg',
                BB + '319/nabor-rozovyh-sharikov-na-_pr1165.600x600.jpeg' ],
      items: [
        { type: 'product', id: 'p-bln-photozone',     label: 'Фотозона + 2 фонтана шаров',   price: 9800 },
        { type: 'product', id: 'p-des-cupcakes',      label: 'Бенто-торт + 12 капкейков',    price: 5200 },
        { type: 'service', slug: 'animators',         label: 'Аниматор, 2 часа',             price: 11000 },
        { type: 'service', slug: 'kidshow',           label: 'Шоу мыльных пузырей, 40 мин',  price: 6500 }
      ]
    },
    {
      id: 'pkg-gender', occasion: 'gender', name: 'Гендер-сюрприз', emoji: '🩷',
      price: 24700, oldPrice: null, tag: 'новинка',
      desc: 'Большой шар-сюрприз с конфетти и оформление под цвет.',
      includes: [
        { service: 'balloons', label: 'Шар-сюрприз 90 см + 40 шаров' },
        { service: 'desserts', label: 'Капкейки «мальчик/девочка», 24 шт' },
        { service: 'photo',    label: 'Съёмка момента, 1 час' }
      ],
      photos: [ BB + '5/prozrachnyj-bolshoj-shar-s-_pr1270.600x600.jpg',
                BB + '319/bolshoj-rozovyj-nabor-shar_pr1182.600x600.jpg',
                BB + '2/buket-iz-sharov-s-edinorog_pr1194.600x600.jpg' ],
      items: [
        { type: 'product', id: 'p-bln-surprise90', label: 'Шар-сюрприз 90 см + 40 шаров',      price: 11200 },
        { type: 'product', id: 'p-des-cupcakes',   label: 'Капкейки «мальчик/девочка», 24 шт', price: 6500 },
        { type: 'service', slug: 'photo',          label: 'Съёмка момента, 1 час',             price: 7000 }
      ]
    },
    {
      id: 'pkg-jubilee', occasion: 'jubilee', name: 'Юбилей премиум', emoji: '🥂',
      price: 64000, oldPrice: 71000, tag: 'премиум',
      desc: 'Банкетное оформление, неон-надпись с именем и кейтеринг.',
      includes: [
        { service: 'balloons', label: 'Арка + потолок из шаров' },
        { service: 'decor',    label: 'Неон-надпись на заказ' },
        { service: 'catering', label: 'Фуршет на 20 персон' },
        { service: 'flowers',  label: 'Композиции на столы' }
      ],
      photos: [ BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg',
                BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg',
                BB + '2/buket-iz-sharov-roskosh_pr1028.600x600.jpg' ],
      items: [
        { type: 'product', id: 'p-bln-arch',      label: 'Арка + потолок из шаров', price: 22000 },
        { type: 'product', id: 'p-dec-neon',      label: 'Неон-надпись на заказ',   price: 14000 },
        { type: 'service', slug: 'catering',      label: 'Фуршет на 20 персон',     price: 28000 },
        { type: 'product', id: 'p-flw-tablearch', label: 'Композиции на столы',     price: 18000 }
      ]
    },
    {
      id: 'pkg-hen', occasion: 'hen', name: 'Девичник в розовом', emoji: '💞',
      price: 28900, oldPrice: null, tag: 'новинка',
      desc: 'Фотозона, цветы, торт и ведущий для идеального вечера.',
      includes: [
        { service: 'balloons', label: 'Розовая фотозона + неон' },
        { service: 'flowers',  label: 'Букеты для участниц, 6 шт' },
        { service: 'desserts', label: 'Торт-бенто «Bride»' }
      ],
      photos: [ BB + '2/buket-sharov-na-devichnik-s_pr1179.600x600.png',
                BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg',
                BB + '2/buket-iz-sharov-roskosh_pr1028.600x600.jpg' ],
      items: [
        { type: 'product', id: 'p-bln-photozone',  label: 'Розовая фотозона + неон',     price: 12400 },
        { type: 'product', id: 'p-flw-tenderness', label: 'Букеты для участниц, 6 шт',   price: 9000 },
        { type: 'product', id: 'p-des-bento',      label: 'Торт-бенто «Bride»',          price: 7500 }
      ]
    }
  ];

  // --- ПОДРЯДЧИКИ (исполнители услуг)
  var contractors = [
    { id: 'c1', name: 'Студия «Гелий»',        category: 'balloons',  owner: 'Марина Соколова', rating: 4.9, reviews: 214, turnover: 486000, commission: 15, status: 'active',  orders: 38, sla: 98 },
    { id: 'c2', name: 'Кондитерская Лизы',      category: 'desserts',  owner: 'Елизавета Ким',   rating: 5.0, reviews: 167, turnover: 312000, commission: 15, status: 'active',  orders: 41, sla: 99 },
    { id: 'c3', name: 'Цветы «Пион и Я»',       category: 'flowers',   owner: 'Анна Верещагина', rating: 4.8, reviews: 132, turnover: 268000, commission: 15, status: 'active',  orders: 29, sla: 95 },
    { id: 'c4', name: 'Фотограф Дмитрий Орлов', category: 'photo',     owner: 'Дмитрий Орлов',   rating: 4.9, reviews: 88,  turnover: 224000, commission: 12, status: 'active',  orders: 22, sla: 97 },
    { id: 'c5', name: 'Шоу «Пузыри+»',          category: 'kidshow',   owner: 'Игорь Лапшин',    rating: 4.7, reviews: 76,  turnover: 158000, commission: 15, status: 'active',  orders: 18, sla: 92 },
    { id: 'c6', name: 'Артель аниматоров «Лучик»', category: 'animators', owner: 'Ольга Дятлова', rating: 4.8, reviews: 103, turnover: 196000, commission: 15, status: 'active', orders: 27, sla: 94 },
    { id: 'c7', name: 'Неон-мастерская «Свет»', category: 'decor',     owner: 'Павел Гущин',     rating: 4.9, reviews: 54,  turnover: 142000, commission: 15, status: 'review', orders: 9,  sla: 90 },
    { id: 'c8', name: 'Кейтеринг «Вкус&Точка»', category: 'catering',  owner: 'Руслан Сафин',    rating: 4.6, reviews: 61,  turnover: 178000, commission: 18, status: 'paused', orders: 14, sla: 88 }
  ];

  // --- КЛИЕНТЫ
  var clients = [
    { id: 'u1', name: 'Екатерина Жукова',  phone: '+7 916 240-18-77', orders: 3, since: '2026-04' },
    { id: 'u2', name: 'Артём Белов',       phone: '+7 903 551-09-12', orders: 1, since: '2026-06' },
    { id: 'u3', name: 'Наталья Громова',   phone: '+7 925 778-44-30', orders: 2, since: '2026-05' },
    { id: 'u4', name: 'Сергей Поляков',    phone: '+7 909 130-62-05', orders: 1, since: '2026-06' },
    { id: 'u5', name: 'Мария Леонтьева',   phone: '+7 985 412-90-18', orders: 4, since: '2026-03' },
    { id: 'u6', name: 'Виктория Седова',   phone: '+7 921 064-77-51', orders: 1, since: '2026-06' },
    { id: 'u7', name: 'Алексей Морозов',   phone: '+7 968 802-33-19', orders: 2, since: '2026-05' }
  ];

  // helper: рассчёт комиссии и timeline по статусу
  function tl(stage) {
    // stage: 0 new,1 confirmed,2 paid,3 inwork,4 done
    var steps = [
      { key: 'new',       t: 'Заявка создана' },
      { key: 'confirmed', t: 'Подрядчик подтвердил' },
      { key: 'paid',      t: 'Оплата в эскроу' },
      { key: 'inwork',    t: 'В работе' },
      { key: 'done',      t: 'Выполнено, выплата подрядчику' }
    ];
    return steps.map(function (s, i) {
      return { t: s.t, state: i < stage ? 'done' : (i === stage ? 'current' : 'todo') };
    });
  }

  // --- ЗАКАЗЫ (12 шт; статусы: new/confirmed/paid/inwork/done/rejected)
  var orders = [
    {
      id: 'PS-2614', clientId: 'u1', client: 'Екатерина Жукова', occasion: 'discharge',
      date: '2026-06-24', address: 'Москва, Роддом №4, ул. Костромская',
      status: 'inwork', paymentStatus: 'escrow',
      items: [
        { service: 'balloons', label: 'Гирлянда + цифра «дочка»', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 6900 },
        { service: 'flowers',  label: 'Букет «Нежность», пионы', contractorId: 'c3', contractor: 'Цветы «Пион и Я»', amount: 5400 },
        { service: 'photo',    label: 'Съёмка встречи, 1 час', contractorId: 'c4', contractor: 'Фотограф Дмитрий Орлов', amount: 6600 }
      ],
      total: 18900, commission: 2835, timeline: tl(3),
      times: ['21.06 14:02', '21.06 15:40', '21.06 16:10', '24.06 09:30', '']
    },
    {
      id: 'PS-2615', clientId: 'u2', client: 'Артём Белов', occasion: 'birthday',
      date: '2026-06-23', address: 'Москва, ул. Профсоюзная, 88, кв. 142',
      status: 'paid', paymentStatus: 'escrow',
      items: [
        { service: 'balloons',  label: 'Фотозона + 2 фонтана', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 9800 },
        { service: 'desserts',  label: 'Бенто-торт + капкейки', contractorId: 'c2', contractor: 'Кондитерская Лизы', amount: 5200 },
        { service: 'animators', label: 'Аниматор «Радуга», 2 ч', contractorId: 'c6', contractor: 'Артель «Лучик»', amount: 11000 },
        { service: 'kidshow',   label: 'Шоу пузырей, 40 мин', contractorId: 'c5', contractor: 'Шоу «Пузыри+»', amount: 6500 }
      ],
      total: 32500, commission: 4875, timeline: tl(2),
      times: ['20.06 11:20', '20.06 12:05', '20.06 12:31', '', '']
    },
    {
      id: 'PS-2616', clientId: 'u3', client: 'Наталья Громова', occasion: 'gender',
      date: '2026-06-28', address: 'Москва, лофт «Палаты», Берсеневская наб.',
      status: 'confirmed', paymentStatus: 'awaiting',
      items: [
        { service: 'balloons', label: 'Шар-сюрприз 90 см + 40 шаров', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 11200 },
        { service: 'desserts', label: 'Капкейки 24 шт', contractorId: 'c2', contractor: 'Кондитерская Лизы', amount: 6500 },
        { service: 'photo',    label: 'Съёмка момента', contractorId: 'c4', contractor: 'Фотограф Дмитрий Орлов', amount: 7000 }
      ],
      total: 24700, commission: 3705, timeline: tl(1),
      times: ['22.06 09:14', '22.06 10:02', '', '', '']
    },
    {
      id: 'PS-2617', clientId: 'u4', client: 'Сергей Поляков', occasion: 'jubilee',
      date: '2026-07-05', address: 'Москва, ресторан «Веранда», Цветной б-р',
      status: 'new', paymentStatus: 'awaiting',
      items: [
        { service: 'balloons', label: 'Арка + потолок из шаров', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 22000 },
        { service: 'decor',    label: 'Неон «50 лет, Виктор»', contractorId: 'c7', contractor: 'Неон «Свет»', amount: 14000 },
        { service: 'catering', label: 'Фуршет на 20 персон', contractorId: 'c8', contractor: 'Кейтеринг «Вкус&Точка»', amount: 28000 }
      ],
      total: 64000, commission: 9600, timeline: tl(0),
      times: ['22.06 12:48', '', '', '', '']
    },
    {
      id: 'PS-2611', clientId: 'u5', client: 'Мария Леонтьева', occasion: 'hen',
      date: '2026-06-19', address: 'Москва, апартаменты «Око», Сити',
      status: 'done', paymentStatus: 'paidout',
      items: [
        { service: 'balloons', label: 'Розовая фотозона + неон', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 12400 },
        { service: 'flowers',  label: 'Букеты для участниц, 6 шт', contractorId: 'c3', contractor: 'Цветы «Пион и Я»', amount: 9000 },
        { service: 'desserts', label: 'Торт-бенто «Bride»', contractorId: 'c2', contractor: 'Кондитерская Лизы', amount: 7500 }
      ],
      total: 28900, commission: 4335, timeline: tl(4),
      times: ['15.06 18:30', '15.06 19:12', '15.06 19:40', '19.06 16:00', '19.06 22:10']
    },
    {
      id: 'PS-2612', clientId: 'u1', client: 'Екатерина Жукова', occasion: 'birthday',
      date: '2026-06-20', address: 'Москва, ул. Гарибальди, 23',
      status: 'done', paymentStatus: 'paidout',
      items: [
        { service: 'balloons', label: 'Фонтан шаров + цифра 7', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 5600 },
        { service: 'desserts', label: 'Торт «Единорог»', contractorId: 'c2', contractor: 'Кондитерская Лизы', amount: 6900 }
      ],
      total: 12500, commission: 1875, timeline: tl(4),
      times: ['16.06 10:00', '16.06 10:25', '16.06 11:00', '20.06 13:00', '20.06 19:40']
    },
    {
      id: 'PS-2618', clientId: 'u6', client: 'Виктория Седова', occasion: 'wedding',
      date: '2026-07-12', address: 'Москва, усадьба «Архангельское»',
      status: 'new', paymentStatus: 'awaiting',
      items: [
        { service: 'flowers',  label: 'Оформление арки и столов', contractorId: 'c3', contractor: 'Цветы «Пион и Я»', amount: 34000 },
        { service: 'photo',    label: 'Съёмка церемонии, 4 ч', contractorId: 'c4', contractor: 'Фотограф Дмитрий Орлов', amount: 24000 },
        { service: 'decor',    label: 'Неон «Just Married»', contractorId: 'c7', contractor: 'Неон «Свет»', amount: 9000 }
      ],
      total: 67000, commission: 10050, timeline: tl(0),
      times: ['22.06 16:05', '', '', '', '']
    },
    {
      id: 'PS-2613', clientId: 'u7', client: 'Алексей Морозов', occasion: 'birthday',
      date: '2026-06-21', address: 'Москва, ул. Новокузнецкая, 11',
      status: 'inwork', paymentStatus: 'escrow',
      items: [
        { service: 'balloons',  label: 'Гирлянда 50 шаров', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 4800 },
        { service: 'animators', label: 'Ведущий + конкурсы, 3 ч', contractorId: 'c6', contractor: 'Артель «Лучик»', amount: 13500 }
      ],
      total: 18300, commission: 2745, timeline: tl(3),
      times: ['18.06 20:14', '18.06 21:00', '18.06 21:30', '21.06 17:00', '']
    },
    {
      id: 'PS-2619', clientId: 'u3', client: 'Наталья Громова', occasion: 'prom',
      date: '2026-07-01', address: 'Москва, школа №1530, актовый зал',
      status: 'confirmed', paymentStatus: 'awaiting',
      items: [
        { service: 'balloons', label: 'Оформление сцены + арка', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 16500 },
        { service: 'photo',    label: 'Фотозона + съёмка, 3 ч', contractorId: 'c4', contractor: 'Фотограф Дмитрий Орлов', amount: 15000 }
      ],
      total: 31500, commission: 4725, timeline: tl(1),
      times: ['21.06 13:40', '21.06 14:30', '', '', '']
    },
    {
      id: 'PS-2620', clientId: 'u5', client: 'Мария Леонтьева', occasion: 'birthday',
      date: '2026-06-26', address: 'Москва, ул. Большая Никитская, 14',
      status: 'paid', paymentStatus: 'escrow',
      items: [
        { service: 'balloons', label: 'Фотозона «золото и пудра»', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 8700 },
        { service: 'flowers',  label: 'Букет «Капучино», розы', contractorId: 'c3', contractor: 'Цветы «Пион и Я»', amount: 4900 },
        { service: 'desserts', label: 'Капкейки 12 шт', contractorId: 'c2', contractor: 'Кондитерская Лизы', amount: 3200 }
      ],
      total: 16800, commission: 2520, timeline: tl(2),
      times: ['20.06 22:10', '20.06 22:45', '21.06 09:05', '', '']
    },
    {
      id: 'PS-2610', clientId: 'u2', client: 'Артём Белов', occasion: 'discharge',
      date: '2026-06-18', address: 'Москва, Перинатальный центр на Севастопольском',
      status: 'rejected', paymentStatus: 'refunded',
      items: [
        { service: 'balloons', label: 'Гирлянда «сын» + цифры', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 7200 }
      ],
      total: 7200, commission: 0, timeline: (function(){ var x=tl(1); x[1]={t:'Отклонено: дата занята',state:'rejected'}; return x; })(),
      times: ['14.06 08:50', '14.06 09:30', '', '', '']
    },
    {
      id: 'PS-2621', clientId: 'u4', client: 'Сергей Поляков', occasion: 'jubilee',
      date: '2026-07-08', address: 'Москва, банкетный зал «Сафиса»',
      status: 'paid', paymentStatus: 'escrow',
      items: [
        { service: 'balloons', label: 'Оформление зала', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 19000 },
        { service: 'catering', label: 'Канапе + напитки, 30 чел', contractorId: 'c8', contractor: 'Кейтеринг «Вкус&Точка»', amount: 36000 },
        { service: 'cleanup',  label: 'Уборка после', contractorId: 'c8', contractor: 'Кейтеринг «Вкус&Точка»', amount: 4500 }
      ],
      total: 59500, commission: 8925, timeline: tl(2),
      times: ['22.06 11:00', '22.06 12:20', '22.06 13:00', '', '']
    },
    {
      id: 'PS-2622', clientId: 'u1', client: 'Екатерина Жукова', occasion: 'gender',
      date: '2026-07-04', address: 'Москва, веранда «Сад им. Баумана»',
      status: 'confirmed', paymentStatus: 'awaiting',
      items: [
        { service: 'balloons', label: 'Шар-сюрприз 80 см + 30 шаров', contractorId: 'c1', contractor: 'Студия «Гелий»', amount: 9800 },
        { service: 'desserts', label: 'Капкейки «он или она», 18 шт', contractorId: 'c2', contractor: 'Кондитерская Лизы', amount: 5400 }
      ],
      total: 15200, commission: 2280, timeline: tl(1),
      times: ['22.06 18:20', '22.06 19:05', '', '', '']
    }
  ];

  // --- ЧАТ-ТРЕДЫ (привязаны к заказам; from: client|partner|platform)
  var chatThreads = [
    {
      orderId: 'PS-2614', clientId: 'u1', client: 'Екатерина Жукова', contractorId: 'c1', contractor: 'Студия «Гелий»',
      messages: [
        { from: 'platform', text: 'Заявка PS-2614 «Розовая выписка» назначена студии «Гелий». Спрос подтверждён Pinkshar.', time: '21.06 14:02' },
        { from: 'client',   text: 'Здравствуйте! Выписка 24 июня в 9:30, нужна гирлянда и цифра «дочка».', time: '21.06 14:08' },
        { from: 'partner',  text: 'Добрый день! Всё сделаем. Цвета — пудра и белый, подойдёт?', time: '21.06 15:31' },
        { from: 'client',   text: 'Да, идеально 🩷 Можно фото гирлянды заранее?', time: '21.06 15:38' },
        { from: 'partner',  text: 'Конечно, прикрепляю макет фотозоны.', time: '21.06 15:40', attachment: 'макет_фотозоны.jpg' },
        { from: 'platform', text: 'Оплата 18 900 ₽ принята и удерживается в эскроу до выполнения.', time: '21.06 16:10' }
      ]
    },
    {
      orderId: 'PS-2616', clientId: 'u3', client: 'Наталья Громова', contractorId: 'c2', contractor: 'Кондитерская Лизы',
      messages: [
        { from: 'platform', text: 'Заявка PS-2616 «Гендер-сюрприз» — часть заказа назначена кондитерской Лизы.', time: '22.06 09:14' },
        { from: 'client',   text: 'Нужны капкейки «мальчик/девочка», но начинку держим в секрете от гостей 🙂', time: '22.06 09:40' },
        { from: 'partner',  text: 'Поняла! Сделаю нейтральный верх, цвет крема внутри — на ваш выбор. Пришлю до 24-го.', time: '22.06 10:02' },
        { from: 'client',   text: 'Спасибо! Доставка к 12:00 28 июня в лофт «Палаты».', time: '22.06 10:20' }
      ]
    },
    {
      orderId: 'PS-2617', clientId: 'u4', client: 'Сергей Поляков', contractorId: 'c7', contractor: 'Неон-мастерская «Свет»',
      messages: [
        { from: 'platform', text: 'Новая заявка PS-2617 «Юбилей премиум». Нужна неон-надпись с именем.', time: '22.06 12:48' },
        { from: 'client',   text: 'Надпись «50 лет, Виктор», тёплый розовый. Успеете к 5 июля?', time: '22.06 13:10' },
        { from: 'partner',  text: 'Срок изготовления 7 дней — успеваем. Подтвердите заявку, начну сразу.', time: '22.06 13:25' }
      ]
    }
  ];

  // --- ПЛАТЕЖИ (in = входящие от клиента, escrow = удержано, payout = выплата, commission = комиссия)
  var payments = [
    { id: 'TX-9041', orderId: 'PS-2611', type: 'payout',     party: 'Студия «Гелий»',        amount: 10540, date: '2026-06-19', status: 'done' },
    { id: 'TX-9042', orderId: 'PS-2611', type: 'commission', party: 'Pinkshar',              amount: 4335,  date: '2026-06-19', status: 'done' },
    { id: 'TX-9038', orderId: 'PS-2612', type: 'payout',     party: 'Кондитерская Лизы',     amount: 10625, date: '2026-06-20', status: 'done' },
    { id: 'TX-9039', orderId: 'PS-2612', type: 'commission', party: 'Pinkshar',              amount: 1875,  date: '2026-06-20', status: 'done' },
    { id: 'TX-9050', orderId: 'PS-2614', type: 'in',         party: 'Екатерина Жукова',      amount: 18900, date: '2026-06-21', status: 'escrow' },
    { id: 'TX-9051', orderId: 'PS-2615', type: 'in',         party: 'Артём Белов',           amount: 32500, date: '2026-06-20', status: 'escrow' },
    { id: 'TX-9052', orderId: 'PS-2620', type: 'in',         party: 'Мария Леонтьева',       amount: 16800, date: '2026-06-21', status: 'escrow' },
    { id: 'TX-9053', orderId: 'PS-2621', type: 'in',         party: 'Сергей Поляков',        amount: 59500, date: '2026-06-22', status: 'escrow' },
    { id: 'TX-9020', orderId: 'PS-2610', type: 'refund',     party: 'Артём Белов',           amount: 7200,  date: '2026-06-18', status: 'done' },
    { id: 'TX-9060', orderId: 'PS-2613', type: 'in',         party: 'Алексей Морозов',       amount: 18300, date: '2026-06-18', status: 'escrow' }
  ];

  // --- KPI ПЛАТФОРМЫ
  var platformKPI = {
    gmv: 1842500,            // оборот за период, ₽
    revenueCommission: 276400,// выручка-комиссия, ₽
    orders: 173,             // выполнено заказов всего
    avgCheck: 27340,         // средний чек, ₽
    activePartners: 7,       // активных подрядчиков
    attachRate: 2.8,         // среднее число услуг в заказе
    escrowHeld: 145800,      // сейчас в эскроу, ₽
    rating: 5.0,
    ratingCount: 173,        // оценок за период (совпадает с orders за период)
    // «всего праздников собрано» — НАКОПИТЕЛЬНО за всё время; равно сумме byOccasion,
    // чтобы витрина («уже собрано») и распределение по поводам не расходились.
    // НЕ путать с orders:173 (выполнено за текущий период).
    partiesDone: 738,
    // динамика к прошлому периоду (для KPI-карточек обзора)
    deltas: { gmv: '+18%', revenueCommission: '+14%', orders: '+9%', avgCheck: '+6%' }
  };

  // --- TIMESERIES для графиков
  var timeseries = {
    // GMV по дням (последние 14 дней, июнь 2026)
    gmvByDay: {
      labels: ['09','10','11','12','13','14','15','16','17','18','19','20','21','22'],
      gmv:       [62000,71000,58000,83000,76000,91000,104000,88000,79000,97000,112000,134000,121000,142000],
      commission:[9300,10650,8700,12450,11400,13650,15600,13200,11850,14550,16800,20100,18150,21300]
    },
    // заказы по поводам — ЕДИНЫЙ источник истины: каталог occasions (имена + count),
    // отсортировано по убыванию. Сумма = partiesDone (738). При правке occasions график
    // и тотал обновятся сами, без рассинхрона лейблов.
    byOccasion: occasions
      .map(function (o) { return { name: o.name, value: o.count }; })
      .sort(function (a, b) { return b.value - a.value; }),
    // GMV по услугам, ₽
    byService: [
      { name: 'Шары',            value: 642000 },
      { name: 'Кейтеринг',       value: 318000 },
      { name: 'Фото/видео',      value: 274000 },
      { name: 'Цветы',           value: 231000 },
      { name: 'Аниматоры',       value: 168000 },
      { name: 'Десерты',         value: 124000 },
      { name: 'Декор/неон',      value: 85500  }
    ],
    // воронка: заявки -> подтверждено -> оплачено -> выполнено
    funnel: [
      { name: 'Заявки',       value: 412 },
      { name: 'Подтверждено', value: 318 },
      { name: 'Оплачено',     value: 241 },
      { name: 'Выполнено',    value: 173 }
    ]
  };

  // labels для статусов/типов (используются на страницах)
  var labels = {
    status: {
      new: 'Новый', confirmed: 'Подтверждён', paid: 'Оплачен',
      inwork: 'В работе', done: 'Выполнен', rejected: 'Отклонён'
    },
    statusClass: {
      new: 'new', confirmed: 'confirmed', paid: 'paid',
      inwork: 'inwork', done: 'done', rejected: 'rejected'
    },
    payment: {
      awaiting: 'Ожидает оплаты', escrow: 'В эскроу',
      paidout: 'Выплачено', refunded: 'Возврат'
    },
    txType: {
      in: 'Поступление', escrow: 'Эскроу', payout: 'Выплата',
      commission: 'Комиссия', refund: 'Возврат'
    }
  };

  /* ============================================================
     ███ МАРКЕТИНГ-КОНТЕНТ (публичная часть, .mkt-*) ███
     Аддитивно. Кабинеты эти ключи не используют.
     ============================================================ */

  // --- ГАЛЕРЕЯ / LOOKBOOK
  // Реальные фото работ с boomshar.ru (превью 600x600). Каждое <img> рендерится
  // с onerror-фолбэком на брендовую плитку с подписью повода (label) и emoji.
  // src — прямые /files/resizes/... ссылки; при битье картинки вёрстка не ломается.
  var BB = 'https://boomshar.ru/files/resizes/products/';
  var gallery = [
    { src: BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg',        label: 'Выпускной',          occasion: 'prom',      emoji: '🎓' },
    { src: BB + '378/fotozona-na-vypusknoj-v-d_pr1176.600x600.jpeg',       label: 'Выпускной · фотозона', occasion: 'prom',    emoji: '🎓' },
    { src: BB + '2/buket-sharov-na-vypisku_pr1015.600x600.png',            label: 'Выписка из роддома', occasion: 'discharge', emoji: '👶' },
    { src: BB + '2/nabor-sharov-na-vypisku-m_pr1241.600x600.png',          label: 'Выписка · набор',    occasion: 'discharge', emoji: '👶' },
    { src: BB + '2/buket-sharov-na-devichnik-s_pr1179.600x600.png',        label: 'Девичник',           occasion: 'hen',       emoji: '💞' },
    { src: BB + '2/buket-iz-sharov-buduschaya-zh_pr1180.600x600.png',      label: 'Девичник · букет',   occasion: 'hen',       emoji: '💞' },
    { src: BB + '319/bolshoj-rozovyj-nabor-shar_pr1182.600x600.jpg',       label: 'Гендер-пати',        occasion: 'gender',    emoji: '🩷' },
    { src: BB + '5/prozrachnyj-bolshoj-shar-s-_pr1270.600x600.jpg',        label: 'Гендер · шар-сюрприз', occasion: 'gender',  emoji: '🩷' },
    { src: BB + '319/nabor-rozovyh-sharikov-na-_pr1165.600x600.jpeg',      label: 'День рождения',      occasion: 'birthday',  emoji: '🎂' },
    { src: BB + '2/buket-iz-sharov-s-edinorog_pr1194.600x600.jpg',         label: 'День рождения · единорог', occasion: 'birthday', emoji: '🎂' },
    { src: BB + '6/shary-pod-potolok-nezhno-ya_pr993_2.600x600.jpg',       label: 'Шары под потолок',   occasion: 'birthday',  emoji: '🎈' },
    { src: BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg',      label: 'Нежное оформление',  occasion: 'birthday',  emoji: '🎈' },
    { src: BB + '2/tyulpany-iz-sharov_pr1126.600x600.jpeg',                label: 'Тюльпаны из шаров',  occasion: 'hen',       emoji: '💐' },
    { src: BB + '2/buket-iz-sharov-roskosh_pr1028.600x600.jpg',            label: 'Премиум-букет',      occasion: 'jubilee',   emoji: '🥂' },
    { src: BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg',        label: 'Оформление зала',    occasion: 'jubilee',   emoji: '🥂' },
    { src: BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg',      label: 'Большая фотозона',   occasion: 'birthday',  emoji: '📸' }
  ];

  // --- КАТАЛОГ УСЛУГ (расширенный: group/tag/priceFrom/desc/examples)
  // tag: 'ядро' | 'свой' | 'партнёр'. Цена — ориентир «от».
  // Переиспользует id/emoji из services[] выше, но добавляет маркетинг-поля.
  var serviceCatalog = [
    { slug: 'balloons',  group: 'Декор',     name: 'Шары и оформление',      tag: 'ядро',    priceFrom: 3500, emoji: '🎈',
      desc: 'Гирлянды, цифры, фонтаны, арки, потолок и фотозоны. Ядро Pinkshar — собственное производство.',
      examples: ['Гирлянда из 60 шаров', 'Цифры с именем', 'Фотозона под цвет повода'] },
    { slug: 'decor',     group: 'Декор',     name: 'Декор и неон',           tag: 'партнёр', priceFrom: 4500, emoji: '✨',
      desc: 'Неоновые надписи на заказ, текстиль, арки, тематический декор площадки.',
      examples: ['Неон «Just Married»', 'Драпировка и арки', 'Тематический декор'] },
    { slug: 'desserts',  group: 'Еда',       name: 'Десерты и бенто-торты',  tag: 'партнёр', priceFrom: 2200, emoji: '🍰',
      desc: 'Капкейки, пряники, бенто-торты и кенди-бары от проверенных кондитеров.',
      examples: ['Бенто-торт с надписью', 'Капкейки 12 шт', 'Кенди-бар'] },
    { slug: 'catering',  group: 'Еда',       name: 'Кейтеринг',              tag: 'партнёр', priceFrom: 8500, emoji: '🥂',
      desc: 'Фуршет, канапе, напитки и обслуживание на банкет любого масштаба.',
      examples: ['Фуршет на 20 персон', 'Канапе и напитки', 'Барная стойка'] },
    { slug: 'flowers',   group: 'Цветы',     name: 'Цветы',                  tag: 'партнёр', priceFrom: 2800, emoji: '💐',
      desc: 'Авторские букеты, композиции на столы, цветы в коробке и оформление арки.',
      examples: ['Букет «Нежность», пионы', 'Композиции на столы', 'Цветы в коробке'] },
    { slug: 'photo',     group: 'Шоу',       name: 'Фото и видео',           tag: 'партнёр', priceFrom: 6000, emoji: '📸',
      desc: 'Репортажная съёмка момента, мобильный контент для соцсетей, монтаж ролика.',
      examples: ['Съёмка встречи, 1 час', 'Репортаж церемонии', 'Reels-монтаж'] },
    { slug: 'kidshow',   group: 'Шоу',       name: 'Детское шоу',            tag: 'партнёр', priceFrom: 7000, emoji: '🫧',
      desc: 'Шоу мыльных пузырей, крио- и научное шоу — безопасно и эффектно.',
      examples: ['Шоу мыльных пузырей', 'Крио-шоу', 'Научное шоу'] },
    { slug: 'animators', group: 'Шоу',       name: 'Аниматоры и ведущие',    tag: 'партнёр', priceFrom: 5500, emoji: '🎭',
      desc: 'Персонажи для детей, ведущий и тамада для взрослого праздника.',
      examples: ['Аниматор, 2 часа', 'Ведущий + конкурсы', 'Тамада на юбилей'] },
    { slug: 'cleanup',   group: 'Логистика', name: 'Уборка после',           tag: 'партнёр', priceFrom: 2500, emoji: '🧹',
      desc: 'Клининг площадки после праздника. Вы уходите — пространство остаётся чистым.',
      examples: ['Уборка площадки', 'Вывоз декора', 'Сбор шаров'] },
    { slug: 'courier',   group: 'Логистика', name: 'Курьер-сюрприз',         tag: 'свой',    priceFrom: 700,  emoji: '🚙',
      desc: 'Доставка-сюрприз с поздравлением точно ко времени. Собственная логистика площадки.',
      examples: ['Доставка к роддому', 'Сюрприз на работу', 'Точное время вручения'] },
    { slug: 'cert',      group: 'Свои',      name: 'Подарочный сертификат',  tag: 'свой',    priceFrom: 1000, emoji: '🎁',
      desc: 'Сертификат Pinkshar на любой повод и сумму. Дарите праздник, а не вещь.',
      examples: ['Номинал от 1 000 ₽', 'Электронный или печатный', 'На любой повод'] }
  ];

  // --- ДЕТАЛИ ПОВОДОВ (для страницы повода). Флагман — den-rozhdeniya + ещё 2.
  // packages переиспользуют состав из packages[] выше, но дублируют для self-contained
  // страницы повода (карточки повод-страницы независимы от витрины).
  var occasionDetail = {
    'den-rozhdeniya': {
      occasionId: 'birthday',
      title: 'День рождения под ключ',
      lead: 'Шары, торт, аниматор и шоу — в одной заявке и одном чеке. Вы встречаете гостей, остальное берёт на себя Pinkshar.',
      included: [
        'Оформление шарами: фотозона, цифры, фонтаны',
        'Бенто-торт и капкейки от кондитера',
        'Аниматор или ведущий по возрасту',
        'Шоу пузырей или научное шоу для детей',
        'Съёмка момента и уборка после'
      ],
      serviceSlugs: ['balloons', 'desserts', 'animators', 'kidshow', 'photo', 'cleanup'],
      packages: [
        { name: 'Детский «под ключ»', price: 32500, oldPrice: 38000, tag: 'популярное', emoji: '🎈',
          items: ['Фотозона + 2 фонтана шаров', 'Бенто-торт + 12 капкейков', 'Аниматор, 2 часа', 'Шоу мыльных пузырей, 40 мин'] },
        { name: 'Семейный праздник', price: 21900, oldPrice: null, tag: 'хит', emoji: '🎂',
          items: ['Гирлянда + цифра возраста', 'Торт на заказ', 'Букет имениннице', 'Съёмка, 1 час'] },
        { name: 'Взрослый юбилейный', price: 48000, oldPrice: 54000, tag: 'премиум', emoji: '🥂',
          items: ['Арка + потолок из шаров', 'Неон-надпись с именем', 'Кейтеринг-фуршет', 'Ведущий вечера'] }
      ],
      faq: [
        { q: 'Можно собрать только шары без остального?', a: 'Да. Шары — наше ядро, всё остальное добавляется по желанию. Минимальный заказ — 3 500 ₽.' },
        { q: 'Как формируется один чек на разных подрядчиков?', a: 'Pinkshar собирает оплату в эскроу и сам распределяет выплаты исполнителям после выполнения. Вы платите один раз и за всё сразу.' },
        { q: 'За сколько дней оформлять заказ?', a: 'Базовое оформление — от 1–2 дней. Неон-надписи и сложный декор — от 7 дней. Точный срок видно при подборе.' },
        { q: 'Что если подрядчик подведёт?', a: 'Деньги придерживаются в эскроу до подтверждения выполнения. Если что-то пошло не так — возврат или замена исполнителя.' }
      ],
      examples: ['birthday', 'birthday', 'birthday']
    },
    'vypiska': {
      occasionId: 'discharge',
      title: 'Выписка из роддома',
      lead: 'Чтобы маму встретили красиво — без хлопот для папы. Гирлянда, цветы и фотограф ждут у дверей роддома точно ко времени.',
      included: [
        'Гирлянда из шаров и цифры «сын» / «дочка»',
        'Авторский букет для мамы',
        'Съёмка встречи у роддома',
        'Курьер-сюрприз с точным временем'
      ],
      serviceSlugs: ['balloons', 'flowers', 'photo', 'courier'],
      packages: [
        { name: 'Розовая выписка', price: 18900, oldPrice: 22400, tag: 'хит', emoji: '👶',
          items: ['Гирлянда из 60 шаров + цифра', 'Букет «Нежность», 25 пионов', 'Съёмка встречи, 1 час'] },
        { name: 'Нежный минимум', price: 9900, oldPrice: null, tag: 'старт', emoji: '🎈',
          items: ['Набор шаров «облачко»', 'Букет сезонный', 'Доставка к роддому'] },
        { name: 'Большая встреча', price: 27500, oldPrice: 31000, tag: 'премиум', emoji: '💞',
          items: ['Фотозона у входа', 'Букет премиум', 'Фото + видео встречи', 'Курьер с шарами для папы'] }
      ],
      faq: [
        { q: 'Успеете, если выписку назначат внезапно?', a: 'Базовый набор собираем за несколько часов. Лучше оформить заявку заранее с ориентировочной датой — скорректируем по факту.' },
        { q: 'Точно приедете ко времени выписки?', a: 'Курьер-сюрприз — наша собственная логистика с привязкой к точному времени. Координируем приезд с папой по чату.' },
        { q: 'Можно сюрприз для мамы, чтобы она не знала?', a: 'Да, оформляем на папу или родных. Связь и согласование идут только с заказчиком.' }
      ],
      examples: ['discharge', 'discharge', 'discharge']
    },
    'gender-pati': {
      occasionId: 'gender',
      title: 'Гендер-пати',
      lead: 'Главный момент — раскрытие. Большой шар-сюрприз с конфетти, капкейки с секретной начинкой и фотограф, который поймает реакцию.',
      included: [
        'Шар-сюрприз с конфетти нужного цвета',
        'Оформление шарами в нейтральной гамме',
        'Капкейки «мальчик / девочка»',
        'Съёмка момента раскрытия'
      ],
      serviceSlugs: ['balloons', 'desserts', 'photo', 'decor'],
      packages: [
        { name: 'Гендер-сюрприз', price: 24700, oldPrice: null, tag: 'новинка', emoji: '🩷',
          items: ['Шар-сюрприз 90 см + 40 шаров', 'Капкейки «он или она», 24 шт', 'Съёмка момента, 1 час'] },
        { name: 'Камерный формат', price: 14200, oldPrice: null, tag: 'старт', emoji: '🎈',
          items: ['Шар-сюрприз 80 см + 30 шаров', 'Капкейки 18 шт'] },
        { name: 'Большое раскрытие', price: 39000, oldPrice: 44000, tag: 'премиум', emoji: '✨',
          items: ['Фотозона в двух цветах', 'Шар-сюрприз + пушки конфетти', 'Торт с секретным срезом', 'Фото + видео reels'] }
      ],
      faq: [
        { q: 'Кто знает цвет до раскрытия?', a: 'Только один человек или, по желанию, никто — узнаём пол через клинику конвертом и передаём подрядчику напрямую, минуя вас.' },
        { q: 'Чем наполняется шар-сюрприз?', a: 'Конфетти нужного цвета внутри прозрачного шара. По хлопку всё высыпается — эффектный кадр гарантирован.' },
        { q: 'Можно совместить с днём рождения старшего ребёнка?', a: 'Да, собираем смешанный сценарий: добавляем аниматора или шоу пузырей одной заявкой.' }
      ],
      examples: ['gender', 'gender', 'gender']
    }
  };

  // --- ИНФО ДЛЯ ПОДРЯДЧИКОВ (страница partneram.html)
  var partnerInfo = {
    commission: 15,
    pitch: 'Pinkshar приводит клиента с готовым поводом и оплатой в эскроу. Вы делаете свою часть — мы берём заявки, оплату, чек и поддержку на себя.',
    caseStat: { value: '785', label: 'тёплых клиентов в базе уже сейчас', sub: 'рейтинг 5,0 по 173 оценкам, 738 праздников собрано' },
    steps: [
      { t: 'Заявка и модерация', d: 'Оставляете профиль, портфолио и условия. Проверяем качество и подключаем к каталогу.' },
      { t: 'Получаете заказы', d: 'Платформа сама приводит клиента с поводом и датой. Вы подтверждаете и делаете свою часть.' },
      { t: 'Оплата в эскроу', d: 'Клиент платит Pinkshar. Деньги придерживаются, вы работаете спокойно — без риска неоплаты.' },
      { t: 'Выплата после выполнения', d: 'Подтвердили выполнение — получаете выплату за вычетом 15% комиссии. Прозрачно и в срок.' }
    ],
    benefits: [
      'Готовый спрос: тёплая база и повод-центричные заявки',
      'Оплата гарантирована — деньги в эскроу до старта работ',
      'Один чек для клиента, прозрачные выплаты вам',
      'Никакой платы за вход — комиссия 15% только с выполненных заказов',
      'Модерация защищает рейтинг площадки и ваш',
      'Кросс-продажи: клиент шаров заказывает у вас торт и цветы'
    ]
  };

  // --- ВИДЕНИЕ / О ПЛАТФОРМЕ (страница o-platforme.html)
  var vision = {
    manifesto: 'Мы превращаем магазин шаров в <b>платформу праздника</b>. Один повод — одна заявка, один чек, одна забота.',
    stats: [
      { kpi: '785',     label: 'клиентов в тёплой базе' },
      { kpi: '5,0',     label: 'рейтинг по 173 оценкам' },
      { kpi: '738',     label: 'праздников уже собрано' },
      { kpi: '11',      label: 'услуг в одной корзине' }
    ],
    why: [
      { t: 'Спрос уже есть', d: 'Pinkshar вырос из магазина шаров с живой базой и рейтингом 5,0. Мы не ищем клиентов с нуля — мы расширяем то, что уже работает.' },
      { t: 'Повод, а не товар', d: 'Клиент думает не «купить шары», а «собрать день рождения». Мы продаём результат — целиком, под повод.' },
      { t: 'Эскроу как доверие', d: 'Платформа держит оплату до выполнения. Клиент защищён, подрядчик уверен в деньгах, площадка — гарант сделки.' },
      { t: 'Шары — ядро роста', d: 'Вокруг проверенного ядра нанизываются услуги: десерты, цветы, фото, шоу. Каждый заказ становится больше одного чека.' }
    ],
    roadmap: [
      { phase: 'Фаза 0 · сейчас', title: 'Каркас и пилот', items: ['Витрина пакетов под повод', 'Эскроу и один чек', 'Ядро: шары и оформление'] },
      { phase: 'Фаза 1', title: 'Ядро услуг', items: ['Цветы и десерты', 'Фото и видео', 'Профили подрядчиков'] },
      { phase: 'Фаза 2', title: 'Глубина', items: ['Шоу и кейтеринг', 'Уборка после', 'Рейтинги исполнителей'] },
      { phase: 'Фаза 3', title: 'Масштаб', items: ['Онлайн-бронь и оплата', 'Квиз-подборщик', 'Календарь напоминаний и B2B'] }
    ]
  };

  // --- ОТЗЫВЫ (из реальных выполненных заказов; orderId для имени/повода/даты)
  var testimonials = [
    { orderId: 'PS-2611', rating: 5, text: 'Девичник в розовом — гости ахнули. Фотозона, цветы и торт приехали минута в минуту, я ни о чём не думала.' },
    { orderId: 'PS-2612', rating: 5, text: 'Заказывала день рождения дочке: шары и торт «Единорог» в одном чеке. Не нужно искать каждого по отдельности — всё привезли вовремя.' },
    { orderId: 'PS-2614', rating: 5, text: 'Выписку организовали идеально. Папа просто приехал к роддому — а там уже всё готово и фотограф снимает.' },
    { orderId: 'PS-2613', rating: 5, text: 'Ведущий и шары на день рождения сына. Дети были в восторге, а я впервые не бегала весь праздник по делам.' }
  ];

  /* ============================================================
     ███ ТОВАРЫ (products) — конкретные позиции для карточек ███
     P0: drill-in из листинга услуги в единую карточку товара (tovar.html?id=).
     Поля:
       id            — productId, строка, уникальна (на неё ссылается S.tovarHref)
       categorySlug  — один из 11 slug услуг (balloons|desserts|flowers|photo|
                       kidshow|animators|decor|catering|cleanup|cert|courier)
       name          — название позиции
       price         — цена ₽ (целое); для услуг-брони это «от»
       oldPrice      — опц., перечёркнутая старая цена
       priceType     — 'fixed' (товар, «В корзину») | 'from' (бронь, «от …»)
       photos        — [2..5] ссылок из gallery (src). Рендерить через S.mktPhoto-логику.
       contractorId  — id из contractors (исполнитель-владелец позиции)
       rating        — рейтинг позиции (0..5)
       reviewsCount  — число отзывов
       occasions     — [] id поводов из occasions (birthday|discharge|gender|hen|
                       prom|wedding|jubilee) — для фасета «Повод»
       attributes    — {} ключ→значение (фасетируемые: цвет/размер/материал/срок/состав)
       shortDesc     — краткое описание (1 строка)
       included      — [3..5] пунктов «что входит»
       reviews       — [{author,rating,text,photo?}] 2..3 отзыва (photo — src из gallery)
     Связь с реальными contractors и фото из gallery.
     ============================================================ */
  var products = [
    /* ---------- BALLOONS (8) — подрядчик c1 «Студия Гелий» ---------- */
    {
      id: 'p-bln-surprise90', categorySlug: 'balloons', name: 'Шар-сюрприз 90 см с конфетти',
      price: 4900, oldPrice: 6200, priceType: 'fixed',
      photos: [ BB + '5/prozrachnyj-bolshoj-shar-s-_pr1270.600x600.jpg',
                BB + '319/bolshoj-rozovyj-nabor-shar_pr1182.600x600.jpg',
                BB + '319/nabor-rozovyh-sharikov-na-_pr1165.600x600.jpeg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 47,
      occasions: ['gender', 'birthday'],
      attributes: { 'Размер': '90 см', 'Цвет': 'прозрачный + розовое конфетти', 'Материал': 'латекс премиум', 'Срок': '1 день' },
      shortDesc: 'Большой прозрачный шар с конфетти — главный кадр гендер-пати.',
      included: ['Шар 90 см на грузике', 'Конфетти нужного цвета внутри', 'Лента и подвес', 'Инструкция по хлопку'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Хлопнули — и розовое конфетти повсюду. Реакция бесценна, фото в семейном альбоме навсегда!', photo: BB + '319/bolshoj-rozovyj-nabor-shar_pr1182.600x600.jpg' },
        { author: 'Артём Белов', rating: 5, text: 'Приехал ровно ко времени, шар держал форму весь вечер.' }
      ]
    },
    {
      id: 'p-bln-garland60', categorySlug: 'balloons', name: 'Гирлянда из 60 шаров + цифра',
      price: 6900, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '6/shary-pod-potolok-nezhno-ya_pr993_2.600x600.jpg',
                BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg',
                BB + '2/nabor-sharov-na-vypisku-m_pr1241.600x600.png' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 38,
      occasions: ['discharge', 'birthday'],
      attributes: { 'Кол-во шаров': '60', 'Цвет': 'пудра + белый', 'Цифра': 'на выбор', 'Срок': '1 день' },
      shortDesc: 'Разрядная гирлянда с цифрой возраста или «сын/дочка».',
      included: ['60 латексных шаров', 'Объёмная цифра-фольга', 'Монтаж на каркас', 'Доставка по Москве'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Встретили маму из роддома — гирлянда пудровая, цифра «дочка». Все ахнули.', photo: BB + '2/nabor-sharov-na-vypisku-m_pr1241.600x600.png' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Цвета точь-в-точь как на макете. Держались два дня.' }
      ]
    },
    {
      id: 'p-bln-arch', categorySlug: 'balloons', name: 'Арка из шаров на каркасе',
      price: 12500, oldPrice: 14000, priceType: 'fixed',
      photos: [ BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg',
                BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 29,
      occasions: ['prom', 'wedding', 'jubilee'],
      attributes: { 'Длина': '3 м', 'Цвет': 'под повод', 'Материал': 'латекс + фольга', 'Срок': '2 дня' },
      shortDesc: 'Эффектная арка для входа, сцены или фотозоны.',
      included: ['Каркас-основа', 'Шары двух фактур', 'Монтаж на площадке', 'Демонтаж по желанию'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Арка на выпускной — сцена ожила. Монтаж быстрый, ничего не лопнуло.', photo: BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg' },
        { author: 'Сергей Поляков', rating: 5, text: 'Под цвет банкета подобрали идеально.' }
      ]
    },
    {
      id: 'p-bln-photozone', categorySlug: 'balloons', name: 'Фотозона «под цвет повода»',
      price: 9800, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg',
                BB + '378/fotozona-na-vypusknoj-v-d_pr1176.600x600.jpeg',
                BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 41,
      occasions: ['birthday', 'hen', 'gender'],
      attributes: { 'Размер': '2×2 м', 'Цвет': 'на выбор', 'Стиль': 'фотозона', 'Срок': '2 дня' },
      shortDesc: 'Фотозона из шаров двух оттенков — для кадров на весь вечер.',
      included: ['Фон-каркас 2×2 м', 'Шары двух фактур', 'Декор-акцент', 'Монтаж и демонтаж'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Розовая фотозона на девичник — гости не отходили от неё весь вечер.', photo: BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg' },
        { author: 'Виктория Седова', rating: 5, text: 'Собрали за час, выглядит дорого.' }
      ]
    },
    {
      id: 'p-bln-fountain', categorySlug: 'balloons', name: 'Фонтан шаров на грузике',
      price: 3500, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '319/nabor-rozovyh-sharikov-na-_pr1165.600x600.jpeg',
                BB + '2/buket-sharov-na-vypisku_pr1015.600x600.png' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 33,
      occasions: ['birthday', 'discharge'],
      attributes: { 'Кол-во шаров': '15', 'Цвет': 'на выбор', 'Газ': 'гелий', 'Срок': '1 день' },
      shortDesc: 'Базовый фонтан из 15 гелиевых шаров — старт оформления.',
      included: ['15 гелиевых шаров', 'Грузик-основа', 'Ленты', 'Доставка по Москве'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Недорого и празднично. Сыну на день рождения — самое то.' },
        { author: 'Екатерина Жукова', rating: 4, text: 'Всё хорошо, один шар сдулся к вечеру — заменили без вопросов.' }
      ]
    },
    {
      id: 'p-bln-ceiling', categorySlug: 'balloons', name: 'Шары под потолок, 30 шт',
      price: 5600, oldPrice: 6400, priceType: 'fixed',
      photos: [ BB + '6/shary-pod-potolok-nezhno-ya_pr993_2.600x600.jpg',
                BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 26,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Кол-во шаров': '30', 'Цвет': 'нежная гамма', 'Газ': 'гелий', 'Срок': '1 день' },
      shortDesc: 'Облако шаров под потолок с лентами — наполняет зал.',
      included: ['30 гелиевых шаров', 'Атласные ленты', 'Подбор гаммы', 'Доставка и подъём'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Зал преобразился. Нежная гамма — как просили.', photo: BB + '6/shary-pod-potolok-nezhno-ya_pr993_2.600x600.jpg' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Красиво и аккуратно, ленты разной длины.' }
      ]
    },

    /* balloons +2 */
    {
      id: 'p-bln-number', categorySlug: 'balloons', name: 'Цифры из шаров с именем',
      price: 4200, oldPrice: 5000, priceType: 'fixed',
      photos: [ BB + '2/nabor-sharov-na-vypisku-m_pr1241.600x600.png',
                BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 31,
      occasions: ['birthday', 'jubilee', 'prom'],
      attributes: { 'Состав': 'цифры + имя', 'Цвет': 'на выбор', 'Материал': 'фольга', 'Срок': '1 день' },
      shortDesc: 'Фольгированные цифры возраста и имя — центр любой фотозоны.',
      included: ['Цифры-фольга', 'Имя из букв-фольги', 'Грузики и подставки', 'Доставка по Москве'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Цифра 30 и имя «Наташа» — смотрелось дорого и стильно.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Доставили вовремя, буквы держались весь праздник.' }
      ]
    },
    {
      id: 'p-bln-tulips', categorySlug: 'balloons', name: 'Букет из шаров «Тюльпаны»',
      price: 3800, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '2/tyulpany-iz-sharov_pr1126.600x600.jpeg',
                BB + '2/buket-sharov-na-vypisku_pr1015.600x600.png' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 22,
      occasions: ['birthday', 'discharge', 'hen'],
      attributes: { 'Состав': '7 тюльпанов из шаров', 'Цвет': 'розовый/белый', 'Высота': '80 см', 'Срок': '1 день' },
      shortDesc: 'Реалистичные тюльпаны из шаров на стебле — эффектный подарок.',
      included: ['7 тюльпанов из шаров', 'Зелёные листья-шары', 'Упаковка-крафт', 'Доставка'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Выглядит как настоящий букет, но держится намного дольше!', photo: BB + '2/tyulpany-iz-sharov_pr1126.600x600.jpeg' },
        { author: 'Виктория Седова', rating: 5, text: 'Оригинально и нежно. Сразу много вопросов от гостей.' }
      ]
    },

    /* ---------- DESSERTS (8) — подрядчик c2 «Кондитерская Лизы» ---------- */
    {
      id: 'p-des-bento', categorySlug: 'desserts', name: 'Бенто-торт с надписью',
      price: 2200, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-1.jpg' ],
      contractorId: 'c2', rating: 5.0, reviewsCount: 52,
      occasions: ['birthday', 'hen', 'gender'],
      attributes: { 'Вес': '500 г', 'Вкус': 'на выбор', 'Надпись': 'индивидуальная', 'Срок': '1 день' },
      shortDesc: 'Маленький торт-комплимент с персональной надписью.',
      included: ['Бенто-торт 500 г', 'Надпись по тексту', 'Подарочная коробка', 'Свеча'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Торт-бенто «Bride» на девичник — вкусно и красиво, надпись аккуратная.' },
        { author: 'Екатерина Жукова', rating: 5, text: 'Дочке очень понравился. Заказывала ко времени — привезли точно.' }
      ]
    },
    {
      id: 'p-des-cupcakes', categorySlug: 'desserts', name: 'Капкейки, набор 12 шт',
      price: 3200, oldPrice: 3800, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-2.jpg' ],
      contractorId: 'c2', rating: 4.9, reviewsCount: 44,
      occasions: ['birthday', 'gender', 'prom'],
      attributes: { 'Кол-во': '12 шт', 'Вкус': '2 на выбор', 'Декор': 'тематический', 'Срок': '1 день' },
      shortDesc: 'Капкейки с тематическим декором — например «он или она».',
      included: ['12 капкейков', 'Два вкуса на выбор', 'Тематические топперы', 'Упаковка-витрина'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Капкейки «мальчик/девочка», начинку держали в секрете — гости гадали до конца!' },
        { author: 'Артём Белов', rating: 5, text: 'Свежие, не приторные. Декор как на фото.' }
      ]
    },
    {
      id: 'p-des-candybar', categorySlug: 'desserts', name: 'Кенди-бар «Розовый» на 15 персон',
      price: 8900, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-3.jpg' ],
      contractorId: 'c2', rating: 5.0, reviewsCount: 19,
      occasions: ['hen', 'jubilee', 'wedding'],
      attributes: { 'Персон': '15', 'Состав': 'торт + капкейки + макаронс', 'Стиль': 'под цвет', 'Срок': '3 дня' },
      shortDesc: 'Сладкий стол под цвет праздника: торт, капкейки, макаронс.',
      included: ['Центральный торт', '24 капкейка', '30 макаронс', 'Оформление стола', 'Подача и таблички'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Кенди-бар собрал все охи вечера. Под цвет фотозоны — единая картинка.' },
        { author: 'Виктория Седова', rating: 5, text: 'Вкусно и очень красиво подано.' }
      ]
    },
    {
      id: 'p-des-bento-heart', categorySlug: 'desserts', name: 'Бенто-торт «Сердце»',
      price: 2800, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-4.jpg' ],
      contractorId: 'c2', rating: 4.9, reviewsCount: 28,
      occasions: ['birthday', 'hen', 'wedding'],
      attributes: { 'Форма': 'сердце', 'Вес': '600 г', 'Вкус': 'на выбор', 'Срок': '1 день' },
      shortDesc: 'Бенто-торт в форме сердца — идеально для девичника и выпускного.',
      included: ['Бенто-торт «Сердце» 600 г', 'Декор из крема', 'Подарочная коробка', 'Свеча'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Красиво оформлен, вкус нежный. Стал главным украшением стола.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Привезли вовремя, выглядел точь-в-точь как на фото.' }
      ]
    },
    {
      id: 'p-des-macarons', categorySlug: 'desserts', name: 'Макаронс, набор 24 шт',
      price: 3600, oldPrice: 4200, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-1.jpg' ],
      contractorId: 'c2', rating: 4.8, reviewsCount: 35,
      occasions: ['birthday', 'wedding', 'hen', 'jubilee'],
      attributes: { 'Кол-во': '24 шт', 'Вкусов': '4 на выбор', 'Упаковка': 'коробка-подарок', 'Срок': '1 день' },
      shortDesc: 'Французские макаронс — лёгкий десерт для гостей или подарок.',
      included: ['24 макаронс', '4 вкуса на выбор', 'Подарочная коробка', 'Лента'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Гости съели всё за полчаса. Вкус и цвета отличные!' },
        { author: 'Екатерина Жукова', rating: 4, text: 'Хрупкие, но всё доехало целым. Очень вкусно.' }
      ]
    },
    {
      id: 'p-des-cake-number', categorySlug: 'desserts', name: 'Торт-цифра на заказ',
      price: 5500, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-2.jpg' ],
      contractorId: 'c2', rating: 5.0, reviewsCount: 41,
      occasions: ['birthday', 'jubilee', 'prom'],
      attributes: { 'Форма': 'цифра возраста', 'Покрытие': 'крем + ягоды', 'Вес': '1.2 кг', 'Срок': '2 дня' },
      shortDesc: 'Торт в форме цифры возраста с ягодами и цветами из крема.',
      included: ['Торт-цифра 1.2 кг', 'Декор ягодами и цветами', 'Подставка', 'Свечи'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Торт «30» выглядел потрясающе и оказался очень вкусным.' },
        { author: 'Сергей Поляков', rating: 5, text: 'Готовили 2 дня, результат — лучший торт за последние годы.' }
      ]
    },
    {
      id: 'p-des-gingerbread', categorySlug: 'desserts', name: 'Имбирные пряники именные',
      price: 1800, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-3.jpg' ],
      contractorId: 'c2', rating: 4.9, reviewsCount: 23,
      occasions: ['birthday', 'discharge', 'gender'],
      attributes: { 'Кол-во': '12 шт', 'Роспись': 'именная', 'Упаковка': 'целлофан + лента', 'Срок': '2 дня' },
      shortDesc: 'Расписные имбирные пряники с именем и тематическим декором.',
      included: ['12 пряников', 'Именная роспись глазурью', 'Индивидуальная упаковка', 'Лента'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Гости были в восторге — каждый с именем, так трогательно.' },
        { author: 'Артём Белов', rating: 5, text: 'Красиво и вкусно. Привезли вовремя.' }
      ]
    },
    {
      id: 'p-des-cupcakes-topper', categorySlug: 'desserts', name: 'Капкейки с топпером',
      price: 2600, oldPrice: 3100, priceType: 'fixed',
      photos: [ 'assets/img/cat/desserts-4.jpg' ],
      contractorId: 'c2', rating: 4.8, reviewsCount: 17,
      occasions: ['birthday', 'prom', 'jubilee'],
      attributes: { 'Кол-во': '12 шт', 'Топпер': 'персональный', 'Вкус': 'на выбор', 'Срок': '1 день' },
      shortDesc: 'Капкейки с фигурным топпером по теме праздника.',
      included: ['12 капкейков', 'Персональные топперы', 'Тематический декор', 'Коробка-витрина'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Топперы «Bride» — идеальный акцент на девичнике.' },
        { author: 'Виктория Седова', rating: 4, text: 'Вкусно, оформление аккуратное.' }
      ]
    },

    /* ---------- FLOWERS (8) — подрядчик c3 «Цветы Пион и Я» ---------- */
    {
      id: 'p-flw-tenderness', categorySlug: 'flowers', name: 'Букет «Нежность», 25 пионов',
      price: 5400, oldPrice: 6300, priceType: 'fixed',
      photos: [ 'assets/img/cat/flowers-1.jpg', 'assets/img/cat/flowers-2.jpg' ],
      contractorId: 'c3', rating: 4.8, reviewsCount: 36,
      occasions: ['discharge', 'hen', 'birthday'],
      attributes: { 'Состав': '25 пионов', 'Цвет': 'пудра', 'Упаковка': 'крафт', 'Срок': '1 день' },
      shortDesc: 'Авторский букет пионов в пудровой гамме — для мамы и не только.',
      included: ['25 пионов', 'Сезонная зелень', 'Дизайнерская упаковка', 'Открытка с текстом'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Букет к выписке — мама расплакалась от красоты. Пионы свежие, простояли неделю.' },
        { author: 'Мария Леонтьева', rating: 4, text: 'Очень нежный. Хотелось чуть крупнее, но красиво.' }
      ]
    },
    {
      id: 'p-flw-cappuccino', categorySlug: 'flowers', name: 'Букет «Капучино», розы',
      price: 4900, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/flowers-2.jpg' ],
      contractorId: 'c3', rating: 4.8, reviewsCount: 28,
      occasions: ['birthday', 'jubilee'],
      attributes: { 'Состав': '15 роз', 'Цвет': 'кофейный', 'Упаковка': 'фетр', 'Срок': '1 день' },
      shortDesc: 'Розы кофейного оттенка — сдержанный премиум-букет.',
      included: ['15 роз Cappuccino', 'Зелень и фактуры', 'Упаковка-фетр', 'Открытка'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Стильный, не банальный. Заказывал на юбилей коллеге — оценили.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Розы крупные, оттенок благородный.' }
      ]
    },
    {
      id: 'p-flw-tablearch', categorySlug: 'flowers', name: 'Композиции на столы и арку',
      price: 18000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/flowers-3.jpg', 'assets/img/cat/flowers-4.jpg' ],
      contractorId: 'c3', rating: 4.9, reviewsCount: 14,
      occasions: ['wedding', 'jubilee'],
      attributes: { 'Объём': 'банкет до 30 чел', 'Стиль': 'под палитру', 'Состав': 'арка + столы', 'Срок': '5 дней' },
      shortDesc: 'Флористика банкета: оформление арки и композиции на столы.',
      included: ['Оформление арки', 'Композиции на столы', 'Подбор палитры', 'Монтаж на площадке', 'Согласование макета'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Свадебная арка и столы — гости думали, что это дорогое агентство. Восторг!' },
        { author: 'Сергей Поляков', rating: 5, text: 'Согласовали макет заранее, по факту — один в один.' }
      ]
    },
    {
      id: 'p-flw-peony-cloud', categorySlug: 'flowers', name: 'Букет «Пионовое облако»',
      price: 7200, oldPrice: 8500, priceType: 'fixed',
      photos: [ 'assets/img/cat/flowers-1.jpg' ],
      contractorId: 'c3', rating: 5.0, reviewsCount: 42,
      occasions: ['birthday', 'hen', 'wedding'],
      attributes: { 'Состав': '35 пионов', 'Цвет': 'белый + пудра', 'Упаковка': 'шляпная коробка', 'Срок': '1 день' },
      shortDesc: 'Воздушный букет пионов в шляпной коробке — wow-подарок.',
      included: ['35 пионов', 'Шляпная коробка', 'Сезонная зелень', 'Открытка'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Открыла коробку — аромат и красота невероятные!' },
        { author: 'Наталья Громова', rating: 5, text: 'Лучший букет в моей жизни. Стоят уже неделю.' }
      ]
    },
    {
      id: 'p-flw-hatbox-roses', categorySlug: 'flowers', name: 'Розы в шляпной коробке',
      price: 6800, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/flowers-2.jpg' ],
      contractorId: 'c3', rating: 4.9, reviewsCount: 31,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Состав': '25 роз', 'Упаковка': 'шляпная коробка', 'Цвет': 'на выбор', 'Срок': '1 день' },
      shortDesc: 'Монобукет роз в элегантной шляпной коробке.',
      included: ['25 роз', 'Шляпная коробка', 'Декоративная зелень', 'Открытка'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Красиво оформлено, розы крупные и свежие.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Жена была в восторге. Выглядит дорого и стильно.' }
      ]
    },
    {
      id: 'p-flw-kraft', categorySlug: 'flowers', name: 'Цветы в крафте, сезонный',
      price: 2800, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/flowers-3.jpg' ],
      contractorId: 'c3', rating: 4.7, reviewsCount: 19,
      occasions: ['birthday', 'discharge', 'prom'],
      attributes: { 'Состав': 'сезонные цветы', 'Упаковка': 'крафт', 'Стебли': '15–20', 'Срок': '1 день' },
      shortDesc: 'Свежие сезонные цветы в крафтовой упаковке — просто и мило.',
      included: ['15–20 сезонных цветов', 'Крафтовая бумага', 'Лента', 'Открытка'],
      reviews: [
        { author: 'Артём Белов', rating: 5, text: 'Недорого и очень свежо. Привезли быстро.' },
        { author: 'Екатерина Жукова', rating: 4, text: 'Хороший вариант для сюрприза.' }
      ]
    },
    {
      id: 'p-flw-basket', categorySlug: 'flowers', name: 'Корзина с цветами',
      price: 9500, oldPrice: 11000, priceType: 'fixed',
      photos: [ 'assets/img/cat/flowers-4.jpg' ],
      contractorId: 'c3', rating: 4.8, reviewsCount: 16,
      occasions: ['jubilee', 'birthday', 'wedding'],
      attributes: { 'Состав': 'пионы + розы + зелень', 'Тара': 'плетёная корзина', 'Высота': '40 см', 'Срок': '2 дня' },
      shortDesc: 'Роскошная корзина с пионами и розами — статусный подарок.',
      included: ['Плетёная корзина', 'Пионы и розы 40+ стеблей', 'Декоративная зелень', 'Открытка'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Корзина на юбилей — гости фотографировали весь вечер.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Огромная и красивая. Простояла 10 дней.' }
      ]
    },
    {
      id: 'p-flw-bride', categorySlug: 'flowers', name: 'Букет невесты',
      price: 8500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/flowers-1.jpg', 'assets/img/cat/flowers-2.jpg' ],
      contractorId: 'c3', rating: 5.0, reviewsCount: 24,
      occasions: ['wedding'],
      attributes: { 'Стиль': 'авторский', 'Состав': 'пионы + розы', 'Цвет': 'под образ', 'Срок': '3 дня' },
      shortDesc: 'Авторский букет невесты под образ и палитру свадьбы.',
      included: ['Консультация флориста', 'Авторский букет', 'Бутоньерка жениха', 'Хранение до дня свадьбы'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Букет мечты — точно как я хотела. Флорист учла каждую деталь.' },
        { author: 'Наталья Громова', rating: 5, text: 'Идеальное сочетание цветов под платье.' }
      ]
    },

    /* ---------- PHOTO (8, бронь) — подрядчик c4 ---------- */
    {
      id: 'p-pht-meeting1h', categorySlug: 'photo', name: 'Съёмка встречи / момента, 1 час',
      price: 6000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/photo-1.jpg' ],
      contractorId: 'c4', rating: 4.9, reviewsCount: 31,
      occasions: ['discharge', 'gender', 'birthday'],
      attributes: { 'Длительность': '1 час', 'Формат': 'репортаж', 'Сдача': '7 дней', 'Кадры': '50+ обработанных' },
      shortDesc: 'Репортажная съёмка ключевого момента — встреча, раскрытие, задувание свечей.',
      included: ['1 час съёмки', '50+ обработанных кадров', 'Передача в облаке', 'Цветокоррекция'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Папа приехал к роддому — а фотограф уже снимает. Кадры встречи бесценны.' },
        { author: 'Наталья Громова', rating: 5, text: 'Поймал реакцию на раскрытие гендер-пати идеально.' }
      ]
    },
    {
      id: 'p-pht-reportage4h', categorySlug: 'photo', name: 'Репортаж церемонии, 4 часа',
      price: 24000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/photo-2.jpg' ],
      contractorId: 'c4', rating: 4.9, reviewsCount: 22,
      occasions: ['wedding', 'jubilee', 'prom'],
      attributes: { 'Длительность': '4 часа', 'Формат': 'репортаж + постановка', 'Сдача': '14 дней', 'Кадры': '200+ обработанных' },
      shortDesc: 'Полный репортаж события на 4 часа с обработкой.',
      included: ['4 часа съёмки', '200+ обработанных кадров', 'Постановочный блок', 'Галерея в облаке', 'Reels-нарезка'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Снимал церемонию 4 часа, не пропустил ни одного момента. Reels — отдельный кайф.' },
        { author: 'Сергей Поляков', rating: 5, text: 'Профессионал. Кадры с юбилея в галерее через неделю.' }
      ]
    },
    {
      id: 'p-pht-video-reels', categorySlug: 'photo', name: 'Видеосъёмка + Reels-монтаж',
      price: 12000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/photo-3.jpg' ],
      contractorId: 'c4', rating: 4.9, reviewsCount: 18,
      occasions: ['birthday', 'wedding', 'jubilee'],
      attributes: { 'Длительность': '2 часа', 'Формат': 'видео + монтаж', 'Сдача': '5 дней', 'Reels': '1–2 клипа' },
      shortDesc: 'Видеосъёмка праздника с монтажом роликов для соцсетей.',
      included: ['2 часа видеосъёмки', 'Монтаж highlights-ролика', '1–2 Reels-клипа', 'Передача файлов'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Reels с праздника набрал 15k просмотров. Качество отличное.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Ролик смотрим каждый год в день рождения дочки.' }
      ]
    },
    {
      id: 'p-pht-photozone-shoot', categorySlug: 'photo', name: 'Съёмка у фотозоны, 1 час',
      price: 7500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/photo-4.jpg' ],
      contractorId: 'c4', rating: 4.8, reviewsCount: 26,
      occasions: ['birthday', 'hen', 'prom', 'gender'],
      attributes: { 'Длительность': '1 час', 'Формат': 'постановочный', 'Сдача': '5 дней', 'Кадры': '40+ обработанных' },
      shortDesc: 'Постановочная съёмка гостей у фотозоны с обработкой.',
      included: ['1 час съёмки у фотозоны', '40+ кадров', 'Базовая ретушь', 'Облако с доступом'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Каждый гость получил кадры. Атмосфера передана идеально.' },
        { author: 'Виктория Седова', rating: 4, text: 'Профессионально, быстро, фото отличные.' }
      ]
    },
    {
      id: 'p-pht-lovestory', categorySlug: 'photo', name: 'Love Story съёмка, 2 часа',
      price: 15000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/photo-1.jpg' ],
      contractorId: 'c4', rating: 5.0, reviewsCount: 15,
      occasions: ['wedding', 'jubilee'],
      attributes: { 'Длительность': '2 часа', 'Формат': 'Love Story', 'Локаций': '2–3', 'Сдача': '10 дней' },
      shortDesc: 'Романтическая Love Story пара на нескольких локациях.',
      included: ['2 часа съёмки', '80+ обработанных кадров', '2–3 локации', 'Галерея в облаке'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Снял нас так, будто знает нас всю жизнь. Лучшие фото в нашей паре.' },
        { author: 'Артём Белов', rating: 5, text: 'Отличный фотограф, жена в восторге.' }
      ]
    },
    {
      id: 'p-pht-family', categorySlug: 'photo', name: 'Семейная фотосессия, 1.5 часа',
      price: 9000, oldPrice: 11000, priceType: 'from',
      photos: [ 'assets/img/cat/photo-2.jpg' ],
      contractorId: 'c4', rating: 4.8, reviewsCount: 33,
      occasions: ['birthday', 'discharge', 'jubilee'],
      attributes: { 'Длительность': '1.5 часа', 'Состав': 'семья до 6 чел', 'Сдача': '7 дней', 'Кадры': '60+ обработанных' },
      shortDesc: 'Тёплая семейная фотосессия на природе или дома.',
      included: ['1.5 часа съёмки', '60+ обработанных кадров', 'Постановочные и живые кадры', 'Галерея'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Поймал моменты, которые не забудем. Дети получились живыми!' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Каждый год заказываем. Лучшие воспоминания — здесь.' }
      ]
    },
    {
      id: 'p-pht-video-greeting', categorySlug: 'photo', name: 'Видео-поздравление монтаж',
      price: 5000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/photo-3.jpg' ],
      contractorId: 'c4', rating: 4.7, reviewsCount: 21,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Формат': 'монтаж из фото/видео', 'Длина': 'до 3 мин', 'Музыка': 'на выбор', 'Сдача': '3 дня' },
      shortDesc: 'Смонтированное видео-поздравление из ваших фото и видео.',
      included: ['Монтаж до 3 минут', 'Музыкальная подложка', 'Титры с текстом', 'Финальный файл MP4'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Показали видео на юбилее — все прослезились. Сделали быстро.' },
        { author: 'Сергей Поляков', rating: 4, text: 'Красивый монтаж, музыка подобрана в тему.' }
      ]
    },
    {
      id: 'p-pht-photo-video-pkg', categorySlug: 'photo', name: 'Фото+видео пакет, 3 часа',
      price: 19000, oldPrice: 22000, priceType: 'from',
      photos: [ 'assets/img/cat/photo-4.jpg' ],
      contractorId: 'c4', rating: 5.0, reviewsCount: 12,
      occasions: ['wedding', 'jubilee', 'birthday'],
      attributes: { 'Длительность': '3 часа', 'Формат': 'фото + видео', 'Сдача': '14 дней', 'Команда': '2 человека' },
      shortDesc: 'Команда фото+видео на 3 часа — полное покрытие события.',
      included: ['3 часа съёмки', '100+ фото', 'Highlights-ролик', 'Reels', 'Облако с доступом'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Лучшее вложение в свадьбу. Воспоминания на всю жизнь.' },
        { author: 'Наталья Громова', rating: 5, text: 'Команда профессионалов. Работали незаметно, результат потрясающий.' }
      ]
    },

    /* ---------- KIDSHOW (8, бронь) — подрядчик c5 ---------- */
    {
      id: 'p-kid-bubbles', categorySlug: 'kidshow', name: 'Шоу мыльных пузырей, 40 мин',
      price: 7000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-1.jpg' ],
      contractorId: 'c5', rating: 4.7, reviewsCount: 23,
      occasions: ['birthday', 'discharge'],
      attributes: { 'Длительность': '40 мин', 'Возраст': '3–10 лет', 'Площадка': 'дом/зал', 'Срок': 'по дате' },
      shortDesc: 'Гигантские пузыри и ребёнок внутри пузыря — восторг гарантирован.',
      included: ['40 минут шоу', 'Гигантские пузыри', 'Пузырь вокруг ребёнка', 'Безопасный состав', 'Реквизит'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Дети визжали от счастья. Артист завёл всех, даже взрослых.' },
        { author: 'Артём Белов', rating: 4, text: 'Здорово, но 40 минут пролетели быстро — взяли бы дольше.' }
      ]
    },
    {
      id: 'p-kid-science', categorySlug: 'kidshow', name: 'Научное / крио-шоу, 45 мин',
      price: 9500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-2.jpg' ],
      contractorId: 'c5', rating: 4.8, reviewsCount: 17,
      occasions: ['birthday', 'prom'],
      attributes: { 'Длительность': '45 мин', 'Возраст': '6–12 лет', 'Эффекты': 'азот + опыты', 'Срок': 'по дате' },
      shortDesc: 'Зрелищные опыты с азотом и дымом — безопасно и эффектно.',
      included: ['45 минут шоу', 'Крио-эффекты с азотом', 'Интерактивные опыты', 'Защита и реквизит', 'Ведущий-учёный'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Крио-шоу на выпускной — дым, эффекты, дети в восторге. Безопасно.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Не банальный аниматор, а настоящее представление.' }
      ]
    },
    {
      id: 'p-kid-paper', categorySlug: 'kidshow', name: 'Бумажное шоу, 40 мин',
      price: 7500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-3.jpg' ],
      contractorId: 'c5', rating: 4.7, reviewsCount: 14,
      occasions: ['birthday'],
      attributes: { 'Длительность': '40 мин', 'Возраст': '4–12 лет', 'Реквизит': 'бумага и конфетти', 'Срок': 'по дате' },
      shortDesc: 'Шоу из бумаги и конфетти — яркое и интерактивное.',
      included: ['40 минут шоу', 'Бумажные трюки', 'Конфетти-пушка', 'Участие детей'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Дети сами складывали фигуры — весело и увлекательно!' },
        { author: 'Артём Белов', rating: 4, text: 'Оригинально, дети были в восторге.' }
      ]
    },
    {
      id: 'p-kid-tesla', categorySlug: 'kidshow', name: 'Тесла-шоу с молниями, 30 мин',
      price: 11000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-4.jpg' ],
      contractorId: 'c5', rating: 4.9, reviewsCount: 11,
      occasions: ['birthday', 'prom'],
      attributes: { 'Длительность': '30 мин', 'Возраст': '8+ лет', 'Эффекты': 'электрические молнии', 'Срок': 'по дате' },
      shortDesc: 'Эффектные электрические молнии от катушки Теслы — зрелище для всех.',
      included: ['30 минут шоу', 'Катушка Тесла', 'Световые и звуковые эффекты', 'Безопасная зона для зрителей'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'На выпускном все снимали на телефоны — выглядело фантастически!' },
        { author: 'Алексей Морозов', rating: 5, text: 'Впечатляюще и безопасно. Просили повторить.' }
      ]
    },
    {
      id: 'p-kid-giant-bubbles', categorySlug: 'kidshow', name: 'Шоу гигантских пузырей, 45 мин',
      price: 8500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-1.jpg' ],
      contractorId: 'c5', rating: 4.8, reviewsCount: 19,
      occasions: ['birthday', 'discharge'],
      attributes: { 'Длительность': '45 мин', 'Возраст': '3–12 лет', 'Площадка': 'дом/улица/зал', 'Срок': 'по дате' },
      shortDesc: 'Пузыри метровых размеров и дети внутри — незабываемо.',
      included: ['45 минут шоу', 'Пузыри до 1.5 м диаметром', 'Ребёнок внутри пузыря', 'Фото-момент'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Гигантский пузырь над дочкой — лучший кадр дня рождения!' },
        { author: 'Сергей Поляков', rating: 4, text: 'Дети были счастливы. Рекомендую.' }
      ]
    },
    {
      id: 'p-kid-chemistry', categorySlug: 'kidshow', name: 'Химическое шоу, 45 мин',
      price: 9000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-2.jpg' ],
      contractorId: 'c5', rating: 4.7, reviewsCount: 13,
      occasions: ['birthday', 'prom'],
      attributes: { 'Длительность': '45 мин', 'Возраст': '7–14 лет', 'Эффекты': 'цветные реакции', 'Срок': 'по дате' },
      shortDesc: 'Цветные химические реакции — опыты, которые дети запомнят.',
      included: ['45 минут шоу', 'Безопасные реактивы', 'Интерактивные опыты', 'Ведущий-химик'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Дочка потом две недели ставила опыты дома.' },
        { author: 'Артём Белов', rating: 4, text: 'Познавательно и весело. Ведущий держал интерес.' }
      ]
    },
    {
      id: 'p-kid-light', categorySlug: 'kidshow', name: 'Световое шоу, 30 мин',
      price: 10000, oldPrice: 12000, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-3.jpg' ],
      contractorId: 'c5', rating: 4.9, reviewsCount: 16,
      occasions: ['birthday', 'jubilee', 'prom'],
      attributes: { 'Длительность': '30 мин', 'Возраст': '5+ лет', 'Эффекты': 'UV + LED', 'Срок': 'по дате' },
      shortDesc: 'UV-краски и LED-реквизит: танцевальное световое шоу в темноте.',
      included: ['30 минут шоу', 'UV-краски для лица', 'LED-реквизит', 'Интерактив с гостями'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Выключили свет — и началось волшебство. Гости аплодировали стоя.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Лучшее шоу за все праздники. Берите!' }
      ]
    },

    {
      id: 'p-kid-sand', categorySlug: 'kidshow', name: 'Песочная анимация, 30 мин',
      price: 8000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/kidshow-4.jpg' ],
      contractorId: 'c5', rating: 4.8, reviewsCount: 10,
      occasions: ['birthday'],
      attributes: { 'Длительность': '30 мин', 'Возраст': '4+ лет', 'Формат': 'живое рисование', 'Срок': 'по дате' },
      shortDesc: 'Живое рисование песком — медитативное шоу для детей и взрослых.',
      included: ['30 минут шоу', 'Световой стол для песка', 'Рассказ-история', 'Фото процесса'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Все замерли. Дети и взрослые смотрели не отрываясь.' },
        { author: 'Наталья Громова', rating: 4, text: 'Необычно и красиво. Что-то новое для нас.' }
      ]
    },

    /* ---------- ANIMATORS (8, бронь) — подрядчик c6 ---------- */
    {
      id: 'p-ani-character2h', categorySlug: 'animators', name: 'Аниматор-персонаж, 2 часа',
      price: 5500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-1.jpg' ],
      contractorId: 'c6', rating: 4.8, reviewsCount: 34,
      occasions: ['birthday'],
      attributes: { 'Длительность': '2 часа', 'Возраст': '3–10 лет', 'Персонаж': 'на выбор', 'Срок': 'по дате' },
      shortDesc: 'Любимый герой ребёнка: игры, конкурсы, аквагрим.',
      included: ['2 часа программы', 'Персонаж на выбор', 'Игры и конкурсы', 'Аквагрим', 'Мыльные пузыри'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Аниматор «Радуга» — ни одной свободной минуты у детей. Профи.' },
        { author: 'Екатерина Жукова', rating: 5, text: 'Дочка до сих пор вспоминает. Костюм аккуратный, программа живая.' }
      ]
    },
    {
      id: 'p-ani-host3h', categorySlug: 'animators', name: 'Ведущий + конкурсы, 3 часа',
      price: 13500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-2.jpg' ],
      contractorId: 'c6', rating: 4.8, reviewsCount: 21,
      occasions: ['jubilee', 'wedding', 'birthday'],
      attributes: { 'Длительность': '3 часа', 'Формат': 'ведущий взрослого', 'Программа': 'индивидуальная', 'Срок': 'по дате' },
      shortDesc: 'Ведущий вечера со сценарием, конкурсами и тайм-лайном.',
      included: ['3 часа ведения', 'Индивидуальный сценарий', 'Конкурсы и интерактив', 'Координация программы', 'Музыкальное сопровождение'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Юбилей вёл легко, гости не скучали. Сценарий обсудили заранее.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Без пошлятины, тонко и по делу. Рекомендую.' }
      ]
    },
    {
      id: 'p-ani-princess', categorySlug: 'animators', name: 'Принцесса на праздник, 2 часа',
      price: 7000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-3.jpg' ],
      contractorId: 'c6', rating: 4.9, reviewsCount: 28,
      occasions: ['birthday'],
      attributes: { 'Длительность': '2 часа', 'Возраст': '3–8 лет', 'Персонаж': 'Принцесса', 'Срок': 'по дате' },
      shortDesc: 'Настоящая принцесса в бальном платье — сказка для девочек.',
      included: ['2 часа программы', 'Костюм принцессы', 'Игры, танцы, аквагрим', 'Фото с гостями'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Дочка до сих пор верит, что это настоящая принцесса!' },
        { author: 'Виктория Седова', rating: 5, text: 'Программа продуманная, костюм красивый.' }
      ]
    },
    {
      id: 'p-ani-superhero', categorySlug: 'animators', name: 'Супергерой-аниматор, 2 часа',
      price: 7500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-4.jpg' ],
      contractorId: 'c6', rating: 4.8, reviewsCount: 22,
      occasions: ['birthday'],
      attributes: { 'Длительность': '2 часа', 'Возраст': '5–12 лет', 'Персонаж': 'на выбор', 'Срок': 'по дате' },
      shortDesc: 'Супергерой со спецэффектами — для мальчишеского праздника.',
      included: ['2 часа программы', 'Костюм супергероя', 'Интерактивные задания', 'Аквагрим'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Сын был в восторге — его любимый супергерой пришёл на ДР!' },
        { author: 'Артём Белов', rating: 5, text: 'Активная программа, дети не устали.' }
      ]
    },
    {
      id: 'p-ani-tamada', categorySlug: 'animators', name: 'Тамада на юбилей, 4 часа',
      price: 15000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-1.jpg' ],
      contractorId: 'c6', rating: 4.9, reviewsCount: 31,
      occasions: ['jubilee', 'wedding'],
      attributes: { 'Длительность': '4 часа', 'Формат': 'тамада + музыка', 'Возраст аудитории': '30+', 'Срок': 'по дате' },
      shortDesc: 'Профессиональная тамада со своей музыкой и конкурсами.',
      included: ['4 часа ведения', 'Сценарий под именинника', 'Музыкальное оборудование', 'Конкурсы и игры'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Тамада держала стол 4 часа, никто не скучал.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Конкурсы без пошлости — наконец-то! Гости смеялись весь вечер.' }
      ]
    },
    {
      id: 'p-ani-mascot', categorySlug: 'animators', name: 'Ростовая кукла, 1 час',
      price: 6000, oldPrice: 7500, priceType: 'from',
      photos: [ 'assets/img/cat/animators-2.jpg' ],
      contractorId: 'c6', rating: 4.7, reviewsCount: 19,
      occasions: ['birthday'],
      attributes: { 'Длительность': '1 час', 'Возраст': '2–7 лет', 'Персонаж': 'на выбор', 'Срок': 'по дате' },
      shortDesc: 'Ростовая кукла-персонаж для встречи гостей и фото.',
      included: ['1 час работы', 'Костюм ростовой куклы', 'Встреча гостей', 'Совместные фото'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Малыши обожали! Мишка у входа — это было умилительно.' },
        { author: 'Наталья Громова', rating: 4, text: 'Хорошо, но больше часа бы не выдержали — жарко в костюме.' }
      ]
    },
    {
      id: 'p-ani-clown', categorySlug: 'animators', name: 'Клоун-затейник, 1.5 часа',
      price: 6500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-3.jpg' ],
      contractorId: 'c6', rating: 4.7, reviewsCount: 16,
      occasions: ['birthday'],
      attributes: { 'Длительность': '1.5 часа', 'Возраст': '3–8 лет', 'Реквизит': 'воздушные шары', 'Срок': 'по дате' },
      shortDesc: 'Весёлый клоун с шариками, фокусами и интерактивом.',
      included: ['1.5 часа программы', 'Фокусы и розыгрыши', 'Шарики-сувениры', 'Аквагрим'],
      reviews: [
        { author: 'Артём Белов', rating: 5, text: 'Классический клоун, без страшных масок. Дети хохотали.' },
        { author: 'Мария Леонтьева', rating: 4, text: 'Весело и активно. Дети были заняты всё время.' }
      ]
    },
    {
      id: 'p-ani-duo', categorySlug: 'animators', name: 'Два аниматора, 2 часа',
      price: 12000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/animators-4.jpg' ],
      contractorId: 'c6', rating: 5.0, reviewsCount: 14,
      occasions: ['birthday'],
      attributes: { 'Длительность': '2 часа', 'Команда': '2 аниматора', 'Возраст': '4–12 лет', 'Срок': 'по дате' },
      shortDesc: 'Двойная программа: больше игр, больше внимания каждому ребёнку.',
      included: ['2 часа программы', '2 аниматора', 'Расширенный сценарий', 'Аквагрим и конкурсы'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'На 20 детей два аниматора — идеально. Никакого хаоса.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Стоит своих денег. Дети были в восторге весь вечер.' }
      ]
    },

    /* ---------- DECOR (8) — подрядчик c7 ---------- */
    {
      id: 'p-dec-neon', categorySlug: 'decor', name: 'Неон-надпись на заказ',
      price: 9000, oldPrice: null, priceType: 'from',
      photos: [ BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg',
                BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg' ],
      contractorId: 'c7', rating: 4.9, reviewsCount: 18,
      occasions: ['wedding', 'jubilee', 'hen'],
      attributes: { 'Текст': 'индивидуальный', 'Цвет': 'на выбор', 'Размер': 'до 1 м', 'Срок': '7 дней' },
      shortDesc: 'Гибкий неон с вашим текстом — «Just Married», имя, дата.',
      included: ['Неон-надпись по макету', 'Крепление/подставка', 'Питание и пульт', 'Согласование шрифта', 'Доставка'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Неон «Just Married» — фотозона заиграла. Сделали ровно за неделю.' },
        { author: 'Сергей Поляков', rating: 5, text: 'Надпись «50 лет, Виктор» — тёплый розовый, как просил.' }
      ]
    },
    {
      id: 'p-dec-arch-textile', categorySlug: 'decor', name: 'Драпировка и арка с текстилем',
      price: 14000, oldPrice: 16000, priceType: 'from',
      photos: [ BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg',
                BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg' ],
      contractorId: 'c7', rating: 4.8, reviewsCount: 11,
      occasions: ['wedding', 'jubilee'],
      attributes: { 'Стиль': 'текстиль + арка', 'Цвет': 'под палитру', 'Размер': '2.5 м', 'Срок': '4 дня' },
      shortDesc: 'Арка с тканью и декором для церемонии или фотозоны.',
      included: ['Каркас-арка 2.5 м', 'Драпировка тканью', 'Декор-акценты', 'Монтаж и демонтаж', 'Подбор палитры'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Текстильная арка — церемония как из журнала. Монтаж аккуратный.' },
        { author: 'Сергей Поляков', rating: 4, text: 'Красиво, но привезли чуть позже оговорённого. Успели к началу.' }
      ]
    },
    {
      id: 'p-dec-photozone-key', categorySlug: 'decor', name: 'Фотозона под ключ',
      price: 12000, oldPrice: null, priceType: 'from',
      photos: [ BB + '378/fotozona-na-vypusknoj-v-d_pr1176.600x600.jpeg',
                BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg' ],
      contractorId: 'c7', rating: 4.9, reviewsCount: 24,
      occasions: ['birthday', 'hen', 'wedding', 'prom'],
      attributes: { 'Стиль': 'на выбор', 'Размер': '2×2 м', 'Состав': 'фон + декор', 'Срок': '3 дня' },
      shortDesc: 'Фотозона с тематическим декором — всё продумано и смонтировано.',
      included: ['Фон и каркас', 'Тематический декор', 'Неон-акцент по желанию', 'Монтаж и демонтаж'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Фотозона стала центром вечера. Каждый гость фотографировался.' },
        { author: 'Наталья Громова', rating: 5, text: 'Всё под цвет, всё аккуратно. Монтаж за час.' }
      ]
    },
    {
      id: 'p-dec-balloon-arch', categorySlug: 'decor', name: 'Шар-арка органик',
      price: 11000, oldPrice: 13000, priceType: 'fixed',
      photos: [ BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg',
                BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg' ],
      contractorId: 'c7', rating: 4.8, reviewsCount: 17,
      occasions: ['birthday', 'prom', 'jubilee'],
      attributes: { 'Стиль': 'органик', 'Длина': '2.5 м', 'Цвет': 'на выбор', 'Срок': '2 дня' },
      shortDesc: 'Органическая арка из шаров разных размеров — тренд оформления.',
      included: ['Арка органик 2.5 м', 'Шары 3 размеров', 'Монтаж на площадке', 'Демонтаж по желанию'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Органик-арка смотрится очень дорого. Гости были уверены — агентство.' },
        { author: 'Виктория Седова', rating: 4, text: 'Красиво, цвета как заказывали.' }
      ]
    },
    {
      id: 'p-dec-table-decor', categorySlug: 'decor', name: 'Оформление стола именинника',
      price: 4500, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ],
      contractorId: 'c7', rating: 4.7, reviewsCount: 13,
      occasions: ['birthday', 'jubilee'],
      attributes: { 'Состав': 'шары + скатерть + декор', 'Стиль': 'под повод', 'Размер': 'стол на 8', 'Срок': '1 день' },
      shortDesc: 'Декор стола именинника: шары, скатерть, цветы, свечи.',
      included: ['Шары над столом', 'Скатерть', 'Декор-акценты', 'Доставка и установка'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Стол именинницы стал самым красивым местом в зале.' },
        { author: 'Сергей Поляков', rating: 4, text: 'Хорошее оформление за разумные деньги.' }
      ]
    },
    {
      id: 'p-dec-pompons', categorySlug: 'decor', name: 'Бумажные помпоны, набор 10',
      price: 3500, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '319/nabor-rozovyh-sharikov-na-_pr1165.600x600.jpeg' ],
      contractorId: 'c7', rating: 4.7, reviewsCount: 9,
      occasions: ['birthday', 'hen', 'gender'],
      attributes: { 'Кол-во': '10 помпонов', 'Диаметр': '25–40 см', 'Цвет': 'на выбор', 'Срок': '1 день' },
      shortDesc: 'Бумажные помпоны под потолок — нежный декор без шаров.',
      included: ['10 помпонов разных размеров', 'Подвесная система', 'Подбор цвета', 'Монтаж'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Нежно и бюджетно. Смотрится воздушно.' },
        { author: 'Наталья Громова', rating: 4, text: 'Хорошее дополнение к шарам.' }
      ]
    },
    {
      id: 'p-dec-ceiling-balls', categorySlug: 'decor', name: 'Потолок из шаров, 50 шт',
      price: 8500, oldPrice: 10000, priceType: 'fixed',
      photos: [ BB + '6/shary-pod-potolok-nezhno-ya_pr993_2.600x600.jpg',
                BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ],
      contractorId: 'c7', rating: 4.9, reviewsCount: 21,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Кол-во': '50 шаров', 'Газ': 'гелий', 'Цвет': 'на выбор', 'Срок': '1 день' },
      shortDesc: 'Облако из 50 гелиевых шаров под потолок — зал сразу преображается.',
      included: ['50 гелиевых шаров', 'Атласные ленты', 'Подбор гаммы', 'Доставка и подъём'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Зал преобразился полностью. Нежно и красиво.' },
        { author: 'Алексей Морозов', rating: 5, text: 'Держались весь вечер, ленты разной длины — очень красиво.' }
      ]
    },

    {
      id: 'p-dec-garland-balls', categorySlug: 'decor', name: 'Гирлянда из шаров органик',
      price: 7500, oldPrice: null, priceType: 'fixed',
      photos: [ BB + '319/nabor-rozovyh-sharikov-na-_pr1165.600x600.jpeg',
                BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ],
      contractorId: 'c7', rating: 4.8, reviewsCount: 15,
      occasions: ['birthday', 'prom', 'hen'],
      attributes: { 'Длина': '3 м', 'Стиль': 'органик', 'Цвет': 'на выбор', 'Срок': '2 дня' },
      shortDesc: 'Органическая гирлянда из шаров разных размеров — трендовый декор.',
      included: ['Гирлянда 3 м', 'Шары 3 диаметров', 'Монтаж на площадке', 'Крепления'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Гирлянда на девичнике — все думали, что привезли дизайнера.' },
        { author: 'Артём Белов', rating: 4, text: 'Красиво и необычно. Смотрится дорого.' }
      ]
    },

    /* ---------- CATERING (8) — подрядчик c8 ---------- */
    {
      id: 'p-cat-fourchette20', categorySlug: 'catering', name: 'Фуршет на 20 персон',
      price: 8500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/catering-1.jpg' ],
      contractorId: 'c8', rating: 4.6, reviewsCount: 16,
      occasions: ['jubilee', 'wedding'],
      attributes: { 'Персон': '20', 'Формат': 'фуршет', 'Состав': 'канапе + горячее', 'Срок': '3 дня' },
      shortDesc: 'Фуршетное меню с подачей и обслуживанием на банкет.',
      included: ['Меню на 20 персон', 'Канапе и закуски', 'Горячее', 'Сервировка и подача', 'Уборка стола'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Фуршет на юбилей — гости сыты и довольны. Подача аккуратная.' },
        { author: 'Виктория Седова', rating: 4, text: 'Вкусно, хотелось чуть больше горячего. В целом отлично.' }
      ]
    },
    {
      id: 'p-cat-canape30', categorySlug: 'catering', name: 'Канапе и напитки, 30 человек',
      price: 12000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/catering-2.jpg' ],
      contractorId: 'c8', rating: 4.6, reviewsCount: 12,
      occasions: ['jubilee', 'prom'],
      attributes: { 'Персон': '30', 'Формат': 'канапе + бар', 'Состав': 'канапе + напитки', 'Срок': '3 дня' },
      shortDesc: 'Лёгкий фуршет с канапе и барной стойкой напитков.',
      included: ['Канапе-ассорти на 30', 'Барная стойка', 'Безалкогольные напитки', 'Официант', 'Посуда и инвентарь'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Канапе на 30 человек — красиво, вкусно, бар не простаивал.' },
        { author: 'Алексей Морозов', rating: 4, text: 'Хорошо организовано, официант внимательный.' }
      ]
    },
    {
      id: 'p-cat-fruit', categorySlug: 'catering', name: 'Фруктовая нарезка',
      price: 4500, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/catering-3.jpg' ],
      contractorId: 'c8', rating: 4.7, reviewsCount: 14,
      occasions: ['birthday', 'jubilee', 'hen'],
      attributes: { 'Персон': '10–15', 'Состав': 'сезонные фрукты', 'Подача': 'блюдо', 'Срок': '1 день' },
      shortDesc: 'Красивая фруктовая нарезка на праздничный стол.',
      included: ['Фрукты сезонные', 'Профессиональная нарезка', 'Блюдо-подача', 'Упаковка для доставки'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Красиво оформлено, фрукты свежие. Гости оценили.' },
        { author: 'Наталья Громова', rating: 4, text: 'Хорошее дополнение к торту.' }
      ]
    },
    {
      id: 'p-cat-softbar', categorySlug: 'catering', name: 'Бар безалкогольный на 20',
      price: 7500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/catering-4.jpg' ],
      contractorId: 'c8', rating: 4.6, reviewsCount: 11,
      occasions: ['birthday', 'gender', 'jubilee'],
      attributes: { 'Персон': '20', 'Состав': 'лимонады + морсы', 'Формат': 'барная стойка', 'Срок': '2 дня' },
      shortDesc: 'Безалкогольный бар с авторскими лимонадами и морсами.',
      included: ['Барная стойка', '5 видов лимонадов', 'Морсы и воды', 'Бармен', 'Стаканы'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Дети и взрослые были довольны. Лимонады вкусные!' },
        { author: 'Виктория Седова', rating: 4, text: 'Красиво оформленная стойка, напитки отличные.' }
      ]
    },
    {
      id: 'p-cat-coffee', categorySlug: 'catering', name: 'Кофе-брейк на 15 персон',
      price: 6000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/catering-1.jpg' ],
      contractorId: 'c8', rating: 4.6, reviewsCount: 9,
      occasions: ['jubilee', 'birthday'],
      attributes: { 'Персон': '15', 'Состав': 'кофе + выпечка', 'Формат': 'брейк', 'Срок': '1 день' },
      shortDesc: 'Кофе-брейк с профессиональным бариста и выпечкой.',
      included: ['Бариста', 'Кофемашина', 'Зерновой кофе 3 вида', 'Выпечка', 'Посуда'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Кофе с бариста на юбилее — гости удивились и оценили.' },
        { author: 'Алексей Морозов', rating: 4, text: 'Качественно и вкусно. Хотелось чуть больше выпечки.' }
      ]
    },
    {
      id: 'p-cat-pizza', categorySlug: 'catering', name: 'Пицца-сет на 10 персон',
      price: 5500, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/catering-2.jpg' ],
      contractorId: 'c8', rating: 4.7, reviewsCount: 18,
      occasions: ['birthday'],
      attributes: { 'Персон': '10', 'Состав': '4 пиццы', 'Подача': 'горячей', 'Срок': '1 день' },
      shortDesc: '4 пиццы к вашему времени — горячие и вовремя.',
      included: ['4 пиццы 35 см', 'Соусы', 'Салфетки и тарелки', 'Доставка горячей'],
      reviews: [
        { author: 'Артём Белов', rating: 5, text: 'Детский день рождения: пицца — главный хит. Привезли горячей.' },
        { author: 'Мария Леонтьева', rating: 4, text: 'Быстро и вкусно. Дети съели всё.' }
      ]
    },
    {
      id: 'p-cat-cheese', categorySlug: 'catering', name: 'Сырная тарелка',
      price: 4800, oldPrice: 5500, priceType: 'fixed',
      photos: [ 'assets/img/cat/catering-3.jpg' ],
      contractorId: 'c8', rating: 4.8, reviewsCount: 13,
      occasions: ['jubilee', 'wedding', 'hen'],
      attributes: { 'Персон': '10–12', 'Состав': '5 сортов + мёд + орехи', 'Подача': 'блюдо', 'Срок': '1 день' },
      shortDesc: 'Сырная тарелка — изысканное дополнение к банкету.',
      included: ['5 видов сыра', 'Мёд и джемы', 'Орехи и виноград', 'Крекеры', 'Красивая подача'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Выглядела как в ресторане. Гости оценили выбор сыров.' },
        { author: 'Наталья Громова', rating: 5, text: 'Съели за полчаса — знак качества!' }
      ]
    },
    {
      id: 'p-cat-kids-menu', categorySlug: 'catering', name: 'Детское меню на 10 персон',
      price: 7000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/catering-4.jpg' ],
      contractorId: 'c8', rating: 4.7, reviewsCount: 10,
      occasions: ['birthday'],
      attributes: { 'Персон': '10 детей', 'Состав': 'сэндвичи + сок + нарезка', 'Возраст': '3–12 лет', 'Срок': '1 день' },
      shortDesc: 'Детское меню без аллергенов: сэндвичи, нарезка, соки.',
      included: ['Сэндвичи 20 шт', 'Фруктовая нарезка', 'Натуральные соки', 'Мини-печенье', 'Посуда'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Дети поели хорошо, ничего лишнего. Без аллергенов — важно!' },
        { author: 'Алексей Морозов', rating: 4, text: 'Дети остались довольны. Сок понравился особенно.' }
      ]
    },

    /* ---------- CLEANUP (8) — c1 (платформа) ---------- */
    {
      id: 'p-cln-after', categorySlug: 'cleanup', name: 'Уборка площадки после праздника',
      price: 2500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-1.jpg' ],
      contractorId: 'c1', rating: 4.7, reviewsCount: 9,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Площадь': 'до 80 м²', 'Состав': 'уборка + вывоз', 'Время': 'после события', 'Срок': 'по дате' },
      shortDesc: 'Команда приедет после праздника — вы уходите, площадка остаётся чистой.',
      included: ['Уборка зала/площадки', 'Сбор шаров и декора', 'Вынос мусора', 'Мытьё поверхностей'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'После банкета не пришлось ничего делать — приехали, убрали, вывезли.' },
        { author: 'Мария Леонтьева', rating: 4, text: 'Быстро и без вопросов. Сэкономили вечер.' }
      ]
    },
    {
      id: 'p-cln-decor-removal', categorySlug: 'cleanup', name: 'Демонтаж декора и вывоз',
      price: 3500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-2.jpg' ],
      contractorId: 'c1', rating: 4.7, reviewsCount: 7,
      occasions: ['wedding', 'jubilee'],
      attributes: { 'Объём': 'арки + фотозоны', 'Состав': 'демонтаж + вывоз', 'Время': 'после события', 'Срок': 'по дате' },
      shortDesc: 'Демонтаж арок, фотозон и крупного декора с вывозом.',
      included: ['Демонтаж конструкций', 'Сбор шаров и текстиля', 'Погрузка и вывоз', 'Возврат инвентаря'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Свернули всю свадебную декорацию за час, мы уже уехали отдыхать.' },
        { author: 'Сергей Поляков', rating: 4, text: 'Аккуратно сняли неон и арку, ничего не повредили.' }
      ]
    },
    {
      id: 'p-cln-express', categorySlug: 'cleanup', name: 'Экспресс-уборка, 2 часа',
      price: 3000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-3.jpg' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 12,
      occasions: ['birthday', 'jubilee'],
      attributes: { 'Время': '2 часа', 'Площадь': 'до 60 м²', 'Формат': 'экспресс', 'Срок': 'по дате' },
      shortDesc: 'Быстрая уборка за 2 часа — идеально после домашней вечеринки.',
      included: ['2 часа уборки', 'Вынос мусора', 'Мытьё посуды', 'Протирка поверхностей'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Приехали через час после звонка. Квартира блестела.' },
        { author: 'Артём Белов', rating: 4, text: 'Быстро и чисто. Хорошая работа.' }
      ]
    },
    {
      id: 'p-cln-apt', categorySlug: 'cleanup', name: 'Уборка квартиры после вечеринки',
      price: 4500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-4.jpg' ],
      contractorId: 'c1', rating: 4.7, reviewsCount: 11,
      occasions: ['birthday', 'hen'],
      attributes: { 'Площадь': 'до 100 м²', 'Состав': 'полная уборка', 'Включено': 'кухня + санузел', 'Срок': 'по дате' },
      shortDesc: 'Полная уборка квартиры после праздника — чисто и быстро.',
      included: ['Уборка всех комнат', 'Мытьё кухни', 'Уборка санузла', 'Вынос мусора'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Убрали после девичника лучше, чем было до него.' },
        { author: 'Виктория Седова', rating: 4, text: 'Хорошо справились. Пришли вовремя.' }
      ]
    },
    {
      id: 'p-cln-dishes', categorySlug: 'cleanup', name: 'Мытьё посуды + вынос мусора',
      price: 2000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-1.jpg' ],
      contractorId: 'c1', rating: 4.6, reviewsCount: 8,
      occasions: ['birthday', 'jubilee'],
      attributes: { 'Формат': 'мытьё + вынос', 'Объём': 'до 5 мешков', 'Время': '1–2 часа', 'Срок': 'по дате' },
      shortDesc: 'Помощник помоет посуду и вынесет мусор после праздника.',
      included: ['Мытьё посуды', 'Сортировка мусора', 'Вынос до 5 мешков', 'Протирка стола'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Посуда после 20 гостей — nightmare. Помогли за час.' },
        { author: 'Мария Леонтьева', rating: 4, text: 'Нужная и недорогая услуга.' }
      ]
    },
    {
      id: 'p-cln-general', categorySlug: 'cleanup', name: 'Генеральная уборка',
      price: 7500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-2.jpg' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 15,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Площадь': 'до 120 м²', 'Состав': 'полная генуборка', 'Команда': '2 человека', 'Срок': 'по дате' },
      shortDesc: 'Генеральная уборка с командой из двух человек после большого события.',
      included: ['Команда 2 человека', 'Полная уборка', 'Мытьё окон', 'Вынос мусора', 'Чистящие средства'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'После банкета на 40 человек навели идеальный порядок.' },
        { author: 'Наталья Громова', rating: 5, text: 'Работали 3 часа, результат безупречный.' }
      ]
    },
    {
      id: 'p-cln-balloons-removal', categorySlug: 'cleanup', name: 'Сбор и вывоз шаров',
      price: 1500, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cleanup-3.jpg' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 19,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Объём': 'до 100 шаров', 'Время': '30–60 мин', 'Формат': 'только шары', 'Срок': 'по дате' },
      shortDesc: 'Соберём и вывезем шары и ленты — без мусора и хлопот.',
      included: ['Сбор всех шаров', 'Сматывание лент', 'Вывоз реквизита', 'Чистота после работы'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Очень удобно — не надо думать, что делать со всеми шарами.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Быстро и аккуратно. Рекомендую добавлять к любому заказу шаров.' }
      ]
    },
    {
      id: 'p-cln-dryclean', categorySlug: 'cleanup', name: 'Уборка с химчисткой мебели',
      price: 8500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/cleanup-4.jpg' ],
      contractorId: 'c1', rating: 4.7, reviewsCount: 6,
      occasions: ['jubilee', 'wedding'],
      attributes: { 'Площадь': 'до 80 м²', 'Состав': 'уборка + химчистка', 'Мебель': 'диваны + стулья', 'Срок': 'по дате' },
      shortDesc: 'Уборка помещения плюс химчистка мягкой мебели от пятен.',
      included: ['Полная уборка', 'Химчистка дивана и стульев', 'Вынос мусора', 'Дезодорация'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'На диване было красное вино — вывели без следа. Мастера!' },
        { author: 'Алексей Морозов', rating: 4, text: 'Дорого, но результат отличный.' }
      ]
    },

    /* ---------- CERT (8, свой) — платформа c1 ---------- */
    {
      id: 'p-crt-3000', categorySlug: 'cert', name: 'Подарочный сертификат 3 000 ₽',
      price: 3000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-1.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 8,
      occasions: ['birthday', 'hen', 'jubilee', 'wedding'],
      attributes: { 'Номинал': '3 000 ₽', 'Формат': 'электронный/печатный', 'Срок действия': '12 мес', 'Срок': 'сразу' },
      shortDesc: 'Сертификат Pinkshar на любой повод — дарите праздник, а не вещь.',
      included: ['Номинал 3 000 ₽', 'Электронный или печатный', 'Действует 12 месяцев', 'На любую услугу платформы'],
      reviews: [
        { author: 'Артём Белов', rating: 5, text: 'Подарил коллеге — она сама собрала оформление на день рождения. Удобно.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Электронный пришёл сразу, красиво оформлен.' }
      ]
    },
    {
      id: 'p-crt-5000', categorySlug: 'cert', name: 'Подарочный сертификат 5 000 ₽',
      price: 5000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-2.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 6,
      occasions: ['birthday', 'jubilee', 'wedding', 'gender'],
      attributes: { 'Номинал': '5 000 ₽', 'Формат': 'электронный/печатный', 'Срок действия': '12 мес', 'Срок': 'сразу' },
      shortDesc: 'Сертификат большего номинала — на полноценное оформление.',
      included: ['Номинал 5 000 ₽', 'Электронный или печатный', 'Действует 12 месяцев', 'На любую услугу платформы'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Беспроигрышный подарок. Получатель собрал фотозону и торт.' },
        { author: 'Виктория Седова', rating: 5, text: 'Оформление сертификата приятное, дарить не стыдно.' }
      ]
    },
    {
      id: 'p-crt-10000', categorySlug: 'cert', name: 'Подарочный сертификат 10 000 ₽',
      price: 10000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-3.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 11,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Номинал': '10 000 ₽', 'Формат': 'электронный/печатный', 'Срок действия': '12 мес', 'Срок': 'сразу' },
      shortDesc: 'Большой сертификат — на полный праздник под ключ.',
      included: ['Номинал 10 000 ₽', 'Электронный или печатный', 'Действует 12 месяцев', 'На любую услугу платформы'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Подарил на свадьбу — молодые собрали декор и фотографа.' },
        { author: 'Наталья Громова', rating: 5, text: 'Статусный подарок. Выглядит красиво, номинал достаточный.' }
      ]
    },
    {
      id: 'p-crt-envelope', categorySlug: 'cert', name: 'Подарочный конверт Pinkshar',
      price: 500, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-4.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 22,
      occasions: ['birthday', 'jubilee', 'wedding', 'discharge'],
      attributes: { 'Формат': 'физический конверт', 'Дизайн': 'брендированный', 'Вложение': 'карта + код', 'Срок': '1 день' },
      shortDesc: 'Красивый фирменный конверт с кодом сертификата — идеально для вручения.',
      included: ['Фирменный конверт', 'Карта с кодом', 'Поздравительная открытка', 'Доставка курьером'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Выглядит дорого и стильно. Получатель был в восторге.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Привезли за день. Красиво оформлено.' }
      ]
    },
    {
      id: 'p-crt-holiday-key', categorySlug: 'cert', name: 'Сертификат «Праздник под ключ»',
      price: 25000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-1.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 4,
      occasions: ['birthday', 'jubilee', 'wedding'],
      attributes: { 'Номинал': '25 000 ₽', 'Формат': 'электронный', 'Использование': 'любые услуги', 'Срок действия': '12 мес' },
      shortDesc: 'Полный праздник под ключ — дарите максимум с одним сертификатом.',
      included: ['Номинал 25 000 ₽', 'Консультация менеджера', 'Подбор пакета под повод', 'Действует 12 месяцев'],
      reviews: [
        { author: 'Сергей Поляков', rating: 5, text: 'Подарил родителям — они собрали юбилей полностью через Pinkshar.' },
        { author: 'Екатерина Жукова', rating: 5, text: 'Идеальный подарок тем, у кого скоро важное событие.' }
      ]
    },
    {
      id: 'p-crt-photo', categorySlug: 'cert', name: 'Сертификат на фотосессию',
      price: 8000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-2.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 7,
      occasions: ['birthday', 'wedding', 'jubilee'],
      attributes: { 'Услуга': 'фотосессия', 'Длительность': '1–2 часа', 'Срок действия': '12 мес', 'Срок': 'сразу' },
      shortDesc: 'Сертификат на фотосессию у фотографа Pinkshar.',
      included: ['Фотосессия 1–2 часа', 'Выбор даты', '50+ обработанных кадров', 'Действует 12 месяцев'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Подруге на ДР — она была в восторге от фотографа.' },
        { author: 'Артём Белов', rating: 5, text: 'Отличная идея подарка. Легко активировать.' }
      ]
    },
    {
      id: 'p-crt-cake', categorySlug: 'cert', name: 'Сертификат на торт',
      price: 4000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-3.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 9,
      occasions: ['birthday', 'hen', 'gender'],
      attributes: { 'Услуга': 'торт на заказ', 'Номинал': '4 000 ₽', 'Срок действия': '12 мес', 'Срок': 'сразу' },
      shortDesc: 'Сертификат на торт от кондитерской Лизы — сладкий подарок.',
      included: ['Торт на сумму до 4 000 ₽', 'Консультация кондитера', 'Выбор вкуса и декора', 'Доставка'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Подарила сестре — она заказала бенто-торт с надписью. Очень доволны.' },
        { author: 'Мария Леонтьева', rating: 5, text: 'Вкусный и оригинальный подарок.' }
      ]
    },
    {
      id: 'p-crt-decor', categorySlug: 'cert', name: 'Сертификат на оформление',
      price: 6000, oldPrice: null, priceType: 'fixed',
      photos: [ 'assets/img/cat/cert-4.jpg' ],
      contractorId: 'c1', rating: 5.0, reviewsCount: 5,
      occasions: ['birthday', 'jubilee', 'prom'],
      attributes: { 'Услуга': 'декор шарами', 'Номинал': '6 000 ₽', 'Срок действия': '12 мес', 'Срок': 'сразу' },
      shortDesc: 'Сертификат на оформление шарами — фонтан, гирлянда или фотозона.',
      included: ['Оформление на 6 000 ₽', 'Выбор декора', 'Доставка и монтаж', 'Действует 12 месяцев'],
      reviews: [
        { author: 'Алексей Морозов', rating: 5, text: 'Сын заказал оформление на ДР дочки. Красиво и без хлопот.' },
        { author: 'Наталья Громова', rating: 5, text: 'Хорошая альтернатива цветам.' }
      ]
    },

    /* ---------- COURIER (8, свой) — c1 (логистика площадки) ---------- */
    {
      id: 'p-cur-surprise', categorySlug: 'courier', name: 'Курьер-сюрприз с поздравлением',
      price: 700, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-1.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 14,
      occasions: ['discharge', 'birthday', 'gender'],
      attributes: { 'Зона': 'Москва', 'Время': 'точное по запросу', 'Формат': 'сюрприз', 'Срок': 'по дате' },
      shortDesc: 'Доставка-сюрприз точно ко времени с поздравлением от вас.',
      included: ['Доставка по Москве', 'Точное время вручения', 'Поздравление от заказчика', 'Координация по чату'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Привезли шары к роддому ровно к 9:30. Папа даже не знал — сюрприз удался.' },
        { author: 'Артём Белов', rating: 5, text: 'Доставка на работу к нужной минуте. Коллеги были в шоке.' }
      ]
    },
    {
      id: 'p-cur-discharge', categorySlug: 'courier', name: 'Доставка набора к роддому',
      price: 900, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-2.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 11,
      occasions: ['discharge'],
      attributes: { 'Зона': 'Москва', 'Время': 'к выписке', 'Формат': 'привязка к событию', 'Срок': 'по дате' },
      shortDesc: 'Логистика к выписке: привезём оформление точно к моменту.',
      included: ['Доставка набора шаров', 'Привязка к времени выписки', 'Координация с папой', 'Подъём к входу'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Доставка к роддому минута в минуту. Очень нервничала — зря, всё чётко.' },
        { author: 'Наталья Громова', rating: 5, text: 'Скоординировались по чату, привезли вовремя.' }
      ]
    },
    {
      id: 'p-cur-singing', categorySlug: 'courier', name: 'Поющий курьер',
      price: 2500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-3.jpg' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 17,
      occasions: ['birthday', 'jubilee'],
      attributes: { 'Зона': 'Москва', 'Формат': 'курьер + песня', 'Репертуар': 'на выбор', 'Срок': 'по дате' },
      shortDesc: 'Курьер доставит подарок и исполнит поздравительную песню.',
      included: ['Доставка подарка', 'Живое исполнение песни', 'Цветы или шар от площадки', 'Фото-момент'],
      reviews: [
        { author: 'Наталья Громова', rating: 5, text: 'Мама была в слезах от радости. Курьер спел красиво!' },
        { author: 'Сергей Поляков', rating: 5, text: 'Оригинально и трогательно. Коллеги оценили.' }
      ]
    },
    {
      id: 'p-cur-cake', categorySlug: 'courier', name: 'Доставка торта к событию',
      price: 800, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-4.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 25,
      occasions: ['birthday', 'jubilee', 'gender'],
      attributes: { 'Зона': 'Москва', 'Груз': 'торт до 5 кг', 'Упаковка': 'термобокс', 'Срок': 'по дате' },
      shortDesc: 'Бережная доставка торта — в термобоксе, точно в срок.',
      included: ['Термобокс для торта', 'Аккуратная доставка', 'Точное время', 'Фото при передаче'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Торт доехал целым, ничего не съехало. Профессионалы!' },
        { author: 'Артём Белов', rating: 5, text: 'Привезли бенто-торт идеально. Рекомендую.' }
      ]
    },
    {
      id: 'p-cur-costume', categorySlug: 'courier', name: 'Курьер в костюме персонажа',
      price: 3500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-1.jpg' ],
      contractorId: 'c1', rating: 4.7, reviewsCount: 13,
      occasions: ['birthday'],
      attributes: { 'Зона': 'Москва', 'Персонаж': 'на выбор', 'Формат': 'доставка + образ', 'Срок': 'по дате' },
      shortDesc: 'Курьер в костюме любимого персонажа — шоу прямо у двери.',
      included: ['Доставка подарка', 'Костюм персонажа', 'Короткое поздравление', 'Фото на память'],
      reviews: [
        { author: 'Виктория Седова', rating: 5, text: 'Дочка открыла дверь — а там Эльза! Визг на весь коридор.' },
        { author: 'Алексей Морозов', rating: 4, text: 'Оригинально. Сын был счастлив.' }
      ]
    },
    {
      id: 'p-cur-express2h', categorySlug: 'courier', name: 'Срочная доставка за 2 часа',
      price: 1500, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-2.jpg' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 21,
      occasions: ['birthday', 'discharge', 'jubilee'],
      attributes: { 'Зона': 'Москва', 'Срок': '2 часа', 'Груз': 'до 10 кг', 'Формат': 'экспресс' },
      shortDesc: 'Экспресс-доставка любого заказа в течение 2 часов.',
      included: ['Подача за 30 минут', 'Доставка за 2 часа', 'Трекинг в чате', 'Фото при вручении'],
      reviews: [
        { author: 'Екатерина Жукова', rating: 5, text: 'Заказала утром — привезли к обеду. Спасли праздник!' },
        { author: 'Наталья Громова', rating: 5, text: 'Экспресс работает. Приехали даже раньше.' }
      ]
    },
    {
      id: 'p-cur-night', categorySlug: 'courier', name: 'Доставка ночью, 22–02',
      price: 2000, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-3.jpg' ],
      contractorId: 'c1', rating: 4.8, reviewsCount: 9,
      occasions: ['birthday', 'hen'],
      attributes: { 'Зона': 'Москва', 'Время': '22:00–02:00', 'Груз': 'до 10 кг', 'Формат': 'ночная' },
      shortDesc: 'Ночная доставка — сюрприз ровно в полночь.',
      included: ['Доставка в 22:00–02:00', 'Точное время', 'Координация в мессенджере', 'Фото-момент'],
      reviews: [
        { author: 'Мария Леонтьева', rating: 5, text: 'Ровно в 00:00 позвонили в дверь с шарами. Незабываемо!' },
        { author: 'Сергей Поляков', rating: 4, text: 'Хорошо, опоздали на 10 минут, но всё равно красивый момент.' }
      ]
    },
    {
      id: 'p-cur-card', categorySlug: 'courier', name: 'Курьер с открыткой и мини-букетом',
      price: 1200, oldPrice: null, priceType: 'from',
      photos: [ 'assets/img/cat/courier-4.jpg' ],
      contractorId: 'c1', rating: 4.9, reviewsCount: 18,
      occasions: ['birthday', 'discharge', 'jubilee'],
      attributes: { 'Зона': 'Москва', 'Состав': 'открытка + мини-букет', 'Формат': 'сюрприз', 'Срок': 'по дате' },
      shortDesc: 'Маленький сюрприз с открыткой и мини-букетом от вашего имени.',
      included: ['Брендированная открытка', 'Мини-букет 5 роз', 'Поздравление вашим текстом', 'Доставка'],
      reviews: [
        { author: 'Артём Белов', rating: 5, text: 'Отправил маме в другой район — она звонила со слезами радости.' },
        { author: 'Виктория Седова', rating: 5, text: 'Мило и недорого. Отличный способ поздравить издалека.' }
      ]
    }
  ];

  // helper: офферы по категории — список подрядчиков с этой категорией (на будущее, P1).
  // Возвращает массив объектов contractors[], отсортированных по рейтингу убыв.
  function contractorsByCategory(slug) {
    return contractors
      .filter(function (c) { return c.category === slug; })
      .sort(function (a, b) { return b.rating - a.rating; });
  }
  // helper: товары по категории (для листинга uslugi.html?s=slug)
  function productsByCategory(slug) {
    return products.filter(function (p) { return p.categorySlug === slug; });
  }
  // helper: товар по id (для tovar.html?id=)
  function productById(id) {
    return products.find(function (p) { return p.id === id; });
  }
  // helper: подрядчик по id (дублирует SHELL.contractorById на уровне данных,
  // чтобы страницы могли искать исполнителя как через PINK, так и через SHELL)
  function contractorById(id) {
    return contractors.find(function (c) { return c.id === id; });
  }

  /* ============================================================
     ███ ОФФЕРЫ ПОДРЯДЧИКОВ (P1, usluga.html?s=slug) ███
     Для страницы услуги-агрегатора: один экран услуги + список офферов
     разных подрядчиков. Для ядра (balloons) оффер «Студии Гелий» (c1) — первым.
     Каждый оффер:
       contractorId   — id из contractors[]
       priceFrom      — цена ₽ (целое); трактуется с unit как «от …»
       unit           — 'за час' | 'за персону' | 'фикс' | 'за выезд' | 'за смену'
       rating         — рейтинг оффера (0..5)
       reviewsCount   — число отзывов оффера
       nearestDate    — ISO ближайшей свободной даты (рендерить через S.dateShort)
       portfolioPhotos— [2..3] ссылки из gallery (src). Фолбэк через mkt-photo-логику.
       blurb          — короткое торговое предложение (1 строка)
     Доступ: PINK.offersBySlug[slug] или PINK.offersByService(slug) (сорт: ядро-c1
     первым, далее по рейтингу убыв.).
     ============================================================ */
  var offersBySlug = {
    balloons: [
      { contractorId: 'c1', priceFrom: 3500,  unit: 'фикс', rating: 4.9, reviewsCount: 214, nearestDate: '2026-06-24', isCore: true,
        blurb: 'Ядро Pinkshar — собственное производство шаров и оформления.',
        portfolioPhotos: [ BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg', BB + '6/shary-pod-potolok-nezhno-ya_pr993_2.600x600.jpg', BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg' ] },
      { contractorId: 'c7', priceFrom: 6500,  unit: 'за выезд', rating: 4.7, reviewsCount: 54, nearestDate: '2026-06-27',
        blurb: 'Авторские фотозоны и оформление с неон-акцентами.',
        portfolioPhotos: [ BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg', BB + '319/nabor-nezhnyh-sharov-s-belo_pr1198.600x600.jpg' ] }
    ],
    desserts: [
      { contractorId: 'c2', priceFrom: 2200, unit: 'фикс', rating: 5.0, reviewsCount: 167, nearestDate: '2026-06-25',
        blurb: 'Бенто-торты, капкейки и кенди-бары ручной работы.',
        portfolioPhotos: [ BB + '2/buket-iz-sharov-s-edinorog_pr1194.600x600.jpg', BB + '2/buket-iz-sharov-roskosh_pr1028.600x600.jpg' ] }
    ],
    flowers: [
      { contractorId: 'c3', priceFrom: 2800, unit: 'фикс', rating: 4.8, reviewsCount: 132, nearestDate: '2026-06-24',
        blurb: 'Авторские букеты и флористика банкета под палитру.',
        portfolioPhotos: [ BB + '2/tyulpany-iz-sharov_pr1126.600x600.jpeg', BB + '2/buket-iz-sharov-roskosh_pr1028.600x600.jpg' ] }
    ],
    photo: [
      { contractorId: 'c4', priceFrom: 6000, unit: 'за час', rating: 4.9, reviewsCount: 88, nearestDate: '2026-06-26',
        blurb: 'Репортаж момента, мобильный контент и reels-монтаж.',
        portfolioPhotos: [ BB + '378/fotozona-na-vypusknoj-v-d_pr1176.600x600.jpeg', BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg' ] }
    ],
    kidshow: [
      { contractorId: 'c5', priceFrom: 7000, unit: 'за смену', rating: 4.7, reviewsCount: 76, nearestDate: '2026-06-28',
        blurb: 'Шоу пузырей, крио- и научное шоу — безопасно и зрелищно.',
        portfolioPhotos: [ BB + '2/buket-iz-sharov-s-edinorog_pr1194.600x600.jpg', BB + '378/fotozona-iz-sharov-mne-14_pr1178_1.600x600.jpg' ] }
    ],
    animators: [
      { contractorId: 'c6', priceFrom: 5500, unit: 'за час', rating: 4.8, reviewsCount: 103, nearestDate: '2026-06-25',
        blurb: 'Персонажи для детей, ведущий и тамада для взрослых.',
        portfolioPhotos: [ BB + '2/buket-iz-sharov-s-edinorog_pr1194.600x600.jpg', BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg' ] }
    ],
    decor: [
      { contractorId: 'c7', priceFrom: 4500, unit: 'фикс', rating: 4.9, reviewsCount: 54, nearestDate: '2026-06-29',
        blurb: 'Неон-надписи на заказ, текстиль и арки под событие.',
        portfolioPhotos: [ BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg', BB + '380/arka-iz-sharov-na-vypuskno_pr855.600x600.jpg' ] }
    ],
    catering: [
      { contractorId: 'c8', priceFrom: 8500, unit: 'за персону', rating: 4.6, reviewsCount: 61, nearestDate: '2026-07-02',
        blurb: 'Фуршет, канапе и барная стойка с обслуживанием.',
        portfolioPhotos: [ BB + '2/buket-iz-sharov-roskosh_pr1028.600x600.jpg' ] }
    ],
    cleanup: [
      { contractorId: 'c8', priceFrom: 2500, unit: 'за выезд', rating: 4.7, reviewsCount: 16, nearestDate: '2026-06-24',
        blurb: 'Уборка площадки и демонтаж декора после праздника.',
        portfolioPhotos: [ BB + '380/oformlenie-sharami-na-vypu_pr854.600x600.jpg' ] }
    ]
  };

  // helper: офферы услуги (для usluga.html?s=slug). Ядро-оффер c1 (isCore) —
  // первым, остальные по рейтингу убыв. Возвращает копию массива офферов.
  function offersByService(slug) {
    var list = (offersBySlug[slug] || []).slice();
    return list.sort(function (a, b) {
      if (a.isCore && !b.isCore) return -1;
      if (b.isCore && !a.isCore) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }
  // helper: пакет по id (для paket.html?id=)
  function packageById(id) {
    return packages.find(function (p) { return p.id === id; });
  }

  window.PINK = {
    services: services,
    occasions: occasions,
    packages: packages,
    contractors: contractors,
    clients: clients,
    orders: orders,
    chatThreads: chatThreads,
    payments: payments,
    platformKPI: platformKPI,
    timeseries: timeseries,
    labels: labels,
    // --- маркетинг-контент (.mkt-*)
    gallery: gallery,
    serviceCatalog: serviceCatalog,
    occasionDetail: occasionDetail,
    partnerInfo: partnerInfo,
    vision: vision,
    testimonials: testimonials,
    // --- ТОВАРЫ (P0 drill-in) + хелперы связи
    products: products,
    contractorsByCategory: contractorsByCategory,
    productsByCategory: productsByCategory,
    productById: productById,
    contractorById: contractorById,
    // --- P1: офферы услуг-агрегаторов + пакеты-композиты
    offersBySlug: offersBySlug,
    offersByService: offersByService,
    packageById: packageById
  };
})();
