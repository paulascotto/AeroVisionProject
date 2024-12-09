<template>
  <div class="drone">
    <font-awesome-icon :icon="faJetFighterUp" :style="dronePosition" />
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faJetFighterUp } from "@fortawesome/free-solid-svg-icons";
import { usePositionDroneStore } from "../store/usePositionDroneStore";

export default {
  setup() {
    const positionDroneStore = usePositionDroneStore();
    return {
      positionDroneStore,
    };
  },
  data() {
    return {
      faJetFighterUp,
    };
  },
  computed: {
    dronePosition(): { position: string; left: string; top: string } {
      const position = this.positionDroneStore.position;
      return {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      };
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>
<style scoped>
.drone {
  font-size: 150px;
  color: blue;
}
</style>
