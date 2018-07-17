import {observable, action, computed} from 'mobx';

class BuildingStore {
    @observable buildings = [];
    @observable building = null;
    @observable isInDetailState = false;

    @action addBuildings = (buildingArray) => {
        this.buildings = buildingArray;
    };

    @action setBuilding = (building) => {
        this.building = building;
    };

    @action setIsInDetailState = (available) => {
        this.isInDetailState = available;
    };

    @computed get getBuildings(){
        return this.buildings;
    };

    @computed get getBuilding(){
        return this.building;
    };

    @computed get getIsInDetailState(){
        return this.isInDetailState;
    };
}

const store = new BuildingStore();
export default store;

