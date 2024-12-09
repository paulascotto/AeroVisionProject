<template>
  <div class="alert-card">
    <slot />
  </div>
</template>

<style scoped>
.alert-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 400px;
  height: 80px;
  border: 2px dashed white;
  border-radius: 8px;
  background-color: #333;
  justify-content: center;
  z-index: 1000;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeOut 7s forwards;
}

::v-deep(p) {
  font-size: 18px;
  font-weight: 100;
  color: white;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
