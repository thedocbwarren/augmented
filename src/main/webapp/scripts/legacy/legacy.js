/**
 * Legacy.js - The Legacy Component and package
 * Collection of deprecated code to be removed later
 *
 * @author Bob Warren
 *
 * @requires augmented.js
 * @module
 */
(function(moduleFactory) {
    if (typeof exports === 'object') {
	       module.exports = moduleFactory(require('augmented'));
    } else if (typeof define === 'function' && define.amd) {
	       define([ 'augmented' ], moduleFactory);
    } else {
	       window.Augmented.Legacy = moduleFactory(window.Augmented);
    }
}(function(Augmented) {
    Augmented.Legacy = {};

    Augmented.Legacy.VERSION = '0.1.0';

    /**
     * Application Context
     * @deprecated Use Augmented.Application and Augmented.Security instead
     */

    /** Application Context Schema */
    var applicationContextSchema = {
	    "id" : "applicationContext",
	    "type" : "object",
	    "properties" : {
		"metadata" : {
		    "type" : "object",
		    "required" : true,
		    "properties" : {
			"title" : {
			    "type" : "string",
			    "required" : true
			},
			"context" : {
			    "type" : "string"
			}
		    }
		},
		"security" : {
		    "type" : "object",
		    "required" : true,
		    "properties" : {
			"user" : {
			    "type" : "string",
			    "required" : false
			},
			"loginName" : {
			    "type" : "string",
			    "required" : false
			},
			"userName" : {
			    "type" : "string",
			    "required" : false
			},
			"userId" : {
			    "type" : "number",
			    "required" : true
			},
			"email" : {
			    "type" : "string",
			    "required" : false
			},
			"role" : {
			    "type" : "array",
			    "required" : true,
			    "items" : {
				"type" : "string"
			    }
			},
			"privilege" : {
			    "type" : "array",
			    "required" : true,
			    "items" : {
				"type" : "string"
			    }
			},
			"oauth" : {
			    "type" : "object",
			    "properties" : {
				"authorization" : {
				    "type" : "string"
				},
				"access" : {
				    "type" : "string"
				}
			    }
			}
		    }
		}
	    }
    };

    /**
     * Application Context
     *
     * Collection of data for use to define the application
     */
    var applicationContextModel = Augmented.Model.extend({
	schema: applicationContextSchema,
	defaults: {
	    "metadata" : {
		"title" : "",
		"context" : ""
	    },
	    "principal": "",
	    "security" : {  // Replace this
		"loginName" : "",
		"userName" : "",
		"userId" : 0,
		"email" : "",
		"role" :[],
		"privilege" : [],
		"oauth" : {
		    "authorization" : "",
		    "access" : ""
		}
	    }
	},
	save: function() {
	    throw new Error("Not Supported!");
	},
	remove: function() {
	    throw new Error("Not Supported!");
	}
    });

    var applicationContext = function() {
	if(!this.model) {
	    this.model = new applicationContextModel();
	}
	this.hasPrivilege = function(privilegeName) {
	    var ret = false;

	    if (this.model
		    && this.model.attributes.security.privilege != undefined) {
		var priv = this.model.attributes.security.privilege;

		ret = (priv.indexOf(privilegeName) != -1);
	    }
	    return ret;
	}
	this.hasRole = function(roleName){
    var ret = false;
	    if (this.model
		    && this.model.attributes.security.role != undefined) {
		var role = this.model.attributes.security.role;

		ret = (role.indexOf(roleName) != -1);
	    }
	    return ret;

	}

	this.getAllPrivileges = function() {
	    if (this.model
		    && this.model.attributes.security.privilege != undefined) {
		var priv = this.model.attributes.security.privilege;
		return priv;
	    }
	}

	this.getAllRoles = function(){
	    if (this.model
		    && this.model.attributes.security.role != undefined) {
		var priv = this.model.attributes.security.role;
		return priv;
	    }
	}

	this.hasMetadata = function(metadataName) {
	    var ret = false;

	    if (this.model && this.model.attributes.metadata != undefined
		    && (metadataName in this.model.attributes.metadata)) {
		ret = true;
	    }
	    return ret;
	}

	this.getAllMetadata = function() {

	    if (this.model && this.model.attributes.metadata != undefined) {
		return this.model.attributes.metadata;
	    }

	}

	this.getMetadata = function(metadataName){

	    if (this.model && this.model.attributes.metadata != undefined
		    && (metadataName in this.model.attributes.metadata)) {
		if (this.model.attributes.metadata.hasOwnProperty(metadataName)) {
		    return this.model.attributes.metadata[metadataName];
		}
	    }
	}

	this.setMetadata = function(metadata)
	{
	    if (this.model && this.model.attributes.metadata != undefined){

		this.model.attributes.metadata[metadata[0]] = metadata[1];

	    }
	    return this.model.attributes.metadata;
	}


	this.authorize = function() {

	}
	this.access = function() {

	}
	this.fetch = function() {
	    if (this.model) {
		this.model.fetch();
	    }
	}
	this.save = function() {
	    if (this.model) {
		this.model.save();
	    }
	}
	this.isValid = function() {
	    if (this.model) {
		return this.model.isValid();
	    }
	    return false;
	}
	this.populate = function(data) {
	    if (this.model && data) {
		this.model = new applicationContextModel(data);
	    }
	}
	this.setURI = function(uri) {
	    if (this.model && uri) {
		this.model.url = uri;
		this.model.attributes.url = uri;
	    }
	}

	this.clear = function()
	{
	    this.model = new applicationContextModel();
	}

    };

    /** Application Context - The Security Object for the framework */

    Augmented.ApplicationContext;

    var applicationContextFactory = {
	    getApplicationContext : function() {
		if(!Augmented.ApplicationContext) {
		    Augmented.ApplicationContext = new applicationContext();
		}
		return Augmented.ApplicationContext;
	    }
    };

    Augmented.ApplicationContextFactory = applicationContextFactory;


}));
