<template>
  <button :disabled="disabled" class="icon-button" @click="handleClick">
    <font-awesome-icon v-if="buttonIcon" :icon="buttonIcon" />
  </button>
</template>
<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      arrowLeftIcon: faSquareCaretLeft,
    };
  },
  props: {
    label: {
      default: "",
      type: String,
    },
    buttonIcon: {
      required: true,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    handleClick() {
      this.$emit("clicked");
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.icon-button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 30px;
}

.icon-button:hover {
  background-color: #0056b3;
}

.icon-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
