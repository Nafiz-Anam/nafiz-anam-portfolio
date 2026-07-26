export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-background text-foreground">
      {/* nav */}
      <div className="dark bg-texture-lines bg-background px-6 py-5 lg:px-16">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between">
          <div className="h-4 w-28 rounded bg-foreground/10" />
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 w-16 rounded bg-foreground/10" />
            ))}
          </div>
        </div>
      </div>

      {/* hero */}
      <div className="dark bg-texture-lines bg-background px-6 pb-28 pt-20 lg:px-16">
        <div className="mx-auto max-w-[1800px] space-y-6">
          <div className="h-3 w-20 rounded bg-accent/20" />
          <div className="h-16 w-2/3 rounded bg-foreground/10" />
          <div className="h-4 w-full max-w-xl rounded bg-foreground/8" />
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-44 rounded-[5px] bg-accent/20" />
            <div className="h-12 w-44 rounded-[5px] bg-foreground/[0.06]" />
          </div>
        </div>
      </div>

      {/* services grid */}
      <div className="px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="h-8 w-48 rounded bg-foreground/10 mb-14" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-[5px] border border-foreground/[0.08] p-8 space-y-4">
                <div className="h-10 w-10 rounded bg-accent/15" />
                <div className="h-5 w-3/4 rounded bg-foreground/10" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-foreground/8" />
                  <div className="h-3 w-5/6 rounded bg-foreground/8" />
                  <div className="h-3 w-4/6 rounded bg-foreground/8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
