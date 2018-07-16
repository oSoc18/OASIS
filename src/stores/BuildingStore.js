import {observable, action, computed,decorate} from 'mobx';

class BuildingStore {
    @observable buildings = [];
    @observable building = null;
    @observable isDetailAvailable = false;

    @action addBuildings = (buildingArray) => {
        this.buildings = buildingArray;
    };

    @action setBuilding = (building) => {
        this.building = building;
    };

    @action setIsDetailAvailable = (available) => {
        this.isDetailAvailable = available;
    };
}

const store = new BuildingStore();
export default store;

