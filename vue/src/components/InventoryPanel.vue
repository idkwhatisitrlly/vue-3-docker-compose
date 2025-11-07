<template>
  <div class="inventory">
    <div class="inventory__title">Инвентарь</div>
    <div class="inventory__grid">
      <div class="inventory__item">
        <div class="inventory__name">Обычная</div>
        <div class="inventory__count">{{ inventory.common || 0 }}</div>
      </div>
      <div class="inventory__item">
        <div class="inventory__name">Хорошая</div>
        <div class="inventory__count">{{ inventory.good || 0 }}</div>
      </div>
      <div class="inventory__item">
        <div class="inventory__name">Редкая</div>
        <div class="inventory__count">{{ inventory.rare || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ inventory: { common: number, good: number, rare: number } }>()
</script>

<style scoped lang="less">
.inventory {
  width: 260px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.inventory__title {
  font-weight: 700;
  margin-bottom: 8px;
}

.inventory__grid {
  display: grid;
  grid-template-columns: 1fr 80px;
  row-gap: 8px;
  column-gap: 8px;
}

.inventory__item {
  display: contents;
}

.inventory__name {
  padding: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
}

.inventory__count {
  padding: 8px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
</style>
