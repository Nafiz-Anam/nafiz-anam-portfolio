export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-background">
      {/* nav */}
      <div className="dark bg-background px-6 py-5 lg:px-16">
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
      <div className="dark bg-background px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-[1800px] space-y-6">
          <div className="h-3 w-24 rounded bg-accent/20" />
          <div className="h-12 w-1/2 rounded bg-foreground/10" />
          <div className="h-4 w-full max-w-lg rounded bg-foreground/8" />
        </div>
      </div>

      {/* filter bar */}
      <div className="dark bg-background px-6 pb-6 lg:px-16">
        <div className="mx-auto max-w-[1800px] flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-foreground/10" />
          ))}
        </div>
      </div>

      {/* articles grid */}
      <div className="dark bg-background px-6 pb-28 lg:px-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-[5px] border border-foreground/[0.08]">
                <div className="aspect-[16/9] bg-foreground/[0.04]" />
                <div className="flex flex-col gap-4 p-7">
                  <div className="h-3 w-20 rounded bg-accent/15" />
                  <div className="h-5 w-full rounded bg-foreground/10" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-foreground/8" />
                    <div className="h-3 w-4/5 rounded bg-foreground/8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
