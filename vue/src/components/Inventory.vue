<template>
  <div class="inventory-view-container">
    <div class="inventory-header">
      <h3>Инвентарь</h3>
      <button 
        v-if="gameStore.inventory.length > 0" 
        @click="clearInventory" 
        class="clear-button"
        title="Очистить инвентарь"
      >
        🗑️ Очистить
      </button>
    </div>
    <div class="inventory-grid">
      <div v-for="(item, index) in gameStore.inventory" :key="index" class="inventory-item">
        {{ item }}
      </div>
      <div v-if="gameStore.inventory.length === 0" class="empty-inventory">
        Инвентарь пуст<br>
        🎣 Начните ловить рыбу!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const clearInventory = () => {
  if (confirm('Вы уверены, что хотите очистить весь инвентарь?')) {
    gameStore.clearInventory()
  }
}
</script>

<style scoped>
.inventory-view-container {
  width: 100%;
  height: 100%;
  border: 2px solid #333;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.inventory-header {
  background-color: #333;
  color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #555;
}

.inventory-header h3 {
  margin: 0;
  font-size: 18px;
}

.clear-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.clear-button:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}

.clear-button:active {
  transform: scale(0.95);
}

.inventory-grid {
  flex: 1;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  overflow-y: auto;
  align-content: start;
}

.inventory-item {
  aspect-ratio: 1;
  border: 2px solid #4CAF50;
  background: linear-gradient(135deg, #ffffff 0%, #e8f5e9 100%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  word-wrap: break-word;
  color: #2E7D32;
}

.inventory-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-color: #2E7D32;
}

.empty-inventory {
  grid-column: 1 / -1;
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 40px 20px;
  font-style: italic;
}
</style>
