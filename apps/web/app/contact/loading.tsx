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
      <div className="px-6 pb-20 pt-24 lg:px-16">
        <div className="mx-auto max-w-[1000px] space-y-6">
          <div className="h-3 w-24 rounded bg-accent/20" />
          <div className="h-14 w-3/4 rounded bg-foreground/10" />
          <div className="h-4 w-full max-w-lg rounded bg-foreground/8" />
          <div className="h-4 w-2/3 max-w-lg rounded bg-foreground/8" />
        </div>
      </div>

      {/* contact form area */}
      <div className="px-6 pb-28 lg:px-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-[5px] border border-foreground/[0.08] bg-surface p-10 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 rounded-[5px] bg-foreground/[0.04]" />
              ))}
            </div>
            <div className="h-36 rounded-[5px] bg-foreground/[0.04]" />
            <div className="flex justify-center">
              <div className="h-12 w-48 rounded-[5px] bg-accent/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
