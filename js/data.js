/* =========================================================================
   SIBO Plate - Food & Guidance Database  (Low-FODMAP framework)
   -------------------------------------------------------------------------
   Plain-JS globals so the site runs by simply opening index.html - no
   server, no build step, no internet required.

   STATUS LEGEND
     "green"  → Enjoy freely (low FODMAP)
     "yellow" → Moderate - measured portions only (low FODMAP up to a threshold)
     "red"    → High FODMAP - best avoided during the elimination phase

   Ratings follow the LOW-FODMAP framework (Monash University), the most
   evidence-based elimination approach for SIBO/IBS. Portion notes reflect
   typical Monash "green-light" thresholds. Branded / fast-food items are
   rated from published dietitian guidance (see Sources) - recipes vary by
   country and location, so always sanity-check the ingredients yourself.

   Each item: { name, cat, status, note, instead? }
     instead → a quick low-FODMAP alternative, shown on trigger foods.
   ========================================================================= */

/* ----------------------------------------------------------------------- */
/* 1. CATEGORIES                                                            */
/* ----------------------------------------------------------------------- */
const FOOD_CATEGORIES = [
  { id: "popular",  label: "Popular & Fast Food", icon: "🍟" },
  { id: "snacks",   label: "Snacks",              icon: "🍿" },
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
  { name: "Plain potato crisps (salted)", cat: "popular", status: "green", note: "Ready-salted only - onion, BBQ & sour-cream flavours are high FODMAP." },
  { name: "Plain popcorn", cat: "popular", status: "green", note: "Lightly salted, up to about 16 g." },
  { name: "Simple sushi (salmon, tuna, cucumber, egg)", cat: "popular", status: "green", note: "Rice + fish is ideal. Ask for no spicy mayo, no pickled ginger overload." },
  { name: "Greek salad (no onion)", cat: "popular", status: "green", note: "Tomato, cucumber, feta, olives, oil - ask them to hold the red onion." },
  { name: "McDonald's hash brown", cat: "popular", status: "yellow", note: "Mostly potato, but added flavours may include onion/garlic. Okay occasionally." },
  { name: "Gluten-free pizza (plain)", cat: "popular", status: "yellow", note: "A gluten-free base is fine; the risk is the sauce (garlic/onion) and toppings. Ask for plain passata.", instead: "Gluten-free base, plain tomato, hard cheese" },
  { name: "Tacos (corn tortilla, plain meat)", cat: "popular", status: "yellow", note: "Corn shells + grilled meat, lettuce, tomato, cheese. Skip beans, onion & garlic salsa." },
  { name: "Milk chocolate bar", cat: "popular", status: "yellow", note: "Low FODMAP up to ~20 g (a few squares); larger amounts bring lactose + sugar." },
  { name: "Cappuccino / latte (regular milk)", cat: "popular", status: "yellow", note: "A small one is okay; a large milky coffee is a big lactose hit.", instead: "Lactose-free or almond-milk coffee" },
  { name: "Big Mac (McDonald's)", cat: "popular", status: "red", note: "Wheat bun, special sauce, onion - multiple triggers at once.", instead: "Plain patty + cheese, no bun, with fries" },
  { name: "KFC fried chicken", cat: "popular", status: "red", note: "Wheat batter plus garlic & onion in the marinade and seasoning. No safe option on the menu.", instead: "Plain grilled chicken" },
  { name: "Chicken nuggets", cat: "popular", status: "red", note: "Wheat coating + onion/garlic seasoning.", instead: "Plain grilled or roast chicken" },
  { name: "Coca-Cola (regular)", cat: "popular", status: "red", note: "Monash testing found cola contains fructans - surprisingly high FODMAP.", instead: "Water, soda water, or lemonade" },
  { name: "Coca-Cola Zero / Diet cola", cat: "popular", status: "red", note: "Also tested high in fructans by Monash; diet versions add polyol sweeteners too.", instead: "Soda water with lime" },
  { name: "Apple pie", cat: "popular", status: "red", note: "High-FODMAP apple inside a wheat-flour pastry - double trouble.", instead: "Strawberries with lactose-free cream" },
  { name: "Regular pizza", cat: "popular", status: "red", note: "Wheat base + garlic/onion tomato sauce + lots of cheese.", instead: "Gluten-free base, plain passata, hard cheese, garlic-oil" },
  { name: "Hamburger (with bun & onion)", cat: "popular", status: "red", note: "The bun (wheat) and onion are the problem, not the beef.", instead: "Plain patty + cheese, lettuce, tomato" },
  { name: "Fish & chips (battered)", cat: "popular", status: "red", note: "The batter is wheat flour. The chips alone are usually fine.", instead: "Grilled fish + plain chips" },
  { name: "Hot dog", cat: "popular", status: "red", note: "Wheat bun + a sausage that almost always contains garlic/onion.", instead: "Plain frankfurter (check label) + gluten-free roll" },
  { name: "Burrito / wrap", cat: "popular", status: "red", note: "Flour tortilla, beans, onion and garlic all stack up.", instead: "Corn-tortilla tacos, plain meat, rice" },
  { name: "Ramen (wheat noodles, garlic-onion broth)", cat: "popular", status: "red", note: "Wheat noodles in a broth built on onion and garlic.", instead: "Rice-noodle pho with ginger broth" },
  { name: "Restaurant fried rice", cat: "popular", status: "red", note: "Usually loaded with onion, garlic and soy.", instead: "Plain steamed rice + grilled protein" },
  { name: "Pad Thai", cat: "popular", status: "red", note: "Standard sauce contains garlic, onion and often high-FODMAP extras. Can be made safe on request.", instead: "Ask for a garlic/onion-free rice-noodle stir-fry" },
  { name: "Spring rolls / dumplings", cat: "popular", status: "red", note: "Wheat wrappers plus garlic/onion fillings.", instead: "Fresh rice-paper rolls with safe fillings" },
  { name: "Doughnut / croissant / bagel", cat: "popular", status: "red", note: "All wheat-flour based.", instead: "Gluten-free baked goods, or oats with berries" },
  { name: "Pancakes / French toast", cat: "popular", status: "red", note: "Wheat flour (and milk). Watch the syrup too - use maple, not honey.", instead: "Gluten-free pancakes with maple syrup & strawberries" },
  { name: "Regular ice cream", cat: "popular", status: "red", note: "Lactose, and often high-fructose corn syrup.", instead: "Lactose-free ice cream or fruit sorbet" },
  { name: "Garlic bread", cat: "popular", status: "red", note: "Wheat bread soaked in real garlic butter.", instead: "Gluten-free toast with garlic-infused oil" },

  /* ============ VEGETABLES ============ */
  { name: "Carrot",                cat: "veg", status: "green",  note: "Free serving - a reliable everyday base." },
  { name: "Cucumber",              cat: "veg", status: "green",  note: "Crisp, hydrating, great for snacks." },
  { name: "Bell pepper (green)",   cat: "veg", status: "green",  note: "Monash lists green capsicum as the low-FODMAP pepper choice." },
  { name: "Zucchini / courgette",  cat: "veg", status: "green",  note: "Up to ~65 g; lovely spiralised as 'noodles'." },
  { name: "Eggplant / aubergine",  cat: "veg", status: "green",  note: "Up to ~75 g." },
  { name: "Tomato (common & canned)", cat: "veg", status: "green", note: "Fresh and plain canned both fine." },
  { name: "Cherry tomato",         cat: "veg", status: "green",  note: "Limit ~5 for the lowest dose." },
  { name: "Lettuce (most types)",  cat: "veg", status: "green",  note: "Butter, romaine, iceberg, radicchio." },
  { name: "Baby spinach",          cat: "veg", status: "green",  note: "Up to ~75 g raw." },
  { name: "Kale",                  cat: "veg", status: "green",  note: "Hearty green for sautés and chips." },
  { name: "Bok choy / pak choi",   cat: "veg", status: "green",  note: "Ideal in stir-fries and broths." },
  { name: "Green beans",           cat: "veg", status: "green",  note: "Up to ~75 g (about 15 beans)." },
  { name: "Potato",                cat: "veg", status: "green",  note: "Free serving - a true safe staple." },
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
  { name: "Red cabbage",           cat: "veg", status: "green",  note: "Listed by Monash as low at a standard 75 g serve." },
  { name: "White cabbage",         cat: "veg", status: "green",  note: "A low-FODMAP cabbage option at a standard serve." },
  { name: "Collard greens",        cat: "veg", status: "green",  note: "Leafy green listed by Monash as low at a standard serve." },
  { name: "Yam",                   cat: "veg", status: "green",  note: "A Low-FODMAP root/tuber option at a standard serve." },
  { name: "Snow peas",             cat: "veg", status: "green",  note: "Pods listed by Monash as low at a standard 75 g serve." },
  { name: "Pickled beetroot",      cat: "veg", status: "green",  note: "Monash lists pickled beetroot as a low-FODMAP processed veg option." },
  { name: "Corn kernels",          cat: "veg", status: "green",  note: "Low-FODMAP at a standard serve; larger corn portions can add up." },
  { name: "Oyster mushrooms",      cat: "veg", status: "green",  note: "The lower-FODMAP mushroom choice; keep button mushrooms out." },
  { name: "Fennel bulb",           cat: "veg", status: "yellow", note: "Limit ~48 g." },
  { name: "Broccoli (heads)",      cat: "veg", status: "yellow", note: "Heads up to ~75 g; stalks are higher." },
  { name: "Sweet potato",          cat: "veg", status: "yellow", note: "Limit ~75 g - polyols rise above this." },
  { name: "Butternut squash",      cat: "veg", status: "yellow", note: "Limit ~45 g." },
  { name: "Celery",                cat: "veg", status: "yellow", note: "Limit ~¼ stalk (10 g) - mannitol." },
  { name: "Green peas",            cat: "veg", status: "yellow", note: "Limit ~15 g." },
  { name: "Beetroot",              cat: "veg", status: "yellow", note: "Cooked, limit ~20 g (2 slices)." },
  { name: "Savoy cabbage",         cat: "veg", status: "yellow", note: "Limit ~75 g; common cabbage is safer." },
  { name: "Brussels sprouts",      cat: "veg", status: "yellow", note: "Limit ~2 sprouts." },
  { name: "Sweet corn",            cat: "veg", status: "yellow", note: "Limit ~½ cob." },
  { name: "Okra",                  cat: "veg", status: "yellow", note: "Limit ~75 g (about 6 pods)." },
  { name: "Bell pepper (red)",     cat: "veg", status: "red",    note: "Monash's public list now places red capsicum in the high-FODMAP column.", instead: "Green bell pepper" },
  { name: "Garlic",                cat: "veg", status: "red",    note: "The #1 trigger - very high in fructans.", instead: "Garlic-infused oil" },
  { name: "Onion (all colours)",   cat: "veg", status: "red",    note: "The #2 trigger - high fructans.", instead: "Chives or green spring-onion tops" },
  { name: "Leek bulb",             cat: "veg", status: "red",    note: "Bulb high; the green leaves are okay.", instead: "Leek green leaves" },
  { name: "Shallot",               cat: "veg", status: "red",    note: "Concentrated fructans.", instead: "Garlic-infused oil + chives" },
  { name: "Cauliflower",           cat: "veg", status: "red",    note: "High in mannitol (a polyol).", instead: "Broccoli heads (small) or kabocha" },
  { name: "Mushrooms (button)",    cat: "veg", status: "red",    note: "High in mannitol. Oyster mushrooms are lower.", instead: "Canned/oyster mushrooms (small)" },
  { name: "Artichoke",             cat: "veg", status: "red",    note: "Very high in fructans/inulin." },
  { name: "Asparagus",             cat: "veg", status: "red",    note: "High in fructans + fructose.", instead: "Green beans" },
  { name: "Sugar snap peas",       cat: "veg", status: "red",    note: "High in polyols.", instead: "Green beans or green bell pepper" },

  /* ============ FRUIT ============ */
  { name: "Strawberry",            cat: "fruit", status: "green", note: "Free serving - a berry star." },
  { name: "Blueberry",             cat: "fruit", status: "green", note: "Up to ~75 g." },
  { name: "Raspberry",             cat: "fruit", status: "green", note: "Up to ~10 berries (30 g)." },
  { name: "Grapes",                cat: "fruit", status: "green", note: "Free serving - easy grab-and-go." },
  { name: "Kiwi",                  cat: "fruit", status: "green", note: "About 2 small - also aids motility." },
  { name: "Orange",                cat: "fruit", status: "green", note: "1 medium - portable and refreshing." },
  { name: "Mandarin / clementine", cat: "fruit", status: "green", note: "1 medium." },
  { name: "Lemon / Lime",          cat: "fruit", status: "green", note: "Juice freely to brighten dishes." },
  { name: "Pineapple",             cat: "fruit", status: "green", note: "Up to ~140 g." },
  { name: "Cantaloupe / rockmelon",cat: "fruit", status: "green", note: "Up to ~120 g (watermelon is NOT safe)." },
  { name: "Papaya / pawpaw",       cat: "fruit", status: "green", note: "Up to ~140 g." },
  { name: "Dragon fruit",          cat: "fruit", status: "green", note: "Mild and well tolerated." },
  { name: "Passionfruit",          cat: "fruit", status: "green", note: "Tart topping for yogurt." },
  { name: "Banana (firm/unripe)",  cat: "fruit", status: "green", note: "Firm = green light; ripe turns yellow." },
  { name: "Rhubarb",               cat: "fruit", status: "green", note: "Tart; stew with a little sugar." },
  { name: "Plantain (green)",      cat: "fruit", status: "green", note: "Cook like a starchy vegetable." },
  { name: "Star fruit",            cat: "fruit", status: "green", note: "Listed by Monash as a low-FODMAP tropical fruit option." },
  { name: "Banana (ripe)",         cat: "fruit", status: "yellow",note: "Limit ~⅓ medium - fructans rise as it ripens." },
  { name: "Avocado",               cat: "fruit", status: "yellow",note: "Limit ~⅛ whole (30 g) - sorbitol." },
  { name: "Pomegranate",           cat: "fruit", status: "yellow",note: "Limit ~45 g seeds." },
  { name: "Grapefruit",            cat: "fruit", status: "yellow",note: "Limit ~½ small." },
  { name: "Coconut (flesh)",       cat: "fruit", status: "yellow",note: "Shredded, limit ~15 g." },
  { name: "Lychee",                cat: "fruit", status: "yellow",note: "Limit ~5." },
  { name: "Honeydew melon",        cat: "fruit", status: "yellow",note: "Limit ~90 g." },
  { name: "Canned lychee",         cat: "fruit", status: "yellow",note: "Monash lists it as a low-FODMAP processed fruit; keep portions modest." },
  { name: "Banana chips",          cat: "fruit", status: "yellow",note: "A small serve is low-FODMAP, but dried chips are very easy to overeat." },
  { name: "Apple",                 cat: "fruit", status: "red",   note: "High fructose + sorbitol. Classic trigger.", instead: "Orange, kiwi or grapes" },
  { name: "Pear",                  cat: "fruit", status: "red",   note: "High fructose + sorbitol.", instead: "Firm banana or grapes" },
  { name: "Mango",                 cat: "fruit", status: "red",   note: "Excess fructose.", instead: "Pineapple or papaya" },
  { name: "Watermelon",            cat: "fruit", status: "red",   note: "Fructose + fructans + polyols - triple hit.", instead: "Cantaloupe or honeydew (small)" },
  { name: "Cherries",              cat: "fruit", status: "red",   note: "High in sorbitol.", instead: "Strawberries or blueberries" },
  { name: "Peach / Nectarine",     cat: "fruit", status: "red",   note: "High in polyols.", instead: "Kiwi or orange" },
  { name: "Plum / Apricot",        cat: "fruit", status: "red",   note: "High in sorbitol.", instead: "Grapes or strawberries" },
  { name: "Blackberry",            cat: "fruit", status: "red",   note: "High in sorbitol.", instead: "Blueberries or raspberries" },
  { name: "Dried fruit (raisins, dates, figs)", cat: "fruit", status: "red", note: "Concentrated sugars - very high.", instead: "A small handful of fresh grapes" },

  /* ============ PROTEIN ============ */
  { name: "Chicken",               cat: "protein", status: "green", note: "Plain = zero FODMAPs. A cornerstone." },
  { name: "Turkey",                cat: "protein", status: "green", note: "Lean and versatile." },
  { name: "Beef",                  cat: "protein", status: "green", note: "Unmarinated cuts are FODMAP-free." },
  { name: "Pork",                  cat: "protein", status: "green", note: "Avoid garlic/onion marinades." },
  { name: "Lamb",                  cat: "protein", status: "green", note: "Naturally safe." },
  { name: "Duck",                  cat: "protein", status: "green", note: "Rich and FODMAP-free." },
  { name: "Veal / Venison",        cat: "protein", status: "green", note: "Plain game and veal are fine." },
  { name: "Eggs",                  cat: "protein", status: "green", note: "Boiled, scrambled, poached - perfect." },
  { name: "Fish (salmon, cod, tuna)", cat: "protein", status: "green", note: "Fresh or plain-canned." },
  { name: "Sardines / mackerel / anchovies", cat: "protein", status: "green", note: "Oily fish, great omega-3s." },
  { name: "Shrimp / prawns",       cat: "protein", status: "green", note: "Quick-cooking and safe." },
  { name: "Crab / lobster",        cat: "protein", status: "green", note: "Plain shellfish are fine." },
  { name: "Scallops / mussels / squid", cat: "protein", status: "green", note: "Plain, no garlic-butter sauce." },
  { name: "Plain bacon",           cat: "protein", status: "green", note: "Most plain bacon is low FODMAP." },
  { name: "Prosciutto",            cat: "protein", status: "green", note: "Cured ham, simply made." },
  { name: "Firm tofu",             cat: "protein", status: "green", note: "Pressed/firm only (silken is high)." },
  { name: "Tempeh",                cat: "protein", status: "green", note: "Fermented - well tolerated." },
  { name: "Canned chickpeas",      cat: "protein", status: "yellow",note: "Rinsed well, limit ~42 g." },
  { name: "Canned lentils",        cat: "protein", status: "yellow",note: "Rinsed well, limit ~46 g." },
  { name: "Deli ham",              cat: "protein", status: "yellow",note: "Check label for onion/garlic powder." },
  { name: "Salami",                cat: "protein", status: "yellow",note: "Many contain garlic - check the label." },
  { name: "Silken tofu",           cat: "protein", status: "red",   note: "High in GOS - use firm tofu instead.", instead: "Firm/pressed tofu" },
  { name: "Edamame / soybeans",    cat: "protein", status: "red",   note: "Whole soybeans are high in GOS.", instead: "Firm tofu or tempeh" },
  { name: "Dried beans (kidney, black, baked)", cat: "protein", status: "red", note: "High in GOS - gas-forming.", instead: "Rinsed canned chickpeas (~42 g)" },
  { name: "Sausages (with garlic/onion)", cat: "protein", status: "red", note: "Most contain hidden onion/garlic.", instead: "Plain meat or check-label sausages" },
  { name: "Breaded / crumbed meats", cat: "protein", status: "red", note: "Wheat coating + seasonings.", instead: "Grilled or pan-fried plain" },

  /* ============ GRAINS & STARCHES ============ */
  { name: "White rice",            cat: "grain", status: "green", note: "Free serving - the safest staple of all." },
  { name: "Basmati / jasmine rice",cat: "grain", status: "green", note: "Fragrant and reliably low FODMAP." },
  { name: "Rice noodles",          cat: "grain", status: "green", note: "Great pasta/ramen swap." },
  { name: "Rice paper",            cat: "grain", status: "green", note: "For fresh summer rolls." },
  { name: "Quinoa",                cat: "grain", status: "green", note: "Protein-rich, naturally gluten-free." },
  { name: "Oats (rolled)",         cat: "grain", status: "green", note: "Limit ~120 g cooked." },
  { name: "Gluten-free bread",     cat: "grain", status: "green", note: "Check for no honey/inulin/chicory root." },
  { name: "Gluten-free pasta",     cat: "grain", status: "green", note: "Rice/corn-based; cook al dente." },
  { name: "Corn tortilla",         cat: "grain", status: "green", note: "Naturally low-FODMAP wrap." },
  { name: "Polenta",               cat: "grain", status: "green", note: "Creamy or grilled." },
  { name: "Buckwheat",             cat: "grain", status: "green", note: "Despite the name, no wheat." },
  { name: "Millet / sorghum",      cat: "grain", status: "green", note: "Mild grains for bowls." },
  { name: "Quinoa flakes",         cat: "grain", status: "green", note: "Monash lists quinoa flakes as a low-FODMAP cereal option." },
  { name: "Rice cakes",            cat: "grain", status: "green", note: "Crunchy snack base." },
  { name: "Tortilla / corn chips (plain)", cat: "grain", status: "green", note: "Lightly salted, no onion/garlic flavour." },
  { name: "Corn pasta",            cat: "grain", status: "green", note: "A low-FODMAP wheat-free pasta option." },
  { name: "Gluten-free couscous",  cat: "grain", status: "green", note: "Use corn/rice-based couscous, not wheat couscous." },
  { name: "Gluten-free corn flakes", cat: "grain", status: "green", note: "Monash lists gluten-free flakes of corn as a low-FODMAP cereal." },
  { name: "Brown rice",            cat: "grain", status: "yellow",note: "Limit ~65 g cooked." },
  { name: "Sourdough wheat bread", cat: "grain", status: "yellow",note: "Traditional long-ferment; limit ~2 slices." },
  { name: "Sourdough spelt bread", cat: "grain", status: "yellow",note: "Often better tolerated; limit ~2 slices." },
  { name: "Soba noodles",          cat: "grain", status: "yellow",note: "Choose 100% buckwheat; limit ~100 g cooked." },
  { name: "Cornflakes",            cat: "grain", status: "yellow",note: "Limit ~15 g; check for malt extract & HFCS." },
  { name: "Wheat bread",           cat: "grain", status: "red",   note: "Fructans - a core trigger.", instead: "Gluten-free or genuine sourdough bread" },
  { name: "Wheat pasta",           cat: "grain", status: "red",   note: "Use rice, corn or gluten-free pasta instead.", instead: "Rice or corn gluten-free pasta" },
  { name: "Couscous",              cat: "grain", status: "red",   note: "Wheat-based.", instead: "Quinoa or rice" },
  { name: "Barley",                cat: "grain", status: "red",   note: "High fructans (also in many soups).", instead: "Rice or quinoa" },
  { name: "Rye",                   cat: "grain", status: "red",   note: "High fructans.", instead: "Gluten-free or sourdough spelt bread" },
  { name: "Wheat breakfast cereal / muesli", cat: "grain", status: "red", note: "Bran, wheat flakes, dried fruit & honey.", instead: "Rolled oats with berries" },
  { name: "Wheat crackers / biscuits", cat: "grain", status: "red", note: "Wheat-based snack products are in Monash's high-FODMAP column.", instead: "Rice cakes or plain corn chips" },

  /* ============ DAIRY & ALTS ============ */
  { name: "Lactose-free milk",     cat: "dairy", status: "green", note: "Tastes like normal milk, no lactose." },
  { name: "Almond milk",           cat: "dairy", status: "green", note: "Unsweetened; check for no inulin." },
  { name: "Hard cheese (cheddar, parmesan, swiss)", cat: "dairy", status: "green", note: "Aged cheeses are virtually lactose-free." },
  { name: "Brie / Camembert",      cat: "dairy", status: "green", note: "Up to ~40 g." },
  { name: "Feta",                  cat: "dairy", status: "green", note: "Up to ~40 g." },
  { name: "Halloumi",              cat: "dairy", status: "green", note: "Firm, low-lactose - great grilled." },
  { name: "Butter / ghee",         cat: "dairy", status: "green", note: "Negligible lactose; ghee has none." },
  { name: "Lactose-free yogurt",   cat: "dairy", status: "green", note: "Great with berries for a snack." },
  { name: "Lactose-free ice cream",cat: "dairy", status: "green", note: "A safe way to enjoy a scoop." },
  { name: "Soy milk (from soy protein)", cat: "dairy", status: "green", note: "Monash lists soy-protein based dairy alternatives as low; check labels." },
  { name: "Greek yogurt",          cat: "dairy", status: "yellow",note: "Limit ~60 g unless lactose-free." },
  { name: "Cottage cheese",        cat: "dairy", status: "yellow",note: "Limit ~30 g." },
  { name: "Cream cheese",          cat: "dairy", status: "yellow",note: "Limit ~30 g." },
  { name: "Mozzarella",            cat: "dairy", status: "yellow",note: "Limit ~40 g." },
  { name: "Goat cheese (soft)",    cat: "dairy", status: "yellow",note: "Small amounts; aged goat cheese is lower." },
  { name: "Cow's milk",            cat: "dairy", status: "red",   note: "High in lactose.", instead: "Lactose-free or almond milk" },
  { name: "Regular yogurt",        cat: "dairy", status: "red",   note: "Lactose.", instead: "Lactose-free yogurt" },
  { name: "Ice cream",             cat: "dairy", status: "red",   note: "Lactose (often + HFCS).", instead: "Lactose-free ice cream or sorbet" },
  { name: "Custard",               cat: "dairy", status: "red",   note: "Usually cow's milk based, so lactose is the issue.", instead: "Lactose-free custard" },
  { name: "Soy milk (from whole soybeans)", cat: "dairy", status: "red", note: "High GOS; soy-protein versions are lower.", instead: "Almond or lactose-free milk" },
  { name: "Evaporated / condensed milk", cat: "dairy", status: "red", note: "Concentrated lactose.", instead: "Lactose-free cream" },

  /* ============ NUTS & SEEDS ============ */
  { name: "Almonds",               cat: "nuts", status: "green", note: "Limit ~10 nuts (15 g)." },
  { name: "Walnuts",               cat: "nuts", status: "green", note: "Generous serving; brain-friendly fats." },
  { name: "Pecans",                cat: "nuts", status: "green", note: "Up to ~10 halves." },
  { name: "Macadamias",            cat: "nuts", status: "green", note: "Rich and very well tolerated." },
  { name: "Peanuts",               cat: "nuts", status: "green", note: "Up to ~32 nuts." },
  { name: "Peanut butter",         cat: "nuts", status: "green", note: "Up to ~32 g; check for no added HFCS." },
  { name: "Brazil nuts",           cat: "nuts", status: "green", note: "Up to ~10." },
  { name: "Chestnuts",             cat: "nuts", status: "green", note: "Listed by Monash as a low-FODMAP nut option; keep servings sensible." },
  { name: "Pine nuts",             cat: "nuts", status: "green", note: "Up to ~10 g." },
  { name: "Pumpkin seeds",         cat: "nuts", status: "green", note: "Up to ~20 g." },
  { name: "Sunflower seeds",       cat: "nuts", status: "green", note: "Up to ~20 g." },
  { name: "Sesame / tahini (small)", cat: "nuts", status: "green", note: "Seeds fine; large tahini portions rise." },
  { name: "Chia seeds",            cat: "nuts", status: "green", note: "Up to ~20 g." },
  { name: "Flax / hemp seeds",     cat: "nuts", status: "green", note: "Up to ~10 g; great fibre." },
  { name: "Hazelnuts",             cat: "nuts", status: "yellow",note: "Limit ~10 nuts." },
  { name: "Almond butter",         cat: "nuts", status: "yellow",note: "Limit ~16 g." },
  { name: "Cashews",               cat: "nuts", status: "red",   note: "High in GOS.", instead: "Macadamias or peanuts" },
  { name: "Pistachios",            cat: "nuts", status: "red",   note: "High in GOS + fructans.", instead: "Walnuts or pumpkin seeds" },

  /* ============ FATS & OILS ============ */
  { name: "Olive oil",             cat: "fat", status: "green", note: "FODMAPs aren't fat-soluble - all pure oils are safe." },
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
  { name: "Mustard",               cat: "flavor", status: "green", note: "Plain Dijon/yellow, up to 15 g." },
  { name: "Rice / white wine vinegar", cat: "flavor", status: "green", note: "Brighten dressings freely." },
  { name: "Capers",                cat: "flavor", status: "green", note: "Salty pop for sauces and salads." },
  { name: "Maple syrup",           cat: "flavor", status: "green", note: "Best low-FODMAP sweet flavouring." },
  { name: "Soy sauce / tamari",    cat: "flavor", status: "yellow",note: "Limit ~30 g (gluten-free tamari is safer)." },
  { name: "Fish sauce",            cat: "flavor", status: "yellow",note: "A small splash for umami." },
  { name: "Oyster sauce",          cat: "flavor", status: "yellow",note: "Small amounts; check for onion/garlic." },
  { name: "Hoisin sauce",          cat: "flavor", status: "yellow",note: "Monash lists hoisin as an option; use small amounts and check garlic/onion." },
  { name: "Satay sauce",           cat: "flavor", status: "yellow",note: "Can work in small serves, but check for garlic, onion and wheat." },
  { name: "Mint sauce",            cat: "flavor", status: "yellow",note: "A small spoonful can be low-FODMAP; check labels for apple or garlic." },
  { name: "Miso paste",            cat: "flavor", status: "yellow",note: "Limit ~16 g." },
  { name: "Balsamic vinegar",      cat: "flavor", status: "yellow",note: "Limit ~16 g." },
  { name: "Tomato paste",          cat: "flavor", status: "yellow",note: "Limit ~30 g." },
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
  { name: "Maple syrup",           cat: "sweet", status: "green", note: "Up to ~20 g." },
  { name: "Rice malt syrup",       cat: "sweet", status: "green", note: "Fructose-free." },
  { name: "Stevia",                cat: "sweet", status: "green", note: "Non-fermentable." },
  { name: "Dextrose / glucose",    cat: "sweet", status: "green", note: "Pure glucose is well absorbed." },
  { name: "Dark chocolate",        cat: "sweet", status: "yellow",note: "Limit ~3 squares (30 g)." },
  { name: "Milk / white chocolate",cat: "sweet", status: "yellow",note: "Limit ~20 g - lactose climbs after that." },
  { name: "Jam / marmalade",       cat: "sweet", status: "yellow",note: "A thin scrape; choose low-FODMAP fruit." },
  { name: "Molasses",              cat: "sweet", status: "yellow",note: "Limit ~7 g." },
  { name: "Honey",                 cat: "sweet", status: "red",   note: "Excess fructose.", instead: "Maple or rice malt syrup" },
  { name: "Agave",                 cat: "sweet", status: "red",   note: "Very high fructose.", instead: "Maple syrup" },
  { name: "High-fructose corn syrup", cat: "sweet", status: "red", note: "In many sodas/sauces - read labels.", instead: "Table sugar or maple syrup" },
  { name: "Sorbitol, mannitol, xylitol", cat: "sweet", status: "red", note: "Polyols in 'sugar-free' gum/mints/candy.", instead: "Regular sugar in moderation" },
  { name: "Inulin / chicory root", cat: "sweet", status: "red",   note: "Added 'fibre' that ferments heavily.", instead: "Foods without added inulin" },

  /* ============ DRINKS ============ */
  { name: "Water (still/sparkling)", cat: "drink", status: "green", note: "Your best friend between meals." },
  { name: "Black / green / white tea", cat: "drink", status: "green", note: "Brew weak-to-medium strength." },
  { name: "Peppermint tea",        cat: "drink", status: "green", note: "Eases gut spasms and bloating." },
  { name: "Coffee (black)",        cat: "drink", status: "green", note: "~240 g; add lactose-free/almond milk." },
  { name: "Lemonade (real)",       cat: "drink", status: "green", note: "Lemon, water & a little sugar - refreshing." },
  { name: "Cranberry juice",       cat: "drink", status: "green", note: "Limit ~120 g, unsweetened." },
  { name: "Spirits (gin, vodka, whisky)", cat: "drink", status: "green", note: "Low FODMAP, but alcohol still irritates the gut." },
  { name: "Tonic water",           cat: "drink", status: "yellow",note: "Fine in a glass; watch added sugars." },
  { name: "Coconut water",         cat: "drink", status: "yellow",note: "Limit ~100 ml - sorbitol rises." },
  { name: "Orange juice",          cat: "drink", status: "yellow",note: "Limit ~120 g (a whole orange is better)." },
  { name: "Wine",                  cat: "drink", status: "yellow",note: "Limit ~1 glass; dry over sweet." },
  { name: "Beer",                  cat: "drink", status: "yellow",note: "1 standard; carbonation can bloat." },
  { name: "Kombucha",              cat: "drink", status: "yellow",note: "Limit ~40 g." },
  { name: "Cola / soft drinks",    cat: "drink", status: "red",   note: "Monash found cola high in fructans; many sodas use HFCS.", instead: "Soda water, real lemonade or tea" },
  { name: "Apple / pear / mango juice", cat: "drink", status: "red", note: "Concentrated fructose/sorbitol.", instead: "A small glass of orange juice" },
  { name: "Chamomile / fennel tea",cat: "drink", status: "red",   note: "Higher-FODMAP herbal teas.", instead: "Peppermint or green tea" },
  { name: "Oat / soy milk",        cat: "drink", status: "red",   note: "A full glass is high in FODMAPs (fructans in oat, GOS in soy).", instead: "Almond or lactose-free milk" },
  { name: "Rum & sweet liqueurs",  cat: "drink", status: "red",   note: "Added sugars/polyols.", instead: "A measure of gin or vodka" },
  { name: "Sugar-free / diet drinks", cat: "drink", status: "red", note: "Often sweetened with polyols.", instead: "Soda water with fresh lime" },

  /* -- Snacks (grab-and-go) -- */
  { name: "Hard-boiled eggs",          cat: "snacks", status: "green",  note: "Protein and fat that keep you full for hours." },
  { name: "Rice cakes + peanut butter", cat: "snacks", status: "green", note: "Crunchy, fast and satisfying." },
  { name: "Handful of nuts",           cat: "snacks", status: "green",  note: "About 10 almonds, macadamias or walnuts." },
  { name: "Cheddar cheese cubes",      cat: "snacks", status: "green",  note: "Aged cheese is essentially lactose-free." },
  { name: "Carrot & cucumber sticks",  cat: "snacks", status: "green",  note: "With a feta or roasted-pepper dip." },
  { name: "Strawberries or blueberries", cat: "snacks", status: "green", note: "A low-FODMAP berry bowl." },
  { name: "Grapes or an orange",       cat: "snacks", status: "green",  note: "The easiest portable fruit." },
  { name: "Lactose-free yogurt + berries", cat: "snacks", status: "green", note: "Add a few pumpkin seeds for crunch." },
  { name: "Plain popcorn",             cat: "snacks", status: "green",  note: "Up to about 16 g, lightly salted." },
  { name: "Beef jerky / biltong",      cat: "snacks", status: "green",  note: "Choose brands with no onion or garlic." },
  { name: "Firm banana + peanut butter", cat: "snacks", status: "green", note: "Quick energy before activity." },
  { name: "Olives",                    cat: "snacks", status: "green",  note: "Salty, savoury and shelf-stable." },
  { name: "Dark chocolate squares",    cat: "snacks", status: "yellow", note: "Up to about 3 squares (30 g) to curb a sweet craving." },
  { name: "Plain salted crisps",       cat: "snacks", status: "green",  note: "Ready-salted only - skip onion & BBQ flavours." }
];

/* ----------------------------------------------------------------------- */
/* 3. AT-A-GLANCE CHEAT SHEET                                               */
/* ----------------------------------------------------------------------- */
const CHEAT_SHEET = {
  eat: [
    { group: "Proteins",    items: "Chicken, beef, pork, lamb, eggs, fish, prawns, firm tofu" },
    { group: "Vegetables",  items: "Carrot, cucumber, zucchini, green bell pepper, spinach, green beans, potato" },
    { group: "Fruit",       items: "Strawberry, blueberry, grapes, kiwi, orange, firm banana, pineapple" },
    { group: "Carbs",       items: "White rice, quinoa, oats, gluten-free bread & pasta, corn tortillas, polenta" },
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
  { icon: "⏱️", title: "Leave gaps between meals", body: "4-5 hours where you can lets your gut's 'cleaning wave' sweep bacteria onward. Constant grazing switches it off." }
];

/* ----------------------------------------------------------------------- */
/* 5. "EAT THIS, NOT THAT" SWAPS                                            */
/* ----------------------------------------------------------------------- */
const SWAPS = [
  { icon: "🍔", avoid: "Big Mac & cola", avoidWhy: "Wheat bun, onion, special sauce - and cola is high in fructans.", eat: "Plain patty, cheese & fries + water", eatHow: "Order the beef patty with cheese, no bun, no onion, plus plain fries and water or soda water." },
  { icon: "🍗", avoid: "KFC fried chicken", avoidWhy: "Wheat batter plus garlic and onion in every layer.", eat: "Plain grilled or roast chicken", eatHow: "Skip the coating entirely - grilled chicken with salt, pepper and lemon is naturally safe." },
  { icon: "🍕", avoid: "Classic pizza", avoidWhy: "Wheat base, garlic-and-onion sauce, a mountain of cheese.", eat: "Gluten-free base pizza", eatHow: "Plain passata (tomato + salt), hard cheese, pepperoni or chicken, green bell pepper. Drizzle garlic-infused oil." },
  { icon: "🥧", avoid: "Apple pie", avoidWhy: "High-FODMAP apple inside wheat pastry.", eat: "Berries & lactose-free cream", eatHow: "Warm strawberries and blueberries with a little maple syrup and lactose-free cream." },
  { icon: "🍝", avoid: "Pasta in garlic-onion marinara", avoidWhy: "Wheat pasta plus a sauce built on the two biggest triggers.", eat: "Rice or gluten-free pasta, garlic-oil & tomato", eatHow: "Toss in garlic-infused oil, fresh tomato, basil and parmesan - an easy cacio-e-pepe-style bowl." },
  { icon: "🥖", avoid: "Garlic bread", avoidWhy: "Wheat baguette soaked in real garlic butter.", eat: "Sourdough or gluten-free toast, garlic oil", eatHow: "Brush with garlic-infused olive oil, scatter chives and parmesan, then grill." },
  { icon: "🥤", avoid: "Cola / soft drink", avoidWhy: "Monash testing found cola surprisingly high in fructans.", eat: "Soda water or real lemonade", eatHow: "Sparkling water with fresh lime, or a real lemonade made with lemon, water and a little sugar." },
  { icon: "🥣", avoid: "Wheat cereal or muesli", avoidWhy: "Bran, wheat flakes, dried fruit and honey.", eat: "Oats with berries", eatHow: "45 g rolled oats, lactose-free milk, blueberries, walnuts and a little maple syrup." },
  { icon: "🫘", avoid: "Baked beans on toast", avoidWhy: "Beans are rich in GOS; the sauce hides onion and garlic.", eat: "Eggs or tofu on gluten-free toast", eatHow: "Scrambled eggs or sautéed firm tofu with chives on gluten-free toast." },
  { icon: "🧆", avoid: "Hummus & pita", avoidWhy: "Chickpeas plus raw garlic, scooped with wheat pita.", eat: "Feta-herb dip & gluten-free crackers", eatHow: "Mash feta with lactose-free yogurt, lemon, herbs and olive oil; dip carrot sticks or gluten-free crackers." },
  { icon: "🍜", avoid: "Ramen in garlic-onion broth", avoidWhy: "Wheat noodles in a broth simmered with onion and garlic.", eat: "Rice-noodle pho-style bowl", eatHow: "Rice noodles in plain bone broth with ginger, bok choy and green spring-onion tops." },
  { icon: "🥗", avoid: "Caesar salad", avoidWhy: "Garlic dressing, wheat croutons, sometimes onion.", eat: "Grilled chicken & parmesan salad", eatHow: "Greens, grilled chicken, parmesan and gluten-free croutons with olive oil, lemon and pepper." },
  { icon: "🍦", avoid: "Ice cream", avoidWhy: "Lactose, often with high-fructose corn syrup.", eat: "Sorbet or lactose-free ice cream", eatHow: "A small scoop of fruit sorbet (no HFCS) or lactose-free ice cream." },
  { icon: "🍎", avoid: "Apple as a snack", avoidWhy: "High fructose plus sorbitol - a frequent bloat trigger.", eat: "Orange, kiwi or grapes", eatHow: "Keep low-FODMAP fruit handy: an orange, two kiwis, or a handful of grapes." },
  { icon: "🍯", avoid: "Honey in tea/yogurt", avoidWhy: "Excess free fructose.", eat: "Maple syrup", eatHow: "Maple syrup sweetens just as well and is low-FODMAP up to ~40 g." },
  { icon: "☕", avoid: "Large latte", avoidWhy: "A big milky coffee is a large lactose load.", eat: "Lactose-free or almond latte", eatHow: "Ask for lactose-free or almond milk - most cafés now keep it on hand." },
  { icon: "🧅", avoid: "Onion & garlic in cooking", avoidWhy: "The two biggest FODMAP triggers - fructans that hide in almost every savoury dish.", eat: "Garlic-infused oil + green tops", eatHow: "Cook with garlic- or onion-infused oil, and build the savoury base from the green tops of spring onions, leeks and chives." },
  { icon: "🍞", avoid: "Regular wheat sandwich bread", avoidWhy: "Wheat is high in fructans, and a couple of slices add up fast.", eat: "Sourdough spelt or gluten-free bread", eatHow: "Slow-fermented sourdough (especially spelt) or a gluten-free loaf keeps toast and sandwiches on the menu." },
  { icon: "🥑", avoid: "A whole smashed avocado", avoidWhy: "Avocado turns high in sorbitol once you go past a small portion.", eat: "⅛ avocado or a scrape", eatHow: "Keep it to about ⅛ of an avocado, or reach for olive oil, feta or a little mayo for the same richness." },
  { icon: "🫛", avoid: "Lentil or chickpea dal", avoidWhy: "Dried legumes are loaded with GOS - a classic bloating trigger.", eat: "Rinsed canned lentils or grilled meat", eatHow: "Well-rinsed canned lentils or chickpeas (about 46 g) are far gentler; or have tandoori grilled meat with basmati rice." },
  { icon: "🥣", avoid: "Flavoured fruit yogurt", avoidWhy: "Lactose plus added inulin, honey or high-fructose fruit purée.", eat: "Lactose-free yogurt + berries", eatHow: "Start with plain lactose-free yogurt and sweeten it yourself with strawberries, blueberries and a little maple syrup." },
  { icon: "🧃", avoid: "Apple or pear juice", avoidWhy: "Concentrated excess fructose and sorbitol with none of the fibre.", eat: "Citrus water or a small orange juice", eatHow: "Infuse water with lemon, lime or cucumber, or have a small glass (~100 ml) of orange juice instead." },
  { icon: "🥜", avoid: "Cashew & pistachio trail mix", avoidWhy: "Cashews and pistachios are the two high-FODMAP nuts, often mixed with dried fruit.", eat: "Walnuts, peanuts & macadamias", eatHow: "Build your own mix from walnuts, peanuts, macadamias and pumpkin seeds with a few dark-chocolate chips." },
  { icon: "🥫", avoid: "BBQ, sweet-chilli & ketchup sauces", avoidWhy: "Usually built on onion, garlic and high-fructose corn syrup.", eat: "Infused oil, tomato & tamari", eatHow: "Season with garlic-infused oil, plain passata, tamari or a squeeze of lemon to skip the hidden triggers." }
];

/* Section 6 "Snacks" was removed - snack ideas now live in FOODS under the
   "snacks" category (and the standalone Snacks page/tab was retired). */

/* ----------------------------------------------------------------------- */
/* 7. A WEEK'S FOOD (7-DAY MEAL PLAN)                                       */
/* ----------------------------------------------------------------------- */
const WEEK_PLAN = [
  { day: "Monday", meals: [
    { slot: "Breakfast", icon: "🥣", title: "Strawberry overnight oats", detail: "Made the night before with lactose-free milk, chia and fresh strawberries." },
    { slot: "Lunch", icon: "🥗", title: "Quinoa tabbouleh + grilled chicken", detail: "Herby, onion-free tabbouleh with sliced grilled chicken." },
    { slot: "Dinner", icon: "🍗", title: "Lemon-herb roast chicken tray bake", detail: "Chicken thighs with carrot, zucchini and baby potatoes." },
    { slot: "Snack", icon: "🍌", title: "PB & banana rice cakes", detail: "Rice cakes with peanut butter and firm banana." }
  ]},
  { day: "Tuesday", meals: [
    { slot: "Breakfast", icon: "🍳", title: "Spinach & feta omelette", detail: "Three eggs with baby spinach and feta, plus gluten-free toast." },
    { slot: "Lunch", icon: "🌯", title: "Fresh rice-paper summer rolls", detail: "Prawn or chicken rolls with a tamari-ginger dip." },
    { slot: "Dinner", icon: "🐟", title: "Baked lemon salmon & potatoes", detail: "Salmon, baby potatoes and green beans on one tray." },
    { slot: "Snack", icon: "🍿", title: "Stovetop popcorn", detail: "A bowl of lightly salted popcorn." }
  ]},
  { day: "Wednesday", meals: [
    { slot: "Breakfast", icon: "🥞", title: "Fluffy gluten-free pancakes", detail: "Topped with blueberries, strawberries and a little maple." },
    { slot: "Lunch", icon: "🍲", title: "Soothing chicken & rice soup", detail: "A gentle, onion-free bowl with carrot and parsley." },
    { slot: "Dinner", icon: "🧆", title: "Herby rice meatballs in tomato sauce", detail: "Over gluten-free pasta or soft polenta." },
    { slot: "Snack", icon: "🧀", title: "Cheese & cracker plate", detail: "Cheddar, rice crackers, cucumber and a few grapes." }
  ]},
  { day: "Thursday", meals: [
    { slot: "Breakfast", icon: "🥝", title: "Kiwi & vanilla chia pudding", detail: "Made ahead with lactose-free or almond milk." },
    { slot: "Lunch", icon: "🥒", title: "Cucumber-feta salad + tuna", detail: "Cool herb salad with a tin of tuna and olives." },
    { slot: "Dinner", icon: "🥢", title: "Ginger chicken & bok choy stir-fry", detail: "Over steamed rice with sesame and spring-onion tops." },
    { slot: "Snack", icon: "🥜", title: "Peanut butter oat energy balls", detail: "A couple of no-bake bites." }
  ]},
  { day: "Friday", meals: [
    { slot: "Breakfast", icon: "🍚", title: "Creamy quinoa porridge", detail: "With firm banana, walnuts and a pinch of cinnamon." },
    { slot: "Lunch", icon: "🍅", title: "Caprese + grilled chicken", detail: "Tomato, mozzarella and basil with chicken and gluten-free bread." },
    { slot: "Dinner", icon: "🍕", title: "Margherita-style gluten-free pizza", detail: "On a gluten-free base with a side salad." },
    { slot: "Snack", icon: "🍫", title: "Dark chocolate & strawberry bark", detail: "A couple of squares' worth, with berries." }
  ]},
  { day: "Saturday", meals: [
    { slot: "Breakfast", icon: "🧁", title: "Veggie frittata muffins", detail: "Make-ahead egg muffins with a piece of fruit." },
    { slot: "Lunch", icon: "🥕", title: "Carrot & ginger soup", detail: "Silky and warming, with a gluten-free roll." },
    { slot: "Dinner", icon: "🥩", title: "Beef & veg rice bowl", detail: "Seared beef, carrot and green beans over rice." },
    { slot: "Snack", icon: "🍪", title: "Peanut butter cookies", detail: "Flourless, three-ingredient and naturally gluten-free." }
  ]},
  { day: "Sunday", meals: [
    { slot: "Breakfast", icon: "🥤", title: "Berry & banana smoothie", detail: "With lactose-free milk and a slice of gluten-free toast." },
    { slot: "Lunch", icon: "🥔", title: "Roast chicken + smashed potatoes", detail: "Leftover chicken with garlic-oil smashed potatoes and salad." },
    { slot: "Dinner", icon: "🍢", title: "Crispy tofu & veg stir-fry", detail: "Golden tofu with bok choy and green bell pepper over rice." },
    { slot: "Snack", icon: "🍓", title: "Strawberry chia jam on rice cakes", detail: "A sweet, gut-gentle finish to the week." }
  ]}
];

/* ----------------------------------------------------------------------- */
/* 8. RECIPES                                                               */
/* ----------------------------------------------------------------------- */
const RECIPE_CATS = [
  { id: "basics",    label: "Basics & Sauces", icon: "🫙" },
  { id: "breakfast", label: "Breakfast",       icon: "🍳" },
  { id: "mains",     label: "Mains",           icon: "🍽️" },
  { id: "soups",     label: "Soups & Bowls",   icon: "🍲" },
  { id: "salads",    label: "Salads & Sides",  icon: "🥗" },
  { id: "snacks",    label: "Snacks",          icon: "🍿" },
  { id: "sweets",    label: "Sweets",          icon: "🍪" },
  { id: "drinks",    label: "Drinks",          icon: "🥤" }
];

/* Every recipe ingredient is a green/yellow item on the food list above.
   `meal` matches a RECIPE_CATS id and powers the on-page filter. */
const RECIPES = [
  /* -- Basics & sauces -- */
  { meal: "basics", icon: "🍅", name: "No-Onion, No-Garlic Marinara", tagline: "A rich tomato base to keep in the fridge.",
    time: "25 min", serves: "Makes ~720 g",
    why: "Jarred pasta sauces almost always start with onion and garlic. This builds the same depth from infused oil, tomato and herbs.",
    ingredients: ["42 g garlic-infused olive oil", "2 × 400 g cans crushed tomatoes", "15 g tomato paste", "Green tops of 2 spring onions, finely sliced", "1 g dried oregano", "4 g sugar", "Handful fresh basil", "Salt, pepper & a pinch of chilli"],
    steps: [
      "Warm the infused oil and soften the green spring-onion tops for 1-2 minutes.",
      "Stir in the tomato paste and cook 1 minute to deepen the colour.",
      "Add the crushed tomatoes, oregano and sugar; simmer gently 15-20 minutes.",
      "Season, then stir through torn basil. Keeps 4 days in the fridge, or freezes well."
    ], safety: "" },

  { meal: "basics", icon: "🌿", name: "Fresh Basil Pesto (No Garlic)", tagline: "Bright, herby pesto without the garlic hit.",
    time: "10 min", serves: "Makes ~240 g",
    why: "Traditional pesto is loaded with raw garlic. Garlic-infused oil plus extra basil keeps every bit of flavour and none of the fructans.",
    ingredients: ["50 g packed fresh basil", "75 g garlic-infused olive oil", "25 g pine nuts (or walnuts)", "25 g grated parmesan", "15 g lemon juice", "Salt & pepper"],
    steps: [
      "Lightly toast the nuts in a dry pan until golden.",
      "Blitz the basil, nuts, parmesan and lemon juice to a coarse paste.",
      "Stream in the infused oil with the motor running; season to taste.",
      "Toss through rice or gluten-free pasta, or spoon over grilled chicken or fish."
    ], safety: "" },

  { meal: "basics", icon: "🥗", name: "Everyday Lemon-Herb Vinaigrette", tagline: "A two-minute dressing for any salad or grain bowl.",
    time: "5 min", serves: "Makes ~120 g",
    why: "Bottled dressings sneak in garlic, onion and honey. This clean version is ready before the kettle boils.",
    ingredients: ["84 g extra-virgin olive oil", "30 g red-wine vinegar or lemon juice", "5 g Dijon mustard", "7 g maple syrup", "1 g dried oregano", "Salt & pepper"],
    steps: [
      "Add everything to a jar.",
      "Seal and shake hard for 20 seconds until thick and glossy.",
      "Keeps in the fridge a week - shake again before each use."
    ], safety: "" },

  { meal: "basics", icon: "🌶️", name: "Fresh Tomato Salsa (No Onion)", tagline: "All the lift of salsa, none of the onion.",
    time: "10 min", serves: "Makes ~480 g",
    why: "Restaurant salsa leans on raw onion. Green spring-onion tops and lime give the same brightness, gut-safely.",
    ingredients: ["3 ripe tomatoes, finely diced", "½ cucumber, diced", "Green tops of 2 spring onions", "Handful coriander, chopped", "Juice of 1 lime", "14 g garlic-infused oil", "Salt & a little fresh chilli"],
    steps: [
      "Combine everything in a bowl.",
      "Season with salt and lime, then let it sit 10 minutes for the flavours to meet.",
      "Serve with corn chips, grilled meat or eggs."
    ], safety: "" },

  { meal: "basics", icon: "🍲", name: "Onion & Garlic-Free Chicken Stock", tagline: "The building block half these recipes call for.",
    time: "2 hr (mostly hands-off)", serves: "Makes ~2 litres",
    why: "Shop-bought stock almost always leads with onion and garlic. Homemade lets you build deep flavour from carrot, herbs and green tops instead.",
    ingredients: ["1 chicken carcass (or 500 g wings/necks)", "2 carrots, roughly chopped", "Green tops of 2 leeks or a bunch of spring onions", "2 bay leaves", "A few parsley stalks & peppercorns", "2.5 litres cold water", "Salt"],
    steps: [
      "Put everything except the salt in a large pot and cover with the cold water.",
      "Bring to a gentle simmer, skimming off any foam.",
      "Simmer uncovered 1½-2 hours, topping up the water if needed.",
      "Strain, discard the solids, and season lightly with salt.",
      "Cool, then refrigerate up to 4 days or freeze in portions."
    ], safety: "Leek and spring-onion GREEN tops are low-FODMAP; keep the white bulbs out of the pot." },

  /* -- Breakfast -- */
  { meal: "breakfast", icon: "🥣", name: "Strawberry Overnight Oats", tagline: "Tomorrow's breakfast, made tonight.",
    time: "5 min + overnight", serves: "Serves 1",
    why: "Rolled oats are low-FODMAP in 45 g servings, and lactose-free dairy keeps the whole jar gentle.",
    ingredients: ["45 g rolled oats", "120 g lactose-free milk", "30 g lactose-free yogurt", "12 g chia seeds", "7 g maple syrup", "75 g strawberries, sliced"],
    steps: [
      "Stir the oats, milk, yogurt, chia and maple together in a jar.",
      "Seal and refrigerate overnight.",
      "Top with strawberries in the morning and eat cold."
    ], safety: "" },

  { meal: "breakfast", icon: "🍳", name: "Spinach & Feta Omelette", tagline: "Five minutes to a protein-packed start.",
    time: "10 min", serves: "Serves 1",
    why: "Eggs, spinach and feta are all freely low-FODMAP - a fast savoury breakfast with no triggers.",
    ingredients: ["3 eggs", "Handful baby spinach", "30 g feta, crumbled", "14 g garlic-infused oil", "Chives, salt & pepper"],
    steps: [
      "Whisk the eggs with salt and pepper.",
      "Wilt the spinach in the infused oil over medium heat.",
      "Pour in the eggs, scatter over the feta, and cook until just set.",
      "Fold, slide onto a plate and finish with chopped chives."
    ], safety: "" },

  { meal: "breakfast", icon: "🥞", name: "Fluffy Gluten-Free Pancakes", tagline: "Weekend pancakes, gut-friendly.",
    time: "20 min", serves: "Serves 2",
    why: "A plain gluten-free flour blend and lactose-free milk make light pancakes without wheat or excess lactose.",
    ingredients: ["140 g gluten-free plain flour", "4 g baking powder", "1 egg", "180 g lactose-free milk", "20 g maple syrup", "Butter, for the pan", "Blueberries & strawberries, to serve"],
    steps: [
      "Whisk the flour and baking powder in a bowl.",
      "Beat in the egg, milk and maple syrup until just smooth.",
      "Cook spoonfuls in a little butter until bubbles form, then flip.",
      "Stack and serve with berries and a drizzle more maple."
    ], safety: "" },

  { meal: "breakfast", icon: "🥝", name: "Kiwi & Vanilla Chia Pudding", tagline: "Make-ahead, no-cook, naturally sweet.",
    time: "5 min + chill", serves: "Serves 2",
    why: "Chia sets into a creamy pudding overnight; kiwi adds a low-FODMAP fruity finish.",
    ingredients: ["36 g chia seeds", "240 g lactose-free or almond milk", "7 g maple syrup", "2 g vanilla", "2 kiwifruit, sliced"],
    steps: [
      "Stir the chia, milk, maple and vanilla together.",
      "Rest 5 minutes, stir again to break up clumps, then chill 3 hours or overnight.",
      "Top with sliced kiwi to serve."
    ], safety: "" },

  { meal: "breakfast", icon: "🍚", name: "Creamy Quinoa Breakfast Porridge", tagline: "A warm, creamy change from oats.",
    time: "20 min", serves: "Serves 2",
    why: "Quinoa is naturally low-FODMAP and high in protein, making a sustaining warm breakfast.",
    ingredients: ["85 g quinoa, well rinsed", "240 g lactose-free milk", "120 g water", "7 g maple syrup", "Pinch of cinnamon", "½ firm banana, sliced", "A few walnuts"],
    steps: [
      "Simmer the quinoa with the milk and water 15 minutes, stirring, until soft and creamy.",
      "Stir in the maple and cinnamon.",
      "Top with banana and walnuts."
    ], safety: "" },

  { meal: "breakfast", icon: "🧁", name: "Veggie Frittata Muffins", tagline: "Grab-and-go egg muffins for busy mornings.",
    time: "30 min", serves: "Makes 6",
    why: "Baked egg muffins travel well and use only low-FODMAP vegetables and cheese.",
    ingredients: ["6 eggs", "½ green bell pepper, finely diced", "Handful spinach, chopped", "15 g grated cheese", "Green spring-onion tops", "Garlic-infused oil, salt & pepper"],
    steps: [
      "Heat oven to 180°C and oil a 6-hole muffin tin.",
      "Whisk the eggs with salt and pepper, then stir in the vegetables and cheese.",
      "Divide between the holes and bake 18-20 minutes until set.",
      "Eat warm, or keep refrigerated for grab-and-go breakfasts."
    ], safety: "" },

  { meal: "breakfast", icon: "🍚", name: "Savoury Rice Congee with Egg", tagline: "Gentle, warm and deeply comforting.",
    time: "30 min", serves: "Serves 2",
    why: "Rice, egg, ginger and low-FODMAP stock make a soft breakfast bowl that is easy on unsettled mornings.",
    ingredients: ["90 g white rice", "960 g low-FODMAP chicken or vegetable stock", "5 g grated ginger", "1 carrot, finely diced", "2 eggs", "Baby spinach", "Green spring-onion tops", "Sesame oil & tamari, to finish"],
    steps: [
      "Simmer the rice, stock, ginger and carrot 25 minutes, stirring often, until soft and porridge-like.",
      "Stir through the spinach until wilted.",
      "Poach or soft-boil the eggs separately.",
      "Ladle into bowls and top with egg, spring-onion tops, a few drops of sesame oil and a little tamari."
    ], safety: "Keep tamari to a small splash and use stock labelled onion/garlic-free." },

  { meal: "breakfast", icon: "🥔", name: "Smoked Salmon Potato Hash", tagline: "Brunchy, filling and still gentle.",
    time: "25 min", serves: "Serves 2",
    why: "Potato, eggs and fish are naturally low-FODMAP; chives and lemon bring the brunch flavour without onion.",
    ingredients: ["2 medium potatoes, diced small", "2 eggs", "80 g smoked salmon", "Baby spinach", "Chives", "Olive oil", "Lemon, salt & pepper"],
    steps: [
      "Pan-fry the potato in olive oil with salt until golden and tender.",
      "Add spinach for the last minute to wilt.",
      "Fry or poach the eggs.",
      "Top the hash with smoked salmon, eggs, chives, black pepper and lemon."
    ], safety: "Choose plain smoked salmon without garlic/onion flavourings." },

  { meal: "breakfast", icon: "🫐", name: "Blueberry Baked Oatmeal", tagline: "A make-ahead tray you can slice all week.",
    time: "40 min", serves: "Serves 4",
    why: "Rolled oats are low-FODMAP at 45 g, and blueberries are a freely low-FODMAP berry - baked together they set into portionable squares.",
    ingredients: ["180 g rolled oats", "360 g lactose-free or almond milk", "1 egg", "40 g maple syrup", "4 g baking powder", "3 g cinnamon", "150 g blueberries", "30 g chopped walnuts"],
    steps: [
      "Heat oven to 180°C and grease a small baking dish.",
      "Whisk the milk, egg, maple, baking powder and cinnamon together.",
      "Stir in the oats, then fold through most of the blueberries.",
      "Scatter the remaining berries and the walnuts over the top.",
      "Bake 25-30 minutes until set and golden; slice into squares."
    ], safety: "" },

  /* -- Mains -- */
  { meal: "mains", icon: "🍝", name: "Garlic-Oil Spaghetti with Tomato & Basil", tagline: "Comfort pasta, minus the triggers.",
    time: "20 min", serves: "Serves 2",
    why: "All the warmth of a classic garlic pasta using infused oil and fresh tomato instead of jarred onion-garlic sauce.",
    ingredients: ["160 g gluten-free or rice spaghetti", "42 g garlic-infused olive oil", "2 ripe tomatoes, diced (or ~10 cherry tomatoes)", "Handful fresh basil, torn", "Parmesan, to serve", "Salt, pepper & chilli flakes"],
    steps: [
      "Cook the pasta in well-salted water until al dente; reserve a splash of pasta water.",
      "Warm the garlic-infused oil, add the tomatoes and a pinch of salt, and soften 4-5 minutes.",
      "Toss the drained pasta through with a little pasta water to make a light sauce.",
      "Off the heat, fold through the basil. Top with parmesan, pepper and chilli flakes."
    ], safety: "" },

  { meal: "mains", icon: "🍗", name: "Lemon-Herb Roast Chicken Tray Bake", tagline: "One pan, zero stress, totally safe.",
    time: "45 min", serves: "Serves 4",
    why: "Plain chicken and low-FODMAP vegetables are naturally trigger-free - flavour comes from lemon, herbs and infused oil.",
    ingredients: ["4 chicken thighs (skin on)", "2 carrots, in batons", "2 zucchini, in chunks", "10 baby potatoes, halved", "42 g garlic-infused olive oil", "1 lemon (juice + wedges)", "Rosemary & thyme, salt & pepper"],
    steps: [
      "Heat oven to 200°C.",
      "Toss the vegetables with 28 g garlic-infused oil, salt and pepper; spread on a tray.",
      "Nestle the chicken on top, rub with the remaining oil, lemon juice and herbs.",
      "Tuck in the lemon wedges and roast 35-40 minutes, until golden and cooked through.",
      "Scatter with fresh herbs and a green-chive flourish to serve."
    ], safety: "" },

  { meal: "mains", icon: "🥢", name: "Ginger Chicken & Bok Choy Stir-Fry", tagline: "Takeaway flavour without the onion-garlic-soy overload.",
    time: "20 min", serves: "Serves 2",
    why: "Garlic-infused oil, ginger and green spring-onion tops recreate stir-fry depth; rice keeps it gentle.",
    ingredients: ["2 chicken breasts, sliced", "2 heads bok choy, chopped", "1 green bell pepper, sliced", "1 carrot, julienned", "28 g garlic-infused oil", "15 g grated ginger", "1-30 g tamari (gluten-free soy sauce)", "Green spring-onion tops & sesame seeds", "Steamed white rice, to serve"],
    steps: [
      "Heat the garlic-infused oil in a wok over high heat and stir-fry the chicken until golden.",
      "Add the carrot and green bell pepper; stir-fry 2 minutes.",
      "Add the ginger and bok choy; stir-fry until just wilted.",
      "Splash in the tamari, toss, and finish with spring-onion tops and sesame seeds over rice."
    ], safety: "" },

  { meal: "mains", icon: "🐟", name: "Baked Lemon Salmon & Potatoes", tagline: "A clean, omega-rich dinner on one tray.",
    time: "35 min", serves: "Serves 2",
    why: "Salmon, potato and green beans are all freely low-FODMAP; lemon and dill carry the flavour.",
    ingredients: ["2 salmon fillets", "10 baby potatoes, halved", "2 handfuls green beans", "28 g garlic-infused oil", "1 lemon, sliced", "Fresh dill, salt & pepper"],
    steps: [
      "Heat oven to 200°C. Toss the potatoes in 14 g oil and roast 20 minutes.",
      "Add the salmon and beans to the tray, drizzle with the rest of the oil and top with lemon and dill.",
      "Bake a further 12-15 minutes, until the salmon flakes.",
      "Finish with a squeeze of lemon."
    ], safety: "" },

  { meal: "mains", icon: "🥩", name: "Beef & Veg Rice Bowl", tagline: "A fast, savoury weeknight bowl.",
    time: "20 min", serves: "Serves 2",
    why: "Tamari, ginger and infused oil give a soy-bowl flavour without onion, garlic or excess sauce.",
    ingredients: ["250 g beef strips", "28 g garlic-infused oil", "1 carrot, julienned", "2 handfuls green beans", "30 g tamari (gluten-free soy sauce)", "5 g grated ginger", "Steamed rice", "Sesame seeds & spring-onion tops"],
    steps: [
      "Sear the beef in the hot infused oil until browned; set aside.",
      "Stir-fry the carrot and beans 3-4 minutes.",
      "Return the beef, add the tamari and ginger, and toss to coat.",
      "Serve over rice with sesame and spring-onion tops."
    ], safety: "" },

  { meal: "mains", icon: "🥧", name: "Onion-Free Cottage Pie", tagline: "Pure comfort food, made safe.",
    time: "50 min", serves: "Serves 4",
    why: "Classic cottage pie starts with onion; here carrot, infused oil and tomato build the savoury base instead.",
    ingredients: ["500 g beef or lamb mince", "42 g garlic-infused oil", "1 carrot, finely diced", "240 g canned crushed tomatoes (or onion/garlic-free stock)", "Green spring-onion tops", "1 g thyme", "4 potatoes, mashed with butter & lactose-free milk", "Salt & pepper"],
    steps: [
      "Brown the mince in the infused oil, then add the carrot and spring-onion tops.",
      "Stir in the tomato (or stock) and thyme; simmer 15 minutes and season.",
      "Spoon into a dish and top with the mash.",
      "Bake at 200°C for 20 minutes until golden."
    ], safety: "" },

  { meal: "mains", icon: "🍕", name: "Margherita-Style Gluten-Free Pizza", tagline: "Friday pizza that won't flare you.",
    time: "20 min", serves: "Serves 2",
    why: "A gluten-free base and onion/garlic-free marinara make pizza night safe; mozzarella is low in lactose.",
    ingredients: ["1 gluten-free pizza base", "80 g no-onion-no-garlic marinara (see Basics)", "Fresh mozzarella, torn", "A few cherry tomatoes", "Fresh basil", "Garlic-infused oil"],
    steps: [
      "Heat oven to 220°C.",
      "Spread the marinara over the base and dot with mozzarella and tomatoes.",
      "Bake 10-12 minutes until bubbling and golden.",
      "Finish with fresh basil and a drizzle of infused oil."
    ], safety: "" },

  { meal: "mains", icon: "🍢", name: "Crispy Tofu & Veg Stir-Fry", tagline: "A satisfying plant-based plate.",
    time: "25 min", serves: "Serves 2",
    why: "Firm tofu is low-FODMAP (the liquid whey carries the FODMAPs away); tamari and ginger flavour it cleanly.",
    ingredients: ["250 g firm tofu, cubed", "28 g garlic-infused oil", "1 head bok choy", "½ green bell pepper", "1 carrot, sliced", "30 g tamari (gluten-free soy sauce)", "5 g grated ginger", "Steamed rice & sesame seeds"],
    steps: [
      "Pat the tofu dry and crisp it in the infused oil on all sides; set aside.",
      "Stir-fry the carrot, green bell pepper and bok choy until just tender.",
      "Return the tofu, add tamari and ginger, and toss.",
      "Serve over rice with sesame seeds."
    ], safety: "" },

  { meal: "mains", icon: "🌯", name: "Fresh Rice-Paper Summer Rolls", tagline: "Light, fresh and totally safe.",
    time: "30 min", serves: "Makes 8 rolls",
    why: "Rice paper, rice vermicelli and low-FODMAP veg make a no-cook meal; the dipping sauce skips the usual garlic.",
    ingredients: ["8 rice-paper wrappers", "100 g rice vermicelli, cooked", "Cooked prawns or shredded chicken", "Carrot, cucumber & lettuce, julienned", "Mint & coriander", "Dip: 30 g tamari + lime + 1 g grated ginger + 7 g maple"],
    steps: [
      "Dip a wrapper in warm water a few seconds until pliable.",
      "Lay a little vermicelli, protein, veg and herbs near one edge.",
      "Fold in the sides and roll up tightly; repeat.",
      "Whisk the dip ingredients and serve alongside."
    ], safety: "" },

  { meal: "mains", icon: "🍣", name: "Salmon Sushi Rice Bowl", tagline: "All the sushi satisfaction, no rolling mat needed.",
    time: "25 min", serves: "Serves 2",
    why: "Based on the same low-FODMAP pattern as Monash-style poke bowls: rice, plain salmon, cucumber, carrot and nori, with no onion, garlic or wheat.",
    ingredients: ["160 g cooked sushi or white rice", "2 cooked salmon fillets, flaked", "1 small cucumber, diced", "1 carrot, julienned", "1 sheet nori, snipped", "15 g rice vinegar", "1-30 g tamari (gluten-free soy sauce)", "7 g maple syrup", "Sesame seeds & green spring-onion tops"],
    steps: [
      "Season the warm rice with rice vinegar and divide between two bowls.",
      "Whisk the tamari and maple syrup into a quick drizzle.",
      "Top the rice with salmon, cucumber, carrot and nori.",
      "Spoon over the tamari drizzle, then finish with sesame seeds and green spring-onion tops."
    ], safety: "Use cooked salmon for food safety. Leave avocado out during elimination unless you know your tolerated portion." },

  { meal: "mains", icon: "🥬", name: "Turkey Lettuce Wraps with Lime Rice", tagline: "Fresh, crunchy and weeknight-fast.",
    time: "25 min", serves: "Serves 3",
    why: "Plain turkey mince, lettuce, carrot and rice give the fun of wraps without wheat tortillas, onion or garlic.",
    ingredients: ["500 g turkey mince", "14 g garlic-infused oil", "1 carrot, grated", "15 g tamari (gluten-free soy sauce)", "5 g grated ginger", "Lettuce leaves", "Cooked white rice", "Lime, coriander & green spring-onion tops"],
    steps: [
      "Brown the turkey mince in garlic-infused oil.",
      "Add carrot, ginger and tamari; cook until glossy and cooked through.",
      "Season rice with lime juice and coriander.",
      "Spoon rice and turkey into lettuce leaves and finish with spring-onion tops."
    ], safety: "Use plain mince and keep sauces simple; many bottled stir-fry sauces hide onion or garlic." },

  { meal: "mains", icon: "🥜", name: "Tempeh Peanut Rice Bowl", tagline: "Plant-based, savoury and properly filling.",
    time: "25 min", serves: "Serves 2",
    why: "Tempeh is a low-FODMAP soy option; rice, cucumber, carrot and a measured peanut-lime sauce keep the bowl balanced.",
    ingredients: ["200 g tempeh, sliced", "320 g cooked rice", "Cucumber ribbons", "Carrot ribbons", "Baby spinach", "32 g peanut butter", "15 g lime juice", "7 g maple syrup", "15 g tamari", "Sesame seeds"],
    steps: [
      "Pan-sear the tempeh until golden on both sides.",
      "Whisk peanut butter, lime, maple and tamari with a splash of warm water.",
      "Divide rice, spinach, cucumber and carrot between bowls.",
      "Top with tempeh, peanut sauce and sesame seeds."
    ], safety: "Keep peanut sauce to about half per bowl; rich sauces can become heavy even when low-FODMAP." },

  { meal: "mains", icon: "🍖", name: "Rosemary Lamb Chops with Soft Polenta", tagline: "Restaurant-feeling, very simple.",
    time: "30 min", serves: "Serves 2",
    why: "Plain lamb is FODMAP-free, and polenta with green beans makes a safe, satisfying plate.",
    ingredients: ["4 lamb chops", "160 g instant polenta", "480 g lactose-free milk or stock", "Green beans", "Rosemary", "Garlic-infused oil", "Butter, salt & pepper"],
    steps: [
      "Season lamb with rosemary, salt and pepper, then sear in garlic-infused oil until cooked to your liking.",
      "Simmer polenta with lactose-free milk or stock until soft; finish with a little butter.",
      "Steam or pan-sear the green beans.",
      "Serve lamb over polenta with beans on the side."
    ], safety: "Avoid pre-marinated lamb; marinades often contain garlic." },

  { meal: "mains", icon: "🥗", name: "Tuna Rice-Noodle Salad Bowl", tagline: "Cold noodle lunch, bright and filling.",
    time: "20 min", serves: "Serves 2",
    why: "Rice noodles, tuna, cucumber, carrot and herbs make a fast low-FODMAP lunch without the garlic-heavy dressing.",
    ingredients: ["150 g rice vermicelli", "2 tins tuna in spring water or olive oil", "Cucumber, julienned", "Carrot, julienned", "Lettuce", "Mint & coriander", "Dressing: lime juice, tamari, maple syrup and ginger"],
    steps: [
      "Cook the rice noodles, rinse cold and drain well.",
      "Whisk lime, tamari, maple and ginger into a sharp dressing.",
      "Toss noodles with vegetables, herbs and tuna.",
      "Drizzle with dressing just before serving."
    ], safety: "Check tuna flavourings; choose plain tins without onion, garlic or sweet chilli sauce." },

  { meal: "mains", icon: "🧆", name: "Herby Rice Meatballs in Tomato Sauce", tagline: "Cozy meatballs the whole table can share.",
    time: "35 min", serves: "Serves 4",
    why: "Cooked rice binds the meatballs in place of breadcrumbs, and the onion/garlic-free marinara keeps it safe.",
    ingredients: ["500 g turkey or beef mince", "40 g cooked rice", "1 egg", "Green spring-onion tops & parsley", "480 g no-onion-no-garlic marinara", "Garlic-infused oil", "Gluten-free pasta or polenta, to serve"],
    steps: [
      "Mix the mince, rice, egg and herbs with salt and pepper; roll into balls.",
      "Brown them in the infused oil.",
      "Pour over the marinara and simmer 15 minutes until cooked through.",
      "Serve over gluten-free pasta or soft polenta."
    ], safety: "" },

  { meal: "mains", icon: "🍢", name: "Lemon & Herb Chicken Skewers", tagline: "Backyard-BBQ flavour, gut-friendly marinade.",
    time: "25 min + marinating", serves: "Serves 4",
    why: "A marinade built on lemon, herbs and garlic-infused oil delivers all the punch of a garlic marinade without the fructans.",
    ingredients: ["4 chicken breasts or thighs, cubed", "1 red capsicum, in chunks", "2 zucchini, in thick slices", "42 g garlic-infused olive oil", "Juice of 1 lemon", "1 g dried oregano", "Green spring-onion tops", "Steamed rice, to serve"],
    steps: [
      "Whisk the infused oil, lemon, oregano, salt and pepper together.",
      "Toss the chicken in the marinade and rest 20 minutes (or overnight).",
      "Thread the chicken, capsicum and zucchini onto skewers.",
      "Grill or barbecue 10-12 minutes, turning, until charred and cooked through.",
      "Scatter with spring-onion tops and serve over rice."
    ], safety: "If using wooden skewers, soak them in water first so they don't burn." },

  { meal: "mains", icon: "🥩", name: "Pan-Seared Steak with Chimichurri", tagline: "A steakhouse plate you can make safely at home.",
    time: "20 min", serves: "Serves 2",
    why: "Plain steak is naturally FODMAP-free, and this chimichurri gets its kick from herbs, chilli and vinegar instead of the usual raw garlic.",
    ingredients: ["2 steaks (sirloin or scotch fillet)", "14 g olive oil", "Salt & pepper", "Chimichurri: 30 g parsley + 6 g oregano, finely chopped", "42 g garlic-infused olive oil", "15 g red-wine vinegar", "Pinch of chilli flakes"],
    steps: [
      "Bring the steaks to room temperature; pat dry and season well.",
      "Sear in the hot oil 2-3 minutes each side for medium-rare, then rest 5 minutes.",
      "Stir the chimichurri ingredients together with a little salt.",
      "Slice the steak and spoon the chimichurri over the top."
    ], safety: "" },

  { meal: "mains", icon: "🐟", name: "Oven-Baked Fish & Chips", tagline: "The pub classic, made gut-safe.",
    time: "40 min", serves: "Serves 2",
    why: "A polenta crust crisps up in the oven without wheat batter, and potato chips are a low-FODMAP carb - no deep-frying required.",
    ingredients: ["2 white fish fillets (cod, snapper or hoki)", "80 g fine polenta", "1 egg, beaten", "3 potatoes, cut into chips", "42 g olive oil", "Lemon wedges", "Salt, pepper & parsley"],
    steps: [
      "Heat oven to 220°C. Toss the chips in 28 g oil and salt; roast 25 minutes.",
      "Dip the fish in the beaten egg, then coat in seasoned polenta.",
      "Add the fish to the tray, drizzle with the last of the oil, and bake 12-15 minutes until crisp and cooked through.",
      "Serve with lemon wedges and a scatter of parsley."
    ], safety: "" },

  /* -- Soups & bowls -- */
  { meal: "soups", icon: "🍲", name: "Cozy Rice-Noodle Pho-Style Bowl", tagline: "Warming broth that loves your gut back.",
    time: "25 min", serves: "Serves 2",
    why: "A clean ginger broth (no onion/garlic simmer) over rice noodles is soothing and naturally low-FODMAP.",
    ingredients: ["960 g low-FODMAP or plain bone broth", "1 thumb ginger, sliced", "1 star anise (optional)", "150 g rice noodles", "200 g cooked chicken or rare beef, sliced", "2 heads bok choy", "Bean sprouts, green spring-onion tops, basil, lime, chilli"],
    steps: [
      "Simmer the broth with the ginger and star anise 15 minutes, then remove the aromatics.",
      "Cook the rice noodles per the packet and divide between two bowls.",
      "Blanch the bok choy in the broth for 1 minute.",
      "Top the noodles with the protein and greens, ladle over the hot broth, and finish with sprouts, spring-onion tops, basil and a squeeze of lime."
    ], safety: "" },

  { meal: "soups", icon: "🥕", name: "Carrot & Ginger Soup", tagline: "Silky, warming and naturally sweet.",
    time: "30 min", serves: "Serves 4",
    why: "Carrots are freely low-FODMAP; infused oil and ginger replace the usual onion base.",
    ingredients: ["6 carrots, chopped", "1 thumb ginger, grated", "42 g garlic-infused oil", "960 g onion/garlic-free stock", "Green spring-onion tops", "Salt, pepper & a swirl of lactose-free cream"],
    steps: [
      "Soften the carrots and ginger in the infused oil 5 minutes.",
      "Add the stock and simmer 20 minutes until very tender.",
      "Blend smooth, season, and finish with a swirl of cream and spring-onion tops."
    ], safety: "" },

  { meal: "soups", icon: "🎃", name: "Pumpkin & Coconut Soup", tagline: "Velvety and warming - mind the portion.",
    time: "30 min", serves: "Serves 4",
    why: "Japanese (kabocha) pumpkin is low-FODMAP in moderate servings and pairs beautifully with coconut and ginger.",
    ingredients: ["480 g Japanese/kabocha pumpkin, cubed", "42 g garlic-infused oil", "1 thumb ginger, grated", "720 g onion/garlic-free stock", "120 g canned coconut milk", "Salt & pepper"],
    steps: [
      "Soften the pumpkin and ginger in the infused oil a few minutes.",
      "Add the stock and simmer 20 minutes until soft.",
      "Blend with the coconut milk until silky; season."
    ], safety: "Keep to about a 240 g bowl. Japanese pumpkin is low-FODMAP in moderate servings, but very large portions add up." },

  { meal: "soups", icon: "🍜", name: "Soothing Chicken & Rice Soup", tagline: "The gentlest bowl for a tender tummy.",
    time: "30 min", serves: "Serves 4",
    why: "A simple onion/garlic-free chicken-and-rice soup is easy to digest and entirely low-FODMAP.",
    ingredients: ["960 g onion/garlic-free chicken stock", "2 chicken thighs", "1 carrot, diced", "90 g white rice", "Green spring-onion tops & parsley", "Garlic-infused oil, lemon, salt & pepper"],
    steps: [
      "Simmer the chicken in the stock 15 minutes, then lift out and shred.",
      "Add the carrot and rice; cook 12-15 minutes until tender.",
      "Return the chicken, stir in herbs, infused oil and a squeeze of lemon."
    ], safety: "" },

  { meal: "soups", icon: "🍅", name: "Tomato Basil Rice Soup", tagline: "Like marinara became a cosy bowl.",
    time: "30 min", serves: "Serves 4",
    why: "Plain tomato, rice, basil and onion/garlic-free stock make a pantry soup that still feels rich.",
    ingredients: ["2 × 400 g cans crushed tomatoes", "90 g white rice", "720 g onion/garlic-free stock", "15 g tomato paste", "Garlic-infused oil", "Fresh basil", "Parmesan, salt & pepper"],
    steps: [
      "Warm garlic-infused oil, then cook the tomato paste for 1 minute.",
      "Add crushed tomatoes, stock and rice; simmer 20 minutes until the rice is tender.",
      "Season, stir through basil, and serve with parmesan."
    ], safety: "Tomato paste is best kept to a modest amount per bowl; this recipe spreads 15 g across four serves." },

  { meal: "soups", icon: "🍲", name: "Miso Ginger Tofu Soup", tagline: "A clean, light bowl for tired evenings.",
    time: "20 min", serves: "Serves 2",
    why: "Firm tofu, bok choy, rice noodles and a measured spoon of miso create a low-FODMAP soup with real umami.",
    ingredients: ["720 g water or onion/garlic-free stock", "18 g miso paste", "5 g grated ginger", "150 g firm tofu, cubed", "2 heads bok choy", "Rice noodles", "Green spring-onion tops", "Sesame oil"],
    steps: [
      "Simmer the ginger in water or stock for 5 minutes.",
      "Whisk a little hot liquid into the miso, then stir it back into the pot.",
      "Add tofu, bok choy and cooked rice noodles; warm gently.",
      "Finish with spring-onion tops and a few drops of sesame oil."
    ], safety: "Keep miso to about 10 g per serving and avoid stock powders with onion or garlic." },

  { meal: "soups", icon: "🫑", name: "Roasted Red Pepper & Tomato Soup", tagline: "Smoky, sweet and deeply comforting.",
    time: "40 min", serves: "Serves 4",
    why: "Roasting red capsicum and tomato builds a naturally sweet, onion-free base; infused oil carries the savoury depth.",
    ingredients: ["3 red capsicums, halved", "4 tomatoes, halved", "42 g garlic-infused olive oil", "720 g onion/garlic-free stock", "Green spring-onion tops", "2 g smoked paprika", "Salt, pepper & basil"],
    steps: [
      "Heat oven to 220°C. Roast the capsicum and tomato with 14 g oil for 25 minutes until charred.",
      "Soften the spring-onion tops and paprika in the rest of the oil in a pot.",
      "Add the roasted vegetables and stock; simmer 10 minutes.",
      "Blend smooth, season, and finish with torn basil."
    ], safety: "" },

  { meal: "soups", icon: "🥣", name: "Silky Parsnip & Chive Soup", tagline: "A smooth, sweet, onion-free winter warmer.",
    time: "35 min", serves: "Serves 4",
    why: "Parsnip is a low-FODMAP root vegetable; blended with infused oil and stock it turns velvety without any onion.",
    ingredients: ["5 parsnips, peeled & chopped", "42 g garlic-infused olive oil", "960 g onion/garlic-free stock", "Green tops of 1 leek or 2 spring onions", "Pinch of nutmeg", "Salt, pepper & chives", "A swirl of lactose-free cream"],
    steps: [
      "Soften the leek or spring-onion tops in the infused oil for 2 minutes.",
      "Add the parsnip and stock; simmer 20-25 minutes until very tender.",
      "Blend until silky and season with nutmeg, salt and pepper.",
      "Finish with a swirl of cream and a scatter of chives."
    ], safety: "" },

  /* -- Salads & sides -- */
  { meal: "salads", icon: "🥗", name: "Onion-Free Quinoa Tabbouleh", tagline: "Herby, lemony and protein-rich.",
    time: "20 min", serves: "Serves 4",
    why: "Swapping the usual bulgur for quinoa keeps it gluten-free, and we simply leave the onion out.",
    ingredients: ["185 g cooked quinoa, cooled", "Large handful parsley, chopped", "Handful mint, chopped", "2 tomatoes, diced", "½ cucumber, diced", "Green spring-onion tops", "Juice of 1 lemon + olive oil, salt"],
    steps: [
      "Combine the quinoa, herbs and vegetables.",
      "Dress generously with lemon and olive oil; season.",
      "Rest 10 minutes before serving."
    ], safety: "" },

  { meal: "salads", icon: "🥔", name: "Garlic-Oil Smashed Potatoes", tagline: "Crispy edges, fluffy middles.",
    time: "45 min", serves: "Serves 4",
    why: "Potatoes are a low-FODMAP carbohydrate hero; infused oil gives the garlic flavour safely.",
    ingredients: ["12 baby potatoes", "42 g garlic-infused oil", "Rosemary & salt", "Chives, to finish"],
    steps: [
      "Boil the potatoes until tender, then drain and let steam-dry.",
      "Smash each one flat on an oiled tray.",
      "Drizzle with infused oil, rosemary and salt; roast at 220°C for 25-30 minutes.",
      "Scatter with chives."
    ], safety: "" },

  { meal: "salads", icon: "🍅", name: "Classic Caprese Salad", tagline: "Three ingredients, zero effort, all flavour.",
    time: "10 min", serves: "Serves 2",
    why: "Tomato, mozzarella and basil are all low-FODMAP - an instant safe starter or side.",
    ingredients: ["3 ripe tomatoes, sliced", "Fresh mozzarella, sliced", "Fresh basil leaves", "Extra-virgin olive oil & a little balsamic", "Salt & pepper"],
    steps: [
      "Layer the tomato and mozzarella on a plate.",
      "Tuck in basil leaves.",
      "Drizzle with oil and balsamic; season and serve."
    ], safety: "" },

  { meal: "salads", icon: "🍯", name: "Maple-Roasted Carrots", tagline: "Sweet, sticky and crowd-pleasing.",
    time: "35 min", serves: "Serves 4",
    why: "Pure maple syrup is low-FODMAP, making a safe glaze for naturally sweet carrots.",
    ingredients: ["6 carrots, in batons", "28 g olive oil", "20 g maple syrup", "Thyme & salt", "A few walnuts, chopped"],
    steps: [
      "Toss the carrots with oil, maple, thyme and salt.",
      "Roast at 200°C for 25 minutes until caramelised.",
      "Scatter with walnuts to serve."
    ], safety: "" },

  { meal: "salads", icon: "🥒", name: "Cucumber, Feta & Herb Salad", tagline: "Cool, crunchy and refreshing.",
    time: "10 min", serves: "Serves 4",
    why: "Cucumber, feta and olives are all low-FODMAP staples - a Greek-style salad minus the onion.",
    ingredients: ["2 cucumbers, chopped", "100 g feta, cubed", "A handful olives", "Mint & dill", "Lemon-herb vinaigrette (see Basics)"],
    steps: [
      "Combine the cucumber, feta and olives.",
      "Add the herbs and toss through the vinaigrette.",
      "Serve cold."
    ], safety: "" },

  { meal: "salads", icon: "🐟", name: "Niçoise-Style Tuna Potato Salad", tagline: "A complete lunch that travels well.",
    time: "25 min", serves: "Serves 2",
    why: "Potato, green beans, egg, tuna and olives make a classic-style salad without onion or wheat.",
    ingredients: ["Baby potatoes, boiled and halved", "Green beans, blanched", "2 boiled eggs", "1 tin tuna", "Lettuce", "Olives", "Lemon-herb vinaigrette"],
    steps: [
      "Arrange lettuce, potatoes, green beans, tuna, eggs and olives in shallow bowls.",
      "Spoon over lemon-herb vinaigrette.",
      "Season with pepper and extra herbs."
    ], safety: "Choose plain tuna and skip traditional onion-heavy dressings." },

  { meal: "salads", icon: "🎃", name: "Roasted Kabocha Quinoa Bowl", tagline: "Sweet roast pumpkin, herbs and crunch.",
    time: "40 min", serves: "Serves 3",
    why: "Kabocha pumpkin, quinoa, feta and pumpkin seeds build a filling bowl with Low-FODMAP portions front and centre.",
    ingredients: ["360 g kabocha pumpkin, cubed", "185 g cooked quinoa", "Baby spinach", "Feta", "Pumpkin seeds", "Garlic-infused oil", "Lemon juice & fresh herbs"],
    steps: [
      "Roast the kabocha with garlic-infused oil and salt at 200°C until tender.",
      "Toss quinoa with spinach, herbs and lemon juice.",
      "Top with roasted kabocha, feta and pumpkin seeds."
    ], safety: "Keep kabocha to about 150 g per serve and avoid swapping in butternut squash without reducing the portion." },

  { meal: "salads", icon: "🥗", name: "Lemony Rice & Herb Salad", tagline: "A make-ahead grain salad that travels well.",
    time: "20 min", serves: "Serves 4",
    why: "Cooled rice, fresh herbs and low-FODMAP vegetables make a bright, filling salad with no onion or garlic.",
    ingredients: ["480 g cooked long-grain rice, cooled", "Large handful parsley & mint, chopped", "½ cucumber, diced", "10 cherry tomatoes, halved", "½ red capsicum, diced", "60 g feta, crumbled", "Lemon-herb vinaigrette (see Basics)", "Green spring-onion tops"],
    steps: [
      "Fluff the cooled rice into a large bowl.",
      "Add the herbs, cucumber, tomato, capsicum and feta.",
      "Toss through the vinaigrette and spring-onion tops.",
      "Season and chill until ready to serve."
    ], safety: "" },

  /* -- Snacks -- */
  { meal: "snacks", icon: "🍌", name: "PB & Banana Rice Cakes", tagline: "A two-minute, satisfying snack.",
    time: "5 min", serves: "Serves 1",
    why: "Rice cakes, peanut butter and a firm banana are all low-FODMAP in everyday portions.",
    ingredients: ["2 plain rice cakes", "32 g peanut butter", "½ firm banana, sliced", "A little cinnamon"],
    steps: [
      "Spread the peanut butter over the rice cakes.",
      "Top with banana and a dusting of cinnamon."
    ], safety: "" },

  { meal: "snacks", icon: "🍿", name: "Stovetop Popcorn", tagline: "The ultimate safe movie snack.",
    time: "10 min", serves: "Serves 2",
    why: "Plain popcorn is low-FODMAP by the regular bowl - far gentler than most packaged chips.",
    ingredients: ["40 g popcorn kernels", "14 g oil", "Salt (or a little maple + cinnamon)"],
    steps: [
      "Heat the oil and a few kernels in a lidded pot until they pop.",
      "Add the rest, cover, and shake gently until the popping slows.",
      "Tip into a bowl and season."
    ], safety: "" },

  { meal: "snacks", icon: "🥜", name: "Peanut Butter Oat Energy Balls", tagline: "Make a batch for the whole week.",
    time: "15 min", serves: "Makes ~12",
    why: "Oats, peanut butter and maple bind into no-bake bites; a couple at a time keeps the oats low-FODMAP.",
    ingredients: ["90 g rolled oats", "125 g peanut butter", "40 g maple syrup", "20 g dark chocolate chips", "12 g chia seeds"],
    steps: [
      "Mix everything in a bowl until it clumps together.",
      "Roll into about 12 balls.",
      "Chill 30 minutes to firm up; keep refrigerated."
    ], safety: "" },

  { meal: "snacks", icon: "🧀", name: "Cheese & Cracker Snack Plate", tagline: "A no-cook spread for any time of day.",
    time: "10 min", serves: "Serves 2",
    why: "Hard cheese is virtually lactose-free, and these accompaniments are all low-FODMAP in snack portions.",
    ingredients: ["Hard cheese (cheddar), sliced", "Rice or corn crackers", "Cucumber & carrot sticks", "A few walnuts & olives", "A small handful of grapes"],
    steps: [
      "Arrange everything on a board.",
      "Keep the grape portion to a small handful and enjoy."
    ], safety: "" },

  { meal: "snacks", icon: "🫐", name: "Blueberry Yogurt Freezer Bark", tagline: "Cold, creamy and snackable.",
    time: "10 min + freeze", serves: "Serves 6",
    why: "Lactose-free yogurt, blueberries and pumpkin seeds make a refreshing snack with controlled portions.",
    ingredients: ["480 g lactose-free Greek-style yogurt", "75 g blueberries", "20 g maple syrup", "20 g pumpkin seeds", "Vanilla"],
    steps: [
      "Stir yogurt with maple and vanilla.",
      "Spread thinly on a lined tray and scatter over blueberries and pumpkin seeds.",
      "Freeze until firm, then snap into pieces."
    ], safety: "Keep to a few pieces per serve; large yogurt portions can still feel heavy." },

  { meal: "snacks", icon: "🧀", name: "Cheddar Oat Crackers", tagline: "Crisp little crackers for dips and lunchboxes.",
    time: "30 min", serves: "Makes ~24",
    why: "Oats and aged cheddar make a savoury wheat-free cracker that pairs with safe dips or cheese plates.",
    ingredients: ["90 g rolled oats, blitzed into coarse flour", "55 g grated cheddar", "1 egg", "14 g olive oil", "15 g water", "Salt & dried rosemary"],
    steps: [
      "Mix everything into a firm dough, adding a splash more water if needed.",
      "Roll thinly between baking paper and cut into small squares.",
      "Bake at 180°C for 14-16 minutes until crisp."
    ], safety: "Enjoy a small handful; oats are portion-dependent on the low-FODMAP diet." },

  { meal: "snacks", icon: "🌰", name: "Maple-Cinnamon Roasted Nuts & Seeds", tagline: "A crunchy, make-ahead snack for the whole week.",
    time: "20 min", serves: "Makes ~480 g",
    why: "Walnuts, peanuts, macadamias and pumpkin seeds are all low-FODMAP in a small-handful serve - far gentler than a cashew or pistachio mix.",
    ingredients: ["60 g walnuts", "75 g peanuts", "65 g macadamias", "70 g pumpkin seeds", "20 g maple syrup", "2 g cinnamon", "Pinch of salt"],
    steps: [
      "Heat oven to 160°C and line a tray.",
      "Toss the nuts and seeds with the maple, cinnamon and salt.",
      "Roast 12-15 minutes, stirring once, until golden and fragrant.",
      "Cool completely (they crisp as they cool) and store in a jar."
    ], safety: "Keep to a small handful (about 30 g) per serve - even low-FODMAP nuts stack up in large amounts." },

  { meal: "snacks", icon: "🧆", name: "Zucchini & Feta Fritters", tagline: "Crispy, savoury and freezer-friendly.",
    time: "25 min", serves: "Makes ~8",
    why: "Zucchini and feta are low-FODMAP, and a gluten-free flour binds these fritters without any wheat.",
    ingredients: ["2 zucchini, grated", "2 eggs", "70 g gluten-free plain flour", "60 g feta, crumbled", "Green spring-onion tops", "Garlic-infused oil, for frying", "Salt & pepper"],
    steps: [
      "Squeeze the grated zucchini firmly to remove the excess water.",
      "Mix with the eggs, flour, feta, spring-onion tops and seasoning.",
      "Fry heaped spoonfuls in the infused oil 2-3 minutes each side until golden.",
      "Drain and serve warm - great with a squeeze of lemon."
    ], safety: "" },

  /* -- Sweets -- */
  { meal: "sweets", icon: "🍪", name: "3-Ingredient Peanut Butter Cookies", tagline: "Flourless, fuss-free and naturally gluten-free.",
    time: "20 min", serves: "Makes ~12",
    why: "No flour means no wheat; peanut butter and egg do all the work.",
    ingredients: ["250 g peanut butter", "100 g sugar", "1 egg", "2 g vanilla (optional)", "Pinch of salt"],
    steps: [
      "Heat oven to 180°C and line a tray.",
      "Mix everything into a stiff dough.",
      "Roll into balls, flatten with a fork, and bake 10-12 minutes.",
      "Cool on the tray (they firm up as they cool)."
    ], safety: "" },

  { meal: "sweets", icon: "🍓", name: "Strawberry Chia Jam", tagline: "A fresh jam with no funny business.",
    time: "15 min", serves: "Makes ~240 g",
    why: "Strawberries and maple are low-FODMAP, and chia thickens the jam with no special equipment.",
    ingredients: ["300 g strawberries", "24 g chia seeds", "20 g maple syrup", "Squeeze of lemon"],
    steps: [
      "Warm and mash the strawberries in a small pan until saucy.",
      "Stir in the chia, maple and lemon.",
      "Rest 15-20 minutes to set; keep refrigerated up to a week."
    ], safety: "" },

  { meal: "sweets", icon: "🍫", name: "Dark Chocolate & Strawberry Bark", tagline: "An elegant treat in ten minutes.",
    time: "10 min + chill", serves: "Serves 6",
    why: "Dark chocolate is low-FODMAP in small servings; freeze-dried strawberries add crunch without extra sugar.",
    ingredients: ["100 g dark chocolate", "15 g freeze-dried (or dried) strawberries", "20 g chopped walnuts or pumpkin seeds"],
    steps: [
      "Gently melt the chocolate and spread it thin on lined paper.",
      "Scatter over the strawberries and nuts.",
      "Chill until set, then snap into shards."
    ], safety: "Dark chocolate is low-FODMAP at about 30 g (a couple of squares per serve) - easy does it." },

  { meal: "sweets", icon: "🍋", name: "Lemon Polenta Cake", tagline: "A bright, gluten-free crowd-pleaser.",
    time: "55 min", serves: "Serves 8",
    why: "Polenta and almond meal stand in for flour, keeping the cake gluten-free and low-FODMAP by the slice.",
    ingredients: ["160 g fine polenta", "100 g almond meal", "150 g sugar", "150 g butter, softened", "3 eggs", "2 lemons (zest + juice)", "4 g baking powder"],
    steps: [
      "Heat oven to 180°C and line a round tin.",
      "Cream the butter and sugar, then beat in the eggs.",
      "Fold in the polenta, almond meal, baking powder, lemon zest and juice.",
      "Bake 35-40 minutes until golden and set. Cool before slicing."
    ], safety: "" },

  { meal: "sweets", icon: "🍊", name: "Orange Almond Polenta Muffins", tagline: "Citrusy little cakes for the freezer.",
    time: "35 min", serves: "Makes 10",
    why: "Orange, polenta and a measured amount of almond meal make a gluten-free muffin that stays low-FODMAP by portion.",
    ingredients: ["120 g fine polenta", "50 g almond meal", "70 g gluten-free plain flour", "100 g sugar", "2 eggs", "75 g melted butter", "1 orange (zest + juice)", "4 g baking powder"],
    steps: [
      "Heat oven to 180°C and line a muffin tin.",
      "Whisk dry ingredients in one bowl and wet ingredients in another.",
      "Combine gently, divide among 10 muffin holes and bake 18-22 minutes.",
      "Cool completely; freeze extras for easy portions."
    ], safety: "Stick to one muffin per serve; almond meal is safe here because the batch is portioned." },

  { meal: "sweets", icon: "🍰", name: "Mixed-Berry Pavlova", tagline: "A showstopper that happens to be gluten-free.",
    time: "1½ hr + cooling", serves: "Serves 8",
    why: "Meringue is just egg white and sugar, and low-FODMAP berries with lactose-free cream keep every bite gentle.",
    ingredients: ["4 egg whites", "200 g caster sugar", "5 g white vinegar", "3 g cornflour", "240 g lactose-free cream, whipped", "Strawberries, blueberries & kiwi, to top"],
    steps: [
      "Heat oven to 120°C and line a tray.",
      "Whisk the egg whites to soft peaks, then add the sugar a spoonful at a time until glossy and stiff.",
      "Fold in the vinegar and cornflour; spoon into a circle on the tray.",
      "Bake 1¼ hours, then cool in the turned-off oven.",
      "Top with the whipped cream and berries just before serving."
    ], safety: "" },

  { meal: "sweets", icon: "🍫", name: "Fudgy Flourless Chocolate Brownies", tagline: "Rich, gluten-free and deeply chocolatey.",
    time: "35 min", serves: "Makes 12",
    why: "Dark chocolate and cocoa are low-FODMAP in modest servings, and there's no wheat flour at all - just a fudgy, naturally gluten-free square.",
    ingredients: ["150 g dark chocolate", "120 g butter", "150 g sugar", "3 eggs", "45 g cocoa powder", "30 g cornflour (or GF flour)", "60 g chopped walnuts", "5 g vanilla"],
    steps: [
      "Heat oven to 170°C and line a square tin.",
      "Gently melt the chocolate and butter together, then cool slightly.",
      "Whisk in the sugar, eggs and vanilla.",
      "Fold in the cocoa, cornflour and walnuts.",
      "Bake 20-25 minutes until just set; cool before cutting into 12 squares."
    ], safety: "Dark chocolate and cocoa are low-FODMAP in small serves - enjoy a square at a time." },

  /* -- Drinks -- */
  { meal: "drinks", icon: "🥤", name: "Berry & Banana Breakfast Smoothie", tagline: "A five-minute, gut-gentle start.",
    time: "5 min", serves: "Serves 1",
    why: "Low-FODMAP fruit and lactose-free dairy give you a creamy, filling smoothie without a fructose hit.",
    ingredients: ["240 g lactose-free or almond milk", "⅓ ripe banana (or whole firm banana)", "75 g strawberries", "16 g peanut butter", "12 g chia seeds", "Ice"],
    steps: ["Add everything to a blender.", "Blend until smooth, adding water to reach your preferred thickness.", "Pour and enjoy straight away while the chia is fresh."], safety: "" },

  { meal: "drinks", icon: "🥬", name: "Green Pineapple Smoothie", tagline: "A fresh, tropical pick-me-up.",
    time: "5 min", serves: "Serves 1",
    why: "Pineapple and spinach are low-FODMAP, making a vitamin-rich green smoothie that won't trigger symptoms.",
    ingredients: ["165 g pineapple chunks", "Handful baby spinach", "240 g lactose-free or almond milk", "½ firm banana", "Ice"],
    steps: ["Blend everything until smooth.", "Add water or ice to reach your preferred thickness."], safety: "" },

  { meal: "drinks", icon: "🍍", name: "Pineapple Mint Cooler", tagline: "A sparkling drink that feels like a treat.",
    time: "5 min", serves: "Serves 2",
    why: "Pineapple, lime, mint and sparkling water give a low-FODMAP alternative to cola or high-fructose juices.",
    ingredients: ["165 g pineapple chunks", "Juice of 1 lime", "Mint leaves", "7 g maple syrup (optional)", "Sparkling water", "Ice"],
    steps: [
      "Muddle pineapple, lime, mint and maple in a jug.",
      "Add ice and top with sparkling water.",
      "Stir, taste and serve cold."
    ], safety: "Keep to one glass; very large fruit drink portions can stack quickly." },

  { meal: "drinks", icon: "🥛", name: "Golden Turmeric Latte", tagline: "A warm, soothing, caffeine-free wind-down.",
    time: "5 min", serves: "Serves 1",
    why: "Lactose-free or almond milk with turmeric, ginger and cinnamon makes a comforting, anti-inflammatory drink with no triggers.",
    ingredients: ["240 g lactose-free or almond milk", "1 g ground turmeric", "1 g ground ginger (or a little fresh)", "Pinch of cinnamon & black pepper", "7 g maple syrup"],
    steps: [
      "Warm the milk in a small pan (don't let it boil).",
      "Whisk in the turmeric, ginger, cinnamon, pepper and maple.",
      "Froth or whisk until smooth and pour into a mug."
    ], safety: "" },

  { meal: "drinks", icon: "🍋", name: "Fresh Ginger & Lemon Tea", tagline: "The kindest thing to sip after dinner.",
    time: "10 min", serves: "Serves 1",
    why: "Ginger is a traditional digestive soother and is freely low-FODMAP - a simple, warming, caffeine-free drink.",
    ingredients: ["1 thumb fresh ginger, thinly sliced", "240 g boiling water", "Squeeze of lemon", "7 g maple syrup (optional)"],
    steps: [
      "Steep the ginger in the boiling water for 5 minutes.",
      "Stir in the lemon and maple to taste.",
      "Sip slowly - lovely after a meal."
    ], safety: "" },

  /* -- 10 extra low-FODMAP recipes -- */
  { meal: "basics", icon: "🥣", name: "Herby Lactose-Free Yogurt Sauce", tagline: "A cool, garlic-free take on tzatziki.",
    time: "10 min", serves: "Makes ~240 g",
    why: "Tzatziki and ranch lean on raw garlic. Lactose-free yogurt with cucumber, lemon and herbs gives the same cooling tang, trigger-free.",
    ingredients: ["240 g plain lactose-free yogurt", "⅓ cucumber, grated and squeezed dry", "15 g lemon juice", "14 g olive oil", "6 g chopped dill or mint", "Green tops of 1 spring onion, finely sliced", "Salt & pepper"],
    steps: [
      "Grate the cucumber and squeeze out the excess water in a clean cloth.",
      "Stir it through the yogurt with the lemon, oil, herbs and spring-onion tops.",
      "Season, chill 10 minutes, then serve with grilled meat, fish or veg sticks."
    ], safety: "Uses lactose-free yogurt and green onion tops only - no garlic or onion bulb." },

  { meal: "breakfast", icon: "🍳", name: "Turmeric Tofu Scramble", tagline: "A golden, savoury, plant-based start.",
    time: "15 min", serves: "Serves 2",
    why: "A veggie alternative to scrambled eggs - firm tofu holds together and soaks up turmeric, while spinach and tomato keep it fresh and low-FODMAP.",
    ingredients: ["250 g firm tofu, drained and crumbled", "14 g garlic-infused olive oil", "1 g ground turmeric", "30 g baby spinach", "1 small tomato, diced", "Green tops of 2 spring onions", "5 g nutritional yeast (optional)", "Salt & pepper"],
    steps: [
      "Press the tofu briefly, then crumble it into rough curds.",
      "Warm the infused oil and cook the spring-onion tops for 1 minute.",
      "Add the tofu and turmeric; fry 4-5 minutes until golden.",
      "Stir through the tomato and spinach until just wilted, season and serve on gluten-free toast."
    ], safety: "Use firm tofu, not silken - silken tofu is higher in FODMAPs." },

  { meal: "breakfast", icon: "🍅", name: "Baked Eggs in Spiced Tomato", tagline: "A shakshuka-style skillet, minus the onion and garlic.",
    time: "25 min", serves: "Serves 2",
    why: "Classic shakshuka starts with onion and garlic. Infused oil, red pepper and paprika build the same smoky base so the eggs poach in a rich, safe sauce.",
    ingredients: ["14 g garlic-infused olive oil", "1 red bell pepper, diced", "1 × 400 g can crushed tomatoes", "2 g smoked paprika", "1 g ground cumin", "Green tops of 2 spring onions", "4 eggs", "40 g feta, crumbled", "Fresh parsley or coriander"],
    steps: [
      "Warm the infused oil and soften the red pepper and spring-onion tops for 4-5 minutes.",
      "Stir in the paprika and cumin, then the tomatoes; simmer 8-10 minutes until thick.",
      "Make four wells, crack in the eggs, cover and cook until the whites set.",
      "Scatter with feta and herbs and scoop up with gluten-free toast."
    ], safety: "No onion or garlic bulb; the smoky base comes from paprika and infused oil." },

  { meal: "mains", icon: "🍚", name: "Zucchini & Parmesan Risotto", tagline: "Creamy, comforting and completely onion-free.",
    time: "35 min", serves: "Serves 4",
    why: "Restaurant risotto is built on an onion soffritto. Infused oil and spring-onion tops give the savoury base, and the rice turns creamy all on its own.",
    ingredients: ["28 g garlic-infused olive oil", "Green tops of 3 spring onions", "300 g arborio rice", "120 g dry white wine (optional)", "1200 g low-FODMAP chicken or vegetable stock, kept warm", "2 small zucchini, diced (about 80 g per serve)", "50 g grated parmesan", "15 g butter", "Salt & pepper"],
    steps: [
      "Warm the infused oil and cook the spring-onion tops for 1 minute, then toast the rice for 1-2 minutes.",
      "Pour in the wine and let it cook away.",
      "Add the warm stock a ladle at a time, stirring, until each is absorbed (about 18 minutes).",
      "Stir in the zucchini for the last 6-7 minutes, then beat in the parmesan and butter. Season and serve."
    ], safety: "Keep zucchini to about 80 g per serve, and use an onion- and garlic-free stock." },

  { meal: "mains", icon: "🍜", name: "Lemongrass Pork Rice Noodles", tagline: "A fresh, fragrant noodle bowl with real punch.",
    time: "25 min", serves: "Serves 2",
    why: "Vietnamese noodle bowls usually hide onion and garlic. Lemongrass, ginger and spring-onion tops carry the aroma instead, over safe rice noodles.",
    ingredients: ["200 g rice vermicelli noodles", "300 g pork mince", "14 g garlic-infused oil", "1 stalk lemongrass, finely chopped", "5 g grated ginger", "Green tops of 2 spring onions", "15 g fish sauce (check garlic-free)", "15 g tamari", "4 g brown sugar", "Juice of 1 lime", "1 carrot, julienned", "½ cucumber, sliced", "Mint & coriander", "18 g crushed peanuts"],
    steps: [
      "Soak the rice noodles in hot water until tender, then drain.",
      "Fry the pork in the infused oil over high heat until browned.",
      "Add the lemongrass, ginger and spring-onion tops for 1 minute, then the fish sauce, tamari and sugar.",
      "Pile noodles into bowls with carrot and cucumber, top with the pork, and finish with lime, herbs and peanuts."
    ], safety: "Use a garlic-free fish sauce and infused oil; keep peanuts to about 15 g per bowl." },

  { meal: "soups", icon: "🥔", name: "Potato & Leek-Top Soup", tagline: "Silky and warming, using the safe part of the leek.",
    time: "35 min", serves: "Serves 4",
    why: "The white of a leek is high-FODMAP, but the green tops are not - they carry all the gentle oniony flavour into this creamy potato soup.",
    ingredients: ["Green tops of 2 leeks, sliced (green part only)", "28 g garlic-infused olive oil", "700 g potatoes, peeled and diced", "960 g low-FODMAP vegetable or chicken stock", "120 g lactose-free milk or cream", "Chives, to serve", "Salt & pepper"],
    steps: [
      "Soften the green leek tops in the infused oil for 4-5 minutes without colouring.",
      "Add the potatoes and stock; simmer 20 minutes until the potato is very soft.",
      "Blend until smooth, then stir in the lactose-free milk and warm through.",
      "Season well and serve scattered with chives."
    ], safety: "Use only the green tops of the leek - the white bulb is high in fructans." },

  { meal: "salads", icon: "🥗", name: "Rocket, Orange & Walnut Salad", tagline: "Peppery, sweet and bright in five minutes.",
    time: "10 min", serves: "Serves 2",
    why: "Rocket, orange and walnuts are all comfortably low-FODMAP, and the sweet-sharp mix makes a fresh side for grilled meat or fish.",
    ingredients: ["3 big handfuls rocket (arugula)", "1 orange, peeled and segmented", "30 g walnuts, roughly chopped", "30 g feta or shaved parmesan", "14 g olive oil", "5 g red-wine vinegar", "4 g maple syrup", "Salt & pepper"],
    steps: [
      "Toast the walnuts in a dry pan for 2 minutes until fragrant.",
      "Whisk the oil, vinegar, maple, salt and pepper into a dressing.",
      "Toss the rocket with the orange segments and most of the dressing.",
      "Top with walnuts and feta, drizzle over the rest and serve straight away."
    ], safety: "Keep to about one orange and a small handful of walnuts per serve." },

  { meal: "snacks", icon: "🥬", name: "Crispy Baked Kale Chips", tagline: "The crunchy, salty snack with nothing to hide.",
    time: "20 min", serves: "Serves 2",
    why: "Shop crisps often carry onion or garlic powder. Baked kale gives you the salty crunch from a single low-FODMAP green.",
    ingredients: ["1 bunch kale, stems removed, torn into pieces", "14 g olive oil", "3 g salt", "5 g grated parmesan (optional)", "Pinch of paprika"],
    steps: [
      "Heat the oven to 160C / 320F and line two trays.",
      "Dry the kale well, then massage it with the oil, salt and paprika.",
      "Spread in a single layer, not touching, and bake 12-15 minutes until crisp.",
      "Cool for a couple of minutes (they crisp further) and dust with parmesan."
    ], safety: "Season with plain salt and paprika, not onion or garlic powder." },

  { meal: "sweets", icon: "🍮", name: "Lactose-Free Berry Panna Cotta", tagline: "A silky make-ahead dessert that feels fancy.",
    time: "15 min + chilling", serves: "Serves 4",
    why: "Panna cotta is naturally simple - swap in lactose-free cream and top with low-FODMAP berries and it stays a safe, elegant treat.",
    ingredients: ["480 g lactose-free cream (or lactose-free milk + cream)", "50 g sugar", "5 g vanilla", "7 g powdered gelatine", "45 g cold water", "150 g strawberries and blueberries, to serve"],
    steps: [
      "Sprinkle the gelatine over the cold water and let it swell for 5 minutes.",
      "Warm the cream, sugar and vanilla until steaming (not boiling), then whisk in the gelatine until dissolved.",
      "Pour into 4 glasses or moulds and chill at least 4 hours until set.",
      "Top with the berries just before serving."
    ], safety: "Use lactose-free dairy, and keep berries to a small handful per serve." },

  { meal: "drinks", icon: "🍵", name: "Iced Matcha Latte", tagline: "A calm, grassy-green pick-me-up over ice.",
    time: "5 min", serves: "Serves 1",
    why: "Matcha with lactose-free or almond milk makes a low-FODMAP cafe-style latte without the large milky lactose load of a regular one.",
    ingredients: ["2 g matcha powder", "30 g hot water", "240 g lactose-free or almond milk", "7 g maple syrup (optional)", "Ice"],
    steps: [
      "Whisk the matcha with the hot water until smooth and frothy, with no lumps.",
      "Fill a glass with ice and pour over the milk.",
      "Add the matcha and maple, then stir and serve."
    ], safety: "Choose lactose-free or almond milk; go easy on oat milk, which is higher in FODMAPs per glass." },

  /* -- New food recipes -- */
  { meal: "breakfast", icon: "🫐", name: "Blueberry Quinoa Breakfast Pudding", tagline: "A make-ahead berry breakfast with gentle staying power.",
    time: "10 min + overnight", serves: "Serves 2",
    why: "Quinoa flakes, lactose-free milk and blueberries make a filling breakfast from familiar low-FODMAP staples.",
    ingredients: ["50 g quinoa flakes", "180 g lactose-free milk", "10 g ground flaxseed", "14 g maple syrup", "75 g blueberries", "10 g pumpkin seeds"],
    steps: [
      "Stir the quinoa flakes, milk, flaxseed and maple together in a covered container.",
      "Refrigerate overnight, or for at least 4 hours, until softly thickened.",
      "Divide between two bowls and finish with blueberries and pumpkin seeds."
    ], safety: "Keep the recipe divided into two serves, and use lactose-free milk." },

  { meal: "breakfast", icon: "🍳", name: "Spinach, Tomato & Feta Polenta Bowl", tagline: "A warm savoury breakfast that feels properly cooked.",
    time: "20 min", serves: "Serves 2",
    why: "Polenta and eggs are dependable low-FODMAP staples, while spinach, a measured handful of tomatoes and feta bring colour and protein.",
    ingredients: ["80 g quick-cook polenta", "480 g onion- and garlic-free stock or water", "10 g garlic-infused olive oil", "2 eggs", "60 g baby spinach", "10 cherry tomatoes, halved", "40 g feta", "Chives, salt & pepper"],
    steps: [
      "Simmer the polenta in the stock or water, stirring, until creamy and tender.",
      "Warm the garlic-infused oil in a pan; wilt the spinach and tomatoes, then season.",
      "Spoon the polenta into bowls, top with the greens, a fried or poached egg, feta and chives."
    ], safety: "Use garlic-infused oil rather than garlic, and keep to five cherry tomatoes per serving." },

  { meal: "mains", icon: "🍗", name: "Garlic-Infused Chicken & Herb Rice Pilaf", tagline: "A bright one-pan chicken dinner without the onion base.",
    time: "45 min", serves: "Serves 4",
    why: "Rice, plain chicken and low-FODMAP vegetables make a balanced dinner, while garlic-infused oil gives the familiar aroma without fructans.",
    ingredients: ["350 g plain chicken thigh fillets, diced", "300 g basmati rice", "28 g garlic-infused olive oil", "2 carrots, diced", "1 small zucchini, diced", "1 green bell pepper, diced", "720 g onion- and garlic-free chicken stock", "2 g ground turmeric", "Chopped parsley and chives", "Salt & pepper"],
    steps: [
      "Brown the chicken in half the infused oil, then set aside.",
      "Cook the carrot, zucchini and green pepper in the remaining oil for 4 minutes; stir in rice and turmeric.",
      "Add stock and chicken, cover and simmer until the rice is tender and the chicken is cooked through.",
      "Rest for 5 minutes, then fluff with parsley and chives."
    ], safety: "Choose stock with no onion or garlic, use green rather than red bell pepper, and divide into four servings." },

  { meal: "mains", icon: "🐟", name: "Miso Maple Salmon Rice Bowl", tagline: "Glossy baked salmon with crisp vegetables and rice.",
    time: "30 min", serves: "Serves 4",
    why: "Plain salmon and rice are naturally low in FODMAPs; a small amount of miso adds savoury depth when it is spread across four bowls.",
    ingredients: ["400 g salmon fillet, cut into 4 pieces", "320 g cooked white rice", "18 g white miso paste", "20 g maple syrup", "15 g tamari", "10 g rice wine vinegar", "150 g bok choy, sliced", "1 cucumber, thinly sliced", "2 carrots, shredded", "10 g sesame seeds"],
    steps: [
      "Heat the oven to 200C / 400F and line a tray.",
      "Whisk the miso, maple, tamari and vinegar; brush over the salmon and bake 12-15 minutes, until it flakes easily.",
      "Steam or pan-wilt the bok choy while the salmon cooks.",
      "Build bowls with rice, bok choy, cucumber and carrot, then top with salmon and sesame."
    ], safety: "Keep the miso to the stated amount and divide the dish into four servings." },

  { meal: "mains", icon: "🥢", name: "Sesame Ginger Tofu Soba Bowl", tagline: "Cool, crisp noodles with golden tofu and a bright dressing.",
    time: "30 min", serves: "Serves 2",
    why: "Firm tofu, ginger, cucumber and carrot make a satisfying plant-based bowl; measured 100% buckwheat soba keeps the portion low-FODMAP.",
    ingredients: ["100 g 100% buckwheat soba noodles", "250 g firm tofu, pressed and cubed", "14 g garlic-infused olive oil", "2 carrots, shredded", "½ cucumber, ribboned", "75 g shelled edamame", "30 g tamari", "15 g rice wine vinegar", "14 g maple syrup", "5 g fresh ginger, grated", "6 g sesame seeds"],
    steps: [
      "Cook the soba according to the packet, rinse under cold water and drain well.",
      "Pan-fry the tofu in the infused oil until crisp on several sides.",
      "Whisk tamari, vinegar, maple and ginger, then toss with the noodles, carrot, cucumber and edamame.",
      "Divide into two bowls, add the tofu and scatter with sesame."
    ], safety: "Use firm tofu and 100% buckwheat soba, then keep the recipe divided into two portions." },

  { meal: "soups", icon: "🍲", name: "Chicken, Quinoa & Spinach Soup", tagline: "A nourishing bowl for an easy, no-fuss dinner.",
    time: "40 min", serves: "Serves 4",
    why: "Chicken, quinoa, carrot and spinach make a hearty soup without relying on onion or garlic for flavour.",
    ingredients: ["300 g plain chicken breast, diced", "85 g quinoa, rinsed", "14 g garlic-infused olive oil", "2 carrots, diced", "1 small zucchini, diced", "1200 g onion- and garlic-free chicken stock", "60 g baby spinach", "Chives, lemon juice, salt & pepper"],
    steps: [
      "Soften the carrot and zucchini in the infused oil for 4 minutes.",
      "Add stock, quinoa and chicken; simmer until the quinoa is tender and the chicken is cooked through.",
      "Stir in spinach until just wilted, then season with chives, lemon, salt and pepper."
    ], safety: "Use a stock without onion or garlic, and keep zucchini to a modest portion by serving four." },

  { meal: "salads", icon: "🥔", name: "Warm Potato, Green Bean & Egg Salad", tagline: "A substantial salad with soft potato and a sharp lemon dressing.",
    time: "30 min", serves: "Serves 4",
    why: "Potatoes and eggs make this a satisfying meal rather than a side salad, with green beans kept to a comfortable serving.",
    ingredients: ["700 g baby potatoes, halved", "300 g green beans, trimmed", "4 eggs", "60 g lettuce", "20 cherry tomatoes, halved", "28 g olive oil", "15 g lemon juice", "5 g Dijon mustard", "Chives, salt & pepper"],
    steps: [
      "Boil the potatoes until tender; add the green beans for the final 3 minutes, then drain.",
      "Soft- or hard-boil the eggs to your liking and halve them.",
      "Whisk oil, lemon, mustard, chives, salt and pepper.",
      "Toss the warm potatoes and beans with the dressing, then arrange over lettuce with tomatoes and egg."
    ], safety: "Divide into four servings so each bowl has about 75 g green beans and five cherry tomatoes." },

  { meal: "salads", icon: "🍓", name: "Strawberry, Spinach & Feta Quinoa Salad", tagline: "Sweet berries, salty feta and enough quinoa to make it a meal.",
    time: "20 min", serves: "Serves 4",
    why: "Quinoa, strawberries, spinach, feta and walnuts are a colourful way to build a fibre- and protein-containing salad from low-FODMAP ingredients.",
    ingredients: ["370 g cooked quinoa, cooled", "300 g strawberries, sliced", "120 g baby spinach", "80 g feta, crumbled", "60 g walnuts, roughly chopped", "28 g olive oil", "15 g lemon juice", "7 g maple syrup", "Salt & pepper"],
    steps: [
      "Whisk the oil, lemon, maple, salt and pepper into a dressing.",
      "Toss quinoa and spinach with most of the dressing.",
      "Fold through strawberries, feta and walnuts, then drizzle over the remaining dressing."
    ], safety: "Keep to one quarter of the salad per serving so the fruit and walnuts stay moderate." },

  { meal: "snacks", icon: "🧀", name: "Crispy Parmesan Polenta Bites", tagline: "Golden-edged little squares made for dipping or snacking.",
    time: "35 min + cooling", serves: "Makes 16 bites",
    why: "Polenta, aged parmesan and chives create a savoury snack with big flavour and no onion or garlic powder.",
    ingredients: ["160 g quick-cook polenta", "720 g onion- and garlic-free stock or water", "14 g garlic-infused olive oil", "35 g grated parmesan", "3 g chopped chives", "Salt & pepper"],
    steps: [
      "Cook the polenta in stock or water until very thick; stir in parmesan, chives, salt and pepper.",
      "Press into a lined small tray and cool until firm enough to cut.",
      "Cut into 16 squares, brush with infused oil and bake at 220C / 425F for 18-20 minutes, turning once."
    ], safety: "Use garlic-infused oil for flavour, never garlic powder or a stock cube with onion." },

  { meal: "snacks", icon: "🥒", name: "Cucumber, Feta & Walnut Rice Cake Bites", tagline: "A crunchy snack plate that is ready in minutes.",
    time: "10 min", serves: "Serves 4",
    why: "Rice cakes keep the base simple while cucumber, feta and walnuts add crunch, protein and satisfying fat.",
    ingredients: ["8 plain rice cakes", "120 g lactose-free yogurt", "80 g feta, crumbled", "½ cucumber, finely diced", "30 g walnuts, chopped", "5 g lemon juice", "Chives, salt & pepper"],
    steps: [
      "Mix the yogurt, feta, cucumber, lemon, chives, salt and pepper.",
      "Spread the mixture over the rice cakes.",
      "Finish with walnuts and serve straight away so the rice cakes stay crisp."
    ], safety: "Choose plain rice cakes and lactose-free yogurt; two topped cakes make one snack serving." },

  { meal: "sweets", icon: "🥜", name: "Maple Walnut Oat Clusters", tagline: "Small baked clusters with a proper oat-and-nut crunch.",
    time: "30 min", serves: "Serves 4",
    why: "A measured portion of oats, walnuts, pumpkin seeds and maple turns into a simple dessert or afternoon treat without dried fruit.",
    ingredients: ["90 g rolled oats", "60 g walnuts, chopped", "35 g pumpkin seeds", "40 g maple syrup", "1 egg white", "3 g cinnamon", "Pinch of salt"],
    steps: [
      "Heat the oven to 170C / 340F and line a tray.",
      "Mix oats, walnuts, pumpkin seeds, cinnamon and salt; stir in maple and egg white until clumpy.",
      "Spoon into 12 small clusters and bake 15-18 minutes until crisp at the edges.",
      "Cool completely before lifting from the tray."
    ], safety: "Enjoy one quarter of the batch at a time so the oat and walnut portions stay modest." },

  { meal: "sweets", icon: "🍋", name: "Lemon Blueberry Yogurt Pots", tagline: "Cold, creamy little pots with berry freshness.",
    time: "10 min + chilling", serves: "Serves 4",
    why: "Lactose-free yogurt gives these pots their creaminess, with a measured blueberry topping for a light make-ahead dessert.",
    ingredients: ["480 g lactose-free yogurt", "150 g blueberries", "14 g maple syrup", "2 g finely grated lemon zest", "20 g pumpkin seeds", "5 g lemon juice"],
    steps: [
      "Stir the yogurt with maple, lemon zest and lemon juice.",
      "Divide between four small glasses and spoon blueberries on top.",
      "Chill for at least 20 minutes, then finish with pumpkin seeds before serving."
    ], safety: "Keep the recipe split across four small pots so each portion has about 38 g blueberries." }
];

/* Image filename per recipe - SAME ORDER as RECIPES above (see tools/image_manifest.json).
   The site loads assets/img/recipes/<slug>.webp, falling back to the emoji if absent. */
const RECIPE_SLUGS = [
  "marinara", "basil-pesto", "lemon-herb-vinaigrette", "tomato-salsa", "chicken-stock",
  "strawberry-overnight-oats", "spinach-feta-omelette", "gluten-free-pancakes", "kiwi-chia-pudding", "quinoa-porridge", "frittata-muffins", "savoury-rice-congee", "smoked-salmon-potato-hash", "baked-oatmeal",
  "garlic-oil-spaghetti", "roast-chicken-tray-bake", "ginger-chicken-stir-fry", "lemon-salmon", "beef-rice-bowl", "cottage-pie", "margherita-pizza", "tofu-stir-fry", "summer-rolls", "salmon-sushi-rice-bowl", "turkey-lettuce-cups", "tempeh-peanut-rice-bowl", "rosemary-lamb-polenta", "tuna-rice-noodle-salad", "rice-meatballs", "chicken-skewers", "steak-chimichurri", "baked-fish-chips",
  "pho-bowl", "carrot-ginger-soup", "pumpkin-coconut-soup", "chicken-rice-soup", "tomato-basil-rice-soup", "miso-ginger-tofu-soup", "red-pepper-soup", "parsnip-soup",
  "quinoa-tabbouleh", "smashed-potatoes", "caprese-salad", "maple-roasted-carrots", "cucumber-feta-salad", "nicoise-tuna-potato-salad", "kabocha-quinoa-bowl", "rice-herb-salad",
  "pb-banana-rice-cakes", "popcorn", "energy-balls", "cheese-cracker-plate", "blueberry-yogurt-bark", "cheddar-oat-crackers", "roasted-nuts", "zucchini-fritters",
  "peanut-butter-cookies", "strawberry-chia-jam", "chocolate-strawberry-bark", "lemon-polenta-cake", "orange-almond-polenta-muffins", "pavlova", "flourless-brownies",
  "berry-smoothie", "green-smoothie", "pineapple-mint-cooler", "turmeric-latte", "ginger-lemon-tea",
  "herb-yogurt-sauce", "tofu-scramble", "baked-eggs-tomato", "zucchini-risotto", "lemongrass-pork-noodles", "potato-leek-soup", "rocket-orange-salad", "kale-chips", "panna-cotta", "matcha-latte",
  "blueberry-quinoa-pudding", "spinach-tomato-feta-polenta", "chicken-herb-rice-pilaf", "miso-maple-salmon-bowl", "sesame-ginger-tofu-soba", "chicken-quinoa-spinach-soup", "potato-green-bean-egg-salad", "strawberry-spinach-feta-quinoa-salad", "parmesan-polenta-bites", "cucumber-feta-walnut-rice-cakes", "maple-walnut-oat-clusters", "lemon-blueberry-yogurt-pots"
];

/* ----------------------------------------------------------------------- */
/* 9. EATING-OUT GUIDE                                                      */
/* ----------------------------------------------------------------------- */
const CUISINES = [
  /* -- Easiest choices -- */
  { icon: "🍣", name: "Japanese", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Sashimi & simple sushi (rice, fish, cucumber)", "Grilled fish or chicken teriyaki (sauce on the side)", "Steamed rice & plain tofu", "Miso soup (small) and seaweed salad"],
    skip: ["Edamame (whole soybeans)", "Tempura & gyoza (wheat batter/wrappers)", "Heavy teriyaki/eel glazes (sugar + garlic)"] },
  { icon: "🍜", name: "Vietnamese", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Fresh rice-paper summer rolls", "Rice-noodle bowls (bún) with grilled pork or chicken", "Pho - ask for a plain ginger broth", "Steamed rice with grilled lemongrass meat"],
    skip: ["Broths simmered with onion & garlic", "Hoisin & sweet-chilli dipping sauces", "Anything crumbed or fried in wheat batter"] },
  { icon: "🥐", name: "Café & Brunch", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Eggs any style on sourdough or gluten-free toast", "Smoked salmon with spinach & feta", "Bacon, grilled tomato & hash-style potatoes", "Lactose-free or almond-milk coffee"],
    skip: ["Large regular-milk lattes - choose lactose-free", "Baked beans, caramelised onion & relish", "Banana bread & pastries (wheat)"] },
  { icon: "🥩", name: "Steakhouse / Grill", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Plain steak, grilled chicken or fish", "Baked or boiled potato (butter, chives)", "Side salad with oil & vinegar", "Plain steamed vegetables"],
    skip: ["Onion rings & garlic bread", "Garlic-butter or onion-gravy sauces", "Marinades - ask for plain with salt & pepper"] },

  { icon: "🍢", name: "Brazilian / Churrasco", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Grilled meats off the skewer (picanha, beef, chicken, sausage)", "Plain white rice", "Grilled pineapple", "Simple garden salad with oil & vinegar"],
    skip: ["Feijoada & black-bean stew (GOS)", "Farofa & pão de queijo in quantity", "Onion-garlic vinaigrette (molho) - ask for oil & vinegar"] },
  { icon: "🦞", name: "Seafood / Fish", verdict: "best", verdictLabel: "Easiest choice",
    order: ["Grilled, baked or steamed fish", "Grilled prawns, oysters or scallops", "Plain boiled or baked potatoes & rice", "Side salad or steamed veg with oil & lemon"],
    skip: ["Chowder & bisque (onion, cream, flour)", "Beer-battered & crumbed fish (wheat)", "Garlic butter & marinara-style sauces"] },

  /* -- Doable with a few asks -- */
  { icon: "🍔", name: "Burgers / Fast food", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Plain beef patty + cheese, no bun / lettuce wrap", "Plain fries (ready-salted)", "Side salad, no onion", "Water or soda water"],
    skip: ["The bun (wheat) & any onion", "Special sauce, BBQ sauce, ketchup in quantity", "Cola and sugary/diet soft drinks", "Crumbed chicken & nuggets"] },
  { icon: "🍕", name: "Italian", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Gluten-free pizza or pasta if available", "Grilled meat or fish (bistecca, pesce)", "Plain tomato (pomodoro) sauce - ask 'no garlic/onion'", "Risotto without onion; polenta; caprese"],
    skip: ["Garlic bread & bruschetta", "Aglio e olio, arrabbiata, marinara with garlic/onion", "Minestrone (beans + onion) & creamy sauces"] },
  { icon: "🌮", name: "Mexican", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Corn-tortilla tacos with grilled meat", "Lettuce, tomato, cheese & a little sour cream", "Plain rice and grilled fish/chicken", "Pico de gallo - ask without onion"],
    skip: ["Refried & black beans (GOS)", "Guacamole (onion + garlic) & onion salsa", "Large flour tortillas & burritos (wheat)"] },
  { icon: "🥙", name: "Greek / Mediterranean", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Grilled souvlaki, lamb, chicken or fish", "Greek salad - ask for no onion", "Rice, potatoes, feta and olives", "A little tzatziki (watch the garlic)"],
    skip: ["Hummus & falafel (chickpeas + garlic)", "Pita and flatbreads (wheat)", "Onion-and-garlic-heavy stews and dips"] },
  { icon: "🥖", name: "French", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Steak frites (plain steak + fries)", "Grilled fish or roast chicken", "Omelette with herbs & cheese", "Green salad with oil & vinegar (no croutons)"],
    skip: ["French onion soup & garlic-cream sauces", "Baguette & croissants (wheat)", "Cassoulet (beans) & garlic-butter snails"] },
  { icon: "🍤", name: "Spanish / Tapas", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Grilled fish or steak a la plancha", "Spanish omelette (tortilla) - ask if onion-free", "Jamón, manchego & olives", "Plain patatas with oil (not bravas)"],
    skip: ["Aïoli & garlic prawns (gambas al ajillo)", "Patatas bravas sauce & chorizo", "Bread, croquetas & bean stews (fabada)"] },
  { icon: "🍳", name: "American Diner", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Grilled steak, plain burger patty (no bun) or grilled chicken", "Plain fries or a baked potato (butter, chives)", "Eggs any style with bacon", "Side salad, oil & vinegar"],
    skip: ["The bun & onion rings", "BBQ sauce, ketchup & 'special' sauces", "Baked beans & coleslaw (onion)", "Cola & thick shakes"] },
  { icon: "🍺", name: "Pub / Bar", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Grilled steak, chicken or fish with chips", "Jacket/baked potato with butter & cheese", "Vegetables or salad - dressing on the side", "Plain salted chips/crisps"],
    skip: ["Battered fish & crumbed items (wheat)", "Gravy & onion-garlic sauces - ask on the side", "Pies & burger buns (wheat)", "Beer in quantity - try wine or a spirit + soda"] },

  { icon: "🍗", name: "Peri-Peri / Portuguese", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Plain or lemon-herb grilled chicken", "Plain rice or chips", "Corn on the cob (about half a cob)", "Garden salad - ask for no onion"],
    skip: ["Peri-peri & hot basting sauces (garlic + onion)", "Spicy rice with peas & beans", "Garlic bread & garlic-mayo - ask for plain"] },
  { icon: "🍥", name: "Poke / Hawaiian Bowl", verdict: "ok", verdictLabel: "Doable with asks",
    order: ["Rice base with raw salmon or tuna", "Cucumber, carrot, seaweed & sesame", "A little avocado (⅛) and pickled ginger", "Tamari or a plain sauce on the side"],
    skip: ["Edamame (whole soybeans)", "Sweet-chilli & spicy-mayo sauces (garlic/onion)", "Sweetcorn, mango & big scoops of avocado"] },

  /* -- Order carefully -- */
  { icon: "🥡", name: "Chinese / Thai", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Steamed rice & plainly steamed fish or chicken", "Stir-fries - ask for 'no garlic, no onion'", "Plain rice noodles", "Thai dishes with coconut - keep the portion small"],
    skip: ["Standard garlic-onion, hoisin & oyster sauces", "Wonton, spring rolls, dumplings (wheat)", "Cashew dishes and sweet chilli glazes"] },
  { icon: "🍛", name: "Indian", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Plain basmati rice", "Tandoori or tikka grilled meats (ask about marinade)", "Plain raita if you tolerate a little dairy", "Dishes thickened with tomato, not onion"],
    skip: ["Most curries (onion-garlic-ginger base) & dals (lentils)", "Naan and other wheat breads", "Mango chutney & creamy korma"] },
  { icon: "🍙", name: "Korean", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Kimbap (rice & veg rolls, like sushi)", "Plain Korean BBQ - grill your own meat with salt & sesame oil", "Steamed rice with a fried egg", "Grilled fish"],
    skip: ["Kimchi & gochujang (garlic + chilli paste)", "Marinated bulgogi/galbi (garlic, onion, soy-sugar)", "Stews (jjigae) & japchae glass noodles"] },
  { icon: "🥪", name: "Bakery / Sandwich", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Fillings on gluten-free bread, if available", "A salad bowl - grilled chicken, egg, cheese, oil & vinegar", "Rice-based sushi", "Plain corn chips or rice cakes"],
    skip: ["Wheat bread, wraps & pastries", "Onion, hummus & garlic-mayo fillings", "Honey, fruit-heavy muffins & high-fructose juices"] },

  { icon: "🧆", name: "Middle Eastern / Lebanese", verdict: "tricky", verdictLabel: "Order carefully",
    order: ["Grilled meat skewers (shish taouk, kofta) - ask garlic-free", "Grilled halloumi & olives", "Plain rice or a parsley tabbouleh", "Salad with lemon & oil"],
    skip: ["Hummus, falafel & baba ganoush (chickpeas + garlic)", "Toum (whipped garlic sauce)", "Pita & flatbreads (wheat); lentil soup"] }
];

/* Image filename per cuisine - SAME ORDER as CUISINES above. */
const CUISINE_SLUGS = [
  "japanese", "vietnamese", "cafe-brunch", "steakhouse", "brazilian", "seafood", "burgers", "italian", "mexican", "greek",
  "french", "spanish", "american-diner", "pub", "peri-peri", "poke", "chinese-thai", "indian", "korean", "bakery", "middle-eastern"
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
  { num: "1", name: "Elimination", duration: "2-6 weeks", color: "red",
    blurb: "Cut high-FODMAP foods to calm symptoms quickly. This is the strict, short phase most of this guide focuses on - it is not meant to be permanent." },
  { num: "2", name: "Reintroduction", duration: "6-8 weeks", color: "yellow",
    blurb: "Systematically test one FODMAP group at a time to learn which ones (and what amounts) you personally tolerate. This is where your plate widens again." },
  { num: "3", name: "Personalisation", duration: "Ongoing", color: "green",
    blurb: "Build your long-term diet: keep only the restrictions you actually need. The goal is the widest, most varied diet your gut is comfortable with." }
];

/* ----------------------------------------------------------------------- */
/* 12. SOURCES                                                              */
/* ----------------------------------------------------------------------- */
const SOURCES = [
  { name: "Monash University - High & Low FODMAP Foods", url: "https://www.monashfodmap.com/about-fodmap-and-ibs/high-and-low-fodmap-foods/" },
  { name: "Monash FODMAP - Low FODMAP Shopping List", url: "https://www.monashfodmap.com/blog/low-fodmap-shopping-list/" },
  { name: "Monash FODMAP - Low FODMAP Recipe Index", url: "https://www.monashfodmap.com/recipe/monash-low-fodmap-recipe-index/" },
  { name: "Monash FODMAP - Salmon Poke Bowl Recipe", url: "https://www.monashfodmap.com/recipe/salmon-poke-bowl/" },
  { name: "Monash FODMAP - Eating Out Guide", url: "https://www.monashfodmap.com/blog/eating-out-on-low-fodmap-diet-italian/" },
  { name: "Cleveland Clinic - SIBO Diet: Best & Worst Foods", url: "https://health.clevelandclinic.org/sibo-diet" },
  { name: "IBS Diets - Low FODMAP Fast Food Guide", url: "https://www.ibsdiets.org/fodmap-diet/low-fodmap-fast-food/" },
  { name: "The IBS Dietitian - Fast Food on the Low FODMAP Diet", url: "https://theibsdietitian.com/blog/fast-food-on-the-low-fodmap-diet" },
  { name: "Monash - Cola & soft drinks contain FODMAPs", url: "https://www.bellybalance.co.uk/new-analyses-coca-cola-contain-fodmaps/" },
  { name: "Feed Me Phoebe - Garlic-Infused Olive Oil", url: "https://feedmephoebe.com/garlic-infused-olive-oil-low-fodmap/" },
  { name: "Dr. Ruscio - SIBO Foods to Avoid & What You Can Eat", url: "https://drruscio.com/what-foods-should-be-avoided-with-sibo/" }
];
