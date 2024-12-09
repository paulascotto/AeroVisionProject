<template>
  <div class="button-card">
    <div class="button-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.button-card {
  display: inline-block;
  width: 180px;
  height: 260px;
  border: 2px dashed white;
  border-radius: 8px;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0%;
  margin-top: 20px;
  margin-right: 20px;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>
