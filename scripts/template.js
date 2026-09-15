const Template = {
  category(cat) {
    return `
      <div class="category-bar">
        <img class="category-bar__icon" src="${cat.icon}" alt="">
        <h2 class="category-bar__label">${cat.label}</h2>
      </div>
    `;
  },

  menuItem(item, quantity = 0) {
    return `
      <article class="menu-item" data-id="${item.id}">
        <img class="menu-item__image" src="${item.image}" alt="${item.name}">
        <div class="menu-item__body">
          <h3 class="menu-item__name">${item.name}</h3>
          <p class="menu-item__description">${item.description}</p>
        </div>
        <div class="menu-item__side">
          <span class="menu-item__price">${Template.formatPrice(item.price)}</span>
          ${Template.menuItemAction(item.id, quantity)}
        </div>
      </article>
    `;
  },

  menuItemAction(id, quantity) {
    if (quantity === 0) {
      return `<button class="button" data-action="add-to-basket" data-id="${id}">Add to basket</button>`;
    }
    return `
      <div class="stepper" data-id="${id}">
        <button class="stepper__minus" data-action="decrease" data-id="${id}" aria-label="Menge verringern">−</button>
        <span class="stepper__quantity">${quantity}</span>
        <button class="stepper__plus" data-action="increase" data-id="${id}" aria-label="Menge erhöhen">+</button>
      </div>
    `;
  },

  basketItem(item) {
    return `
      <li class="basket__item" data-id="${item.id}">
        <div class="basket__item-info">
          <span class="basket__item-name">${item.quantity} × ${item.name}</span>
          <button class="basket__item-delete" data-action="remove-from-basket" data-id="${item.id}" aria-label="Entfernen">🗑</button>
        </div>
        <div class="basket__item-row">
          ${Template.menuItemAction(item.id, item.quantity)}
          <span class="basket__item-price">${Template.formatPrice(item.price * item.quantity)}</span>
        </div>
      </li>
    `;
  },

  basketEmpty() {
    return `
      <li class="basket__empty">
        <span class="basket__empty-icon" aria-hidden="true">🛒</span>
        <p>Nothing here yet.<br>Go ahead and choose something delicious!</p>
      </li>
    `;
  },

  formatPrice(value) {
    return `${value.toFixed(2).replace('.', ',')} €`;
  },
};
