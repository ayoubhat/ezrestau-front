import { Restaurant } from "@/types";

export const restaurant: Restaurant = {
  owner_id: "user_30R96SQT1qo6w5PkSrK3r2vfbNh",
  name: "Burger Street",
  subdomain: "burger-street",
  phone: "01 42 36 58 79",
  email: "contact@burgerstreet.fr",
  address: "12 Rue de la Street Food",
  postal_code: "75001",
  city: "Paris",
  latitude: 48.8566,
  longitude: 2.3522,
  google_maps_link: "https://maps.google.com/?q=48.8566,2.3522",
  social_links: {
    facebook: "https://facebook.com/burgerstreet",
    instagram: "https://instagram.com/burgerstreet",
    tiktok: "https://tiktok.com/@burgerstreet",
    twitter: "https://twitter.com/burgerstreet",
  },
  menu: [
    {
      category: "Nos burgers",
      items: [
        {
          name: "Double Cheese Burger",
          description:
            "Double steak haché, double cheddar, cornichons, sauce burger",
          price: 16.9,
          image_url: "/demo-restaurant/double-cheese.webp",
        },
        {
          name: "Fish Burger",
          description: "Filet de poisson pané, salade, tomate, sauce tartare",
          price: 13.5,
          image_url: "/demo-restaurant/fish-burger.png",
        },
        {
          name: "Classic Burger",
          description: "Steak haché, cheddar, salade, tomate, sauce burger",
          price: 13.5,
          image_url: "/demo-restaurant/classic-burger.png",
        },
        {
          name: "Chicken Burger",
          description: "Poulet pané, salade, tomate, sauce mayo",
          price: 13.5,
          image_url: "/demo-restaurant/chicken-burger.png",
        },
        {
          name: "Chèvre Miel Burger",
          description:
            "Double Smashed, Cheddar, Sauce au choix, Tomate, Salade, Oignon, Chèvre, Miel",
          price: 13.5,
          image_url: "/demo-restaurant/chevre-miel-burger.png",
        },
        {
          name: "Big Bacon",
          description:
            "3 steaks, Cheddar, Sauce au choix, Tomate, Salade, Oignon, Chèvre, Miel",
          price: 13.5,
          image_url: "/demo-restaurant/big-bacon.png",
        },
        {
          name: "Mexican Burger",
          description:
            "Double Smashed, Cheddar, Sauce au choix, Tomate, Salade, Oignon, Guacamole, Jalapeños",
          price: 13.5,
          image_url: "/demo-restaurant/mexican-burger.png",
        },
        {
          name: "Le Frenchy",
          description:
            "Double Smashed, Cheddar, Sauce au choix, Tomate, Salade, Oignon, Fromage de chèvre, Miel",
          price: 13.5,
          image_url: "/demo-restaurant/le-frenchy.png",
        },
      ],
    },
    {
      category: "Nos pizzas",
      items: [
        {
          name: "Pizza Margherita",
          description: "Sauce tomate, mozzarella, basilic frais",
          price: 11.9,
          image_url: "/demo-restaurant/pizza-margherita.webp",
        },
        {
          name: "Pizza Pepperoni",
          description: "Sauce tomate, mozzarella, pepperoni épicé",
          price: 13.9,
          image_url: "/demo-restaurant/pepperoni-pizza.webp",
        },
        {
          name: "Pizza 4 Fromages",
          description: "Mozzarella, gorgonzola, parmesan, chèvre",
          price: 14.5,
          image_url: "/demo-restaurant/4-cheeses-pizza.webp",
        },
        {
          name: "Pizza Végétarienne",
          description: "Légumes grillés, mozzarella, sauce tomate, herbes",
          price: 13.5,
          image_url: "/demo-restaurant/pizza-parmigiana.webp",
        },
        {
          name: "Pizza BBQ Chicken",
          description: "Poulet grillé, oignons rouges, sauce BBQ, mozzarella",
          price: 15.9,
          image_url: "/demo-restaurant/bbq-chicken-pizza.jpg",
        },
        {
          name: "Pizza Saumon",
          description: "Saumon fumé, crème fraîche, aneth, mozzarella",
          price: 16.9,
          image_url: "/demo-restaurant/pizza-saumon.jpg",
        },
      ],
    },
    {
      category: "Nos tacos",
      items: [
        {
          name: "Tacos Beef",
          description: "Viande de bœuf épicée, salade, tomate, sauce mexicaine",
          price: 8.9,
          image_url: "/demo-restaurant/tacos.webp",
        },
        {
          name: "Tacos Chicken",
          description: "Poulet grillé, avocat, salade, sauce ranch",
          price: 8.5,
          image_url: "/demo-restaurant/tacos.webp",
        },
        {
          name: "Tacos Fish",
          description: "Poisson grillé, chou rouge, sauce citron vert",
          price: 9.5,
          image_url: "/demo-restaurant/tacos.webp",
        },
        {
          name: "Tacos Veggie",
          description: "Haricots noirs, légumes grillés, guacamole",
          price: 7.9,
          image_url: "/demo-restaurant/tacos.webp",
        },
        {
          name: "Tacos Chorizo",
          description: "Chorizo épicé, poivrons, oignons, sauce piquante",
          price: 9.9,
          image_url: "/demo-restaurant/tacos.webp",
        },
        {
          name: "Tacos Carnitas",
          description: "Porc effiloché, oignons caramélisés, coriandre",
          price: 10.5,
          image_url: "/demo-restaurant/tacos.webp",
        },
      ],
    },
    {
      category: "Nos sandwich",
      items: [
        {
          name: "Sandwich Club",
          description: "Poulet, bacon, salade, tomate, mayo, pain de mie",
          price: 9.9,
          image_url: "/demo-restaurant/sandwich.png",
        },
        {
          name: "Sandwich Jambon Beurre",
          description: "Jambon de Paris, beurre, cornichons, baguette fraîche",
          price: 6.5,
          image_url: "/demo-restaurant/sandwich.png",
        },
        {
          name: "Sandwich Thon Crudités",
          description: "Thon, tomate, concombre, salade, mayo, pain complet",
          price: 8.5,
          image_url: "/demo-restaurant/sandwich.png",
        },
        {
          name: "Sandwich Poulet Curry",
          description: "Poulet au curry, salade, tomate, pain indien",
          price: 9.5,
          image_url: "/demo-restaurant/sandwich.png",
        },
        {
          name: "Sandwich Végétarien",
          description: "Avocat, tomate, concombre, fromage frais, pain complet",
          price: 8.9,
          image_url: "/demo-restaurant/sandwich.png",
        },
        {
          name: "Sandwich Pastrami",
          description: "Pastrami, cornichons, moutarde, pain de seigle",
          price: 11.5,
          image_url: "/demo-restaurant/sandwich.png",
        },
      ],
    },
    {
      category: "Nos wraps",
      items: [
        {
          name: "Wrap Poulet Caesar",
          description: "Poulet grillé, salade romaine, sauce César",
          price: 8.5,
          image_url: "/demo-restaurant/wrap.webp",
        },
        {
          name: "Wrap Végétarien",
          description: "Légumes grillés, houmous, roquette",
          price: 7.5,
          image_url: "/demo-restaurant/wrap.webp",
        },
        {
          name: "Wrap Saumon Fumé",
          description: "Saumon fumé, avocat, crème fraîche, roquette",
          price: 9.5,
          image_url: "/demo-restaurant/wrap.webp",
        },
        {
          name: "Wrap Tex-Mex",
          description:
            "Viande hachée épicée, haricots rouges, maïs, sauce salsa",
          price: 8.9,
          image_url: "/demo-restaurant/wrap.webp",
        },
        {
          name: "Wrap Falafel",
          description: "Falafels, salade, tomate, sauce tahini",
          price: 7.9,
          image_url: "/demo-restaurant/wrap.webp",
        },
      ],
    },
    {
      category: "Nos salade",
      items: [
        {
          name: "Salade César",
          description:
            "Salade romaine, croûtons, parmesan, poulet grillé, sauce césar",
          price: 11.9,
          image_url: "/demo-restaurant/salade.jpg",
        },
        {
          name: "Salade Mexicaine",
          description:
            "Salade verte, haricots rouges, maïs, avocat, sauce mexicaine",
          price: 10.5,
          image_url: "/demo-restaurant/salade.jpg",
        },
        {
          name: "Salade Chèvre Chaud",
          description:
            "Salade verte, chèvre chaud, noix, miel, tomates cerises",
          price: 12.5,
          image_url: "/demo-restaurant/salade.jpg",
        },
        {
          name: "Salade Saumon",
          description: "Salade verte, saumon fumé, avocat, concombre, aneth",
          price: 14.9,
          image_url: "/demo-restaurant/salade.jpg",
        },
        {
          name: "Salade Orientale",
          description: "Salade verte, falafels, houmous, tomate, concombre",
          price: 11.5,
          image_url: "/demo-restaurant/salade.jpg",
        },
        {
          name: "Salade Fitness",
          description:
            "Salade verte, quinoa, légumes grillés, graines, vinaigrette légère",
          price: 10.9,
          image_url: "/demo-restaurant/salade.jpg",
        },
      ],
    },
    {
      category: "Nos desserts",
      items: [
        {
          name: "Brownie Chocolat",
          description: "Brownie au chocolat noir, noix, glace vanille",
          price: 6.5,
          image_url: "/demo-restaurant/brownie.webp",
        },
        {
          name: "Cheesecake New York",
          description: "Cheesecake crémeux, coulis de fruits rouges",
          price: 7.9,
          image_url: "/demo-restaurant/cheesecake.webp",
        },
        {
          name: "Muffin Myrtilles",
          description: "Muffin moelleux aux myrtilles fraîches",
          price: 4.5,
          image_url: "/demo-restaurant/muffin.avif",
        },
        {
          name: "Cookie Chocolat",
          description: "Cookie géant aux pépites de chocolat",
          price: 3.9,
          image_url: "/demo-restaurant/cookie.webp",
        },
      ],
    },
    {
      category: "Nos boissons",
      items: [
        {
          name: "Coca-Cola",
          description: "Coca-Cola original 33cl",
          price: 2.5,
          image_url: "/demo-restaurant/cocacola.webp",
        },
        {
          name: "Jus d'Orange Frais",
          description: "Jus d'orange pressé minute",
          price: 4.5,
          image_url: "/demo-restaurant/jus-orange.png",
        },
        {
          name: "Smoothie Fruits Rouges",
          description: "Smoothie fraises, framboises, myrtilles",
          price: 5.9,
          image_url: "/demo-restaurant/smoothie.webp",
        },

        {
          name: "Milkshake Vanille",
          description: "Milkshake crémeux à la vanille",
          price: 4.9,
          image_url: "/demo-restaurant/vanille.png",
        },
      ],
    },
  ],
  services: [
    "À emporter",
    "Livraison",
    "Sur place",
    "Fait maison",
    "Halal",
    "Wi-Fi gratuit",
  ],
  delivery_info: {
    platforms: [
      {
        name: "deliveroo",
        url: "https://deliveroo.fr/menu/paris/1er-arrondissement/burger-street",
      },
      {
        name: "livraison_du_restaurant",
        url: "https://burgerstreet.fr/commande",
      },
      {
        name: "uber_eats",
        url: "https://ubereats.com/fr/paris/food-delivery/burger-street",
      },
    ],
    zones: ["75001", "75002", "75003", "75004"],
  },
  opening_hours: {
    lundi: [
      { open: "11:30", close: "23:00" },
      { open: "11:30", close: "23:00" },
    ],
    mardi: [{ open: "11:30", close: "23:00" }],
    mercredi: [{ open: "11:30", close: "23:00" }],
    jeudi: [{ open: "11:30", close: "23:00" }],
    vendredi: [{ open: "11:30", close: "23:30" }],
    samedi: [{ open: "12:00", close: "23:30" }],
    dimanche: [{ open: "12:00", close: "22:30" }],
  },
  payments_accepted: [
    "Espèces",
    "Carte bancaire",
    "Chèques",
    "Titres restaurant",
  ],
  legal_info: {
    raison_sociale: "Burger Street SARL",
    forme_juridique: "SARL",
    siret: "12345678901234",
  },
  seo_title:
    "Burger Street - Fast Food Tendance à Paris | Burgers, Pizzas, Tacos",
  seo_description:
    "Découvrez Burger Street, le fast food tendance de Paris. Burgers gourmets, pizzas artisanales, tacos savoureux et bien plus. Livraison rapide.",
  created_at: "2025-01-15T10:30:00Z",
  updated_at: "2025-07-28T20:15:45Z",
};
