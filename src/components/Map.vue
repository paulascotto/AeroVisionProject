<template>
  <div class="map">
    <ButtonSlotCard>
      <Button
        v-for="(icon, index) in actionIcons"
        :key="index"
        :buttonIcon="icon"
        @clicked="handleButtonClick(icon)"
        :disabled="
          isButtonDisabled(icon === faPlaneDeparture ? 'departure' : 'arrival')
        "
      ></Button>
    </ButtonSlotCard>
    <AlertSlotCard v-if="maxHeightReached">
      <p>
        De drone heeft zijn maximale hoogte bereikt! De hoogte van de drone is
        nu 2000 meter.
      </p>
    </AlertSlotCard>
    <Information />
    <Drone />
  </div>
</template>

<script lang="ts">
import Drone from "./Drone.vue";
import Information from "./Information.vue";
import ButtonSlotCard from "./ButtonSlotCard.vue";
import AlertSlotCard from "./AlertSlotCard.vue";
import Button from "./Button.vue";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { usePositionDroneStore } from "../store/usePositionDroneStore";

enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export default {
  setup() {
    const positionDroneStore = usePositionDroneStore();
    return {
      positionDroneStore,
    };
  },
  data() {
    return {
      faPlaneDeparture,
      faPlaneArrival,
      faSquareCaretLeft,
      faSquareCaretRight,
      faSquareCaretUp,
      faSquareCaretDown,
      faCircleStop,
      intervalHeight: null as number | null,
      intervalSpeed: null as number | null,
      maxHeight: 2000,
      minHeight: 0,
      maxSpeed: 100,
      minSpeed: 0,
      maxHeightReached: false,
      actionIcons: [
        faPlaneDeparture,
        faPlaneArrival,
        faSquareCaretLeft,
        faSquareCaretRight,
        faSquareCaretUp,
        faSquareCaretDown,
        faCircleStop,
      ],
    };
  },
  components: {
    Drone,
    Information,
    ButtonSlotCard,
    AlertSlotCard,
    Button,
    FontAwesomeIcon,
  },
  methods: {
    handleButtonClick(icon: IconDefinition): void {
      switch (icon) {
        case this.faPlaneDeparture:
          this.climbAndAccelerate();
          break;
        case this.faPlaneArrival:
          this.descendAndDecelerate();
          break;
        case this.faSquareCaretLeft:
          this.move(Direction.Left);
          break;
        case this.faSquareCaretRight:
          this.move(Direction.Right);
          break;
        case this.faSquareCaretUp:
          this.move(Direction.Up);
          break;
        case this.faSquareCaretDown:
          this.move(Direction.Down);
          break;
        case this.faCircleStop:
          this.resetDrone();
          break;
        default:
          console.log("Unknown action");
      }
    },
    move(direction: Direction, distance: number = 10): void {
      switch (direction) {
        case Direction.Left:
          this.positionDroneStore.updatePositionX(
            this.positionDroneStore.position.x - distance
          );
          break;
        case Direction.Right:
          this.positionDroneStore.updatePositionX(
            this.positionDroneStore.position.x + distance
          );
          break;
        case Direction.Up:
          this.positionDroneStore.updatePositionY(
            this.positionDroneStore.position.y - distance
          );
          break;
        case Direction.Down:
          this.positionDroneStore.updatePositionY(
            this.positionDroneStore.position.y + distance
          );
          break;
        default:
          console.log("Unknown direction");
      }
    },
    climbAndAccelerate() {
      this.updateHeight(Direction.Up);
      this.updateSpeed(Direction.Up);
    },
    descendAndDecelerate() {
      this.updateHeight(Direction.Down);
      this.updateSpeed(Direction.Down);
    },
    startInterval(direction: Direction, time = 1000) {
      if (this.intervalHeight) {
        clearInterval(this.intervalHeight);
        this.intervalHeight = null;
      }
      this.intervalHeight = setInterval(() => {
        this.handleHeightChange(direction);
        this.handleSpeedChange(direction);
      }, time);
    },
    updateHeight(direction: Direction) {
      this.startInterval(direction);
    },
    updateSpeed(direction: Direction) {
      this.startInterval(direction);
    },
    handleHeightChange(direction: Direction) {
      if (
        direction === Direction.Up &&
        this.positionDroneStore.height < this.maxHeight
      ) {
        this.positionDroneStore.height += 200;
      } else if (
        direction === Direction.Down &&
        this.positionDroneStore.height > this.minHeight
      ) {
        this.positionDroneStore.height -= 200;
      } else {
        clearInterval(this.intervalHeight!);
        this.intervalHeight = null;
      }
      this.positionDroneStore.updateHeight(this.positionDroneStore.height);
      this.checkMaxHeightReached();
    },
    handleSpeedChange(direction: Direction) {
      if (
        direction === Direction.Up &&
        this.positionDroneStore.speed < this.maxSpeed
      ) {
        this.positionDroneStore.speed += 5;
      } else if (
        direction === Direction.Down &&
        this.positionDroneStore.speed > this.minSpeed
      ) {
        this.positionDroneStore.speed -= 5;
      } else {
        clearInterval(this.intervalHeight!);
        this.positionDroneStore.speed = 0;
      }
      this.positionDroneStore.updateSpeed(this.positionDroneStore.speed);
    },
    checkMaxHeightReached() {
      if (this.positionDroneStore.height === this.maxHeight) {
        this.maxHeightReached = true;
      }
    },
    resetDrone(): void {
      this.positionDroneStore.resetDrone();
      if (this.intervalHeight) {
        clearInterval(this.intervalHeight);
        this.intervalHeight = null;
      }
      if (this.intervalSpeed) {
        clearInterval(this.intervalSpeed);
        this.intervalSpeed = null;
      }
      this.positionDroneStore.height = 0;
      this.positionDroneStore.speed = 0;
    },
    isButtonDisabled(buttonType: string) {
      if (buttonType === "departure") {
        return this.isFlying;
      } else {
        return !this.isFlying;
      }
    },
  },
  computed: {
    isFlying(): boolean {
      return this.positionDroneStore.height > 0;
    },
    currentPosition(): { x: number; y: number } {
      return this.positionDroneStore.position;
    },
  },
};
</script>
<style scoped>
.map {
  width: 100%;
  height: 100vh;
  background-image: url("../../images/militaryBaseMap.webp");
  background-size: cover;
  border: 1px solid #ccc;
}
</style>
