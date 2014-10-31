'use strict';

app.service('User', function User(Base) {

    function UserService() {
        this.ctrl = "user/";
    }

    UserService.prototype = new Base();
    return new UserService();
});