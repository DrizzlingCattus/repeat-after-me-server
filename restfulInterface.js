
const makeRestful = (server) => {

    return {
        get: (path) => {
            return new Promise(function(resolve, reject) {
                server.get(path, function(req, res) {
                    resolve({
                        req: req,
                        res: res
                    });
                });
            });
        },

        put: (path) => {
            return new Promise(function(resolve, reject) {
                server.put(path, function(req, res) {
                    resolve({
                        req: req,
                        res: res
                    });
                });
            });
        }
    }; //return
};

module.exports = {
    makeRestful
};
