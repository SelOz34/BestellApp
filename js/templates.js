function getDishTemplate(dish) {
  return `
    <article class="dish">
      <img class="dish__image" src="${dish.image}" alt="${dish.name}"
        width="720" height="480" loading="lazy" />
      <div class="dish__text">
        <h3 class="dish__name">${dish.name}</h3>
        <p class="dish__description">${dish.description}</p>
      </div>
      <p class="dish__price">${formatPrice(dish.price)}</p>
      ${getAddButtonTemplate(dish)}
    </article>`;
}