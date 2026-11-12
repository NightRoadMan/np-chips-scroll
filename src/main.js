import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/cyrillic-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/cyrillic-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/cyrillic-600.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/montserrat/cyrillic-700.css';
import './style.css';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const icon = (name, cls = '') => `<img src="${asset(name + '.svg')}" alt=""${cls ? ` class="${cls}"` : ''}>`;

// Data from the Figma frame. The design has one card; it is repeated so the list is long enough to scroll.
const doctor = {
  name: 'Мартынов Игорь Викторович',
  photo: 'doctor.jpg',
  rating: '4.8',
  reviews: '73 отзыва',
  degree: 'Доктор наук',
  experience: 'Стаж 12 лет',
  specialities: ['ЛОР', 'Оториноларинголог-хирург'],
  age: 'Взрослый',
  clinic: { name: 'Клиника «Капитал Мед»', address: '1-я Брестская ул., д 35', metro: 'м. Маяковская', distance: '200м', phone: '+7 (495) 612-90-44' },
  service: { name: 'Приём ЛОРа', price: '3 000 ₽', oldPrice: '3 500 ₽', points: '−500' },
  dates: [['25 мая', 'Сегодня'], ['26 мая', 'Вторник'], ['27 мая', 'Среда'], ['28 мая', 'Четверг']],
  times: ['11:00', '11:30', '12:00'],
};
const CARDS = [doctor, doctor, doctor];

const state = { filter: false };

function navBar() {
  return `
  <div class="nav">
    <div class="sb">
      ${icon('notch', 'notch')}
      <div class="time">10:10</div>
      <img class="abs" style="right:64.33px;top:19.67px;width:17px;height:10.666px" src="${asset('signal.svg')}" alt="">
      <img class="abs" style="right:44.03px;top:19.33px;width:15.272px;height:10.965px" src="${asset('wifi.svg')}" alt="">
      <img class="abs" style="right:17px;top:19.33px;width:22px;height:11.333px" src="${asset('battery-1.svg')}" alt="">
      <img class="abs" style="right:14.67px;top:23px;width:1.328px;height:4px" src="${asset('battery-2.svg')}" alt="">
      <img class="abs" style="right:19px;top:21.33px;width:18px;height:7.333px" src="${asset('battery-3.svg')}" alt="">
    </div>
    <div class="tb">
      <button class="btn44" type="button"><span class="bg"></span>${icon('chevron-left')}</button>
      <div class="title">ЛОР взрослый</div>
      <button class="btn44" type="button"><span class="bg"></span>${icon('share')}</button>
    </div>
    <div class="tabs">
      <div class="tab">${icon('sort')}Сортировка</div><div class="dv"></div>
      <div class="tab">${icon('filter')}Фильтры</div><div class="dv"></div>
      <div class="tab w113">${icon('pin')}Где</div>
    </div>
  </div>`;
}

function quickChips() {
  return `
  <div class="chips" id="chips">
    <button class="fchip${state.filter ? ' on' : ''}" type="button" data-act="filter">
      ${icon('coin-n')}Оплата баллами${icon('close', 'x')}
    </button>
  </div>`;
}

function card(d) {
  const ln = `<div class="ln">${icon('line')}</div>`;
  return `
  <div class="inner">
    <div class="tags">
      <div class="tag pay">Оплата баллами${icon('info-pay')}<span class="coin-big">${icon('coin-big')}</span></div>
      <div class="tag like">${icon('like')}Нет отрицательных отзывов</div>
    </div>
    <div class="doc">
      <div class="pt">
        <div class="pwl">
          <div class="ph"><img src="${asset(d.photo)}" alt=""></div>
          <div class="lk">${icon('heart')}</div>
        </div>
        <div class="txt">
          <p class="nm">${d.name}</p>
          <div class="mi">
            <div class="rr"><div class="rating">${icon('star')}<span>${d.rating}</span></div><div class="rev"><u>${d.reviews}</u>${icon('chevron-right')}</div></div>
            <div class="exp">${d.degree}${icon('dot')}${d.experience}</div>
          </div>
        </div>
      </div>
      <div class="spec">${d.specialities.map((s) => `<span class="s">${s}</span>`).join('')}<span class="s plain">${d.age}</span></div>
    </div>
    <div class="blk">
      <div class="cc">
        <p class="cn">${d.clinic.name}</p>${ln}
        <div class="wp">
          <div class="pl"><p>${d.clinic.address}</p><div class="mt">${icon('metro')}<span>${d.clinic.metro} <i>${d.clinic.distance}</i></span></div></div>
          ${icon('map')}
        </div>${ln}
        <div class="phn"><p class="n">${d.clinic.phone}</p><p class="c">позвонить</p></div>
      </div>
      <div class="blk">
        <div class="svc">
          <p class="sn">${d.service.name}</p>
          <div class="prb">
            <div class="r1"><p class="p">${d.service.price}</p><p class="o">${d.service.oldPrice}</p></div>
            <div class="r2"><div class="a">с учетом ${d.service.points}${icon('coin')}баллов</div>${icon('info')}</div>
          </div>
        </div>
        <div class="slots">
          <div class="dates">${d.dates.map(([day, wd], i) => `<div class="dt${i === 0 ? ' sel' : ''}"><span class="d">${day}</span><span class="w">${wd}</span></div>`).join('')}</div>
          <div class="times">${d.times.map((t) => `<div class="tm">${t}</div>`).join('')}</div>
        </div>
      </div>
    </div>
    <div class="info">${icon('flash')}Мгновенное подтверждение записи</div>
  </div>`;
}

const phone = document.getElementById('phone');

function render() {
  phone.innerHTML = `
    ${navBar()}
    <div class="scroll" id="scroll">
      ${quickChips()}
      <div class="found">Найдено 17 врачей</div>
      <div class="cards">${CARDS.map(card).join('')}</div>
      <div class="end"></div>
    </div>
    ${icon('home-indicator', 'home')}`;
}

phone.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act="filter"]');
  if (!el) return;
  state.filter = !state.filter;
  el.classList.toggle('on', state.filter);
});

// Demo button: scrolls the list down so the chips stick under the nav bar, then back up.
const demo = document.getElementById('demo');
demo.addEventListener('click', () => {
  const sc = document.getElementById('scroll');
  demo.disabled = true;
  sc.scrollTo({ top: 0 });
  setTimeout(() => sc.scrollTo({ top: 520, behavior: 'smooth' }), 150);
  setTimeout(() => sc.scrollTo({ top: 0, behavior: 'smooth' }), 2600);
  setTimeout(() => { demo.disabled = false; }, 3600);
});

// Fit the 375×964 phone into the window on wide screens.
const stage = document.getElementById('stage');
function fit() {
  if (innerWidth <= 500) { stage.style.transform = ''; stage.style.margin = ''; return; }
  const k = Math.min(1, (innerHeight - 40) / 964, (innerWidth - 320) / 375);
  stage.style.transform = `scale(${k})`;
  stage.style.margin = `${-(964 * (1 - k)) / 2}px ${-(375 * (1 - k)) / 2}px`;
}
addEventListener('resize', fit);

render();
fit();
