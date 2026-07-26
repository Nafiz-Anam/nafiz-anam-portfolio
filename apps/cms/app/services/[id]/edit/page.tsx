"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ServiceForm, type ServiceFormValues } from "@/components/ServiceForm";
import { api } from "@/lib/api";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Partial<ServiceFormValues> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<{ service: ServiceFormValues }>(`/services/admin/${id}`)
      .then((res) => setInitial(res.data.service))
      .catch((e: { message?: string }) => setError(e.message ?? "Failed to load service."));
  }, [id]);

  if (error) return <div className="p-8 text-sm text-red-500">{error}</div>;
  if (!initial) return (
    <div className="flex h-40 items-center justify-center text-muted-foreground">
      <Loader2 className="animate-spin" size={18} />
    </div>
  );

  return <ServiceForm mode="edit" id={id} initial={initial} />;
}
