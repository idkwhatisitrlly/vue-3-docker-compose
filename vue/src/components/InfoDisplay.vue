<template>
  <div class="info-display-container">
    <h2>Информация</h2>
    <div class="info-section">
      <h3>Координаты лодки</h3>
      <p>X: {{ gameStore.boatCoordinates.x }}</p>
      <p>Y: {{ gameStore.boatCoordinates.y }}</p>
    </div>
    <div class="info-section">
      <h3>Зона ловли</h3>
      <p class="zone-info" :class="`zone-${gameStore.fishingZone}`">
        {{ zoneName }}
      </p>
      <p class="zone-description">{{ zoneDescription }}</p>
    </div>
    <div class="info-section">
      <h3>Инвентарь</h3>
      <p>Рыб поймано: {{ gameStore.inventory.length }}</p>
    </div>
    <div class="info-section">
      <h3>Управление</h3>
      <p>🔼 W / ↑ - Вверх</p>
      <p>🔽 S / ↓ - Вниз</p>
      <p>◀️ A / ← - Влево</p>
      <p>▶️ D / → - Вправо</p>
      <p>Пробел - Ловить</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const zoneName = computed(() => {
  switch (gameStore.fishingZone) {
    case 'low':
      return 'Низкий'
    case 'medium':
      return 'Средний'
    case 'high':
      return 'Высокий'
    default:
      return 'Неизвестно'
  }
})

const zoneDescription = computed(() => {
  switch (gameStore.fishingZone) {
    case 'low':
      return 'Клев через 5 сек'
    case 'medium':
      return 'Клев через 3 сек'
    case 'high':
      return 'Клев через 1 сек'
    default:
      return ''
  }
})
</script>

<style scoped>
.info-display-container {
  width: 100%;
  height: 100%;
  border: 2px solid #333;
  background-color: #f9f9f9;
  padding: 15px;
  overflow-y: auto;
  box-sizing: border-box;
}

h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
}

.info-section {
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}

.info-section p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.zone-info {
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  border-radius: 3px;
  text-align: center;
}

.zone-low {
  background-color: #87ceeb;
  color: white;
}

.zone-medium {
  background-color: #ffd700;
  color: #333;
}

.zone-high {
  background-color: #32cd32;
  color: white;
}

.zone-description {
  font-style: italic;
  text-align: center;
  color: #888;
}
</style>
