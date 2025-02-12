import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  HostListener,
  ViewChild,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [ButtonDirective, NgClass, TooltipModule],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public label = input('');
  public icon = input('fa fa-cloud-arrow-up');
  public iconVisible = input(true);
  public imageSrc = input<any | string>('');
  protected onChangeInput = output<string>();
  protected changeDelete = output();

  protected srcPreview = computed<string>(() => {
    const dto: any = this.imageSrc() as any;

    if (dto?.url) {
      return dto?.url;
    }
    return this.imageSrc() as string;
  });

  protected isActive = signal(false);

  protected changeInput(event: Event) {
	const input = event.target as HTMLInputElement;
	if (input.files && input.files.length > 0) {
	  const file = input.files[0];
	  const reader = new FileReader();
  
	  reader.onload = () => {
		this.onChangeInput.emit(reader.result as string); // Emite o valor
	  };
  
	  reader.readAsDataURL(file); // Converte para Base64
	}
  }
  

  protected emptyValue() {
    if (this.fileInput.nativeElement.value) {
      this.fileInput.nativeElement.value = '';
    }
  }

  protected clickDelete() {
    this.changeDelete.emit();
  }

  @HostListener('dragover', ['$event']) public onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive.set(true);
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive.set(false);
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive.set(false);

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const fileInput = event.target as HTMLDivElement;

      const input = fileInput.nextElementSibling as HTMLInputElement;
      input.files = event.dataTransfer.files;

      const changeEvent = new Event('change');
      input.dispatchEvent(changeEvent);
    }
  }
}
