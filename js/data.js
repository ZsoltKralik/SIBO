/* =========================================================================
   SIBO Plate — Food & Guidance Database
   -------------------------------------------------------------------------
   All content is plain JavaScript globals so the site works by simply
   opening index.html (file://) — no server, no build step, no internet.

   STATUS LEGEND
     "green"  → Enjoy freely (low FODMAP / low-fermentation friendly)
     "yellow" → Caution: fine in small, measured portions; watch tolerance
     "red"    → Best avoided during the elimination phase

   The traffic-light ratings primarily follow the Low-FODMAP framework
   (Monash University), the most evidence-based elimination approach for
   calming SIBO/IBS symptoms. Portion notes reflect typical Monash "green
   light" serving thresholds. Individual tolerance always varies.
   ========================================================================= */

/* ----------------------------------------------------------------------- */
/* 1. FOOD DATABASE                                                         */
/* ----------------------------------------------------------------------- */
const FOOD_CATEGORIES = [
  { id: "veg",      label: "Vegetables",          icon: "🥕" },
  { id: "fruit",    label: "Fruit",               icon: "🍓" },
  { id: "protein",  label: "Protein",             icon: "🍗" },
  { id: "grain",    label: "Grains & Starches",   icon: "🍚" },
  { id: "dairy",    label: "Dairy & Alts",        icon: "🧀" },
  { id: "nuts",     label: "Nuts & Seeds",        icon: "🥜" },
  { id: "fat",      label: "Fats & Oils",         icon: "🫒" },
  { id: "flavor",   label: "Herbs & Flavor",      icon: "🌿" },
  { id: "sweet",    label: "Sweeteners",          icon: "🍯" },
  { id: "drink",    label: "Drinks",              icon: "🥤" }
];

const FOODS = [
  /* ---------- VEGETABLES ---------- */
  { name: "Carrot",                cat: "veg", status: "green",  note: "Free serving — a reliable everyday base." },
  { name: "Cucumber",              cat: "veg", status: "green",  note: "Crisp, hydrating, great for snacks." },
  { name: "Bell pepper (red)",     cat: "veg", status: "green",  note: "Sweetest, lowest-FODMAP pepper." },
  { name: "Zucchini / courgette",  cat: "veg", status: "green",  note: "Up to ~65 g; great spiralised as 'noodles'." },
  { name: "Eggplant / aubergine",  cat: "veg", status: "green",  note: "Up to ~75 g." },
  { name: "Tomato (common & canned)", cat: "veg", status: "green", note: "Fresh and plain canned both fine." },
  { name: "Cherry tomato",         cat: "veg", status: "green",  note: "Limit ~5 for the lowest dose." },
  { name: "Lettuce (most types)",  cat: "veg", status: "green",  note: "Butter, romaine, iceberg, radicchio." },
  { name: "Baby spinach",          cat: "veg", status: "green",  note: "Up to ~75 g raw." },
  { name: "Kale",                  cat: "veg", status: "green",  note: "Hearty green for sautés and chips." },
  { name: "Bok choy",              cat: "veg", status: "green",  note: "Ideal in stir-fries and broths." },
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
  { name: "Broccoli (heads)",      cat: "veg", status: "yellow", note: "Heads up to ~75 g; stalks are higher." },
  { name: "Sweet potato",          cat: "veg", status: "yellow", note: "Limit ~75 g (½ cup) — polyols rise above this." },
  { name: "Butternut squash",      cat: "veg", status: "yellow", note: "Limit ~45 g." },
  { name: "Celery",                cat: "veg", status: "yellow", note: "Limit ~¼ stalk (10 g) — mannitol." },
  { name: "Green peas",            cat: "veg", status: "yellow", note: "Limit ~15 g." },
  { name: "Beetroot",              cat: "veg", status: "yellow", note: "Cooked, limit ~20 g (2 slices)." },
  { name: "Savoy cabbage",         cat: "veg", status: "yellow", note: "Limit ~75 g; common cabbage is safer." },
  { name: "Brussels sprouts",      cat: "veg", status: "yellow", note: "Limit ~2 sprouts." },
  { name: "Sweet corn",            cat: "veg", status: "yellow", note: "Limit ~½ cob." },
  { name: "Garlic",                cat: "veg", status: "red",    note: "Top trigger. Use garlic-infused oil instead." },
  { name: "Onion (all colours)",   cat: "veg", status: "red",    note: "Top trigger. Use chives / green tops." },
  { name: "Leek bulb",             cat: "veg", status: "red",    note: "Bulb high; green leaves are lower." },
  { name: "Shallot",               cat: "veg", status: "red",    note: "Concentrated fructans — avoid." },
  { name: "Cauliflower",           cat: "veg", status: "red",    note: "High in mannitol (polyol)." },
  { name: "Mushrooms (button)",    cat: "veg", status: "red",    note: "High in mannitol. Oyster mushrooms are lower." },
  { name: "Artichoke",             cat: "veg", status: "red",    note: "Very high in fructans/inulin." },
  { name: "Asparagus",             cat: "veg", status: "red",    note: "High in fructans + fructose." },
  { name: "Sugar snap peas",       cat: "veg", status: "red",    note: "High in polyols." },

  /* ---------- FRUIT ---------- */
  { name: "Strawberry",            cat: "fruit", status: "green", note: "Free serving — a berry star." },
  { name: "Blueberry",             cat: "fruit", status: "green", note: "Up to ~½ cup." },
  { name: "Raspberry",             cat: "fruit", status: "green", note: "Up to ~10 berries (30 g)." },
  { name: "Grapes",                cat: "fruit", status: "green", note: "Free serving — easy grab-and-go." },
  { name: "Kiwi",                  cat: "fruit", status: "green", note: "About 2 small — also aids motility." },
  { name: "Orange",                cat: "fruit", status: "green", note: "1 medium — portable and refreshing." },
  { name: "Mandarin",              cat: "fruit", status: "green", note: "1 medium." },
  { name: "Lemon / Lime",          cat: "fruit", status: "green", note: "Juice freely to brighten dishes." },
  { name: "Pineapple",             cat: "fruit", status: "green", note: "Up to ~1 cup." },
  { name: "Cantaloupe / rockmelon",cat: "fruit", status: "green", note: "Up to ~½ cup (watermelon is NOT safe)." },
  { name: "Papaya / pawpaw",       cat: "fruit", status: "green", note: "Up to ~1 cup." },
  { name: "Dragon fruit",          cat: "fruit", status: "green", note: "Mild and well tolerated." },
  { name: "Passionfruit",          cat: "fruit", status: "green", note: "Tart topping for yogurt." },
  { name: "Banana (firm/unripe)",  cat: "fruit", status: "green", note: "Firm = green light; ripe turns yellow." },
  { name: "Banana (ripe)",         cat: "fruit", status: "yellow",note: "Limit ~⅓ medium — fructans rise as it ripens." },
  { name: "Avocado",               cat: "fruit", status: "yellow",note: "Limit ~⅛ whole (30 g) — sorbitol." },
  { name: "Pomegranate",           cat: "fruit", status: "yellow",note: "Limit ~¼ cup seeds." },
  { name: "Grapefruit",            cat: "fruit", status: "yellow",note: "Limit ~½ small." },
  { name: "Coconut (flesh)",       cat: "fruit", status: "yellow",note: "Shredded, limit ~¼ cup." },
  { name: "Apple",                 cat: "fruit", status: "red",   note: "High fructose + sorbitol. Classic trigger." },
  { name: "Pear",                  cat: "fruit", status: "red",   note: "High fructose + sorbitol." },
  { name: "Mango",                 cat: "fruit", status: "red",   note: "Excess fructose." },
  { name: "Watermelon",            cat: "fruit", status: "red",   note: "Fructose + fructans + polyols — triple hit." },
  { name: "Cherries",              cat: "fruit", status: "red",   note: "High in sorbitol." },
  { name: "Peach / Nectarine",     cat: "fruit", status: "red",   note: "High in polyols." },
  { name: "Plum / Apricot",        cat: "fruit", status: "red",   note: "High in sorbitol." },
  { name: "Blackberry",            cat: "fruit", status: "red",   note: "High in sorbitol." },
  { name: "Dried fruit (raisins, dates, figs)", cat: "fruit", status: "red", note: "Concentrated sugars — very high." },

  /* ---------- PROTEIN ---------- */
  { name: "Chicken",               cat: "protein", status: "green", note: "Plain = zero FODMAPs. A cornerstone." },
  { name: "Turkey",                cat: "protein", status: "green", note: "Lean and versatile." },
  { name: "Beef",                  cat: "protein", status: "green", note: "Unmarinated cuts are FODMAP-free." },
  { name: "Pork",                  cat: "protein", status: "green", note: "Avoid garlic/onion marinades." },
  { name: "Lamb",                  cat: "protein", status: "green", note: "Naturally safe." },
  { name: "Eggs",                  cat: "protein", status: "green", note: "Boiled, scrambled, poached — perfect." },
  { name: "Fish (salmon, cod, tuna)", cat: "protein", status: "green", note: "Fresh or plain-canned." },
  { name: "Shrimp / prawns",       cat: "protein", status: "green", note: "Quick-cooking and safe." },
  { name: "Crab / lobster",        cat: "protein", status: "green", note: "Plain shellfish are fine." },
  { name: "Firm tofu",             cat: "protein", status: "green", note: "Pressed/firm only (silken is high)." },
  { name: "Tempeh",                cat: "protein", status: "green", note: "Fermented — well tolerated." },
  { name: "Canned chickpeas",      cat: "protein", status: "yellow",note: "Rinsed, limit ~¼ cup (42 g)." },
  { name: "Canned lentils",        cat: "protein", status: "yellow",note: "Rinsed, limit ~¼ cup (46 g)." },
  { name: "Deli ham / processed meat", cat: "protein", status: "yellow", note: "Check label for onion/garlic powder." },
  { name: "Silken tofu",           cat: "protein", status: "red",   note: "High in GOS — use firm tofu instead." },
  { name: "Dried beans (kidney, black, baked)", cat: "protein", status: "red", note: "High in GOS — gas-forming." },
  { name: "Sausages (with garlic/onion)", cat: "protein", status: "red", note: "Most contain hidden onion/garlic." },
  { name: "Breaded / crumbed meats", cat: "protein", status: "red", note: "Wheat coating + seasonings." },

  /* ---------- GRAINS & STARCHES ---------- */
  { name: "White rice",            cat: "grain", status: "green", note: "Free serving — the safest staple of all." },
  { name: "Rice noodles",          cat: "grain", status: "green", note: "Great pasta/ramen swap." },
  { name: "Quinoa",                cat: "grain", status: "green", note: "Protein-rich, naturally gluten-free." },
  { name: "Oats (rolled)",         cat: "grain", status: "green", note: "Limit ~½ cup cooked." },
  { name: "Gluten-free bread",     cat: "grain", status: "green", note: "Check for no honey/inulin/chicory root." },
  { name: "Gluten-free pasta",     cat: "grain", status: "green", note: "Rice/corn-based; cook al dente." },
  { name: "Corn tortilla",         cat: "grain", status: "green", note: "Naturally low-FODMAP wrap." },
  { name: "Polenta",               cat: "grain", status: "green", note: "Creamy or grilled." },
  { name: "Buckwheat",             cat: "grain", status: "green", note: "Despite the name, no wheat." },
  { name: "Millet",                cat: "grain", status: "green", note: "Mild grain for bowls." },
  { name: "Rice cakes",            cat: "grain", status: "green", note: "Crunchy snack base." },
  { name: "Brown rice",            cat: "grain", status: "yellow",note: "Limit ~⅓ cup cooked." },
  { name: "Sourdough wheat bread", cat: "grain", status: "yellow",note: "Traditional long-ferment; limit ~2 slices." },
  { name: "Sourdough spelt bread", cat: "grain", status: "yellow",note: "Often better tolerated; limit ~2 slices." },
  { name: "Soba noodles",          cat: "grain", status: "yellow",note: "Choose 100% buckwheat; limit ~⅔ cup." },
  { name: "Wheat bread",           cat: "grain", status: "red",   note: "Fructans — a core trigger." },
  { name: "Wheat pasta",           cat: "grain", status: "red",   note: "Use rice/corn/GF pasta instead." },
  { name: "Couscous",              cat: "grain", status: "red",   note: "Wheat-based." },
  { name: "Barley",                cat: "grain", status: "red",   note: "High fructans (also in many soups)." },
  { name: "Rye",                   cat: "grain", status: "red",   note: "High fructans." },
  { name: "Wheat breakfast cereal",cat: "grain", status: "red",   note: "Bran/wheat flakes — swap for oats." },

  /* ---------- DAIRY & ALTS ---------- */
  { name: "Lactose-free milk",     cat: "dairy", status: "green", note: "Tastes like normal milk, no lactose." },
  { name: "Almond milk",           cat: "dairy", status: "green", note: "Unsweetened; check for no inulin." },
  { name: "Hard cheese (cheddar, parmesan, swiss)", cat: "dairy", status: "green", note: "Aged cheeses are virtually lactose-free." },
  { name: "Brie / Camembert",      cat: "dairy", status: "green", note: "Up to ~40 g." },
  { name: "Feta",                  cat: "dairy", status: "green", note: "Up to ~40 g." },
  { name: "Butter",                cat: "dairy", status: "green", note: "Negligible lactose." },
  { name: "Lactose-free yogurt",   cat: "dairy", status: "green", note: "Great with berries for a snack." },
  { name: "Greek yogurt",          cat: "dairy", status: "yellow",note: "Limit ~¼ cup unless lactose-free." },
  { name: "Cottage cheese",        cat: "dairy", status: "yellow",note: "Limit ~2 tbsp." },
  { name: "Cream cheese",          cat: "dairy", status: "yellow",note: "Limit ~2 tbsp." },
  { name: "Mozzarella",            cat: "dairy", status: "yellow",note: "Limit ~⅓ cup." },
  { name: "Cow's milk",            cat: "dairy", status: "red",   note: "High in lactose — use lactose-free." },
  { name: "Regular yogurt",        cat: "dairy", status: "red",   note: "Lactose — choose lactose-free." },
  { name: "Ice cream",             cat: "dairy", status: "red",   note: "Lactose (often + HFCS). Try sorbet." },
  { name: "Soy milk (from whole soybeans)", cat: "dairy", status: "red", note: "High GOS; soy-protein versions are lower." },
  { name: "Evaporated / condensed milk", cat: "dairy", status: "red", note: "Concentrated lactose." },

  /* ---------- NUTS & SEEDS ---------- */
  { name: "Almonds",               cat: "nuts", status: "green", note: "Limit ~10 nuts (15 g)." },
  { name: "Walnuts",               cat: "nuts", status: "green", note: "Generous serving; brain-friendly fats." },
  { name: "Pecans",                cat: "nuts", status: "green", note: "Up to ~10 halves." },
  { name: "Macadamias",            cat: "nuts", status: "green", note: "Rich and very well tolerated." },
  { name: "Peanuts",               cat: "nuts", status: "green", note: "Up to ~32 nuts." },
  { name: "Pine nuts",             cat: "nuts", status: "green", note: "Up to ~1 tbsp." },
  { name: "Pumpkin seeds",         cat: "nuts", status: "green", note: "Up to ~2 tbsp." },
  { name: "Sunflower seeds",       cat: "nuts", status: "green", note: "Up to ~2 tbsp." },
  { name: "Sesame seeds / tahini (small)", cat: "nuts", status: "green", note: "Seeds fine; large tahini portions rise." },
  { name: "Chia seeds",            cat: "nuts", status: "green", note: "Up to ~2 tbsp." },
  { name: "Hazelnuts",             cat: "nuts", status: "yellow",note: "Limit ~10 nuts." },
  { name: "Cashews",               cat: "nuts", status: "red",   note: "High in GOS — avoid in elimination phase." },
  { name: "Pistachios",            cat: "nuts", status: "red",   note: "High in GOS + fructans." },

  /* ---------- FATS & OILS ---------- */
  { name: "Olive oil",             cat: "fat", status: "green", note: "FODMAPs aren't fat-soluble — all oils are safe." },
  { name: "Garlic-infused oil",    cat: "fat", status: "green", note: "★ Secret weapon: garlic flavour, no FODMAPs." },
  { name: "Avocado oil",           cat: "fat", status: "green", note: "High smoke point for searing." },
  { name: "Coconut oil",           cat: "fat", status: "green", note: "Good for curries and baking." },
  { name: "Butter / ghee",         cat: "fat", status: "green", note: "Ghee is fully lactose-free." },
  { name: "Mayonnaise (plain)",    cat: "fat", status: "green", note: "Check for no garlic/onion." },

  /* ---------- HERBS & FLAVOR ---------- */
  { name: "Fresh herbs (basil, parsley, cilantro, mint)", cat: "flavor", status: "green", note: "Use generously for big flavour." },
  { name: "Rosemary, thyme, oregano", cat: "flavor", status: "green", note: "Dried or fresh — both safe." },
  { name: "Chives",                cat: "flavor", status: "green", note: "The MVP onion substitute." },
  { name: "Ginger",                cat: "flavor", status: "green", note: "Warming and anti-nausea." },
  { name: "Turmeric, cumin, paprika", cat: "flavor", status: "green", note: "Pure single spices are safe." },
  { name: "Salt & pepper",         cat: "flavor", status: "green", note: "Always fine." },
  { name: "Asafoetida (hing)",     cat: "flavor", status: "green", note: "A pinch mimics onion/garlic flavour." },
  { name: "Mustard",               cat: "flavor", status: "green", note: "Plain Dijon/yellow." },
  { name: "Maple syrup",           cat: "flavor", status: "green", note: "Best low-FODMAP sweet flavouring." },
  { name: "Soy sauce / tamari",    cat: "flavor", status: "yellow",note: "Limit ~2 tbsp (gluten-free tamari is safer)." },
  { name: "Tomato paste",          cat: "flavor", status: "yellow",note: "Limit ~2 tbsp." },
  { name: "Curry powder (blend)",  cat: "flavor", status: "yellow",note: "Check blends for garlic/onion." },
  { name: "Garlic (clove/powder)", cat: "flavor", status: "red",   note: "Use garlic-infused oil instead." },
  { name: "Onion powder",          cat: "flavor", status: "red",   note: "Hidden in many seasoning mixes." },
  { name: "Stock cubes (standard)",cat: "flavor", status: "red",   note: "Usually onion/garlic — buy low-FODMAP stock." },
  { name: "Hummus",                cat: "flavor", status: "red",   note: "Chickpeas + garlic. Try a roasted-pepper dip." },
  { name: "Pesto (traditional)",   cat: "flavor", status: "red",   note: "Garlic + cashew/pine excess." },

  /* ---------- SWEETENERS ---------- */
  { name: "Table sugar (sucrose)", cat: "sweet", status: "green", note: "Small amounts OK; keep total sugar modest." },
  { name: "Maple syrup",           cat: "sweet", status: "green", note: "Up to ~2 tbsp." },
  { name: "Rice malt syrup",       cat: "sweet", status: "green", note: "Fructose-free." },
  { name: "Stevia",                cat: "sweet", status: "green", note: "Non-fermentable." },
  { name: "Dextrose / glucose",    cat: "sweet", status: "green", note: "Pure glucose is well absorbed." },
  { name: "Dark chocolate",        cat: "sweet", status: "yellow",note: "Limit ~3 squares (30 g)." },
  { name: "Honey",                 cat: "sweet", status: "red",   note: "Excess fructose — swap for maple syrup." },
  { name: "Agave",                 cat: "sweet", status: "red",   note: "Very high fructose." },
  { name: "High-fructose corn syrup", cat: "sweet", status: "red", note: "In many sodas/sauces — read labels." },
  { name: "Sorbitol, mannitol, xylitol", cat: "sweet", status: "red", note: "Polyols in 'sugar-free' gum/mints/candy." },
  { name: "Inulin / chicory root", cat: "sweet", status: "red",   note: "Added 'fibre' that ferments heavily." },

  /* ---------- DRINKS ---------- */
  { name: "Water (still/sparkling)", cat: "drink", status: "green", note: "Your best friend between meals." },
  { name: "Black / green / white tea", cat: "drink", status: "green", note: "Brew weak-to-medium strength." },
  { name: "Peppermint tea",        cat: "drink", status: "green", note: "Eases gut spasms and bloating." },
  { name: "Coffee (black)",        cat: "drink", status: "green", note: "~1 cup; add lactose-free/almond milk." },
  { name: "Lactose-free milk",     cat: "drink", status: "green", note: "For lattes and cereal." },
  { name: "Cranberry juice",       cat: "drink", status: "green", note: "Limit ~½ cup, unsweetened." },
  { name: "Orange juice",          cat: "drink", status: "yellow",note: "Limit ~½ cup (whole orange is better)." },
  { name: "Wine",                  cat: "drink", status: "yellow",note: "Limit ~1 glass; dry over sweet." },
  { name: "Beer",                  cat: "drink", status: "yellow",note: "1 standard; carbonation can bloat." },
  { name: "Kombucha",              cat: "drink", status: "yellow",note: "Limit ~⅓ cup." },
  { name: "Apple / pear / mango juice", cat: "drink", status: "red", note: "Concentrated fructose/sorbitol." },
  { name: "Soda with HFCS",        cat: "drink", status: "red",   note: "High-fructose corn syrup." },
  { name: "Chamomile / fennel tea",cat: "drink", status: "red",   note: "Higher-FODMAP herbal teas." },
  { name: "Oat milk",              cat: "drink", status: "red",   note: "Often high in a serving; almond milk is safer." },
  { name: "Rum & sweet liqueurs",  cat: "drink", status: "red",   note: "Added sugars/polyols." }
];

/* ----------------------------------------------------------------------- */
/* 2. "EAT THIS, NOT THAT" SWAPS                                            */
/* ----------------------------------------------------------------------- */
const SWAPS = [
  {
    icon: "🍕",
    avoid: "Classic pizza",
    avoidWhy: "Wheat base, garlic-and-onion tomato sauce, a mountain of mozzarella.",
    eat: "Gluten-free base pizza",
    eatHow: "Plain passata (tomato + salt), hard cheese, pepperoni or chicken, red peppers. Drizzle garlic-infused oil."
  },
  {
    icon: "🍝",
    avoid: "Pasta in garlic-onion marinara",
    avoidWhy: "Wheat pasta plus a sauce built on the two biggest triggers.",
    eat: "Rice/GF pasta, garlic-oil & fresh tomato",
    eatHow: "Toss in garlic-infused oil, fresh tomato, basil and parmesan — an easy cacio-e-pepe style bowl."
  },
  {
    icon: "🥖",
    avoid: "Garlic bread",
    avoidWhy: "Wheat baguette soaked in real garlic butter.",
    eat: "Sourdough or GF toast, garlic oil",
    eatHow: "Brush with garlic-infused olive oil, scatter chives and parmesan, then grill."
  },
  {
    icon: "🥪",
    avoid: "Wheat sandwich",
    avoidWhy: "Standard wheat bread is a concentrated fructan source.",
    eat: "GF or sourdough sandwich",
    eatHow: "Turkey or cheddar, lettuce, tomato and cucumber on gluten-free or genuine sourdough bread."
  },
  {
    icon: "🥣",
    avoid: "Wheat breakfast cereal",
    avoidWhy: "Bran and wheat flakes are loaded with fructans.",
    eat: "Oats with berries",
    eatHow: "½ cup rolled oats, lactose-free milk, blueberries, walnuts and a little maple syrup."
  },
  {
    icon: "🫘",
    avoid: "Baked beans on toast",
    avoidWhy: "Beans are rich in GOS; the sauce hides onion and garlic.",
    eat: "Eggs or tofu on GF toast",
    eatHow: "Scrambled eggs or sautéed firm tofu with chives on gluten-free toast."
  },
  {
    icon: "🧆",
    avoid: "Hummus & pita",
    avoidWhy: "Chickpeas plus raw garlic, scooped with wheat pita.",
    eat: "Roasted-pepper dip & GF crackers",
    eatHow: "Blend roasted red pepper with olive oil and feta; dip carrot sticks or gluten-free crackers."
  },
  {
    icon: "🍜",
    avoid: "Ramen in garlic-onion broth",
    avoidWhy: "Wheat noodles in a broth simmered with onion and garlic.",
    eat: "Rice-noodle pho-style bowl",
    eatHow: "Rice noodles in plain bone broth with ginger, bok choy and green spring-onion tops."
  },
  {
    icon: "🥗",
    avoid: "Caesar salad",
    avoidWhy: "Garlic dressing, wheat croutons, sometimes onion.",
    eat: "Grilled chicken & parmesan salad",
    eatHow: "Greens, grilled chicken, parmesan and GF croutons with olive oil, lemon and pepper."
  },
  {
    icon: "🥤",
    avoid: "Milkshake",
    avoidWhy: "Full-lactose milk and ice cream.",
    eat: "Lactose-free berry smoothie",
    eatHow: "Lactose-free milk or almond milk, strawberries, firm banana and peanut butter."
  },
  {
    icon: "🍎",
    avoid: "Apple as a snack",
    avoidWhy: "High fructose plus sorbitol — a frequent bloat trigger.",
    eat: "Orange, kiwi or grapes",
    eatHow: "Keep low-FODMAP fruit handy: an orange, two kiwis, or a handful of grapes."
  },
  {
    icon: "🍯",
    avoid: "Honey in tea/yogurt",
    avoidWhy: "Excess free fructose.",
    eat: "Maple syrup",
    eatHow: "Maple syrup sweetens just as well and is low-FODMAP up to ~2 tablespoons."
  },
  {
    icon: "🧅",
    avoid: "Onion & garlic in cooking",
    avoidWhy: "The flavour base of most savoury dishes — and the #1 trigger pair.",
    eat: "Garlic-infused oil + chives + hing",
    eatHow: "Build flavour with garlic/onion-infused oil, green chive/spring-onion tops, and a pinch of asafoetida (hing)."
  },
  {
    icon: "🍦",
    avoid: "Ice cream",
    avoidWhy: "Lactose, often with high-fructose corn syrup.",
    eat: "Sorbet or lactose-free ice cream",
    eatHow: "A small scoop of fruit sorbet (no HFCS) or lactose-free ice cream."
  },
  {
    icon: "🥜",
    avoid: "Cashews & pistachios",
    avoidWhy: "Both are high in GOS and fructans.",
    eat: "Macadamias, walnuts, pumpkin seeds",
    eatHow: "Swap to a handful of macadamias or walnuts, or a scatter of pumpkin seeds."
  },
  {
    icon: "☕",
    avoid: "Regular latte",
    avoidWhy: "A large milky latte delivers a big lactose load.",
    eat: "Lactose-free or almond latte",
    eatHow: "Ask for lactose-free or almond milk — most cafés now keep it on hand."
  }
];

/* ----------------------------------------------------------------------- */
/* 3. GRAB-AND-GO SNACKS                                                    */
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
  { icon: "🌽", name: "Corn chips + tomato salsa", note: "Salsa made without onion (check the label)." }
];

/* ----------------------------------------------------------------------- */
/* 4. SAMPLE DAY (MEAL PLAN)                                                */
/* ----------------------------------------------------------------------- */
const MEAL_PLAN = [
  {
    slot: "Breakfast",
    icon: "🌅",
    title: "Veggie omelette + sourdough",
    detail: "Eggs with spinach, tomato and chives cooked in garlic-infused oil, with a slice of genuine sourdough or GF toast.",
    alt: "Or: rolled oats with lactose-free milk, blueberries, walnuts & maple syrup."
  },
  {
    slot: "Morning snack",
    icon: "🍊",
    title: "Macadamias + a mandarin",
    detail: "A small handful of macadamias with a mandarin or a few strawberries.",
    alt: "Or: rice cakes with peanut butter."
  },
  {
    slot: "Lunch",
    icon: "🥗",
    title: "Chicken & quinoa power bowl",
    detail: "Grilled chicken, quinoa, cucumber, cherry tomato, grated carrot and baby spinach with olive oil, lemon and feta.",
    alt: "Or: a turkey-and-cheddar GF wrap with salad."
  },
  {
    slot: "Afternoon snack",
    icon: "🥣",
    title: "Lactose-free yogurt + berries",
    detail: "Topped with pumpkin seeds and a drizzle of maple syrup.",
    alt: "Or: cheddar cubes with cucumber sticks."
  },
  {
    slot: "Dinner",
    icon: "🍽️",
    title: "Baked salmon, rice & roast veg",
    detail: "Salmon baked with lemon and herbs, white rice, and roasted zucchini and carrots tossed in garlic-infused oil. Side salad.",
    alt: "Or: lemon-herb roast chicken with potatoes and green beans."
  },
  {
    slot: "Dessert",
    icon: "🍫",
    title: "Dark chocolate + strawberries",
    detail: "A couple of squares of dark chocolate with a few strawberries.",
    alt: "Or: a small scoop of fruit sorbet."
  }
];

/* ----------------------------------------------------------------------- */
/* 5. RECIPES                                                               */
/* ----------------------------------------------------------------------- */
const RECIPES = [
  {
    icon: "🫒",
    name: "Garlic-Infused Olive Oil",
    tagline: "The single most useful thing in a SIBO kitchen.",
    time: "10 min",
    serves: "Makes ~1 cup",
    why: "FODMAPs in garlic are water-soluble, not oil-soluble. Infusing oil captures all the flavour while leaving the fructans behind.",
    ingredients: [
      "1 cup good olive oil",
      "4–6 garlic cloves, peeled & halved"
    ],
    steps: [
      "Warm the oil gently in a small pan over low heat.",
      "Add the garlic cloves and heat for 3–5 minutes until fragrant and lightly golden — do not let them brown hard.",
      "Remove from heat and let the cloves steep as it cools.",
      "Strain out and discard every piece of garlic.",
      "Use right away, or refrigerate and use within ~1 week."
    ],
    safety: "Food-safety note: never store homemade garlic-in-oil at room temperature — submerged raw garlic carries a botulism risk. Strain out all solids, keep it refrigerated, and use within a week, or buy a commercial garlic-infused oil for convenience."
  },
  {
    icon: "🍝",
    name: "Garlic-Oil Spaghetti with Tomato & Basil",
    tagline: "Comfort pasta, minus the triggers.",
    time: "20 min",
    serves: "Serves 2",
    why: "All the warmth of a classic garlic pasta using infused oil and fresh tomato instead of jarred onion-garlic sauce.",
    ingredients: [
      "160 g gluten-free or rice spaghetti",
      "3 tbsp garlic-infused olive oil",
      "2 ripe tomatoes, diced (or ~10 cherry tomatoes)",
      "Handful fresh basil, torn",
      "Parmesan, to serve",
      "Salt, pepper & chilli flakes"
    ],
    steps: [
      "Cook the pasta in well-salted water until al dente; reserve a splash of pasta water.",
      "Warm the garlic-infused oil in a pan, add the tomatoes and a pinch of salt, and soften for 4–5 minutes.",
      "Toss the drained pasta through the tomatoes with a little pasta water to make a light sauce.",
      "Off the heat, fold through the basil. Top with parmesan, pepper and a few chilli flakes."
    ],
    safety: ""
  },
  {
    icon: "🍗",
    name: "Lemon-Herb Roast Chicken Tray Bake",
    tagline: "One pan, zero stress, totally safe.",
    time: "45 min",
    serves: "Serves 4",
    why: "Plain chicken and low-FODMAP vegetables are naturally trigger-free — flavour comes from lemon, herbs and infused oil.",
    ingredients: [
      "4 chicken thighs (skin on)",
      "2 carrots, in batons",
      "2 zucchini, in chunks",
      "10 baby potatoes, halved",
      "3 tbsp garlic-infused olive oil",
      "1 lemon (juice + wedges)",
      "Rosemary & thyme, salt & pepper"
    ],
    steps: [
      "Heat oven to 200°C / 400°F.",
      "Toss the vegetables with 2 tbsp garlic-infused oil, salt and pepper; spread on a tray.",
      "Nestle the chicken on top, rub with the remaining oil, lemon juice and herbs.",
      "Tuck in the lemon wedges and roast 35–40 minutes, until the chicken is cooked through and the potatoes are golden.",
      "Scatter with fresh herbs and a green-chive flourish to serve."
    ],
    safety: ""
  },
  {
    icon: "🥢",
    name: "Ginger Chicken & Bok Choy Stir-Fry",
    tagline: "Takeaway flavour without the onion-garlic-soy overload.",
    time: "20 min",
    serves: "Serves 2",
    why: "Garlic-infused oil, ginger and green spring-onion tops recreate stir-fry depth; rice keeps it gentle.",
    ingredients: [
      "2 chicken breasts, sliced",
      "2 heads bok choy, chopped",
      "1 red pepper, sliced",
      "1 carrot, julienned",
      "2 tbsp garlic-infused oil",
      "1 tbsp grated ginger",
      "1–2 tbsp tamari (gluten-free soy)",
      "Green spring-onion tops & sesame seeds",
      "Steamed white rice, to serve"
    ],
    steps: [
      "Heat the garlic-infused oil in a wok over high heat and stir-fry the chicken until golden.",
      "Add the carrot and pepper; stir-fry 2 minutes.",
      "Add the ginger and bok choy; stir-fry until just wilted.",
      "Splash in the tamari, toss, and finish with spring-onion tops and sesame seeds over rice."
    ],
    safety: ""
  },
  {
    icon: "🥤",
    name: "Berry & Banana Breakfast Smoothie",
    tagline: "A five-minute, gut-gentle start.",
    time: "5 min",
    serves: "Serves 1",
    why: "Low-FODMAP fruit and lactose-free dairy give you a creamy, filling smoothie without a fructose hit.",
    ingredients: [
      "1 cup lactose-free or almond milk",
      "⅓ ripe banana (or whole firm banana)",
      "½ cup strawberries",
      "1 tbsp peanut butter",
      "1 tbsp chia seeds",
      "Ice"
    ],
    steps: [
      "Add everything to a blender.",
      "Blend until smooth, adding a little water to reach your preferred thickness.",
      "Pour and enjoy straight away while the chia is still fresh."
    ],
    safety: ""
  },
  {
    icon: "🍲",
    name: "Cozy Rice-Noodle Pho-Style Bowl",
    tagline: "Warming broth that loves your gut back.",
    time: "25 min",
    serves: "Serves 2",
    why: "A clean ginger broth (no onion/garlic simmer) over rice noodles is soothing and naturally low-FODMAP.",
    ingredients: [
      "4 cups low-FODMAP or plain bone broth",
      "1 thumb ginger, sliced",
      "1 star anise (optional)",
      "150 g rice noodles",
      "200 g cooked chicken or rare beef, sliced",
      "2 heads bok choy",
      "Bean sprouts, green spring-onion tops, basil, lime, chilli"
    ],
    steps: [
      "Simmer the broth with the ginger and star anise for 15 minutes, then remove the aromatics.",
      "Soak or cook the rice noodles per the packet and divide between two bowls.",
      "Blanch the bok choy in the broth for 1 minute.",
      "Top the noodles with the protein and greens, ladle over the hot broth, and finish with sprouts, spring-onion tops, basil and a squeeze of lime."
    ],
    safety: ""
  }
];

/* ----------------------------------------------------------------------- */
/* 6. CUISINE / EATING-OUT GUIDE                                            */
/* ----------------------------------------------------------------------- */
const CUISINES = [
  {
    icon: "🍣",
    name: "Japanese",
    verdict: "best",
    verdictLabel: "Easiest choice",
    order: [
      "Sashimi & simple sushi (rice, fish, cucumber)",
      "Grilled fish or chicken teriyaki (sauce on the side)",
      "Steamed rice & plain tofu",
      "Miso soup (small) and seaweed salad"
    ],
    skip: [
      "Edamame (whole soybeans)",
      "Tempura & gyoza (wheat batter/wrappers)",
      "Heavy teriyaki/eel glazes (sugar + garlic)"
    ]
  },
  {
    icon: "🥩",
    name: "Steakhouse / Grill",
    verdict: "best",
    verdictLabel: "Easiest choice",
    order: [
      "Plain steak, grilled chicken or fish",
      "Baked or boiled potato (butter, chives)",
      "Side salad with oil & vinegar",
      "Plain steamed vegetables"
    ],
    skip: [
      "Onion rings & garlic bread",
      "Garlic-butter or onion-gravy sauces",
      "Marinades — ask for it cooked plain with salt & pepper"
    ]
  },
  {
    icon: "🍕",
    name: "Italian",
    verdict: "ok",
    verdictLabel: "Doable with asks",
    order: [
      "Gluten-free pizza or pasta if available",
      "Grilled meat or fish (bistecca, pesce)",
      "Plain tomato (pomodoro) sauce — ask 'no garlic/onion'",
      "Risotto made without onion; polenta; caprese (tomato + mozzarella)"
    ],
    skip: [
      "Garlic bread & bruschetta",
      "Aglio e olio, arrabbiata, marinara with garlic/onion",
      "Minestrone (beans + onion) and creamy lactose-heavy sauces"
    ]
  },
  {
    icon: "🌮",
    name: "Mexican",
    verdict: "ok",
    verdictLabel: "Doable with asks",
    order: [
      "Corn-tortilla tacos with grilled meat",
      "Lettuce, tomato, cheese & a little sour cream",
      "Plain rice and grilled fish/chicken",
      "Pico de gallo — ask for it without onion"
    ],
    skip: [
      "Refried & black beans (GOS)",
      "Guacamole (onion + garlic) and salsa with onion",
      "Large flour tortillas & burritos (wheat)"
    ]
  },
  {
    icon: "🥙",
    name: "Greek / Mediterranean",
    verdict: "ok",
    verdictLabel: "Doable with asks",
    order: [
      "Grilled souvlaki, lamb, chicken or fish",
      "Greek salad — ask for no onion",
      "Rice, potatoes, feta and olives",
      "A little tzatziki (watch the garlic)"
    ],
    skip: [
      "Hummus & falafel (chickpeas + garlic)",
      "Pita and flatbreads (wheat)",
      "Onion-and-garlic-heavy stews and dips"
    ]
  },
  {
    icon: "🍜",
    name: "Chinese / Thai",
    verdict: "tricky",
    verdictLabel: "Order carefully",
    order: [
      "Steamed rice & plainly steamed fish or chicken",
      "Stir-fries — ask for 'no garlic, no onion'",
      "Plain rice noodles",
      "Thai dishes with coconut — keep the portion small"
    ],
    skip: [
      "Anything in standard garlic-onion or hoisin/oyster sauces",
      "Wonton, spring rolls, dumplings (wheat + filling)",
      "Cashew dishes and sweet chilli-heavy glazes"
    ]
  },
  {
    icon: "🍛",
    name: "Indian",
    verdict: "tricky",
    verdictLabel: "Order carefully",
    order: [
      "Plain basmati rice",
      "Tandoori or tikka grilled meats (ask about the marinade)",
      "Plain raita if you tolerate a little dairy",
      "Dishes thickened with tomato rather than onion"
    ],
    skip: [
      "Most curries (onion-garlic-ginger base) & dals (lentils)",
      "Naan and other wheat breads",
      "Mango chutney and creamy korma sauces"
    ]
  },
  {
    icon: "🍔",
    name: "Burgers / American",
    verdict: "ok",
    verdictLabel: "Doable with asks",
    order: [
      "Plain beef patty (no seasoning salt with onion/garlic)",
      "Gluten-free bun or lettuce wrap",
      "Cheddar, lettuce, tomato, cucumber pickle",
      "A plain baked potato or side salad"
    ],
    skip: [
      "Standard wheat bun",
      "Caramelised onion, special/burger sauce & BBQ sauce",
      "Fries cooked with seasoning — plain salted are usually fine"
    ]
  }
];

/* ----------------------------------------------------------------------- */
/* 7. KITCHEN & LIFESTYLE TIPS                                              */
/* ----------------------------------------------------------------------- */
const TIPS = [
  {
    icon: "🫒",
    title: "Infused oil is your flavour base",
    body: "Garlic- and onion-infused oils give you the taste everyone misses with none of the FODMAPs. Keep a bottle within reach of the stove."
  },
  {
    icon: "⏱️",
    title: "Space meals 4–5 hours apart",
    body: "The gap lets your migrating motor complex (MMC) — the gut's 'cleaning wave' — sweep bacteria out of the small intestine. Constant grazing switches it off. (If you're underweight or get shaky, eat sooner.)"
  },
  {
    icon: "🌿",
    title: "Green tops, not white bulbs",
    body: "The green parts of spring onions, leeks and chives are low-FODMAP. Use them generously; discard the white bulb."
  },
  {
    icon: "🔖",
    title: "Read every label",
    body: "Onion powder, garlic powder, inulin/chicory root, honey and high-fructose corn syrup hide in sauces, stocks, snacks and 'healthy' bars."
  },
  {
    icon: "📏",
    title: "Portion size is everything",
    body: "Many 'yellow' foods are perfectly fine in a small serving and only become a problem in a big one. FODMAPs stack up across a meal — and across the day."
  },
  {
    icon: "🍳",
    title: "Cook in batches",
    body: "Pre-cook safe proteins and rice so a compliant meal is always minutes away. Decision-fatigue is what leads to trigger foods."
  },
  {
    icon: "🧂",
    title: "Buy low-FODMAP staples",
    body: "Certified low-FODMAP stock, pasta sauce and snack bars remove the guesswork. Look for the Monash or FODMAP-Friendly certification logos."
  },
  {
    icon: "🔄",
    title: "Restrict, then reintroduce",
    body: "The strict phase is short (typically 2–6 weeks). Methodically reintroduce foods afterwards to find your personal limits — long-term over-restriction starves your good bacteria too."
  }
];

/* ----------------------------------------------------------------------- */
/* 8. DIET APPROACHES (FAQ)                                                 */
/* ----------------------------------------------------------------------- */
const APPROACHES = [
  {
    name: "Low-FODMAP Diet",
    origin: "Monash University",
    blurb: "The most researched approach. Temporarily removes Fermentable Oligo-, Di-, Mono-saccharides And Polyols, then reintroduces them in a structured way. This site's traffic lights primarily follow it."
  },
  {
    name: "Low-Fermentation / Cedars-Sinai Diet",
    origin: "Dr. Mark Pimentel",
    blurb: "Limits fermentable carbs and emphasises 4–5 hour meal spacing to support the MMC. Notably, it permits onion and garlic (considered absorbed higher up) — so some people tolerate them even though low-FODMAP restricts them."
  },
  {
    name: "SIBO Specific Food Guide (SSFG)",
    origin: "Dr. Allison Siebecker",
    blurb: "Combines low-FODMAP with the Specific Carbohydrate Diet (SCD) for a stricter, structured plan grouping foods by fermentability."
  },
  {
    name: "Bi-Phasic Diet",
    origin: "Dr. Nirala Jacobi",
    blurb: "A two-phase protocol: a restrictive phase to reduce symptoms, then a gradual reintroduction of starches to feed beneficial bacteria."
  },
  {
    name: "Elemental Diet",
    origin: "Clinical / medical use",
    blurb: "A short, fully pre-digested liquid formula used under medical supervision when other approaches haven't worked. Not a DIY plan."
  }
];

/* ----------------------------------------------------------------------- */
/* 9. SOURCES                                                               */
/* ----------------------------------------------------------------------- */
const SOURCES = [
  { name: "Monash University — High & Low FODMAP Foods", url: "https://www.monashfodmap.com/about-fodmap-and-ibs/high-and-low-fodmap-foods/" },
  { name: "Monash FODMAP — Eating Out Guide", url: "https://www.monashfodmap.com/blog/eating-out-on-low-fodmap-diet-italian/" },
  { name: "Cleveland Clinic — SIBO Diet: Best & Worst Foods", url: "https://health.clevelandclinic.org/sibo-diet" },
  { name: "Dr. Ruscio — SIBO Foods to Avoid & What You Can Eat", url: "https://drruscio.com/what-foods-should-be-avoided-with-sibo/" },
  { name: "Rupa Health — The Cedars-Sinai (Low-Fermentation) Diet", url: "https://www.rupahealth.com/post/the-cedars-sinai-diet-a-comprehensive-guide-for-ibs-and-sibo-patients" },
  { name: "SIBO Info — Dr. Allison Siebecker's SIBO Diet", url: "https://www.siboinfo.com/sibo-diet.html" },
  { name: "Feed Me Phoebe — Garlic-Infused Olive Oil", url: "https://feedmephoebe.com/garlic-infused-olive-oil-low-fodmap/" },
  { name: "National University of Natural Medicine — SIBO Snacks", url: "https://nunm.edu/2019/05/sibo-snacks/" }
];
