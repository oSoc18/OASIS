import {observable, action, computed} from 'mobx';

class BuildingStore {
    @observable buildings = [];
    @observable building = null;
    @observable isInDetailState = false;
    @observable searchKey = "";


    @action addBuildings = (building) => {
        this.buildings.push(building);
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

    @computed get getBuildings(){
        return this.buildings;
    };

    filterBuildings(){
        let arr = [];
        for(let i=0; i < this.buildings.length; i++){
            let title = this.buildings[i].title.toLowerCase();
            if(title.search(this.searchKey)>=0){
                arr.push(this.buildings[i]);
            }
            // do nothing
        }
        return arr;
    }    

    @computed get getFilteredBuildings(){
        if(this.searchKey === ""){
            return this.getBuildings;
        }else{
            let arr = this.filterBuildings();
            return arr;
        }
    }

    @computed get getBuilding(){
        return this.building;
    };

    @computed get getIsInDetailState(){
        return this.isInDetailState;
    };

    @computed get getSearchKey(){return this.searchKey;}
}

const store = new BuildingStore();
export default store;

