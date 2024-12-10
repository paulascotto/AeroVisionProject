import { setActivePinia, createPinia } from 'pinia';
import { usePositionDroneStore } from "../usePositionDroneStore";

describe('Drone store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it("resetDrone", () => {
    const droneStore = usePositionDroneStore();
    expect(droneStore.position).toEqual({ x: 792, y: 430 });
    droneStore.updateHeight(100);
    droneStore.updateSpeed(50);
    droneStore.updatePositionX(1000);
    droneStore.updatePositionY(800);
    droneStore.resetDrone();
    expect(droneStore.position).toEqual({ x: 792, y: 430 });
    expect(droneStore.height).toBe(0);
    expect(droneStore.speed).toBe(0);
  });

  it("updates the height correctly", () => {
    const droneStore = usePositionDroneStore();
    expect(droneStore.height).toBe(0);
    droneStore.updateHeight(100);
    expect(droneStore.height).toBe(100);
  });


});