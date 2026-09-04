const Template = {
  menuItem(item) {
    return `
      <article class="menu-item" data-id="${item.id}">
        <img class="icon" src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price.toFixed(2)} €</p>
        <button class="button" data-action="add-to-basket">In den Warenkorb</button>
      </article>
    `;
  },

  basketItem(item) {
    return `
      <li class="basket__item" data-id="${item.id}">
        <span>${item.quantity} × ${item.name}</span>
        <span>${(item.price * item.quantity).toFixed(2)} €</span>
      </li>
    `;
  },
};
