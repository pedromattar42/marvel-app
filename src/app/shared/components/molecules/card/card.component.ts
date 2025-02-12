import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HeroeInterface } from '../../../interfaces/heroe';

@Component({
  selector: 'app-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  public heroe = input.required<HeroeInterface>()
  public deleteChange = output<number>()
  public updateChange = output<HeroeInterface>()

  delete(id: number) {
    this.deleteChange.emit(id)
  }

  update(heroe: HeroeInterface) {
    this.updateChange.emit(heroe)
  }
}
