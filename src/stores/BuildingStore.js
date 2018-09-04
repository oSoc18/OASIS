import {observable, action, computed} from 'mobx';
import * as L from "leaflet";

class BuildingStore {
    @observable buildings = [];
    @observable buildingsListByMap = [];
    @observable boundsMap = null;
    @observable building = null;
    @observable isInDetailState = false;
    @observable searchKey = "";
    @observable filters = {wheelchairWidth: 1};
    @observable state = {
        lat: 51.05389,
        lng: 3.705,
        zoom: 11
    };
    @observable zoomlatlng = [[360,650],[180,360],[90,180],[45,90],[22.5,45],[11.25,22.5],[5.625,11.25],[2.813,5.625],[1.406,2.813],[0.703,1.406],[0.352,0.703],[0.176,0.352],[0.088,0.176],[0.044,0.088],[0.022,0.044],[0.011,0.022],[0.005,0.011],[0.003,0.005],[0.001,0.003],[0.0005,0.001]];


    @action addBuildings = (buildings) => {
        this.buildings = buildings;
    };

    @action addBuilding = (building) => {
        this.buildings.push(building);
    };

    @action setBuilding = (building) => {
        this.building = building;
    };

    @action setIsInDetailState = (available) => {
        this.isInDetailState = available;
    };

    @action setSearchKey = (key) => {
        let santizedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        this.searchKey = santizedKey;
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
            let accessibilityInfoArray = this.buildings[i].props.accessInfo;
            try{
                if(typeof(accessibilityInfoArray) === 'object'){
                    widthOfTheDoor = parseInt(accessibilityInfoArray[0].width,10);
                }
            }catch(e){
                widthOfTheDoor = 90;
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

    @computed get getSearchListByMap() {
        let arr = [];
        let widthOfTheDoor = 0;
        let widthOfTheChair = -1;
        for (let i = 0; i < this.buildings.length; i++) {
            let desc = this.buildings[i].props.title.toLowerCase();
            let accessibilityInfoArray = this.buildings[i].props.accessInfo;
            try{
                if(typeof(accessibilityInfoArray) === 'object'){
                    widthOfTheDoor = parseInt(accessibilityInfoArray[0].width,10);
                }
            }catch(e){
                widthOfTheDoor = 90;
            }
            widthOfTheChair = parseInt(this.filters.wheelchairWidth,10);

            if (this.searchKey !== "" && desc.search(this.searchKey) < 0) {
                continue;
            }
            
            if (widthOfTheChair > widthOfTheDoor) {
                continue;
            }
            
            let loc = L.latLng(this.buildings[i].props.lat, this.buildings[i].props.long);
            if (this.boundsMap != null && this.boundsMap.contains(loc)) {
                arr.push(this.buildings[i]);
            }
        }
        return arr; 
    }

    // Only filtered on accessibility
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

    @computed get  isbuildingInZone() {
        return this.buildingInZone();
    }
}

const store = new BuildingStore();
export default store;

