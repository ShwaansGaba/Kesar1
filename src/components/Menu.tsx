import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Leaf, Flame, Star, X, Search, SlidersHorizontal } from 'lucide-react';

type Dish = {
  id: string;
  name: string;
  category: string;
  type: 'veg' | 'non-veg';
  isSpecial: boolean;
  spiceLevel: number;
  description: string;
  ingredients: string[];
  price: string;
};

const MENU_ITEMS: Dish[] = [
  {
    id: '1',
    name: 'Kesar Special Dal Makhani',
    category: 'North Indian',
    type: 'veg',
    isSpecial: true,
    spiceLevel: 1,
    description: 'Our signature black lentils slow-cooked overnight with a rich blend of cream and butter, offering a velvety texture.',
    ingredients: ['Black urad dal', 'Butter', 'Cream', 'Tomato puree', 'Secret spices'],
    price: '₹320'
  },
  {
    id: '2',
    name: 'Paneer Butter Masala',
    category: 'Mughlai',
    type: 'veg',
    isSpecial: true,
    spiceLevel: 2,
    description: 'Succulent cubes of cottage cheese prepared in a luxuriously smooth tomato-cashew gravy.',
    ingredients: ['Paneer', 'Cashews', 'Tomatoes', 'Butter', 'Cream'],
    price: '₹350'
  },
  {
    id: '3',
    name: 'Classic Veg Biryani',
    category: 'Biryani',
    type: 'veg',
    isSpecial: false,
    spiceLevel: 2,
    description: 'Aromatic basmati rice cooked with fresh farm vegetables and infused with whole royal spices.',
    ingredients: ['Basmati rice', 'Mixed vegetables', 'Saffron', 'Whole spices', 'Mint'],
    price: '₹280'
  },
  {
    id: '4',
    name: 'Crispy Veg Momos (8pcs)',
    category: 'Fast Food',
    type: 'veg',
    isSpecial: false,
    spiceLevel: 1,
    description: 'Thin-wrapper dumplings stuffed with finely minced vegetables, served steamed or crispy fried with fiery chili chutney.',
    ingredients: ['Cabbage', 'Carrot', 'Paneer', 'Flour', 'Spices'],
    price: '₹140'
  },
  {
    id: '5',
    name: 'South Indian Platter',
    category: 'South Indian',
    type: 'veg',
    isSpecial: true,
    spiceLevel: 2,
    description: 'Authentic crispy golden dosa served alongside fluffy idlis, vada, and an assortment of freshly ground chutneys.',
    ingredients: ['Rice batter', 'Lentils', 'Coconut', 'Sambar', 'Curry leaves'],
    price: '₹220'
  },
  {
    id: '6',
    name: 'Vegetable Hakka Noodles',
    category: 'Chinese',
    type: 'veg',
    isSpecial: false,
    spiceLevel: 2,
    description: 'Wok-tossed noodles generously mixed with crunchy julienned vegetables and light soy sauce.',
    ingredients: ['Noodles', 'Bell peppers', 'Cabbage', 'Spring onions', 'Soy sauce'],
    price: '₹190'
  }
];

const CATEGORIES = ['All Cuisines', 'North Indian', 'Mughlai', 'Chinese', 'South Indian', 'Biryani', 'Fast Food'];
const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Spice Level'];

function TiltCard({ item, onClick }: { item: Dish, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative p-[1px] bg-gradient-to-br from-gold/50 to-gold/10 rounded-2xl cursor-pointer group h-full shadow-md w-full"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="w-full h-full bg-ivory-dark/95 backdrop-blur-md p-3 sm:p-5 md:p-6 rounded-2xl flex flex-col items-start border border-white/40"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between items-start w-full mb-2 sm:mb-4 gap-1 sm:gap-2">
          <h3 className="font-serif text-[13px] leading-tight sm:text-lg md:text-xl text-maroon line-clamp-2">{item.name}</h3>
          <div className="flex gap-1 shrink-0 mt-1 sm:mt-0">
            {item.type === 'veg' ? <Leaf className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-green-600" /> : <Flame className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-red-500" />}
            {item.isSpecial && <Star className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-gold" />}
          </div>
        </div>
        <p className="text-[11px] sm:text-sm text-charcoal/70 flex-grow mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">{item.description}</p>
        <div className="mt-auto w-full flex justify-between items-end">
          <span className="text-saffron-dark text-sm sm:text-base font-semibold tracking-wider">{item.price}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Cuisines');
  const [sortBy, setSortBy] = useState('Recommended');
  const [selectedItem, setSelectedItem] = useState<Dish | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    if (activeCategory !== 'All Cuisines' && item.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
    }
    if (sortBy === 'Price: High to Low') {
      return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''));
    }
    if (sortBy === 'Spice Level') {
      return b.spiceLevel - a.spiceLevel;
    }
    return 0;
  });

  return (
    <section id="menu" className="py-24 bg-transparent relative pattern-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-maroon mb-4">The Royal Menu</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-8 md:mb-12" />
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-maroon/50 group-focus-within:text-saffron transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white/60 backdrop-blur-sm border border-gold/40 rounded-xl xl:rounded-2xl text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all shadow-sm text-sm"
              />
            </div>
            
            {/* Category Dropdown */}
            <div className="w-full sm:w-48 relative">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-white/60 backdrop-blur-sm border border-gold/40 rounded-xl xl:rounded-2xl text-charcoal focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all shadow-sm cursor-pointer font-medium text-sm text-center sm:text-left"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="text-charcoal bg-white">{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-maroon">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-48 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-white/60 backdrop-blur-sm border border-gold/40 rounded-xl xl:rounded-2xl text-charcoal focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all shadow-sm cursor-pointer font-medium text-sm text-center sm:text-left"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt} value={opt} className="text-charcoal bg-white">{opt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-maroon">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
          style={{ perspective: 1000 }}
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard item={item} onClick={() => setSelectedItem(item)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal / High-Def Card for Selected Item */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-maroon/40 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-xl bg-ivory border-t sm:border border-saffron/30 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
          >
            <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none sm:hidden" />
            <div className="mx-auto mt-3 h-1.5 w-12 bg-charcoal/20 rounded-full sm:hidden shrink-0 z-20 relative" />
            
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 text-charcoal/50 hover:text-maroon bg-white/50 backdrop-blur rounded-full p-2 transition-all z-20 shadow-sm"
            >
              <X size={20} />
            </button>
            
            <div className="p-6 pt-10 sm:p-10 border-t-4 border-maroon overflow-y-auto flex-grow scrollbar-hide">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-saffron-dark uppercase tracking-widest text-[10px] sm:text-xs font-semibold">{selectedItem.category}</span>
                {selectedItem.isSpecial && <span className="bg-gold/20 text-maroon text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-medium">Chef's Special</span>}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-maroon mb-4 sm:mb-5 leading-tight">{selectedItem.name}</h2>
              <p className="text-charcoal/80 text-base sm:text-lg mb-8 leading-relaxed font-serif italic border-l-2 border-saffron/50 pl-4">
                "{selectedItem.description}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-black/5 p-5 rounded-2xl border border-black/5">
                <div>
                  <h4 className="text-xs text-maroon/70 font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Leaf size={14} className="text-saffron-dark" />
                    Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map(ing => (
                      <span key={ing} className="bg-white text-charcoal/80 text-xs px-3 py-1.5 rounded-full border border-gold/30 shadow-sm">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs text-maroon/70 font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <SlidersHorizontal size={14} className="text-saffron-dark" />
                    Details
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gold/10">
                      <span className="text-charcoal/60 text-sm font-medium">Type</span>
                      <span className={`capitalize text-sm font-bold flex items-center gap-1.5 ${selectedItem.type === 'veg' ? 'text-green-700' : 'text-red-700'}`}>
                        {selectedItem.type === 'veg' ? <div className="w-2 h-2 rounded-full bg-green-600" /> : <div className="w-2 h-2 rounded-full bg-red-600" />}
                        {selectedItem.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gold/10">
                      <span className="text-charcoal/60 text-sm font-medium">Spice Level</span>
                      <div className="flex gap-1.5">
                        {[...Array(3)].map((_, i) => (
                          <Flame 
                            key={i} 
                            size={16} 
                            className={i < selectedItem.spiceLevel ? 'text-red-500 fill-red-500 drop-shadow-sm' : 'text-gray-200'}
                            strokeWidth={i < selectedItem.spiceLevel ? 2 : 1}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-gold/20">
                <div className="flex flex-col">
                  <span className="text-xs text-charcoal/50 uppercase tracking-widest font-semibold mb-1">Price</span>
                  <span className="text-4xl font-serif text-maroon font-semibold">{selectedItem.price}</span>
                </div>
                {/* Visual order instruction for users treating it as a digital menu */}
                <div className="bg-saffron/10 text-maroon-dark text-sm px-6 py-4 rounded-xl flex items-center justify-center font-medium border border-saffron/30 shrink-0 text-center">
                  Order with your server
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
