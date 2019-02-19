'use strict';

const path = require('path');
const fs = require('fs');
const UserRepository = require('../../../db/src/repository/user');
const Onedrive = require('../service/onedrive');

const getDb = () => {
  const Db = require('../../../db/src/db');

  const dbLocationFolder = path.join(process.env.HOME, '.config/swync.js');
  if (!fs.existsSync(dbLocationFolder)) fs.mkdirSync(dbLocationFolder);
  const dbLocation = path.join(process.env.HOME, '.config/swync.js/db');

  return new Db(dbLocation);
};

const getParamNames = func => {
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  const ARGUMENT_NAMES = /([^\s,]+)/g;
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  if (!fnStr.includes('constructor(')) return [];
  const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  return result || [];
};

class Instantiator {
  constructor() {
    this.db = getDb();
    this.onedrive = new Onedrive();
    this.UserRepository = UserRepository;
    this.resolve = this.resolve.bind(this);
  }

  resolve(name) {
    const instance = this[name];
    if (instance) return instance;
    const constructorName = name[0].toUpperCase() + name.substring(1);
    const constructor = this[constructorName];
    if (!constructor) throw Error(`Could not resolve '${name}'`);
    return this.instantiate(constructor);
  };

  instantiate(constructor) {
    const args = getParamNames(constructor).map(this.resolve);
    return new constructor(...args);
  };
}

const instantiator = new Instantiator();

module.exports = instantiator;
