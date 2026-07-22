"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { type BlogCategory } from "@portfolio/types";
import { api } from "@/lib/api";

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await api.get<{ categories: BlogCategory[] }>("/api/blog-categories");
      setCategories(res.data.categories ?? []);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await api.post<BlogCategory>("/api/blog-categories", { name: newName.trim() });
      setCategories((c) => [...c, res.data]);
      setNewName("");
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Failed to add.");
    } finally {
      setAdding(false);
    }
  }

  async function handleRename(id: string) {
    if (!editName.trim()) return;
    try {
      const res = await api.patch<BlogCategory>(`/api/blog-categories/${id}`, { name: editName.trim() });
      setCategories((c) => c.map((x) => (x.id === id ? res.data : x)));
      setEditingId(null);
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Failed to rename.");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete category "${name}"? Posts in this category won't be deleted.`)) return;
    try {
      await api.delete(`/api/blog-categories/${id}`);
      setCategories((c) => c.filter((x) => x.id !== id));
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Failed to delete.");
    }
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/blog" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold">Blog categories</h1>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="mb-6 flex items-center gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          placeholder="New category name…"
          className="flex-1 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          onClick={handleAdd}
          disabled={adding || !newName.trim()}
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-muted-foreground">No categories yet.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center gap-3 rounded-md border border-border bg-muted/20 px-4 py-3">
              {editingId === cat.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleRename(cat.id); if (e.key === "Escape") setEditingId(null); }}
                    autoFocus
                    className="flex-1 rounded border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button onClick={() => handleRename(cat.id)} className="text-green-400 hover:text-green-300">
                    <Check size={14} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm font-medium">{cat.name}</span>
                  <button
                    onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
