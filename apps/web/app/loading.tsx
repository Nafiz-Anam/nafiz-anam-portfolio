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

      {/* hero headline */}
      <div className="dark bg-texture-lines bg-background px-6 pb-24 pt-12 lg:px-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-4">
              <div className="h-16 w-72 rounded bg-foreground/10" />
              <div className="h-16 w-96 rounded bg-foreground/10" />
            </div>
            <div className="flex gap-6 pt-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-3 w-20 rounded bg-foreground/10" />)}
            </div>
          </div>

          {/* hero card */}
          <div className="mt-16 rounded-[5px] bg-panel p-10 sm:p-14">
            <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-8">
                <div className="h-16 w-64 rounded bg-panel-foreground/10" />
                <div className="space-y-3">
                  <div className="h-4 w-80 rounded bg-panel-foreground/10" />
                  <div className="h-4 w-64 rounded bg-panel-foreground/10" />
                </div>
                <div className="h-10 w-32 self-end rounded-[5px] bg-accent/40" />
              </div>
              <div className="h-64 w-64 shrink-0 rounded-[5px] bg-panel-foreground/10 sm:h-72 sm:w-72" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
