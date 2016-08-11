export var session = {
    getSession: function (key) {
        // 获取sessionStorage里面的值
        var storage = window.sessionStorage;
        if (storage.getItem(key)) {
            return storage.getItem(key);
        } else {
            return null;
        }
    },

    setSession: function (key, value) {
        var storage = window.sessionStorage;
        storage.removeItem(key);
        try {
            storage.setItem(key, value);
            return ''
        } catch (e) {
            return 'error';
        }
    },

    clearSession: function (key) {
        var storage = window.sessionStorage;
        storage.removeItem(key);
    }
}