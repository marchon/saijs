![alt tag](http://saijs.com/img/banner-bg.jpg)
#SAIJS ( SailsJs | AngularJs | Ionic Framework)
*version 0.0.1*

* **Dependencies**
    * nodejs
    * mongodb
    * xcode
* **Installation**
    *  `git clone https://github.com/carlospliego/saijs.git`
    *  `cd saijs && sh install.sh`
* **Manual Installation**
    *   `$ git clone https://github.com/carlospliego/saijs.git`
    *   `chmod -R 755 saijs`
    *   `cd` to saijs and type `npm install`
    *   `cd` to saijs/server/ and type  `npm install`
    *   `cd` to saijs/app/ and type  `bower install`
    *   `cd` to saijs/ and type  `gulp build` and `ionic platform ios`
* **Development**  
    *  Start the server: `cd` to saijs/server/ and type `sails lift`
    *  Point your browser to: HOST/saijs/app/
* **Builds**
    * `gulp build`
    * Point your browser to the build: HOST/saijs/www/
* **Emulate**
    * `gulp run`
* **Deployment as a web app**
    * Just deploy the dist/ folder to your file server
    * Deploy the sails api (server/) to your node server
* **Testing**
    * `gulp test`    
