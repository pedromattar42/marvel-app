import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { StoreService } from '../../../../core/services/store.service';
import { HeroeInterface } from '../../../interfaces/heroe';
import { InputFileComponent } from '../../atoms/input-file/input-file.component';

@Component({
  selector: 'app-register',
  imports: [ButtonModule, InputTextModule, TextareaModule, ReactiveFormsModule, InputFileComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  public heroe = input.required<HeroeInterface>();
  public model: FormGroup = new FormGroup({});
  private _builder = inject(FormBuilder);
  private _dialogRef = inject(DynamicDialogRef);
  private _storageService = inject(StoreService);
  public imageSrc: any

  ngOnInit(): void {
    this.model = this.getModel();
    if (this.heroe()) {
      this.loadForm();
    }
  }

  private loadForm() {
    this.imageSrc = this.heroe().image
    this.model.patchValue(this.heroe());
  }

  private getModel() {
    return this._builder.group({
      id: [],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: [''],
    });
  }

  public close() {
    this._dialogRef.close();
  }

  showImageCropperDialog(event: string) {
    this.imageSrc = event
    this.model.get('image')?.patchValue(event)
  }

  resetImage() {
    this.imageSrc = ''
    this.model.get('image')?.patchValue('')
  }

  public confirm() {
    const dto = this.model.getRawValue();
    if (this.heroe()) {
      this._storageService.updateHero(dto);
    } else {
      this._storageService.createHero(dto);
    }

    this._dialogRef.close(true);
  }
}
