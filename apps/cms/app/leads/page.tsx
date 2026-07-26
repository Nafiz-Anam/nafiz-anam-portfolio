"use client";

import { useEffect, useState } from "react";
import { Loader2, Inbox, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { type ContactLead } from "@portfolio/types";
import { api } from "@/lib/api";
import { Pagination } from "@/components/Pagination";

type Status = "all" | "new" | "read" | "replied" | "archived";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-accent/15 text-accent",
  read: "bg-blue-500/15 text-blue-400",
  replied: "bg-green-500/15 text-green-400",
  archived: "bg-muted/40 text-muted-foreground",
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const LIMIT = 25;

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  async function load(p = page) {
    setLoading(true);
    try {
      const res = await api.get<{ leads: ContactLead[]; total: number; totalPages: number }>("/contact", {
        params: { status, page: p, limit: LIMIT },
      });
      setLeads(res.data.leads ?? []);
      setTotal(res.data.total ?? 0);
      setTotalPages(res.data.totalPages ?? 1);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { setPage(1); load(1); }, [status]);

  function handlePage(p: number) {
    setPage(p);
    load(p);
  }

  async function handleStatusChange(id: string, newStatus: ContactLead["status"]) {
    setUpdatingId(id);
    try {
      const res = await api.patch<ContactLead>(`/contact/${id}/status`, { status: newStatus });
      setLeads((prev) => prev.map((l) => (l.id === id ? res.data : l)));
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete lead from "${name}"? Cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await api.delete(`/contact/${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (e) {
      const err = e as { message?: string };
      alert(err.message ?? "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Leads</h1>
          {newCount > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
              {newCount} new
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Contact form submissions from the website.</p>
      </div>

      <div className="mb-4 flex items-center gap-1 rounded-lg border border-border bg-muted/20 p-1 w-fit">
        {(["all", "new", "read", "replied", "archived"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors ${
              status === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : leads.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border text-center">
          <Inbox size={28} className="text-muted-foreground" />
          <p className="text-sm font-semibold">No leads yet</p>
          <p className="text-xs text-muted-foreground">Submissions from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Contact</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Budget</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <>
                  <tr
                    key={lead.id}
                    className={`border-b border-border/60 last:border-b-0 hover:bg-muted/20 cursor-pointer ${
                      lead.status === "new" ? "bg-accent/5" : ""
                    }`}
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.budget}</td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(lead.id, e.target.value as ContactLead["status"]);
                        }}
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold border-0 cursor-pointer focus:outline-none ${
                          STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
                        }`}
                      >
                        <option value="new">new</option>
                        <option value="read">read</option>
                        <option value="replied">replied</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          disabled={deletingId === lead.id}
                          onClick={(e) => { e.stopPropagation(); handleDelete(lead.id, lead.name); }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
                        >
                          {deletingId === lead.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                        {expanded === lead.id ? (
                          <ChevronUp size={14} className="text-muted-foreground" />
                        ) : (
                          <ChevronDown size={14} className="text-muted-foreground" />
                        )}
                      </div>
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr key={`${lead.id}-expanded`} className="border-b border-border/60 bg-muted/10">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</p>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/80">{lead.message}</p>
                          <a
                            href={`mailto:${lead.email}?subject=Re: Your inquiry`}
                            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90"
                          >
                            Reply via email
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPage={handlePage} />
    </div>
  );
}
