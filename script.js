'use strict';
const filters = document.querySelectorAll('[data-filter]');
const listings = document.querySelectorAll('[data-platform]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  listings.forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.platform !== button.dataset.filter; });
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText('0077shariq@gmail.com');
    status.textContent = 'Email copied. Let’s talk soon.';
  } catch {
    status.textContent = 'Copy this address: 0077shariq@gmail.com';
  }
});
