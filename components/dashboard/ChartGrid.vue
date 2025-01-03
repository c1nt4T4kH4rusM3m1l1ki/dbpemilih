<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard title="Revenue Overview">
      <ClientOnly>
        <Suspense>
          <LineChart />
          <template #fallback>
            <div class="h-[300px] flex items-center justify-center">
              Loading chart...
            </div>
          </template>
        </Suspense>
      </ClientOnly>
    </ChartCard>
    <ChartCard title="User Statistics">
      <ClientOnly>
        <Suspense>
          <BarChart />
          <template #fallback>
            <div class="h-[300px] flex items-center justify-center">
              Loading chart...
            </div>
          </template>
        </Suspense>
      </ClientOnly>
    </ChartCard>
  </div>
</template>