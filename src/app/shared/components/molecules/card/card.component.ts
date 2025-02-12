import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  public heroe: any = input.required()
  public deleteChange = output<number>()

  delete(id: number) {
    this.deleteChange.emit(id)
  }
}
