<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard title="Traffic Sources">
      <ClientOnly>
        <Suspense>
          <PieChart />
          <template #fallback>
            <div class="h-[300px] flex items-center justify-center">
              Loading chart...
            </div>
          </template>
        </Suspense>
      </ClientOnly>
    </ChartCard>
    <ChartCard title="User Engagement">
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
  </div>
</template>