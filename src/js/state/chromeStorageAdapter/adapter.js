export default (storage) => ({
    0: storage,

    put(key, value, callback) {
        try {
            storage.sync.set({ [key]: value }, callback);
        } catch (e) {
            callback(e);
        }
    },

    get(key, callback) {
        storage.sync.get([key], (value) => {
            callback(value[key]);
        });
    },

    del(key, callback) {
        storage.removeItem(key, callback);
    },
});
