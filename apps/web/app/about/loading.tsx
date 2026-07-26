export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-background">
      {/* nav */}
      <div className="dark bg-texture-lines bg-background px-6 py-6 lg:px-16">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between">
          <div className="h-5 w-32 rounded bg-foreground/10" />
          <div className="hidden gap-8 md:flex">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-3 w-20 rounded bg-foreground/10" />)}
          </div>
          <div className="h-9 w-28 rounded-[5px] bg-accent/30" />
        </div>
      </div>

      {/* about hero */}
      <div className="dark bg-texture-lines bg-background px-6 pb-20 pt-16 lg:px-16">
        <div className="mx-auto max-w-[1800px] space-y-6">
          <div className="h-3 w-24 rounded bg-accent/20" />
          <div className="h-14 w-3/4 rounded bg-foreground/10" />
          <div className="h-14 w-1/2 rounded bg-foreground/10" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full max-w-2xl rounded bg-foreground/8" />
            <div className="h-4 w-5/6 max-w-2xl rounded bg-foreground/8" />
          </div>
        </div>
      </div>

      {/* content blocks */}
      <div className="bg-background px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-[1800px] grid grid-cols-1 gap-10 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-[5px] border border-foreground/[0.08] p-8 space-y-4">
              <div className="h-5 w-1/2 rounded bg-foreground/10" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-foreground/8" />
                <div className="h-3 w-4/5 rounded bg-foreground/8" />
                <div className="h-3 w-3/5 rounded bg-foreground/8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
