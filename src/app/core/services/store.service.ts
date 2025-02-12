import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/pagination';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storage$ = new BehaviorSubject<ApiResponse<any[]>>({
    count: 0,
    limit: 0,
    offset: 0,
    total: 0,
    results: [],
    deletedIds: []
  });

  public get() {
    return this.storage$.asObservable()
  }

  public getValue() {
    return this.storage$.value
  }

  public delete(id: number) {
    console.log(this.getValue())
    const dto = {
      ...this.getValue(),
      offset: 0,
      deletedIds: [...this.getValue().deletedIds, id],
      results: this.getValue().results.filter((heroe) => heroe.id !== id)
    }
    console.log(dto)

    this.set(dto)
  }

  public set(value: ApiResponse<any[]>) {
    console.log(value)
    const result = this.mergeUnique(this.getValue().results, value.results)
    const dto = {
      ...value,
      results: result.filter((heroe) => value.deletedIds ? !value.deletedIds.includes(heroe.id) : true),
      deletedIds: value.deletedIds ? value.deletedIds : []
    }
    console.log(dto)
    this.storage$.next(dto)
  }
  
  public update(offset: number) {
    this.storage$.next({
      ...this.getValue(),
      offset
    })
  }

  mergeUnique<T extends { id: number }>(list1: T[], list2: T[]): T[] {
    const merged = [...list1, ...list2];
    return Array.from(new Map(merged.map(item => [item.id, item])).values());
  }
}
