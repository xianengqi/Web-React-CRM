import store from './store';


export function getStoreId() {
    return store.getState().idStore.id;
}

export function getPersonStore() {
    return store.getState().personStore.data;
}

export function getDayDataStore() {
    return store.getState().dayDataStore.data;
}

export function getActivityStore() {
    return store.getState().activityStore.data;
}

export function getActivityStoreCode(codeTo) {
    const data = JSON.parse(getActivityStore());
    return JSON.stringify(data.filter(obj => { return obj.code === codeTo }));
}