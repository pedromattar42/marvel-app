import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeroesService } from '../../shared/services/heroes.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { CardComponent } from '../../shared/components/molecules/card/card.component';
import { StoreService } from '../../core/services/store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, finalize, map } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterComponent } from '../../shared/components/organisms/register/register.component';
import { HeroeInterface } from '../../shared/interfaces/heroe';
import { LoadingComponent } from '../../shared/components/atoms/loading/loading.component';

@Component({
  selector: 'app-list',
  imports: [
    PaginatorModule,
    CardModule,
    CardComponent,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    LoadingComponent,
  ],
  providers: [DialogService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private _heroesService = inject(HeroesService);
  private _storageService = inject(StoreService);
  private _dialogService = inject(DialogService);
  public loading = signal<boolean>(false);
  protected heroesList = toSignal(
    this._storageService.get().pipe(map((res) => res.results))
  );
  protected heroesListPaginator = computed(() => {
    console.log(this.selectedHero());
    const list = this.selectedHero()
      ? this.heroesList()?.filter(
          (heroe) => heroe.id === this.selectedHero()?.id
        )
      : this.heroesList();

    console.log(list, this.pageState);

    return list?.slice(
      this.pageState()?.first ?? 0,
      (this.pageState()?.first ?? 0) + (this.pageState()?.rows ?? 10)
    );
  });
  protected totalPaginator = computed(() => {
    const filter = this.selectedHero();
    return filter
      ? this.heroesListPaginator()?.length
      : this.heroesList()?.length;
  });
  private selectedHero = signal<HeroeInterface | null>(null);
  public filteredHeroes: HeroeInterface[] = [];
  private pageState = signal<PaginatorState | null>(null);

  ngOnInit(): void {
    this.loadHeroes(0);
  }

  searchHeroes(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredHeroes =
      this.heroesList()?.filter((hero: any) =>
        hero.name.toLowerCase().includes(query)
      ) ?? [];
  }

  onClear() {
    this.selectedHero.set(null);
  }

  onHeroSelected(event: AutoCompleteSelectEvent) {
    if (event.value) {
      this.pageState.update((value) => {
        return {
          ...value,
          first: 0,
          rows: 10,
        };
      });
    }
    this.selectedHero.set(event.value);
  }

  openDialog(heroe?: HeroeInterface) {
    const header = heroe ? 'Editar' : 'Novo';
    this._dialogService.open(RegisterComponent, {
      header,
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      inputValues: {
        heroe,
      },
    });
  }

  loadHeroes(offset: number) {
    this.loading.set(true);
    this._heroesService
      .getList(offset)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((response) => {
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
    this._storageService.delete(id);
  }

  paginate(event: PaginatorState) {
    this.pageState.set(event);
    if (event && event.first) {
      this._storageService.update(event.first);
    }
  }
}
