
const makeRestful = (server) => {

    return {
        get: (path) => {
            return {
                then: (cb) => {
                    server.get(path, cb);
                }
            };
        },

        put: (path) => {
            return {
                then: (cb) => {
                    server.put(path, cb);
                }
            };
        },

        post: (path) => {
            return {
                then: (cb) => {
                    server.post(path, cb);
                }
            };
        },

        delete: (path) => {
            return {
                then: (cb) => {
                    server.delete(path, cb);
                }
            };
        }
    }; //return
};

module.exports = {
    makeRestful
};
