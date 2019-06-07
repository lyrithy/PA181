#Build a hotel booking application with Bluemix Business Rules service and Node.js

This application is designed for a hotel chain allowing their client to search for a room in a city. It is built in Node.js runtime based on Bluemix Business Rules service. 

## Projects

* BlueBookingServer: the web application built in Nodejs. The [app.js](https://hub.jazz.net/project/rulesservicesample/BlueBookingV1/overview#https://hub.jazz.net/git/rulesservicesample%252FBlueBookingV1/contents/master/BlueBookingServer/app.js) initialize an http server and routes the requests. The [service.js](https://hub.jazz.net/project/rulesservicesample/BlueBookingV1/overview#https://hub.jazz.net/git/rulesservicesample%252FBlueBookingV1/contents/master/BlueBookingServer/service.js) contains the utility functions, especially the function which invokes Bluemix Business Rules service.
* BlueBookingRules: the rule project
* BlueBookingXom: the java project of execution object models, imported as XOM for the rule project
* BlueBookingRuleapp: the ruleapp project to be deployed to Bluemix Business Rules service
* BlueBookingBinaries: the binary artifacts ready to be deployed
	* BlueBookingRuleApp.jar: the business rules 
	* BlueBookingXom.zip: the runtime XOM, a zipped jar file containing the compiled classes of BlueBookingXom Java project.

## Tutorial
A tutorial explaining how to build this appl is available either [online](http://www.ibm.com/developerworks/cloud/library/cl-hotel-rules-app/index.html) or as a [PDF file](cl-hotel-rules-app.pdf).

## Demo
The application is running live at [http://businessrules-bluebooking.mybluemix.net/](http://businessrules-bluebooking.mybluemix.net/).

## License 
The source code of this app is available under the MIT license, which is in license.txt in the root of the repository. The application uses the following libraries and frameworks:

* Node.js
* Express
* async module
* Datepicker for bootstrap (http://www.eyecon.ro/bootstrap-datepicker/)
* ESJ template engine
* MongoDB
* Bootstrap 3
