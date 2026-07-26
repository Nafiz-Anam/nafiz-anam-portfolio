export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-background">
      {/* nav placeholder */}
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

      {/* hero placeholder */}
      <div className="dark bg-background px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-[1800px] space-y-6">
          <div className="h-3 w-32 rounded bg-accent/20" />
          <div className="h-12 w-2/3 rounded bg-foreground/10" />
          <div className="h-4 w-full max-w-xl rounded bg-foreground/8" />
          <div className="h-4 w-3/4 max-w-xl rounded bg-foreground/8" />
        </div>
      </div>

      {/* grid placeholder */}
      <div className="dark bg-background px-6 pb-28 lg:px-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="overflow-hidden rounded-[5px] border border-foreground/[0.08]">
                <div className="h-[220px] bg-foreground/[0.04]" />
                <div className="flex flex-col gap-4 p-8">
                  <div className="h-5 w-3/4 rounded bg-foreground/10" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-foreground/8" />
                    <div className="h-3 w-5/6 rounded bg-foreground/8" />
                    <div className="h-3 w-4/6 rounded bg-foreground/8" />
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
