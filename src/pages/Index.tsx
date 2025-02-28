
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/Progress";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Plus, X, Trash2 } from "lucide-react";

interface Item {
  id: number;
  name: string;
  category: string;
  packed: boolean;
}

const categories = ["All", "Clothing", "Toiletries", "Electronics", "Documents", "Accessories", "Medications", "Other"];

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState("Other");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const savedItems = localStorage.getItem("packingList");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim() === "") return;
    const newItemObj = {
      id: Date.now(),
      name: newItem,
      category,
      packed: false
    };
    setItems([...items, newItemObj]);
    setNewItem("");
  };

  const togglePacked = (id: number) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      packed: !item.packed
    } : item));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = selectedCategory === "All" ? items : items.filter(item => item.category === selectedCategory);

  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const percentPacked = totalItems === 0 ? 0 : Math.round(packedItems / totalItems * 100);

  const resetList = () => {
    if (window.confirm("Are you sure you want to clear your packing list?")) {
      setItems([]);
    }
  };

  return (
    <div 
      className="min-h-screen sm:py-12 px-3 sm:px-4 max-w-2xl mx-auto py-[12px] rounded-none"
      style={{
        backgroundImage: 'url("/lovable-uploads/ab1a9f71-07bd-41d2-87e7-f6a3c16b76f7.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className="space-y-6 sm:space-y-8 animate-fadeIn">
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
            Travel Buddy
          </h1>
          <p className="text-zinc-50 font-normal text-base">
            Keep track of your packing progress
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md sm:rounded-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 rounded-2xl py-[13px] px-[15px] border border-white/10">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
              <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} onKeyPress={e => e.key === "Enter" && addItem()} placeholder="Add new item..." className="w-full flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400" />
              <div className="flex gap-2">
                <select value={category} onChange={e => setCategory(e.target.value)} className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                  {categories.slice(1).map(cat => <option key={cat} value={cat}>
                      {cat}
                    </option>)}
                </select>
                <button onClick={addItem} className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <Progress progress={percentPacked} className="w-full" />
              {percentPacked === 100 && (
                <div className="absolute inset-0 flex items-center justify-center -mt-8">
                  <div className="animate-bounce bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    You're all Set, Let's Go!!!
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 sm:max-h-none overflow-y-auto">
              {categories.map(cat => <CategoryBadge key={cat} category={cat} selected={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />)}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {filteredItems.length === 0 ? <p className="text-center py-8 sm:py-12 text-zinc-50 font-normal text-base">
                Your packing list is empty
              </p> : filteredItems.map(item => <div key={item.id} className="group flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/70 border hover:border-primary/50 hover:shadow-sm transition-all animate-slideIn">
                  <div className="flex items-center space-x-3 min-w-0">
                    <input type="checkbox" checked={item.packed} onChange={() => togglePacked(item.id)} className="rounded-lg border-gray-300 text-primary focus:ring-primary w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all" />
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <span className={`${item.packed ? "line-through text-muted-foreground" : "text-foreground"} transition-all truncate text-sm sm:text-base`}>
                        {item.name}
                      </span>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-secondary/70 text-secondary-foreground font-medium flex-shrink-0">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-2 hover:text-destructive transition-all rounded-lg hover:bg-destructive/10 flex-shrink-0 ml-2">
                    <X className="h-4 w-4" />
                  </button>
                </div>)}
          </div>

          {items.length > 0 && <button onClick={resetList} className="w-full flex items-center justify-center space-x-2 p-2.5 sm:p-3 text-sm text-destructive hover:text-destructive-foreground hover:bg-destructive rounded-lg sm:rounded-xl transition-all">
              <Trash2 className="h-4 w-4" />
              <span>Clear List</span>
            </button>}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 text-zinc-50/70 text-sm bg-black/30 backdrop-blur-md">
        <div className="flex-1"></div>
        <p className="flex-1 text-center">© {new Date().getFullYear()} Travel Buddy. All rights reserved.</p>
        <div className="flex-1 text-right">
          <div className="flex flex-col items-end text-xs font-mono opacity-30">
            <span>Created by:</span>
            <span>JayParbz</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
