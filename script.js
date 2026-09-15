const DELIVERY_FEE = 4.99;
const basket = new Map();
let confirmationTimer;


function renderMenu() {
  const grouped = DB.categories.map(category => ({
    category,
    items: DB.menuItems.filter(item => item.category === category.id),
  }));
  const html = grouped
    .map(group => Template.category(group.category) + group.items
      .map(item => Template.menuItem(item, basket.get(item.id) ?? 0))
      .join(''))
    .join('');
  document.getElementById('menu-list').innerHTML = html;
}


function renderBasket() {
  const ids = [...basket.keys()];
  const list = document.getElementById('basket-list');
  const summary = document.getElementById('basket-summary');
  list.innerHTML = ids.length
    ? ids.map(id => Template.basketItem({ ...findMenuItem(id), quantity: basket.get(id) })).join('')
    : Template.basketEmpty();
  summary.hidden = ids.length === 0;
  if (ids.length === 0) return;
  const subtotal = calculateSubtotal();
  document.getElementById('basket-subtotal').textContent = Template.formatPrice(subtotal);
  document.getElementById('basket-total').textContent = Template.formatPrice(subtotal + DELIVERY_FEE);
}


function calculateSubtotal() {
  let sum = 0;
  basket.forEach((quantity, id) => {
    sum += findMenuItem(id).price * quantity;
  });
  return sum;
}


function findMenuItem(id) {
  return DB.menuItems.find(item => item.id === id);
}


function addToBasket(id) {
  basket.set(id, (basket.get(id) ?? 0) + 1);
  renderMenu();
  renderBasket();
}


function decreaseQuantity(id) {
  const quantity = (basket.get(id) ?? 0) - 1;
  if (quantity > 0) {
    basket.set(id, quantity);
  } else {
    basket.delete(id);
  }
  renderMenu();
  renderBasket();
}


function removeFromBasket(id) {
  basket.delete(id);
  renderMenu();
  renderBasket();
}


function handleMenuClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === 'add-to-basket' || action === 'increase') addToBasket(id);
  if (action === 'decrease') decreaseQuantity(id);
}


function handleBasketClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === 'increase') addToBasket(id);
  if (action === 'decrease') decreaseQuantity(id);
  if (action === 'remove-from-basket') removeFromBasket(id);
}


function placeOrder() {
  basket.clear();
  renderMenu();
  renderBasket();
  showConfirmation();
}


function showConfirmation() {
  const confirmation = document.getElementById('confirmation');
  confirmation.hidden = false;
  clearTimeout(confirmationTimer);
  confirmationTimer = setTimeout(hideConfirmation, 4000);
}


function hideConfirmation() {
  document.getElementById('confirmation').hidden = true;
}


function handleConfirmationClick(event) {
  if (event.target.dataset.action === 'close-confirmation') hideConfirmation();
}


document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderBasket();
  document.getElementById('menu-list').addEventListener('click', handleMenuClick);
  document.getElementById('basket-list').addEventListener('click', handleBasketClick);
  document.getElementById('basket-buy').addEventListener('click', placeOrder);
  document.getElementById('confirmation').addEventListener('click', handleConfirmationClick);
});
