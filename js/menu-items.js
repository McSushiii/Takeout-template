// Menu items data with enhanced descriptions and nutritional info
export const menuItems = {
    burgers: {
        "chicken-burger": {
            name: "Chicken Burger",
            description: "Fresh chicken fillet with lettuce and mayo",
            price: 2.90,
            image: "images/chickenburger.jpg",
            dietary: ["Halal"],
            allergens: ["Gluten", "Eggs"]
        },
        "fish-burger": {
            name: "Fish Burger",
            description: "Fresh fish fillet with tartare sauce",
            price: 2.50,
            image: "images/fishburger.jpg",
            allergens: ["Fish", "Gluten"]
        },
        "cheese-burger": {
            name: "Cheese Burger",
            description: "Beef patty with cheese and sauce",
            price: 2.50,
            image: "images/cheeseburger.jpg",
            allergens: ["Milk", "Gluten"]
        },
        "veggie-burger": {
            name: "Veggie Burger",
            description: "Plant-based patty with fresh salad",
            price: 2.50,
            image: "images/veggieburger.jpg",
            dietary: ["Vegetarian", "Vegan Option"]
        }
    },
    chicken: {
        "wings-bucket": {
            name: "Wings Bucket",
            description: "20 wings, 4 fries & Drink",
            price: 15.99,
            image: "images/wingsbucket.jpg",
            dietary: ["Halal"]
        },
        "4-wings": {
            name: "4 Wings",
            description: "Crispy chicken wings",
            price: 1.70,
            image: "images/4wings.jpg",
            dietary: ["Halal"]
        },
        "10pcs-chicken": {
            name: "10pcs Chicken",
            description: "10 pieces with chips",
            price: 11.99,
            image: "images/10pcschicken.jpg",
            dietary: ["Halal"]
        },
        "6pcs-chicken": {
            name: "6pcs Chicken",
            description: "6 pieces of our signature chicken",
            price: 8.99,
            image: "images/6pcschicken.jpg",
            dietary: ["Halal"]
        },
        "1pc-chicken-chips": {
            name: "1pc Chicken & Chips",
            description: "1 piece with chips",
            price: 2.40,
            image: "images/1pcchicken&chips.jpg",
            dietary: ["Halal"]
        },
        "2pcs-chicken-chips": {
            name: "2pcs Chicken & Chips",
            description: "2 pieces with chips",
            price: 3.70,
            image: "images/2pcschicken&chips.jpg",
            dietary: ["Halal"]
        },
        "3pcs-chicken-chips": {
            name: "3pcs Chicken & Chips",
            description: "3 pieces with chips",
            price: 4.50,
            image: "images/3pcschicken&chips.jpg",
            dietary: ["Halal"]
        },
        "4pcs-chicken-chips": {
            name: "4pcs Chicken & Chips",
            description: "4 pieces with chips",
            price: 5.30,
            image: "images/4pcschicken&chips.jpg",
            dietary: ["Halal"]
        }
    },
    chips: {
        "small-chips": {
            name: "Small Chips",
            description: "Golden crispy fries",
            price: 1.00,
            image: "images/smallchips.jpg",
            dietary: ["Vegetarian", "Vegan"]
        },
        "medium-chips": {
            name: "Medium Chips",
            description: "Perfect portion of crispy fries",
            price: 1.50,
            image: "images/mediumchips.jpg",
            dietary: ["Vegetarian", "Vegan"]
        },
        "large-chips": {
            name: "Large Chips",
            description: "Large portion of golden fries",
            price: 2.00,
            image: "images/largechips.jpg",
            dietary: ["Vegetarian", "Vegan"]
        }
    },
    bbq: {
        "6-bbq-lamb-ribs": {
            name: "6 BBQ Lamb Ribs",
            description: "Tender lamb ribs in BBQ sauce",
            price: 6.50,
            image: "images/6bbqlambribs.jpg",
            dietary: ["Halal"]
        },
        "bbq-hot-wings-6": {
            name: "BBQ Hot Wings (6pcs)",
            description: "Wings in our special BBQ sauce",
            price: 3.50,
            image: "images/bbqhotwings6pcs.jpg",
            dietary: ["Halal"]
        },
        "bbq-hot-wings-10": {
            name: "BBQ Hot Wings (10pcs)",
            description: "Wings in our special BBQ sauce",
            price: 5.00,
            image: "images/bbqhotwings10pcs.jpg",
            dietary: ["Halal"]
        }
    },
    pizza: {
        "margherita": {
            name: "Margherita Pizza",
            description: "Classic cheese & tomato",
            sizes: [
                { size: "Medium 9\"", price: 8.99 },
                { size: "Large 12\"", price: 11.99 },
                { size: "Super 15\"", price: 14.99 }
            ],
            image: "images/margheritapizza.jpg",
            dietary: ["Vegetarian"]
        },
        "pepperoni": {
            name: "Pepperoni Pizza",
            description: "Double pepperoni & extra cheese",
            sizes: [
                { size: "Medium 9\"", price: 10.99 },
                { size: "Large 12\"", price: 13.99 },
                { size: "Super 15\"", price: 16.99 }
            ],
            image: "images/pepperonipizza.jpg"
        },
        "bbq": {
            name: "BBQ Pizza",
            description: "BBQ sauce, chicken, onions, peppers",
            sizes: [
                { size: "Medium 9\"", price: 10.99 },
                { size: "Large 12\"", price: 13.99 },
                { size: "Super 15\"", price: 16.99 }
            ],
            image: "images/bbqpizza.jpg",
            dietary: ["Halal"]
        },
        "vegetarian": {
            name: "Vegetarian Pizza",
            description: "Mushrooms, peppers, sweetcorn, tomato",
            sizes: [
                { size: "Medium 9\"", price: 9.99 },
                { size: "Large 12\"", price: 12.99 },
                { size: "Super 15\"", price: 15.99 }
            ],
            image: "images/VegetarianPizza.jpg",
            dietary: ["Vegetarian"]
        }
    },
    drinks: {
        "bottled": {
            "7up-1.5l": {
                name: "7UP 1.5L",
                price: 2.70,
                image: "images/7up1.5l.jpg"
            },
            "coke-1.5l": {
                name: "Coke 1.5L",
                price: 2.70,
                image: "images/coke1.5l.jpg"
            },
            "pepsi-1.5l": {
                name: "Pepsi 1.5L",
                price: 2.70,
                image: "images/pepsi1.5l.jpg"
            },
            "diet-coke-1.5l": {
                name: "Diet Coke 1.5L",
                price: 2.70,
                image: "images/dietcoke1.5l.jpg"
            },
            "tango-1.5l": {
                name: "Tango 1.5L",
                price: 2.70,
                image: "images/tango1.5l.jpg"
            }
        },
        "cans": {
            "7up-can": {
                name: "7UP Can",
                price: 0.99,
                image: "images/7upcan.jpg"
            },
            "coke-can": {
                name: "Coke Can",
                price: 0.99,
                image: "images/cokecan.jpg"
            },
            "diet-pepsi-can": {
                name: "Diet Pepsi Can",
                price: 0.99,
                image: "images/dietpepsican.jpg"
            },
            "dr-pepper-can": {
                name: "Dr Pepper Can",
                price: 0.99,
                image: "images/drpeppercan.jpg"
            },
            "miranda-orange-can": {
                name: "Miranda Orange Can",
                price: 0.99,
                image: "images/mirandaorangecan.jpg"
            },
            "miranda-strawberry-can": {
                name: "Miranda Strawberry Can",
                price: 0.99,
                image: "images/mirandastrawberrycan.jpg"
            },
            "pepsi-can": {
                name: "Pepsi Can",
                price: 0.99,
                image: "images/pepsican.jpg"
            }
        }
    }
};
