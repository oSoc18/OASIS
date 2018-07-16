import {observable, action, computed} from 'mobx';

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

    @computed get getBuildings(){
        return this.buildings;
    };

    @computed get getBuilding(){
        return this.building;
    };

    @computed get getIsDetailAvailable(){
        return this.isDetailAvailable;
    };
}

const store = new BuildingStore();
export default store;

