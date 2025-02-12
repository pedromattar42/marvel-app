import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HeroesService } from '../../shared/services/heroes.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { CardComponent } from '../../shared/components/molecules/card/card.component';
import { StoreService } from '../../core/services/store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [PaginatorModule, CardModule, CardComponent, ButtonModule, AutoCompleteModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private _heroesService = inject(HeroesService);
  private _storageService = inject(StoreService);
  protected heroesList = toSignal(this._storageService.get().pipe(map((res) => res.results)));
  protected heroesListPaginator = computed(() => {
    return this.heroesList()?.slice(
      this.pageState()?.first ?? 0,
      (this.pageState()?.first ?? 0) + (this.pageState()?.rows ?? 10)
    );
  });
  heroes = signal<any[]>([]);
  pageState = signal<PaginatorState | null>(null);

  ngOnInit(): void {
    this.loadHeroes(0);
  }

  paginateList<T>(list: T[], offset: number, limit: number): T[] {
    return list.slice(offset, offset + limit);
  }

  selectedHero: any;
filteredHeroes: any[] = [];

searchHeroes(event: any) {
  const query = event.query.toLowerCase();

}

  loadHeroes(offset: number) {
    this._heroesService.getList(offset).subscribe((response) => {
      this._storageService.set({
        ...response.data,
        results: response.data.results.map((hero: any) => ({
          id: hero.id,
          name: hero.name,
          image: hero.thumbnail
            ? `${hero.thumbnail.path}.${hero.thumbnail.extension}`
            : 'assets/image-not-found.png',
          description: hero.description,
        })),
      });
    });
  }

  delete(id: number) {
    console.log(id);
    this._storageService.delete(id);
  }

  paginate(event: PaginatorState) {
    this.pageState.set(event);
    console.log('ecvent', event);
    if (event && event.first) {
      this._storageService.update(event.first);
    }
  }
}
