import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const boatCoordinates = ref({ x: 0, y: 0 })
  const inventory = ref<string[]>([])

  const mediumZone = ref({ x: 100, y: 100, radius: 50 })
  const highZone = ref({ x: -100, y: -100, radius: 30 })

  const fishingZone = computed(() => {
    const distanceToMedium = Math.sqrt(
      Math.pow(boatCoordinates.value.x - mediumZone.value.x, 2) +
      Math.pow(boatCoordinates.value.y - mediumZone.value.y, 2)
    )
    if (distanceToMedium <= mediumZone.value.radius) {
      return 'medium'
    }

    const distanceToHigh = Math.sqrt(
      Math.pow(boatCoordinates.value.x - highZone.value.x, 2) +
      Math.pow(boatCoordinates.value.y - highZone.value.y, 2)
    )
    if (distanceToHigh <= highZone.value.radius) {
      return 'high'
    }

    return 'low'
  })

  const moveBoat = (x: number, y: number) => {
    boatCoordinates.value.x += x
    boatCoordinates.value.y += y
  }

  const addFishToInventory = (fish: string) => {
    inventory.value.push(fish)
  }

  const clearInventory = () => {
    inventory.value = []
  }

  return {
    boatCoordinates,
    inventory,
    fishingZone,
    mediumZone,
    highZone,
    moveBoat,
    addFishToInventory,
    clearInventory
  }
}, {
  persist: true,
})
