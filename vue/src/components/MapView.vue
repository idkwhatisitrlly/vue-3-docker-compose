<template>
  <div class="map-view-container" tabindex="0" @keydown="handleKeydown">
    <div class="map-layer" :style="mapStyle">
      <div
        class="fishing-zone medium-zone"
        :style="getZoneStyle(gameStore.mediumZone.x, gameStore.mediumZone.y, gameStore.mediumZone.radius)"
      ></div>
      <div
        class="fishing-zone high-zone"
        :style="getZoneStyle(gameStore.highZone.x, gameStore.highZone.y, gameStore.highZone.radius)"
      ></div>
    </div>
    <div class="boat"></div>
    <div class="coordinates">
      X: {{ gameStore.boatCoordinates.x }} / Y: {{ gameStore.boatCoordinates.y }}
    </div>
    <div class="fishing-zone-display">
      Зона: {{ fishingZoneName }} ({{ gameStore.fishingZone }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const mapStyle = computed(() => {
  return {
    transform: `translate(calc(-50% + ${-gameStore.boatCoordinates.x}px), calc(-50% + ${-gameStore.boatCoordinates.y}px))`
  }
})

const getZoneStyle = (x: number, y: number, radius: number) => {
  return {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    left: `calc(50% + ${x - radius}px)`,
    top: `calc(50% + ${y - radius}px)`
  }
}

const fishingZoneName = computed(() => {
  switch (gameStore.fishingZone) {
    case 'low':
      return 'Низкий'
    case 'medium':
      return 'Средний'
    case 'high':
      return 'Высокий'
    default:
      return ''
  }
})

const handleKeydown = (event: KeyboardEvent) => {
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd']
  
  if (keys.includes(event.key)) {
    event.preventDefault()
    
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        gameStore.moveBoat(0, -10)
        break
      case 'ArrowDown':
      case 's':
        gameStore.moveBoat(0, 10)
        break
      case 'ArrowLeft':
      case 'a':
        gameStore.moveBoat(-10, 0)
        break
      case 'ArrowRight':
      case 'd':
        gameStore.moveBoat(10, 0)
        break
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  const container = document.querySelector('.map-view-container') as HTMLElement
  if (container) {
    container.focus()
    container.addEventListener('click', () => container.focus())
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.map-view-container {
  width: 100%;
  height: 100%;
  border: 2px solid #333;
  background-color: #87ceeb;
  position: relative;
  overflow: hidden;
  min-height: 400px;
  outline: none;
  cursor: crosshair;
}

.map-view-container:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
}

.map-layer {
  position: absolute;
  width: 300%;
  height: 300%;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transition: transform 0.1s linear;
  background-color: #87ceeb;
  z-index: 1;
}

.boat {
  width: 50px;
  height: 50px;
  background-color: #f00;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 2px solid #8B0000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.coordinates {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 5px;
  z-index: 20;
  font-weight: bold;
  font-size: 14px;
}

.fishing-zone-display {
  position: absolute;
  top: 45px;
  left: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 5px;
  z-index: 20;
  font-weight: bold;
  font-size: 14px;
}

.fishing-zone {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  z-index: 5;
  border: 3px solid rgba(255, 255, 255, 0.5);
  transition: opacity 0.3s;
}

.fishing-zone:hover {
  opacity: 0.8;
}

.medium-zone {
  background-color: #FFD700;
}

.high-zone {
  background-color: #32CD32;
}
</style>
