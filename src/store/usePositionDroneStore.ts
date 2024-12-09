import { defineStore } from "pinia";

interface DroneState {
  position: { x: number; y: number };
  height: number;
  speed: number;
}

export const usePositionDroneStore = defineStore("drone", {
  state: (): DroneState => ({
    position: { x: 792, y: 430 },
    height: 0,
    speed: 0,
  }),
  getters: {
    isFlying: (state) => state.height > 0,
  },
  actions: {
    resetDrone() {
      this.height = 0;
      this.speed = 0;
      this.position = { x: 792, y: 430 };
    },
    updateHeight(newHeight: number) {
      this.height = newHeight;
    },
    updateSpeed(newSpeed: number) {
      this.speed = newSpeed;
    },
    updatePositionX(newPositionX: number) {
      this.position.x = newPositionX;
    },
    updatePositionY(newPositionY: number) {
      this.position.y = newPositionY;
    },
  },
});
