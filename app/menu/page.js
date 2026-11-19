"use client";

import { useState } from "react";
import { menuItems, categories } from "@/data/menu";
import { canteens } from "@/data/canteens";
import CategoryFilter from "@/components/CategoryFilter";
import MenuItemCard from "@/components/MenuItemCard";
import EmptyState from "@/components/EmptyState";
import Input from "@/components/Input";

const canteenOptions = [
  { value: "all", label: "All canteens" },
  ...canteens.map((c) => ({ value: c.id, label: c.name })),
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [canteenId, setCanteenId] = useState("all");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = menuItems.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (canteenId !== "all" && item.canteenId !== canteenId) return false;
    if (vegOnly && !item.veg) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Menu</h1>

      <Input
        id="search"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search menu"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
        Veg only
      </label>
      <CategoryFilter options={canteenOptions} selected={canteenId} onSelect={setCanteenId} />
      <CategoryFilter options={categories} selected={category} onSelect={setCategory} />

      <p className="text-sm text-muted">{filtered.length} items · one canteen per order</p>

      {filtered.length === 0 ? (
        <EmptyState title="No items found" message="Try a different search or filter." />
      ) : (
        <div>
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
