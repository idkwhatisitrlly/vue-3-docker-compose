import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import InventoryView from '../views/InventoryView.vue'
import FishingMinigame from '../views/FishingMinigame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView
    },
    {
      path: '/fishing',
      name: 'fishing',
      component: FishingMinigame
    }
  ]
})

export default router
