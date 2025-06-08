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
    const action = 'ADD';
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point, action)),
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

  #adaptToServer = (point, action) => {
    const basePrice = point.price === 0 ? 1000 : point.price;
    const adaptedData = {
      ...point,
      'offers': point.offers,
      'destination': point.destination,
      'base_price': basePrice,
      'date_from': point.dateFrom ? dayjs(point.dateFrom).toISOString() : '',
      'date_to': point.dateTo ? dayjs(point.dateTo).toISOString() : '',
      'is_favorite': point.isFavorite,
      'id': String(point.id),
    };

    if (action){
      delete adaptedData.id;
    }

    delete adaptedData.price;
    delete adaptedData.offersPrice;
    delete adaptedData.dateFrom;
    delete adaptedData.dateTo;
    delete adaptedData.isFavorite;

    return adaptedData;
  };
}
