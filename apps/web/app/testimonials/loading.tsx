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
      <div className="dark bg-texture-lines bg-background px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-[1800px] space-y-5">
          <div className="h-3 w-28 rounded bg-accent/20" />
          <div className="h-12 w-1/2 rounded bg-foreground/10" />
          <div className="h-4 w-full max-w-lg rounded bg-foreground/8" />
        </div>
      </div>

      {/* carousel placeholder */}
      <div className="px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="rounded-[5px] border border-foreground/[0.08] p-14 space-y-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-4 w-4 rounded bg-accent/20" />)}
            </div>
            <div className="space-y-3">
              <div className="h-5 w-full rounded bg-foreground/10" />
              <div className="h-5 w-5/6 rounded bg-foreground/10" />
              <div className="h-5 w-4/6 rounded bg-foreground/10" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-foreground/[0.06]" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-foreground/10" />
                <div className="h-3 w-24 rounded bg-foreground/8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* testimonials grid */}
      <div className="px-6 pb-28 lg:px-16">
        <div className="mx-auto max-w-[1800px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-[5px] border border-foreground/[0.08] p-8 space-y-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((j) => <div key={j} className="h-3 w-3 rounded bg-accent/15" />)}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-foreground/10" />
                <div className="h-4 w-5/6 rounded bg-foreground/10" />
                <div className="h-4 w-4/6 rounded bg-foreground/10" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-foreground/[0.06]" />
                <div className="space-y-1.5">
                  <div className="h-3 w-28 rounded bg-foreground/10" />
                  <div className="h-3 w-20 rounded bg-foreground/8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
