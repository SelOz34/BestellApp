const deliveryFee = 4.99;

const menu = [
  {
    id: "burger",
    title: "Burger & Sandwiches",
    icon: "assets/img/category-burger.webp",
    dishes: [
      {
        id: "allMeatBurger",
        name: "All meat burger",
        description: "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",
        price: 15.9,
        image: "assets/img/all-meat-burger.webp",
      },
      {
        id: "beefRedBurger",
        name: "Beef red burger",
        description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
        price: 14.9,
        image: "assets/img/beef-red-burger.webp",
      },
      {
        id: "bigChickenBurger",
        name: "Big chicken burger",
        description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
        price: 13.9,
        image: "assets/img/big-chicken-burger.webp",
      },
      {
        id: "veggieMushroomBlackBurger",
        name: "Veggie mushroom black burger",
        description: "Mushrooms, Green salad, Tomatoes, Cheese, Black bun",
        price: 16.9,
        image: "assets/img/veggie-mushroom-black-burger.webp",
      },
    ],
  },
  {
    id: "pizza",
    title: "Pizza (30cm)",
    icon: "assets/img/category-pizza.webp",
    dishes: [
      {
        id: "pizzaMargherita",
        name: "Pizza Margherita",
        description: "Tomato sauce, Mozzarella",
        price: 11.9,
        image: "assets/img/pizza-margherita.webp",
      },
      {
        id: "pizzaChorizo",
        name: "Pizza Chorizo",
        description: "Tomato slices, Mozzarella and Chorizo",
        price: 13.9,
        image: "assets/img/pizza-chorizo.webp",
      },
      {
        id: "pizzaFunghi",
        name: "Pizza Funghi",
        description: "Red onion, Olives, Button mushrooms, Mozzarella",
        price: 12.9,
        image: "assets/img/pizza-funghi.webp",
      },
      {
        id: "pizzaQuattroFormaggi",
        name: "Quattro Formaggi with Chicken",
        description: "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
        price: 14.9,
        image: "assets/img/pizza-quattro-formaggi.webp",
      },
    ],
  },
  {
    id: "salad",
    title: "Salad",
    icon: "assets/img/category-salad.webp",
    dishes: [
      {
        id: "warmBeefArugulaSalad",
        name: "Warm beef arugula salad",
        description:
          "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried tomatoes, Balsamic-vinegar dressing",
        price: 14.9,
        image: "assets/img/warm-beef-arugula-salad.webp",
      },
      {
        id: "miniGreenSalad",
        name: "Mini green salad",
        description: "Green salad, Cucumber, Carrots, Parsley, Radishes",
        price: 7.9,
        image: "assets/img/mini-green-salad.webp",
      },
      {
        id: "seafoodSalad",
        name: "Green salad with seafood",
        description:
          "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
        price: 13.9,
        image: "assets/img/seafood-salad.webp",
      },
      {
        id: "veganTofuSalad",
        name: "Vegan green salad with tofu",
        description:
          "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
        price: 10.9,
        image: "assets/img/vegan-tofu-salad.webp",
      },
    ],
  },
];

const allDishes = menu.flatMap((category) => category.dishes);