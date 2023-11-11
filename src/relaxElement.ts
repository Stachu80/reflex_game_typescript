import { Element } from './element';

export class ReflexElement {
    private element: Element = document.createElement('reflex-element');
    private box: HTMLElement = document.querySelector('.elements');
    private locked: boolean | undefined;

    set isLocked(locked: boolean) {
        this.locked = locked;
    }
    set changeColor(color: string) {
        this.element.style.backgroundColor = color;
    }

    constructor(index: number) {
        this.init(index)
    }

    public init(index: number): void {
        this.element.addEventListener('click', this.check);
        this.element.isSelected = false;
        this.element.index = index;
        this.box.appendChild(this.element);
    }

    public reset = (): void => {
        this.element.style.backgroundColor = 'white';
        this.element.isSelected = false;
    };

    private check = (): void => {
        if (!this.locked) {
            this.element.style.backgroundColor = this.element.isSelected ? 'red' : 'white';
            this.element.isSelected = !this.element.isSelected;
            this.onClick(this.element);
        }
    };

    private onClick(element: Element): void {
        dispatchEvent(new CustomEvent('clickElement', { detail: { index: element.index } }));
    }
}
