/* =========================================================================
   SIBO Plate — Food & Guidance Database  (Low-FODMAP framework)
   -------------------------------------------------------------------------
   Plain-JS globals so the site runs by simply opening index.html — no
   server, no build step, no internet required.

   STATUS LEGEND
     "green"  → Enjoy freely (low FODMAP)
     "yellow" → Small, measured portions only (low FODMAP up to a threshold)
     "red"    → High FODMAP — best avoided during the elimination phase

   Ratings follow the LOW-FODMAP framework (Monash University), the most
   evidence-based elimination approach for SIBO/IBS. Portion notes reflect
   typical Monash "green-light" thresholds. Branded / fast-food items are
   rated from published dietitian guidance (see Sources) — recipes vary by
   country and location, so always sanity-check the ingredients yourself.

   Each item: { name, cat, status, note, instead? }
     instead → a quick low-FODMAP alternative, shown on trigger foods.
   ========================================================================= */

/* ----------------------------------------------------------------------- */
/* 1. CATEGORIES                                                            */
/* ----------------------------------------------------------------------- */
const FOOD_CATEGORIES = [
  { id: "popular",  label: "Popular & Fast Food", icon: "🍟" },
  { id: "veg",      label: "Vegetables",          icon: "🥕" },
  { id: "fruit",    label: "Fruit",               icon: "🍓" },
  { id: "protein",  label: "Protein",             icon: "🍗" },
  { id: "grain",    label: "Grains & Starches",   icon: "🍚" },
  { id: "dairy",    label: "Dairy & Alts",        icon: "🧀" },
  { id: "nuts",     label: "Nuts & Seeds",        icon: "🥜" },
  { id: "fat",      label: "Fats & Oils",         icon: "🫒" },
  { id: "flavor",   label: "Sauces & Flavor",     icon: "🌿" },
  { id: "sweet",    label: "Sweet & Treats",      icon: "🍯" },
  { id: "drink",    label: "Drinks",              icon: "🥤" }
];

/* ----------------------------------------------------------------------- */
/* 2. FOOD DATABASE                                                         */
/* ----------------------------------------------------------------------- */
const FOODS = [

  /* ============ POPULAR & FAST FOOD ============ */
  { name: "Steak (plain grilled)", cat: "popular", status: "green", note: "Just meat, salt & pepper = zero FODMAPs. A perfect safe choice." },
  { name: "Pork belly (plain roast)", cat: "popular", status: "green", note: "Plain roast pork is FODMAP-free. Skip sweet/garlicky glazes." },
  { name: "Plain beef patty + cheese (no bun)", cat: "popular", status: "green", note: "At McDonald's etc., order the 100% beef patty with cheese, no bun, no onion." },
  { name: "French fries / hot chips (plain)", cat: "popular", status: "green", note: "Potato is low FODMAP. Keep to a moderate serve; US McDonald's fries have a tiny wheat/milk trace but rarely trigger." },
  { name: "Plain potato crisps (salted)", cat: "popular", status: "green", note: "Ready-salted only — onion, BBQ & sour-cream flavours are high FODMAP." },
  { name: "Plain popcorn", cat: "popular", status: "green", note: "Lightly salted, up to a couple of cups." },
  { name: "Simple sushi (salmon, tuna, cucumber, egg)", cat: "popular", status: "green", note: "Rice + fish is ideal. Ask for no spicy mayo, no pickled ginger overload." },
  { name: "Greek salad (no onion)", cat: "popular", status: "green", note: "Tomato, cucumber, feta, olives, oil — ask them to hold the red onion." },
  { name: "McDonald's hash brown", cat: "popular", status: "yellow", note: "Mostly potato, but added flavours may include onion/garlic. Okay occasionally." },
  { name: "Gluten-free pizza (plain)", cat: "popular", status: "yellow", note: "GF base is fine; the risk is the sauce (garlic/onion) and toppings. Ask for plain passata.", instead: "GF base, plain tomato, hard cheese" },
  { name: "Tacos (corn tortilla, plain meat)", cat: "popular", status: "yellow", note: "Corn shells + grilled meat, lettuce, tomato, cheese. Skip beans, onion & garlic salsa." },
  { name: "Milk chocolate bar", cat: "popular", status: "yellow", note: "Low FODMAP up to ~20 g (a few squares); larger amounts bring lactose + sugar." },
  { name: "Cappuccino / latte (regular milk)", cat: "popular", status: "yellow", note: "A small one is okay; a large milky coffee is a big lactose hit.", instead: "Lactose-free or almond-milk coffee" },
  { name: "Big Mac (McDonald's)", cat: "popular", status: "red", note: "Wheat bun, special sauce, onion — multiple triggers at once.", instead: "Plain patty + cheese, no bun, with fries" },
  { name: "KFC fried chicken", cat: "popular", status: "red", note: "Wheat batter plus garlic & onion in the marinade and seasoning. No safe option on the menu.", instead: "Plain grilled chicken" },
  { name: "Chicken nuggets", cat: "popular", status: "red", note: "Wheat coating + onion/garlic seasoning.", instead: "Plain grilled or roast chicken" },
  { name: "Coca-Cola (regular)", cat: "popular", status: "red", note: "Monash testing found cola contains fructans — surprisingly high FODMAP.", instead: "Water, soda water, or lemonade" },
  { name: "Coca-Cola Zero / Diet cola", cat: "popular", status: "red", note: "Also tested high in fructans by Monash; diet versions add polyol sweeteners too.", instead: "Soda water with lime" },
  { name: "Apple pie", cat: "popular", status: "red", note: "High-FODMAP apple inside a wheat-flour pastry — double trouble.", instead: "Strawberries with lactose-free cream" },
  { name: "Regular pizza", cat: "popular", status: "red", note: "Wheat base + garlic/onion tomato sauce + lots of cheese.", instead: "GF base, plain passata, hard cheese, garlic-oil" },
  { name: "Hamburger (with bun & onion)", cat: "popular", status: "red", note: "The bun (wheat) and onion are the problem, not the beef.", instead: "Plain patty + cheese, lettuce, tomato" },
  { name: "Fish & chips (battered)", cat: "popular", status: "red", note: "The batter is wheat flour. The chips alone are usually fine.", instead: "Grilled fish + plain chips" },
  { name: "Hot dog", cat: "popular", status: "red", note: "Wheat bun + a sausage that almost always contains garlic/onion.", instead: "Plain frankfurter (check label) + GF roll" },
  { name: "Burrito / wrap", cat: "popular", status: "red", note: "Flour tortilla, beans, onion and garlic all stack up.", instead: "Corn-tortilla tacos, plain meat, rice" },
  { name: "Ramen (wheat noodles, garlic-onion broth)", cat: "popular", status: "red", note: "Wheat noodles in a broth built on onion and garlic.", instead: "Rice-noodle pho with ginger broth" },
  { name: "Restaurant fried rice", cat: "popular", status: "red", note: "Usually loaded with onion, garlic and soy.", instead: "Plain steamed rice + grilled protein" },
  { name: "Pad Thai", cat: "popular", status: "red", note: "Standard sauce contains garlic, onion and often high-FODMAP extras. Can be made safe on request.", instead: "Ask for a garlic/onion-free rice-noodle stir-fry" },
  { name: "Spring rolls / dumplings", cat: "popular", status: "red", note: "Wheat wrappers plus garlic/onion fillings.", instead: "Fresh rice-paper rolls with safe fillings" },
  { name: "Doughnut / croissant / bagel", cat: "popular", status: "red", note: "All wheat-flour based.", instead: "GF baked goods, or oats with berries" },
  { name: "Pancakes / French toast", cat: "popular", status: "red", note: "Wheat flour (and milk). Watch the syrup too — use maple, not honey.", instead: "GF pancakes with maple syrup & strawberries" },
  { name: "Regular ice cream", cat: "popular", status: "red", note: "Lactose, and often high-fructose corn syrup.", instead: "Lactose-free ice cream or fruit sorbet" },
  { name: "Garlic bread", cat: "popular", status: "red", note: "Wheat bread soaked in real garlic butter.", instead: "GF toast with garlic-infused oil" },

  /* ============ VEGETABLES ============ */
  { name: "Carrot",                cat: "veg", status: "green",  note: "Free serving — a reliable everyday base." },
  { name: "Cucumber",              cat: "veg", status: "green",  note: "Crisp, hydrating, great for snacks." },
  { name: "Bell pepper (red)",     cat: "veg", status: "green",  note: "Sweetest, lowest-FODMAP pepper." },
  { name: "Zucchini / courgette",  cat: "veg", status: "green",  note: "Up to ~65 g; lovely spiralised as 'noodles'." },
  { name: "Eggplant / aubergine",  cat: "veg", status: "green",  note: "Up to ~75 g." },
  { name: "Tomato (common & canned)", cat: "veg", status: "green", note: "Fresh and plain canned both fine." },
  { name: "Cherry tomato",         cat: "veg", status: "green",  note: "Limit ~5 for the lowest dose." },
  { name: "Lettuce (most types)",  cat: "veg", status: "green",  note: "Butter, romaine, iceberg, radicchio." },
  { name: "Baby spinach",          cat: "veg", status: "green",  note: "Up to ~75 g raw." },
  { name: "Kale",                  cat: "veg", status: "green",  note: "Hearty green for sautés and chips." },
  { name: "Bok choy / pak choi",   cat: "veg", status: "green",  note: "Ideal in stir-fries and broths." },
  { name: "Green beans",           cat: "veg", status: "green",  note: "Up to ~75 g (about 15 beans)." },
  { name: "Potato",                cat: "veg", status: "green",  note: "Free serving — a true safe staple." },
  { name: "Parsnip",               cat: "veg", status: "green",  note: "Sweet roasting vegetable." },
  { name: "Radish",                cat: "veg", status: "green",  note: "Peppery crunch for salads." },
  { name: "Chives",                cat: "veg", status: "green",  note: "Your go-to for 'oniony' flavour." },
  { name: "Spring onion (green tops only)", cat: "veg", status: "green", note: "Green part = safe; white part = avoid." },
  { name: "Ginger",                cat: "veg", status: "green",  note: "Soothing; great for nausea and broths." },
  { name: "Bean sprouts",          cat: "veg", status: "green",  note: "Fresh crunch for Asian dishes." },
  { name: "Bamboo shoots",         cat: "veg", status: "green",  note: "Canned, drained." },
  { name: "Olives",                cat: "veg", status: "green",  note: "Salty, satisfying snack." },
  { name: "Swiss chard / silverbeet", cat: "veg", status: "green", note: "Up to ~75 g." },
  { name: "Turnip",                cat: "veg", status: "green",  note: "Up to ~75 g." },
  { name: "Rocket / arugula",      cat: "veg", status: "green",  note: "Peppery salad leaf." },
  { name: "Kabocha / Japanese pumpkin", cat: "veg", status: "green", note: "Up to ~75 g." },
  { name: "Water chestnut",        cat: "veg", status: "green",  note: "Crunchy stir-fry addition." },
  { name: "Seaweed / nori",        cat: "veg", status: "green",  note: "Sushi sheets and snacks." },
  { name: "Choy sum",              cat: "veg", status: "green",  note: "Asian leafy green." },
  { name: "Fennel bulb",           cat: "veg", status: "yellow", note: "Limit ~½ cup (48 g)." },
  { name: "Broccoli (heads)",      cat: "veg", status: "yellow", note: "Heads up to ~75 g; stalks are higher." },
  { name: "Sweet potato",          cat: "veg", status: "yellow", note: "Limit ~75 g (½ cup) — polyols rise above this." },
  { name: "Butternut squash",      cat: "veg", status: "yellow", note: "Limit ~45 g." },
  { name: "Celery",                cat: "veg", status: "yellow", note: "Limit ~¼ stalk (10 g) — mannitol." },
  { name: "Green peas",            cat: "veg", status: "yellow", note: "Limit ~15 g." },
  { name: "Beetroot",              cat: "veg", status: "yellow", note: "Cooked, limit ~20 g (2 slices)." },
  { name: "Savoy cabbage",         cat: "veg", status: "yellow", note: "Limit ~75 g; common cabbage is safer." },
  { name: "Brussels sprouts",      cat: "veg", status: "yellow", note: "Limit ~2 sprouts." },
  { name: "Sweet corn",            cat: "veg", status: "yellow", note: "Limit ~½ cob." },
  { name: "Okra",                  cat: "veg", status: "yellow", note: "Limit ~75 g (about 6 pods)." },
  { name: "Garlic",                cat: "veg", status: "red",    note: "The #1 trigger — very high in fructans.", instead: "Garlic-infused oil" },
  { name: "Onion (all colours)",   cat: "veg", status: "red",    note: "The #2 trigger — high fructans.", instead: "Chives or green spring-onion tops" },
  { name: "Leek bulb",             cat: "veg", status: "red",    note: "Bulb high; the green leaves are okay.", instead: "Leek green leaves" },
  { name: "Shallot",               cat: "veg", status: "red",    note: "Concentrated fructans.", instead: "Garlic-infused oil + chives" },
  { name: "Cauliflower",           cat: "veg", status: "red",    note: "High in mannitol (a polyol).", instead: "Broccoli heads (small) or kabocha" },
  { name: "Mushrooms (button)",    cat: "veg", status: "red",    note: "High in mannitol. Oyster mushrooms are lower.", instead: "Canned/oyster mushrooms (small)" },
  { name: "Artichoke",             cat: "veg", status: "red",    note: "Very high in fructans/inulin." },
  { name: "Asparagus",             cat: "veg", status: "red",    note: "High in fructans + fructose.", instead: "Green beans" },
  { name: "Sugar snap peas",       cat: "veg", status: "red",    note: "High in polyols.", instead: "Green beans or red pepper" },

  /* ============ FRUIT ============ */
  { name: "Strawberry",            cat: "fruit", status: "green", note: "Free serving — a berry star." },
  { name: "Blueberry",             cat: "fruit", status: "green", note: "Up to ~½ cup." },
  { name: "Raspberry",             cat: "fruit", status: "green", note: "Up to ~10 berries (30 g)." },
  { name: "Grapes",                cat: "fruit", status: "green", note: "Free serving — easy grab-and-go." },
  { name: "Kiwi",                  cat: "fruit", status: "green", note: "About 2 small — also aids motility." },
  { name: "Orange",                cat: "fruit", status: "green", note: "1 medium — portable and refreshing." },
  { name: "Mandarin / clementine", cat: "fruit", status: "green", note: "1 medium." },
  { name: "Lemon / Lime",          cat: "fruit", status: "green", note: "Juice freely to brighten dishes." },
  { name: "Pineapple",             cat: "fruit", status: "green", note: "Up to ~1 cup." },
  { name: "Cantaloupe / rockmelon",cat: "fruit", status: "green", note: "Up to ~½ cup (watermelon is NOT safe)." },
  { name: "Papaya / pawpaw",       cat: "fruit", status: "green", note: "Up to ~1 cup." },
  { name: "Dragon fruit",          cat: "fruit", status: "green", note: "Mild and well tolerated." },
  { name: "Passionfruit",          cat: "fruit", status: "green", note: "Tart topping for yogurt." },
  { name: "Banana (firm/unripe)",  cat: "fruit", status: "green", note: "Firm = green light; ripe turns yellow." },
  { name: "Rhubarb",               cat: "fruit", status: "green", note: "Tart; stew with a little sugar." },
  { name: "Plantain (green)",      cat: "fruit", status: "green", note: "Cook like a starchy vegetable." },
  { name: "Banana (ripe)",         cat: "fruit", status: "yellow",note: "Limit ~⅓ medium — fructans rise as it ripens." },
  { name: "Avocado",               cat: "fruit", status: "yellow",note: "Limit ~⅛ whole (30 g) — sorbitol." },
  { name: "Pomegranate",           cat: "fruit", status: "yellow",note: "Limit ~¼ cup seeds." },
  { name: "Grapefruit",            cat: "fruit", status: "yellow",note: "Limit ~½ small." },
  { name: "Coconut (flesh)",       cat: "fruit", status: "yellow",note: "Shredded, limit ~¼ cup." },
  { name: "Lychee",                cat: "fruit", status: "yellow",note: "Limit ~5." },
  { name: "Honeydew melon",        cat: "fruit", status: "yellow",note: "Limit ~½ cup (90 g)." },
  { name: "Apple",                 cat: "fruit", status: "red",   note: "High fructose + sorbitol. Classic trigger.", instead: "Orange, kiwi or grapes" },
  { name: "Pear",                  cat: "fruit", status: "red",   note: "High fructose + sorbitol.", instead: "Firm banana or grapes" },
  { name: "Mango",                 cat: "fruit", status: "red",   note: "Excess fructose.", instead: "Pineapple or papaya" },
  { name: "Watermelon",            cat: "fruit", status: "red",   note: "Fructose + fructans + polyols — triple hit.", instead: "Cantaloupe or honeydew (small)" },
  { name: "Cherries",              cat: "fruit", status: "red",   note: "High in sorbitol.", instead: "Strawberries or blueberries" },
  { name: "Peach / Nectarine",     cat: "fruit", status: "red",   note: "High in polyols.", instead: "Kiwi or orange" },
  { name: "Plum / Apricot",        cat: "fruit", status: "red",   note: "High in sorbitol.", instead: "Grapes or strawberries" },
  { name: "Blackberry",            cat: "fruit", status: "red",   note: "High in sorbitol.", instead: "Blueberries or raspberries" },
  { name: "Dried fruit (raisins, dates, figs)", cat: "fruit", status: "red", note: "Concentrated sugars — very high.", instead: "A small handful of fresh grapes" },

  /* ============ PROTEIN ============ */
  { name: "Chicken",               cat: "protein", status: "green", note: "Plain = zero FODMAPs. A cornerstone." },
  { name: "Turkey",                cat: "protein", status: "green", note: "Lean and versatile." },
  { name: "Beef",                  cat: "protein", status: "green", note: "Unmarinated cuts are FODMAP-free." },
  { name: "Pork",                  cat: "protein", status: "green", note: "Avoid garlic/onion marinades." },
  { name: "Lamb",                  cat: "protein", status: "green", note: "Naturally safe." },
  { name: "Duck",                  cat: "protein", status: "green", note: "Rich and FODMAP-free." },
  { name: "Veal / Venison",        cat: "protein", status: "green", note: "Plain game and veal are fine." },
  { name: "Eggs",                  cat: "protein", status: "green", note: "Boiled, scrambled, poached — perfect." },
  { name: "Fish (salmon, cod, tuna)", cat: "protein", status: "green", note: "Fresh or plain-canned." },
  { name: "Sardines / mackerel / anchovies", cat: "protein", status: "green", note: "Oily fish, great omega-3s." },
  { name: "Shrimp / prawns",       cat: "protein", status: "green", note: "Quick-cooking and safe." },
  { name: "Crab / lobster",        cat: "protein", status: "green", note: "Plain shellfish are fine." },
  { name: "Scallops / mussels / squid", cat: "protein", status: "green", note: "Plain, no garlic-butter sauce." },
  { name: "Plain bacon",           cat: "protein", status: "green", note: "Most plain bacon is low FODMAP." },
  { name: "Prosciutto",            cat: "protein", status: "green", note: "Cured ham, simply made." },
  { name: "Firm tofu",             cat: "protein", status: "green", note: "Pressed/firm only (silken is high)." },
  { name: "Tempeh",                cat: "protein", status: "green", note: "Fermented — well tolerated." },
  { name: "Canned chickpeas",      cat: "protein", status: "yellow",note: "Rinsed well, limit ~¼ cup (42 g)." },
  { name: "Canned lentils",        cat: "protein", status: "yellow",note: "Rinsed well, limit ~¼ cup (46 g)." },
  { name: "Deli ham",              cat: "protein", status: "yellow",note: "Check label for onion/garlic powder." },
  { name: "Salami",                cat: "protein", status: "yellow",note: "Many contain garlic — check the label." },
  { name: "Silken tofu",           cat: "protein", status: "red",   note: "High in GOS — use firm tofu instead.", instead: "Firm/pressed tofu" },
  { name: "Edamame / soybeans",    cat: "protein", status: "red",   note: "Whole soybeans are high in GOS.", instead: "Firm tofu or tempeh" },
  { name: "Dried beans (kidney, black, baked)", cat: "protein", status: "red", note: "High in GOS — gas-forming.", instead: "Rinsed canned chickpeas (¼ cup)" },
  { name: "Sausages (with garlic/onion)", cat: "protein", status: "red", note: "Most contain hidden onion/garlic.", instead: "Plain meat or check-label sausages" },
  { name: "Breaded / crumbed meats", cat: "protein", status: "red", note: "Wheat coating + seasonings.", instead: "Grilled or pan-fried plain" },

  /* ============ GRAINS & STARCHES ============ */
  { name: "White rice",            cat: "grain", status: "green", note: "Free serving — the safest staple of all." },
  { name: "Basmati / jasmine rice",cat: "grain", status: "green", note: "Fragrant and reliably low FODMAP." },
  { name: "Rice noodles",          cat: "grain", status: "green", note: "Great pasta/ramen swap." },
  { name: "Rice paper",            cat: "grain", status: "green", note: "For fresh summer rolls." },
  { name: "Quinoa",                cat: "grain", status: "green", note: "Protein-rich, naturally gluten-free." },
  { name: "Oats (rolled)",         cat: "grain", status: "green", note: "Limit ~½ cup cooked." },
  { name: "Gluten-free bread",     cat: "grain", status: "green", note: "Check for no honey/inulin/chicory root." },
  { name: "Gluten-free pasta",     cat: "grain", status: "green", note: "Rice/corn-based; cook al dente." },
  { name: "Corn tortilla",         cat: "grain", status: "green", note: "Naturally low-FODMAP wrap." },
  { name: "Polenta",               cat: "grain", status: "green", note: "Creamy or grilled." },
  { name: "Buckwheat",             cat: "grain", status: "green", note: "Despite the name, no wheat." },
  { name: "Millet / sorghum",      cat: "grain", status: "green", note: "Mild grains for bowls." },
  { name: "Rice cakes",            cat: "grain", status: "green", note: "Crunchy snack base." },
  { name: "Tortilla / corn chips (plain)", cat: "grain", status: "green", note: "Lightly salted, no onion/garlic flavour." },
  { name: "Brown rice",            cat: "grain", status: "yellow",note: "Limit ~⅓ cup cooked." },
  { name: "Sourdough wheat bread", cat: "grain", status: "yellow",note: "Traditional long-ferment; limit ~2 slices." },
  { name: "Sourdough spelt bread", cat: "grain", status: "yellow",note: "Often better tolerated; limit ~2 slices." },
  { name: "Soba noodles",          cat: "grain", status: "yellow",note: "Choose 100% buckwheat; limit ~⅔ cup." },
  { name: "Cornflakes",            cat: "grain", status: "yellow",note: "Limit ~½ cup; check for malt extract & HFCS." },
  { name: "Wheat bread",           cat: "grain", status: "red",   note: "Fructans — a core trigger.", instead: "GF or genuine sourdough bread" },
  { name: "Wheat pasta",           cat: "grain", status: "red",   note: "Use rice/corn/GF pasta instead.", instead: "Rice or corn (GF) pasta" },
  { name: "Couscous",              cat: "grain", status: "red",   note: "Wheat-based.", instead: "Quinoa or rice" },
  { name: "Barley",                cat: "grain", status: "red",   note: "High fructans (also in many soups).", instead: "Rice or quinoa" },
  { name: "Rye",                   cat: "grain", status: "red",   note: "High fructans.", instead: "GF or sourdough spelt bread" },
  { name: "Wheat breakfast cereal / muesli", cat: "grain", status: "red", note: "Bran, wheat flakes, dried fruit & honey.", instead: "Rolled oats with berries" },

  /* ============ DAIRY & ALTS ============ */
  { name: "Lactose-free milk",     cat: "dairy", status: "green", note: "Tastes like normal milk, no lactose." },
  { name: "Almond milk",           cat: "dairy", status: "green", note: "Unsweetened; check for no inulin." },
  { name: "Hard cheese (cheddar, parmesan, swiss)", cat: "dairy", status: "green", note: "Aged cheeses are virtually lactose-free." },
  { name: "Brie / Camembert",      cat: "dairy", status: "green", note: "Up to ~40 g." },
  { name: "Feta",                  cat: "dairy", status: "green", note: "Up to ~40 g." },
  { name: "Halloumi",              cat: "dairy", status: "green", note: "Firm, low-lactose — great grilled." },
  { name: "Butter / ghee",         cat: "dairy", status: "green", note: "Negligible lactose; ghee has none." },
  { name: "Lactose-free yogurt",   cat: "dairy", status: "green", note: "Great with berries for a snack." },
  { name: "Lactose-free ice cream",cat: "dairy", status: "green", note: "A safe way to enjoy a scoop." },
  { name: "Greek yogurt",          cat: "dairy", status: "yellow",note: "Limit ~¼ cup unless lactose-free." },
  { name: "Cottage cheese",        cat: "dairy", status: "yellow",note: "Limit ~2 tbsp." },
  { name: "Cream cheese",          cat: "dairy", status: "yellow",note: "Limit ~2 tbsp." },
  { name: "Mozzarella",            cat: "dairy", status: "yellow",note: "Limit ~⅓ cup." },
  { name: "Goat cheese (soft)",    cat: "dairy", status: "yellow",note: "Small amounts; aged goat cheese is lower." },
  { name: "Cow's milk",            cat: "dairy", status: "red",   note: "High in lactose.", instead: "Lactose-free or almond milk" },
  { name: "Regular yogurt",        cat: "dairy", status: "red",   note: "Lactose.", instead: "Lactose-free yogurt" },
  { name: "Ice cream",             cat: "dairy", status: "red",   note: "Lactose (often + HFCS).", instead: "Lactose-free ice cream or sorbet" },
  { name: "Soy milk (from whole soybeans)", cat: "dairy", status: "red", note: "High GOS; soy-protein versions are lower.", instead: "Almond or lactose-free milk" },
  { name: "Evaporated / condensed milk", cat: "dairy", status: "red", note: "Concentrated lactose.", instead: "Lactose-free cream" },

  /* ============ NUTS & SEEDS ============ */
  { name: "Almonds",               cat: "nuts", status: "green", note: "Limit ~10 nuts (15 g)." },
  { name: "Walnuts",               cat: "nuts", status: "green", note: "Generous serving; brain-friendly fats." },
  { name: "Pecans",                cat: "nuts", status: "green", note: "Up to ~10 halves." },
  { name: "Macadamias",            cat: "nuts", status: "green", note: "Rich and very well tolerated." },
  { name: "Peanuts",               cat: "nuts", status: "green", note: "Up to ~32 nuts." },
  { name: "Peanut butter",         cat: "nuts", status: "green", note: "Up to ~2 tbsp; check for no added HFCS." },
  { name: "Brazil nuts",           cat: "nuts", status: "green", note: "Up to ~10." },
  { name: "Pine nuts",             cat: "nuts", status: "green", note: "Up to ~1 tbsp." },
  { name: "Pumpkin seeds",         cat: "nuts", status: "green", note: "Up to ~2 tbsp." },
  { name: "Sunflower seeds",       cat: "nuts", status: "green", note: "Up to ~2 tbsp." },
  { name: "Sesame / tahini (small)", cat: "nuts", status: "green", note: "Seeds fine; large tahini portions rise." },
  { name: "Chia seeds",            cat: "nuts", status: "green", note: "Up to ~2 tbsp." },
  { name: "Flax / hemp seeds",     cat: "nuts", status: "green", note: "Up to ~1 tbsp; great fibre." },
  { name: "Hazelnuts",             cat: "nuts", status: "yellow",note: "Limit ~10 nuts." },
  { name: "Almond butter",         cat: "nuts", status: "yellow",note: "Limit ~1 tbsp." },
  { name: "Cashews",               cat: "nuts", status: "red",   note: "High in GOS.", instead: "Macadamias or peanuts" },
  { name: "Pistachios",            cat: "nuts", status: "red",   note: "High in GOS + fructans.", instead: "Walnuts or pumpkin seeds" },

  /* ============ FATS & OILS ============ */
  { name: "Olive oil",             cat: "fat", status: "green", note: "FODMAPs aren't fat-soluble — all pure oils are safe." },
  { name: "Garlic-infused oil",    cat: "fat", status: "green", note: "★ Secret weapon: garlic flavour, no FODMAPs." },
  { name: "Avocado oil",           cat: "fat", status: "green", note: "High smoke point for searing." },
  { name: "Coconut oil",           cat: "fat", status: "green", note: "Good for curries and baking." },
  { name: "Sesame oil",            cat: "fat", status: "green", note: "A few drops add big Asian flavour." },
  { name: "Vegetable / sunflower oil", cat: "fat", status: "green", note: "Neutral, everyday cooking oil." },
  { name: "Butter / ghee",         cat: "fat", status: "green", note: "Ghee is fully lactose-free." },
  { name: "Mayonnaise (plain)",    cat: "fat", status: "green", note: "Check for no garlic/onion." },

  /* ============ SAUCES & FLAVOR ============ */
  { name: "Fresh herbs (basil, parsley, cilantro, mint)", cat: "flavor", status: "green", note: "Use generously for big flavour." },
  { name: "Dried herbs (rosemary, thyme, oregano)", cat: "flavor", status: "green", note: "Pure dried herbs are safe." },
  { name: "Chives",                cat: "flavor", status: "green", note: "The MVP onion substitute." },
  { name: "Ginger",                cat: "flavor", status: "green", note: "Warming and anti-nausea." },
  { name: "Single spices (cumin, turmeric, paprika, cinnamon)", cat: "flavor", status: "green", note: "Pure single spices are safe." },
  { name: "Salt & pepper",         cat: "flavor", status: "green", note: "Always fine." },
  { name: "Asafoetida (hing)",     cat: "flavor", status: "green", note: "A pinch mimics onion/garlic flavour." },
  { name: "Mustard",               cat: "flavor", status: "green", note: "Plain Dijon/yellow, up to 1 tbsp." },
  { name: "Rice / white wine vinegar", cat: "flavor", status: "green", note: "Brighten dressings freely." },
  { name: "Capers",                cat: "flavor", status: "green", note: "Salty pop for sauces and salads." },
  { name: "Maple syrup",           cat: "flavor", status: "green", note: "Best low-FODMAP sweet flavouring." },
  { name: "Soy sauce / tamari",    cat: "flavor", status: "yellow",note: "Limit ~2 tbsp (GF tamari is safer)." },
  { name: "Fish sauce",            cat: "flavor", status: "yellow",note: "A small splash for umami." },
  { name: "Oyster sauce",          cat: "flavor", status: "yellow",note: "Small amounts; check for onion/garlic." },
  { name: "Miso paste",            cat: "flavor", status: "yellow",note: "Limit ~1 tbsp." },
  { name: "Balsamic vinegar",      cat: "flavor", status: "yellow",note: "Limit ~1 tbsp." },
  { name: "Tomato paste",          cat: "flavor", status: "yellow",note: "Limit ~2 tbsp." },
  { name: "Ketchup",               cat: "flavor", status: "yellow",note: "1 sachet (13 g) is fine; more brings HFCS.", instead: "A thin scrape, or mustard" },
  { name: "Curry powder (blend)",  cat: "flavor", status: "yellow",note: "Check blends for garlic/onion." },
  { name: "Garlic (clove/powder)", cat: "flavor", status: "red",   note: "Use garlic-infused oil instead.", instead: "Garlic-infused oil" },
  { name: "Onion powder",          cat: "flavor", status: "red",   note: "Hidden in many seasoning mixes.", instead: "Chives + asafoetida" },
  { name: "Stock cubes (standard)",cat: "flavor", status: "red",   note: "Usually onion/garlic.", instead: "Certified low-FODMAP stock" },
  { name: "Sriracha / chilli-garlic sauce", cat: "flavor", status: "red", note: "Built on garlic.", instead: "Fresh chilli or chilli flakes" },
  { name: "BBQ / pasta / gravy sauces", cat: "flavor", status: "red", note: "Onion, garlic and often HFCS.", instead: "Garlic-oil + fresh tomato" },
  { name: "Hummus",                cat: "flavor", status: "red",   note: "Chickpeas + garlic.", instead: "Roasted-pepper or feta dip" },
  { name: "Pesto (traditional)",   cat: "flavor", status: "red",   note: "Garlic + cashew/pine excess.", instead: "Garlic-oil, basil & parmesan" },

  /* ============ SWEET & TREATS ============ */
  { name: "Table sugar (sucrose)", cat: "sweet", status: "green", note: "Small amounts OK; keep total sugar modest." },
  { name: "Maple syrup",           cat: "sweet", status: "green", note: "Up to ~2 tbsp." },
  { name: "Rice malt syrup",       cat: "sweet", status: "green", note: "Fructose-free." },
  { name: "Stevia",                cat: "sweet", status: "green", note: "Non-fermentable." },
  { name: "Dextrose / glucose",    cat: "sweet", status: "green", note: "Pure glucose is well absorbed." },
  { name: "Dark chocolate",        cat: "sweet", status: "yellow",note: "Limit ~3 squares (30 g)." },
  { name: "Milk / white chocolate",cat: "sweet", status: "yellow",note: "Limit ~20 g — lactose climbs after that." },
  { name: "Jam / marmalade",       cat: "sweet", status: "yellow",note: "A thin scrape; choose low-FODMAP fruit." },
  { name: "Molasses",              cat: "sweet", status: "yellow",note: "Limit ~1 tsp." },
  { name: "Honey",                 cat: "sweet", status: "red",   note: "Excess fructose.", instead: "Maple or rice malt syrup" },
  { name: "Agave",                 cat: "sweet", status: "red",   note: "Very high fructose.", instead: "Maple syrup" },
  { name: "High-fructose corn syrup", cat: "sweet", status: "red", note: "In many sodas/sauces — read labels.", instead: "Table sugar or maple syrup" },
  { name: "Sorbitol, mannitol, xylitol", cat: "sweet", status: "red", note: "Polyols in 'sugar-free' gum/mints/candy.", instead: "Regular sugar in moderation" },
  { name: "Inulin / chicory root", cat: "sweet", status: "red",   note: "Added 'fibre' that ferments heavily.", instead: "Foods without added inulin" },

  /* ============ DRINKS ============ */
  { name: "Water (still/sparkling)", cat: "drink", status: "green", note: "Your best friend between meals." },
  { name: "Black / green / white tea", cat: "drink", status: "green", note: "Brew weak-to-medium strength." },
  { name: "Peppermint tea",        cat: "drink", status: "green", note: "Eases gut spasms and bloating." },
  { name: "Coffee (black)",        cat: "drink", status: "green", note: "~1 cup; add lactose-free/almond milk." },
  { name: "Lemonade (real)",       cat: "drink", status: "green", note: "Lemon, water & a little sugar — refreshing." },
  { name: "Cranberry juice",       cat: "drink", status: "green", note: "Limit ~½ cup, unsweetened." },
  { name: "Spirits (gin, vodka, whisky)", cat: "drink", status: "green", note: "Low FODMAP, but alcohol still irritates the gut." },
  { name: "Tonic water",           cat: "drink", status: "yellow",note: "Fine in a glass; watch added sugars." },
  { name: "Coconut water",         cat: "drink", status: "yellow",note: "Limit ~100 ml — sorbitol rises." },
  { name: "Orange juice",          cat: "drink", status: "yellow",note: "Limit ~½ cup (a whole orange is better)." },
  { name: "Wine",                  cat: "drink", status: "yellow",note: "Limit ~1 glass; dry over sweet." },
  { name: "Beer",                  cat: "drink", status: "yellow",note: "1 standard; carbonation can bloat." },
  { name: "Kombucha",              cat: "drink", status: "yellow",note: "Limit ~⅓ cup." },
  { name: "Cola / soft drinks",    cat: "drink", status: "red",   note: "Monash found cola high in fructans; many sodas use HFCS.", instead: "Soda water, real lemonade or tea" },
  { name: "Apple / pear / mango juice", cat: "drink", status: "red", note: "Concentrated fructose/sorbitol.", instead: "A small glass of orange juice" },
  { name: "Chamomile / fennel tea",cat: "drink", status: "red",   note: "Higher-FODMAP herbal teas.", instead: "Peppermint or green tea" },
  { name: "Oat / soy milk",        cat: "drink", status: "red",   note: "Often high per serving.", instead: "Almond or lactose-free milk" },
  { name: "Rum & sweet liqueurs",  cat: "drink", status: "red",   note: "Added sugars/polyols.", instead: "A measure of gin or vodka" },
  { name: "Sugar-free / diet drinks", cat: "drink", status: "red", note: "Often sweetened with polyols.", instead: "Soda water with fresh lime" }
];

/* ----------------------------------------------------------------------- */
/* 3. AT-A-GLANCE CHEAT SHEET                                               */
/* ----------------------------------------------------------------------- */
const CHEAT_SHEET = {
  eat: [
    { group: "Proteins",    items: "Chicken, beef, pork, lamb, eggs, fish, prawns, firm tofu" },
    { group: "Vegetables",  items: "Carrot, cucumber, zucchini, capsicum, spinach, green beans, potato" },
    { group: "Fruit",       items: "Strawberry, blueberry, grapes, kiwi, orange, firm banana, pineapple" },
    { group: "Carbs",       items: "White rice, quinoa, oats, GF bread & pasta, corn tortillas, polenta" },
    { group: "Dairy",       items: "Lactose-free milk & yogurt, hard cheese, feta, butter" },
    { group: "Flavour",     items: "Garlic-infused oil, chives, ginger, fresh herbs, lemon, single spices" }
  ],
  avoid: [
    { group: "The big two", items: "Onion & garlic (in almost everything savoury)" },
    { group: "Grains",      items: "Wheat bread, pasta, couscous, rye, barley" },
    { group: "Legumes",     items: "Baked beans, kidney/black beans, lentils (large), cashews" },
    { group: "Fruit",       items: "Apple, pear, mango, watermelon, cherries, stone fruit, dried fruit" },
    { group: "Dairy",       items: "Regular milk, yogurt & ice cream (lactose)" },
    { group: "Sweet",       items: "Honey, agave, HFCS, and sugar-free polyols (sorbitol, xylitol)" }
  ]
};

/* ----------------------------------------------------------------------- */
/* 4. GOLDEN RULES                                                          */
/* ----------------------------------------------------------------------- */
const PRINCIPLES = [
  { icon: "🍗", title: "Protein & fat are free", body: "Plain meat, fish, eggs and oils have essentially no FODMAPs. Build every meal around them." },
  { icon: "📏", title: "It's about the dose", body: "Many foods are fine in a small serving and only trigger symptoms in a big one. FODMAPs stack up across a meal." },
  { icon: "🫒", title: "Onion & garlic → infused oil", body: "The flavour you'll miss most. Infused oils give you all the taste with none of the fructans." },
  { icon: "⏱️", title: "Leave gaps between meals", body: "4–5 hours where you can lets your gut's 'cleaning wave' sweep bacteria onward. Constant grazing switches it off." }
];

/* ----------------------------------------------------------------------- */
/* 5. "EAT THIS, NOT THAT" SWAPS                                            */
/* ----------------------------------------------------------------------- */
const SWAPS = [
  { icon: "🍔", avoid: "Big Mac & cola", avoidWhy: "Wheat bun, onion, special sauce — and cola is high in fructans.", eat: "Plain patty, cheese & fries + water", eatHow: "Order the beef patty with cheese, no bun, no onion, plus plain fries and water or soda water." },
  { icon: "🍗", avoid: "KFC fried chicken", avoidWhy: "Wheat batter plus garlic and onion in every layer.", eat: "Plain grilled or roast chicken", eatHow: "Skip the coating entirely — grilled chicken with salt, pepper and lemon is naturally safe." },
  { icon: "🍕", avoid: "Classic pizza", avoidWhy: "Wheat base, garlic-and-onion sauce, a mountain of cheese.", eat: "Gluten-free base pizza", eatHow: "Plain passata (tomato + salt), hard cheese, pepperoni or chicken, red peppers. Drizzle garlic-infused oil." },
  { icon: "🥧", avoid: "Apple pie", avoidWhy: "High-FODMAP apple inside wheat pastry.", eat: "Berries & lactose-free cream", eatHow: "Warm strawberries and blueberries with a little maple syrup and lactose-free cream." },
  { icon: "🍝", avoid: "Pasta in garlic-onion marinara", avoidWhy: "Wheat pasta plus a sauce built on the two biggest triggers.", eat: "Rice/GF pasta, garlic-oil & tomato", eatHow: "Toss in garlic-infused oil, fresh tomato, basil and parmesan — an easy cacio-e-pepe-style bowl." },
  { icon: "🥖", avoid: "Garlic bread", avoidWhy: "Wheat baguette soaked in real garlic butter.", eat: "Sourdough or GF toast, garlic oil", eatHow: "Brush with garlic-infused olive oil, scatter chives and parmesan, then grill." },
  { icon: "🥤", avoid: "Cola / soft drink", avoidWhy: "Monash testing found cola surprisingly high in fructans.", eat: "Soda water or real lemonade", eatHow: "Sparkling water with fresh lime, or a real lemonade made with lemon, water and a little sugar." },
  { icon: "🥣", avoid: "Wheat cereal or muesli", avoidWhy: "Bran, wheat flakes, dried fruit and honey.", eat: "Oats with berries", eatHow: "½ cup rolled oats, lactose-free milk, blueberries, walnuts and a little maple syrup." },
  { icon: "🫘", avoid: "Baked beans on toast", avoidWhy: "Beans are rich in GOS; the sauce hides onion and garlic.", eat: "Eggs or tofu on GF toast", eatHow: "Scrambled eggs or sautéed firm tofu with chives on gluten-free toast." },
  { icon: "🧆", avoid: "Hummus & pita", avoidWhy: "Chickpeas plus raw garlic, scooped with wheat pita.", eat: "Roasted-pepper dip & GF crackers", eatHow: "Blend roasted red pepper with olive oil and feta; dip carrot sticks or gluten-free crackers." },
  { icon: "🍜", avoid: "Ramen in garlic-onion broth", avoidWhy: "Wheat noodles in a broth simmered with onion and garlic.", eat: "Rice-noodle pho-style bowl", eatHow: "Rice noodles in plain bone broth with ginger, bok choy and green spring-onion tops." },
  { icon: "🥗", avoid: "Caesar salad", avoidWhy: "Garlic dressing, wheat croutons, sometimes onion.", eat: "Grilled chicken & parmesan salad", eatHow: "Greens, grilled chicken, parmesan and GF croutons with olive oil, lemon and pepper." },
  { icon: "🍦", avoid: "Ice cream", avoidWhy: "Lactose, often with high-fructose corn syrup.", eat: "Sorbet or lactose-free ice cream", eatHow: "A small scoop of fruit sorbet (no HFCS) or lactose-free ice cream." },
  { icon: "🍎", avoid: "Apple as a snack", avoidWhy: "High fructose plus sorbitol — a frequent bloat trigger.", eat: "Orange, kiwi or grapes", eatHow: "Keep low-FODMAP fruit handy: an orange, two kiwis, or a handful of grapes." },
  { icon: "🍯", avoid: "Honey in tea/yogurt", avoidWhy: "Excess free fructose.", eat: "Maple syrup", eatHow: "Maple syrup sweetens just as well and is low-FODMAP up to ~2 tablespoons." },
  { icon: "☕", avoid: "Large latte", avoidWhy: "A big milky coffee is a large lactose load.", eat: "Lactose-free or almond latte", eatHow: "Ask for lactose-free or almond milk — most cafés now keep it on hand." }
];

/* ----------------------------------------------------------------------- */
/* 6. GRAB-AND-GO SNACKS                                                    */
/* ----------------------------------------------------------------------- */
const SNACKS = [
  { icon: "🥚", name: "Hard-boiled eggs", note: "Protein + fat that keeps you full for hours." },
  { icon: "🍚", name: "Rice cakes + peanut butter", note: "Crunchy, fast, and satisfying." },
  { icon: "🥜", name: "Handful of nuts", note: "10 almonds, macadamias, or walnuts." },
  { icon: "🧀", name: "Cheddar cheese cubes", note: "Aged cheese is essentially lactose-free." },
  { icon: "🥕", name: "Carrot & cucumber sticks", note: "With a roasted-pepper or feta dip." },
  { icon: "🍓", name: "Strawberries or blueberries", note: "A free-serving low-FODMAP berry bowl." },
  { icon: "🍇", name: "Grapes or an orange", note: "The easiest portable fruit." },
  { icon: "🥣", name: "Lactose-free yogurt + berries", note: "Add a few pumpkin seeds for crunch." },
  { icon: "🍿", name: "Plain popcorn", note: "Up to a couple of cups, lightly salted." },
  { icon: "🥩", name: "Beef jerky / biltong", note: "Choose brands with no onion or garlic." },
  { icon: "🍌", name: "Firm banana + peanut butter", note: "Quick energy before activity." },
  { icon: "🫒", name: "Olives", note: "Salty, savoury, shelf-stable." },
  { icon: "🍫", name: "Dark chocolate squares", note: "Up to ~3 squares to curb a sweet craving." },
  { icon: "🥔", name: "Plain salted crisps", note: "Ready-salted only — skip onion & BBQ flavours." }
];

/* ----------------------------------------------------------------------- */
/* 7. SAMPLE DAY (MEAL PLAN)                                                */
/* ----------------------------------------------------------------------- */
const MEAL_PLAN = [
  { slot: "Breakfast", icon: "🌅", title: "Veggie omelette + sourdough", detail: "Eggs with spinach, tomato and chives cooked in garlic-infused oil, with a slice of genuine sourdough or GF toast.", alt: "Or: rolled oats with lactose-free milk, blueberries, walnuts & maple syrup." },
  { slot: "Morning snack", icon: "🍊", title: "Macadamias + a mandarin", detail: "A small handful of macadamias with a mandarin or a few strawberries.", alt: "Or: rice cakes with peanut butter." },
  { slot: "Lunch", icon: "🥗", title: "Chicken & quinoa power bowl", detail: "Grilled chicken, quinoa, cucumber, cherry tomato, grated carrot and baby spinach with olive oil, lemon and feta.", alt: "Or: a turkey-and-cheddar GF wrap with salad." },
  { slot: "Afternoon snack", icon: "🥣", title: "Lactose-free yogurt + berries", detail: "Topped with pumpkin seeds and a drizzle of maple syrup.", alt: "Or: cheddar cubes with cucumber sticks." },
  { slot: "Dinner", icon: "🍽️", title: "Baked salmon, rice & roast veg", detail: "Salmon baked with lemon and herbs, white rice, and roasted zucchini and carrots tossed in garlic-infused oil. Side salad.", alt: "Or: lemon-herb roast chicken with potatoes and green beans." },
  { slot: "Dessert", icon: "🍫", title: "Dark chocolate + strawberries", detail: "A couple of squares of dark chocolate with a few strawberries.", alt: "Or: a small scoop of lactose-free ice cream." }
];

/* ----------------------------------------------------------------------- */
/* 8. RECIPES                                                               */
/* ----------------------------------------------------------------------- */
const RECIPES = [
  {
    icon: "🫒", name: "Garlic-Infused Olive Oil", tagline: "The single most useful thing in a SIBO kitchen.",
    time: "10 min", serves: "Makes ~1 cup",
    why: "FODMAPs in garlic are water-soluble, not oil-soluble. Infusing oil captures all the flavour while leaving the fructans behind.",
    ingredients: ["1 cup good olive oil", "4–6 garlic cloves, peeled & halved"],
    steps: [
      "Warm the oil gently in a small pan over low heat.",
      "Add the garlic cloves and heat 3–5 minutes until fragrant and lightly golden — don't let them brown hard.",
      "Remove from heat and let the cloves steep as it cools.",
      "Strain out and discard every piece of garlic.",
      "Use right away, or refrigerate and use within ~1 week."
    ],
    safety: "Food-safety note: never store homemade garlic-in-oil at room temperature — submerged raw garlic carries a botulism risk. Strain out all solids, keep it refrigerated, and use within a week, or buy a commercial garlic-infused oil."
  },
  {
    icon: "🍝", name: "Garlic-Oil Spaghetti with Tomato & Basil", tagline: "Comfort pasta, minus the triggers.",
    time: "20 min", serves: "Serves 2",
    why: "All the warmth of a classic garlic pasta using infused oil and fresh tomato instead of jarred onion-garlic sauce.",
    ingredients: ["160 g gluten-free or rice spaghetti", "3 tbsp garlic-infused olive oil", "2 ripe tomatoes, diced (or ~10 cherry tomatoes)", "Handful fresh basil, torn", "Parmesan, to serve", "Salt, pepper & chilli flakes"],
    steps: [
      "Cook the pasta in well-salted water until al dente; reserve a splash of pasta water.",
      "Warm the garlic-infused oil, add the tomatoes and a pinch of salt, and soften 4–5 minutes.",
      "Toss the drained pasta through with a little pasta water to make a light sauce.",
      "Off the heat, fold through the basil. Top with parmesan, pepper and chilli flakes."
    ], safety: ""
  },
  {
    icon: "🍗", name: "Lemon-Herb Roast Chicken Tray Bake", tagline: "One pan, zero stress, totally safe.",
    time: "45 min", serves: "Serves 4",
    why: "Plain chicken and low-FODMAP vegetables are naturally trigger-free — flavour comes from lemon, herbs and infused oil.",
    ingredients: ["4 chicken thighs (skin on)", "2 carrots, in batons", "2 zucchini, in chunks", "10 baby potatoes, halved", "3 tbsp garlic-infused olive oil", "1 lemon (juice + wedges)", "Rosemary & thyme, salt & pepper"],
    steps: [
      "Heat oven to 200°C / 400°F.",
      "Toss the vegetables with 2 tbsp garlic-infused oil, salt and pepper; spread on a tray.",
      "Nestle the chicken on top, rub with the remaining oil, lemon juice and herbs.",
      "Tuck in the lemon wedges and roast 35–40 minutes, until golden and cooked through.",
      "Scatter with fresh herbs and a green-chive flourish to serve."
    ], safety: ""
  },
  {
    icon: "🥢", name: "Ginger Chicken & Bok Choy Stir-Fry", tagline: "Takeaway flavour without the onion-garlic-soy overload.",
    time: "20 min", serves: "Serves 2",
    why: "Garlic-infused oil, ginger and green spring-onion tops recreate stir-fry depth; rice keeps it gentle.",
    ingredients: ["2 chicken breasts, sliced", "2 heads bok choy, chopped", "1 red pepper, sliced", "1 carrot, julienned", "2 tbsp garlic-infused oil", "1 tbsp grated ginger", "1–2 tbsp tamari (GF soy)", "Green spring-onion tops & sesame seeds", "Steamed white rice, to serve"],
    steps: [
      "Heat the garlic-infused oil in a wok over high heat and stir-fry the chicken until golden.",
      "Add the carrot and pepper; stir-fry 2 minutes.",
      "Add the ginger and bok choy; stir-fry until just wilted.",
      "Splash in the tamari, toss, and finish with spring-onion tops and sesame seeds over rice."
    ], safety: ""
  },
  {
    icon: "🥤", name: "Berry & Banana Breakfast Smoothie", tagline: "A five-minute, gut-gentle start.",
    time: "5 min", serves: "Serves 1",
    why: "Low-FODMAP fruit and lactose-free dairy give you a creamy, filling smoothie without a fructose hit.",
    ingredients: ["1 cup lactose-free or almond milk", "⅓ ripe banana (or whole firm banana)", "½ cup strawberries", "1 tbsp peanut butter", "1 tbsp chia seeds", "Ice"],
    steps: ["Add everything to a blender.", "Blend until smooth, adding water to reach your preferred thickness.", "Pour and enjoy straight away while the chia is fresh."], safety: ""
  },
  {
    icon: "🍲", name: "Cozy Rice-Noodle Pho-Style Bowl", tagline: "Warming broth that loves your gut back.",
    time: "25 min", serves: "Serves 2",
    why: "A clean ginger broth (no onion/garlic simmer) over rice noodles is soothing and naturally low-FODMAP.",
    ingredients: ["4 cups low-FODMAP or plain bone broth", "1 thumb ginger, sliced", "1 star anise (optional)", "150 g rice noodles", "200 g cooked chicken or rare beef, sliced", "2 heads bok choy", "Bean sprouts, green spring-onion tops, basil, lime, chilli"],
    steps: [
      "Simmer the broth with the ginger and star anise 15 minutes, then remove the aromatics.",
      "Cook the rice noodles per the packet and divide between two bowls.",
      "Blanch the bok choy in the broth for 1 minute.",
      "Top the noodles with the protein and greens, ladle over the hot broth, and finish with sprouts, spring-onion tops, basil and a squeeze of lime."
    ], safety: ""
  }
];

/* ----------------------------------------------------------------------- */
/* 9. EATING-OUT GUIDE                                                      */
/* ----------------------------------------------------------------------- */
const CUISINES = [
  { icon: "🍣", name: "Japanese", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Sashimi & simple sushi (rice, fish, cucumber)", "Grilled fish or chicken teriyaki (sauce on the side)", "Steamed rice & plain tofu", "Miso soup (small) and seaweed salad"],
    skip: ["Edamame (whole soybeans)", "Tempura & gyoza (wheat batter/wrappers)", "Heavy teriyaki/eel glazes (sugar + garlic)"] },
  { icon: "🥩", name: "Steakhouse / Grill", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Plain steak, grilled chicken or fish", "Baked or boiled potato (butter, chives)", "Side salad with oil & vinegar", "Plain steamed vegetables"],
    skip: ["Onion rings & garlic bread", "Garlic-butter or onion-gravy sauces", "Marinades — ask for plain with salt & pepper"] },
  { icon: "🍔", name: "Burgers / Fast food", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Plain beef patty + cheese, no bun / lettuce wrap", "Plain fries (ready-salted)", "Side salad, no onion", "Water or soda water"],
    skip: ["The bun (wheat) & any onion", "Special sauce, BBQ sauce, ketchup in quantity", "Cola and sugary/diet soft drinks", "Crumbed chicken & nuggets"] },
  { icon: "🍕", name: "Italian", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Gluten-free pizza or pasta if available", "Grilled meat or fish (bistecca, pesce)", "Plain tomato (pomodoro) sauce — ask 'no garlic/onion'", "Risotto without onion; polenta; caprese"],
    skip: ["Garlic bread & bruschetta", "Aglio e olio, arrabbiata, marinara with garlic/onion", "Minestrone (beans + onion) & creamy sauces"] },
  { icon: "🌮", name: "Mexican", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Corn-tortilla tacos with grilled meat", "Lettuce, tomato, cheese & a little sour cream", "Plain rice and grilled fish/chicken", "Pico de gallo — ask without onion"],
    skip: ["Refried & black beans (GOS)", "Guacamole (onion + garlic) & onion salsa", "Large flour tortillas & burritos (wheat)"] },
  { icon: "🥙", name: "Greek / Mediterranean", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Grilled souvlaki, lamb, chicken or fish", "Greek salad — ask for no onion", "Rice, potatoes, feta and olives", "A little tzatziki (watch the garlic)"],
    skip: ["Hummus & falafel (chickpeas + garlic)", "Pita and flatbreads (wheat)", "Onion-and-garlic-heavy stews and dips"] },
  { icon: "🍜", name: "Chinese / Thai", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Steamed rice & plainly steamed fish or chicken", "Stir-fries — ask for 'no garlic, no onion'", "Plain rice noodles", "Thai dishes with coconut — keep the portion small"],
    skip: ["Standard garlic-onion, hoisin & oyster sauces", "Wonton, spring rolls, dumplings (wheat)", "Cashew dishes and sweet chilli glazes"] },
  { icon: "🍛", name: "Indian", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Plain basmati rice", "Tandoori or tikka grilled meats (ask about marinade)", "Plain raita if you tolerate a little dairy", "Dishes thickened with tomato, not onion"],
    skip: ["Most curries (onion-garlic-ginger base) & dals (lentils)", "Naan and other wheat breads", "Mango chutney & creamy korma"] }
];

/* ----------------------------------------------------------------------- */
/* 10. KITCHEN & LIFESTYLE TIPS                                             */
/* ----------------------------------------------------------------------- */
const TIPS = [
  { icon: "🫒", title: "Infused oil is your flavour base", body: "Garlic- and onion-infused oils give you the taste everyone misses with none of the FODMAPs. Keep a bottle by the stove." },
  { icon: "🌿", title: "Green tops, not white bulbs", body: "The green parts of spring onions, leeks and chives are low-FODMAP. Use them generously; discard the white bulb." },
  { icon: "🔖", title: "Read every label", body: "Onion powder, garlic powder, inulin/chicory root, honey and high-fructose corn syrup hide in sauces, stocks, snacks and 'healthy' bars." },
  { icon: "🍳", title: "Cook in batches", body: "Pre-cook safe proteins and rice so a compliant meal is always minutes away. Decision-fatigue is what leads to trigger foods." },
  { icon: "🧂", title: "Buy certified staples", body: "Certified low-FODMAP stock, pasta sauce and snack bars remove the guesswork. Look for the Monash or FODMAP-Friendly logos." },
  { icon: "🗣️", title: "Speak up when eating out", body: "Tell staff it's a medical need, not a preference. Most kitchens will happily cook plainer or leave out onion and garlic." }
];

/* ----------------------------------------------------------------------- */
/* 11. THE LOW-FODMAP JOURNEY (3 PHASES)                                    */
/* ----------------------------------------------------------------------- */
const PHASES = [
  { num: "1", name: "Elimination", duration: "2–6 weeks", color: "red",
    blurb: "Cut high-FODMAP foods to calm symptoms quickly. This is the strict, short phase most of this guide focuses on — it is not meant to be permanent." },
  { num: "2", name: "Reintroduction", duration: "6–8 weeks", color: "yellow",
    blurb: "Systematically test one FODMAP group at a time to learn which ones (and what amounts) you personally tolerate. This is where your plate widens again." },
  { num: "3", name: "Personalisation", duration: "Ongoing", color: "green",
    blurb: "Build your long-term diet: keep only the restrictions you actually need. The goal is the widest, most varied diet your gut is comfortable with." }
];

/* ----------------------------------------------------------------------- */
/* 12. SOURCES                                                              */
/* ----------------------------------------------------------------------- */
const SOURCES = [
  { name: "Monash University — High & Low FODMAP Foods", url: "https://www.monashfodmap.com/about-fodmap-and-ibs/high-and-low-fodmap-foods/" },
  { name: "Monash FODMAP — Eating Out Guide", url: "https://www.monashfodmap.com/blog/eating-out-on-low-fodmap-diet-italian/" },
  { name: "Cleveland Clinic — SIBO Diet: Best & Worst Foods", url: "https://health.clevelandclinic.org/sibo-diet" },
  { name: "IBS Diets — Low FODMAP Fast Food Guide", url: "https://www.ibsdiets.org/fodmap-diet/low-fodmap-fast-food/" },
  { name: "The IBS Dietitian — Fast Food on the Low FODMAP Diet", url: "https://theibsdietitian.com/blog/fast-food-on-the-low-fodmap-diet" },
  { name: "Monash — Cola & soft drinks contain FODMAPs", url: "https://www.bellybalance.co.uk/new-analyses-coca-cola-contain-fodmaps/" },
  { name: "Feed Me Phoebe — Garlic-Infused Olive Oil", url: "https://feedmephoebe.com/garlic-infused-olive-oil-low-fodmap/" },
  { name: "Dr. Ruscio — SIBO Foods to Avoid & What You Can Eat", url: "https://drruscio.com/what-foods-should-be-avoided-with-sibo/" }
];
