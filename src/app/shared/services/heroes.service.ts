import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL, HASH, PUBLIC_API_KEY } from '../../core/constant/api-info';
import { Observable } from 'rxjs';
import { StoreService } from '../../core/services/store.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private _httpClient = inject(HttpClient)
  private _storageService = inject(StoreService)
  private baseUri = `${API_URL}/v1/public/characters?ts=1&apikey=${PUBLIC_API_KEY}&hash=${HASH}`


  public getList(offset: number = 0): Observable<any> {
    const uri = `${this.baseUri}&offset=${offset}&limit=100`;
    return this._httpClient.get<any>(uri);
  }

}
