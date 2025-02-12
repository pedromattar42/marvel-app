import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { HeroeInterface } from '../../shared/interfaces/heroe';
import { StorageInterface } from '../../shared/interfaces/storage';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storage$ = new BehaviorSubject<StorageInterface<HeroeInterface[]>>({
    count: 0,
    limit: 0,
    offset: 0,
    total: 0,
    results: [],
  });

  public get() {
    return this.storage$.asObservable()
  }

  public getValue() {
    return this.storage$.value
  }

  public delete(id: number) {
    const dto = {
      ...this.getValue(),
      offset: 0,
      results: this.getValue().results.filter((heroe) => heroe.id !== id)
    }

    this.set(dto)
  }

  public set(value: StorageInterface<HeroeInterface[]>) {
    this.storage$.next(value)
  }
  
  public update(offset: number) {
    this.storage$.next({
      ...this.getValue(),
      offset
    })
  }

  public createHero(newHero: HeroeInterface) {
    const heroes = this.getValue().results;
  
    const newId = heroes.length > 0 ? Math.max(...heroes.map(h => h.id)) + 1 : 1;
    const heroToAdd = { ...newHero, id: newId };
  
    const dto = {
      ...this.getValue(),
      results: [...heroes, heroToAdd]
    };
  
    this.set(dto);
  }
  
  public updateHero(updatedHero: HeroeInterface) {
    const heroes = this.getValue().results;
  
    const updatedHeroes = heroes.map(hero =>
      hero.id === updatedHero.id ? { ...hero, ...updatedHero } : hero
    );
  
    const dto = {
      ...this.getValue(),
      results: updatedHeroes
    };
  
    this.set(dto);
  }
  
}
