import ApiService from './framework/api-service.js';
import dayjs from 'dayjs';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point){
    console.log(point);
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer = (point) => {
    const adaptedData = {
      ...point,
      'base_price': point.price,
      'date_from': point.dateFrom ? dayjs(point.dateFrom).toISOString() : '',
      'date_to': point.dateTo ? dayjs(point.dateTo).toISOString() : '',
      'is_favorite': point.isFavorite,
      'id': String(point.id),
    };
    console.log(adaptedData);

    delete adaptedData.price;
    delete adaptedData.dateFrom;
    delete adaptedData.dateTo;
    delete adaptedData.isFavorite;

    return adaptedData;
  };
}
