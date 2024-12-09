<template>
  <div class="control-text">
    <p>Drone hoogte: {{ height }} meter</p>
    <p>Drone snelheid: {{ speed }} km/uur</p>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import { usePositionDroneStore } from "../store/usePositionDroneStore";

export default {
  setup() {
    const positionDroneStore = usePositionDroneStore();
    return {
      positionDroneStore,
    };
  },
  computed: {
    height() {
      return this.positionDroneStore.height;
    },
    speed() {
      return this.positionDroneStore.speed;
    },
  },
};
</script>
<style scoped>
.control-text {
  margin-top: 20px;
  margin-right: 20px;
  position: absolute;
  right: 40%;
}
</style>
