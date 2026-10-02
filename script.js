const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navMenu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Hours: single source of truth in data/business.json
async function renderHours() {
  const table = document.getElementById('hours-table');
  if (!table) return;
  try {
    const res = await fetch('data/business.json');
    const { business } = await res.json();
    const h = business.hours;
    const rows = [
      ['Mon – Tue', h.monday],
      ['Wed – Thu', h.wednesday],
      ['Fri – Sun', h.friday],
    ];
    table.innerHTML = rows
      .map(([day, time]) => `<tr><td>${day}</td><td>${time}</td></tr>`)
      .join('');
  } catch {
    table.innerHTML = '<tr><td colspan="2">Call for today&rsquo;s hours</td></tr>';
  }
}

renderHours();
