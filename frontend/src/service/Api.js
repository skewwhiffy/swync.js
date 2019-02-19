import Config from '../config/Config';
import Logger from '../logging/Logger';
import urlJoin from 'url-join';
import axios from 'axios';

export default class Api {
  logger = new Logger();
  baseUrl = Config.baseUrl || "/";

  constructor() {
    this.handleNotOk = this.handleNotOk.bind(this);
  }

  getRequestUrl(relative) {
    return urlJoin(this.baseUrl, relative);
  }

  handleNotOk(response) {
    if (response.ok) return response;
    this.logger.error(response.statusText);
    throw Error(response.statusText);
  }

  async getCurrentUser() {
    const response = await fetch(this.getRequestUrl('/api/user/me'));
    this.handleNotOk(response);
    return response.json();
  }

  getItems(pwd) {
    const url = ['api', 'items', ...pwd].join('/');
    return fetch(this.getRequestUrl(url))
      .then(this.handleNotOk)
      .then(it => it.json());
  }

  searchMusic() {
    return fetch(this.getRequestUrl("/api/music"))
      .then(this.handleNotOk)
      .then(it => it.json());
  }

  async setAuthCode(code) {
    const response = await axios.post(
      '/api/onedrive/authcode',
      { authCode: code }
    );
    return this.handleNotOk(response);
  }
}
