import {observable, action, computed} from 'mobx';

class BuildingStore {
    @observable buildings = [];
    @observable building = null;
    @observable isInDetailState = false;
    @observable searchKey = "";
    @observable filters = {wheelchairWidth: 0};

    @action addBuildings = (building) => {
        this.buildings = building;
    };

    @action setBuilding = (building) => {
        this.building = building;
    };

    @action setIsInDetailState = (available) => {
        this.isInDetailState = available;
    };

    @action setSearchKey = (key) => {
        this.searchKey = key;
    };

    @action setFilters = (filters) => {
        this.filters = filters;
    };

    @computed get getBuildings() {
        return this.buildings;
    };

    filterBuildings() {
        let arr = [];
        let widthOfTheDoor = 0;
        let widthOfTheChair = -1;
        for (let i = 0; i < this.buildings.length; i++) {
            let desc = this.buildings[i].props.title.toLowerCase();
            let accessInfoArr = this.buildings[i].props.accessInfo;
            if(typeof(accessInfoArr) === 'object'){
                widthOfTheDoor = parseInt(accessInfoArr[0].width,10);
            }
            widthOfTheChair = parseInt(this.filters.wheelchairWidth,10);

            if (this.searchKey !== "" && desc.search(this.searchKey) < 0) {
                continue;
            }
            
            if (widthOfTheChair > widthOfTheDoor) {
                continue;
            }

            arr.push(this.buildings[i]);
        }
        return arr;
    }

    @computed get getFilteredBuildings() {
        return this.filterBuildings();
    }

    @computed get getBuilding() {
        return this.building;
    };

    @computed get getIsInDetailState() {
        return this.isInDetailState;
    };

    @computed get getSearchKey() {
        return this.searchKey;
    }
}

const store = new BuildingStore();
export default store;

