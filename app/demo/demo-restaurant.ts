import { Restaurant } from "@/types";

export const restaurant: Restaurant = {
  owner_id: "user_30R96SQT1qo6w5PkSrK3r2vfbNh",
  name: "Burger Street",
  subdomain: "burger-street",
  phone: "01 42 36 58 79",
  email: "contact@burgerstreet.fr",
  address: "123 Rue de la Street Food",
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
          name: "Hamburger",
          description: "Steak 45g, cheddar",
          price: 4.9,
          image_url:
            "/demo-restaurant/photoshoot_for_chez_dimo_restaurant_de_burgers_bougnat_550x440.2-2048x1639.jpg",
        },
        {
          name: "Chicken Crispy Burger",
          description:
            "Filet de poulet pané, salade iceberg, tomate, sauce mayo",
          price: 11.9,
          image_url:
            "/demo-restaurant/c375a660-46a9-4ab7-97c8-e77d113213d6.webp",
        },
        {
          name: "BBQ Bacon Burger",
          description:
            "Steak haché, bacon grillé, oignons caramélisés, sauce BBQ",
          price: 14.5,
          image_url:
            "/demo-restaurant/photoshoot_for_chez_dimo_restaurant_de_burgers_cajun_550x440.2-2048x1639.jpg",
        },
        {
          name: "Veggie Deluxe Burger",
          description: "Steak végétarien, avocat, tomate, salade, sauce vegan",
          price: 13.9,
          image_url:
            "/demo-restaurant/photoshoot_for_chez_dimo_restaurant_de_burgers_helvetique_550x440.2-2048x1639.jpg",
        },
        {
          name: "Double Cheese Burger",
          description:
            "Double steak haché, double cheddar, cornichons, sauce burger",
          price: 16.9,
        },
        {
          name: "Fish Burger",
          description: "Filet de poisson pané, salade, tomate, sauce tartare",
          price: 13.5,
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
        },
        {
          name: "Pizza Pepperoni",
          description: "Sauce tomate, mozzarella, pepperoni épicé",
          price: 13.9,
        },
        {
          name: "Pizza 4 Fromages",
          description: "Mozzarella, gorgonzola, parmesan, chèvre",
          price: 14.5,
        },
        {
          name: "Pizza Végétarienne",
          description: "Légumes grillés, mozzarella, sauce tomate, herbes",
          price: 13.5,
        },
        {
          name: "Pizza BBQ Chicken",
          description: "Poulet grillé, oignons rouges, sauce BBQ, mozzarella",
          price: 15.9,
        },
        {
          name: "Pizza Saumon",
          description: "Saumon fumé, crème fraîche, aneth, mozzarella",
          price: 16.9,
        },
      ],
    },
    {
      category: "Nos tacos",
      items: [
        {
          name: "Taco Beef",
          description: "Viande de bœuf épicée, salade, tomate, sauce mexicaine",
          price: 8.9,
        },
        {
          name: "Taco Chicken",
          description: "Poulet grillé, avocat, salade, sauce ranch",
          price: 8.5,
        },
        {
          name: "Taco Fish",
          description: "Poisson grillé, chou rouge, sauce citron vert",
          price: 9.5,
        },
        {
          name: "Taco Veggie",
          description: "Haricots noirs, légumes grillés, guacamole",
          price: 7.9,
        },
        {
          name: "Taco Chorizo",
          description: "Chorizo épicé, poivrons, oignons, sauce piquante",
          price: 9.9,
        },
        {
          name: "Taco Carnitas",
          description: "Porc effiloché, oignons caramélisés, coriandre",
          price: 10.5,
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
        },
        {
          name: "Sandwich Jambon Beurre",
          description: "Jambon de Paris, beurre, cornichons, baguette fraîche",
          price: 6.5,
        },
        {
          name: "Sandwich Thon Crudités",
          description: "Thon, tomate, concombre, salade, mayo, pain complet",
          price: 8.5,
        },
        {
          name: "Sandwich Poulet Curry",
          description: "Poulet au curry, salade, tomate, pain indien",
          price: 9.5,
        },
        {
          name: "Sandwich Végétarien",
          description: "Avocat, tomate, concombre, fromage frais, pain complet",
          price: 8.9,
        },
        {
          name: "Sandwich Pastrami",
          description: "Pastrami, cornichons, moutarde, pain de seigle",
          price: 11.5,
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
        },
        {
          name: "Cheesecake New York",
          description: "Cheesecake crémeux, coulis de fruits rouges",
          price: 7.9,
        },
        {
          name: "Muffin Myrtilles",
          description: "Muffin moelleux aux myrtilles fraîches",
          price: 4.5,
        },
        {
          name: "Cookie Chocolat",
          description: "Cookie géant aux pépites de chocolat",
          price: 3.9,
        },
        {
          name: "Tiramisu Maison",
          description: "Tiramisu traditionnel fait maison",
          price: 6.9,
        },
        {
          name: "Donut Glacé",
          description: "Donut moelleux avec glaçage coloré",
          price: 3.5,
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
        },
        {
          name: "Jus d'Orange Frais",
          description: "Jus d'orange pressé minute",
          price: 4.5,
        },
        {
          name: "Smoothie Fruits Rouges",
          description: "Smoothie fraises, framboises, myrtilles",
          price: 5.9,
        },
        {
          name: "Café Espresso",
          description: "Café espresso italien",
          price: 2.0,
        },
        {
          name: "Thé Glacé Pêche",
          description: "Thé glacé parfum pêche 50cl",
          price: 3.5,
        },
        {
          name: "Milkshake Vanille",
          description: "Milkshake crémeux à la vanille",
          price: 4.9,
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
        },
        {
          name: "Salade Mexicaine",
          description:
            "Salade verte, haricots rouges, maïs, avocat, sauce mexicaine",
          price: 10.5,
        },
        {
          name: "Salade Chèvre Chaud",
          description:
            "Salade verte, chèvre chaud, noix, miel, tomates cerises",
          price: 12.5,
        },
        {
          name: "Salade Saumon",
          description: "Salade verte, saumon fumé, avocat, concombre, aneth",
          price: 14.9,
        },
        {
          name: "Salade Orientale",
          description: "Salade verte, falafels, houmous, tomate, concombre",
          price: 11.5,
        },
        {
          name: "Salade Fitness",
          description:
            "Salade verte, quinoa, légumes grillés, graines, vinaigrette légère",
          price: 10.9,
        },
      ],
    },
    {
      category: "Tacos",
      items: [
        {
          name: "Taco Beef",
          description: "Viande de bœuf épicée, salade, tomate, sauce mexicaine",
          price: 8.9,
        },
        {
          name: "Taco Chicken",
          description: "Poulet grillé, avocat, salade, sauce ranch",
          price: 8.5,
        },
        {
          name: "Taco Fish",
          description: "Poisson grillé, chou rouge, sauce citron vert",
          price: 9.5,
        },
        {
          name: "Taco Veggie",
          description: "Haricots noirs, légumes grillés, guacamole",
          price: 7.9,
        },
        {
          name: "Taco Chorizo",
          description: "Chorizo épicé, poivrons, oignons, sauce piquante",
          price: 9.9,
        },
        {
          name: "Taco Carnitas",
          description: "Porc effiloché, oignons caramélisés, coriandre",
          price: 10.5,
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
    monday: [
      { open: "11:30", close: "23:00" },
      { open: "11:30", close: "23:00" },
    ],
    tuesday: [{ open: "11:30", close: "23:00" }],
    wednesday: [{ open: "11:30", close: "23:00" }],
    thursday: [{ open: "11:30", close: "23:00" }],
    friday: [{ open: "11:30", close: "23:30" }],
    saturday: [{ open: "12:00", close: "23:30" }],
    sunday: [{ open: "12:00", close: "22:30" }],
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
