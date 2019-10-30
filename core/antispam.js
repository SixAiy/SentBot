"use strict"

let 
	difflib = require("difflib");

function cache() {
	let self = this;
	self.cache = {}
	
}

cache.prototype.set = function(key, value) {
	let self = this;
	if(self.cache.hasOwnProperty(key)) {
		delete self.cache[key];
	}
	self.cache[key] = value;
}

cache.prototype.get = function(key) {
	let self = this;
	if(self.cache.hasOwnProperty(key)) {
		return self.cache[key];
	} else {
		return null;
	}
}

cache.prototype.clear = function() {
	let self = this;
	self.cache = {};
}

cache.prototype.dump = function() {
  let self = this;
  return self.cache;
}


	

function AntiSpam(limits) {
	let self = this;
	self._rooms = {};
	self.cache = new cache();
	limits = limits || {};
	this._limits = {
		messages: limits.messages || 100
	};
};

AntiSpam.prototype.push = function(room, name, body) {
	if(!this._rooms.hasOwnProperty(room + ":" + name)) {
		this._rooms[room + ":" + name] = [];
	}
	var ml = this._rooms[room + ":" + name];
	ml.unshift({
		user: name,
		body: body
	});
	if(ml.length > this._limits.messages) {
		ml.splice(this._limits.messages);
	}
};


AntiSpam.prototype.latest = function(room, user, lim) {
	if(this._rooms.hasOwnProperty(room + ":" + user)) {
		var ml = this._rooms[room + ":" + user];
		if(lim !== undefined) {
			return ml.slice(0, lim);
		}
		else {
			return ml.slice();
		}
	}
	else {
		return [];
	}
};


AntiSpam.prototype.clearPerson = function(room, name) {
	if(this._rooms.hasOwnProperty(room + ":" + name)) {
		delete this._rooms[room + ":" + name];
	}
};


AntiSpam.prototype.check = function(room, name, msg) {
	let self = this;
	if( self.latest(room, name).length < 3) {
		return false;
	}
	let l = [];
	for(let hi of self.latest(room, name).reverse()) {
    //console.log(hi);
		if(l.length === 3) { break };
		if(hi.user == name) {
			let lbody = hi.body.split();
			l.push(hi);
		}
	}
	if(l.length < 3) { return false };
	let rating = 0;
	for(let hi of l) {
		rating = rating + new difflib.SequenceMatcher(null, msg, hi.body).ratio()
	}
	let rt = 0;
	let ut = 0;
	if(rating > 1.75) {
		let t = self.cache.get("mod_spamCheck_last") || {};
		if(t.hasOwnProperty(room)) { rt = t[room];};
		if(t.hasOwnProperty(name)) { ut = t[name];};
		t[room] = new Date() / 1000;
		t[name] = new Date() / 1000;
		self.cache.set("mod_spamCheck_last", t);
		l = self.cache.get("mod_spamCheck_count") || [];
		l.push(room);
		l.push(name);
		self.cache.set("mod_spamCheck_count", l);
	}
	return [rating, rt, ut];
}

exports.AntiSpam = AntiSpam;

