import { ElementsContainer } from './elementContainer';
import { Timer } from './timer';

export class Game {
    private startBtn: HTMLElement = document.querySelector('.start');
    private resetBtn: HTMLElement = document.querySelector('.reset');
    private elementsContainer: ElementsContainer;
    private time: Timer;

    constructor(elements: number) {
        this.startBtn.addEventListener('click', this.startGame);
        this.resetBtn.addEventListener('click', this.reset);
        this.time = new Timer();
        this.elementsContainer = new ElementsContainer(elements);
        this.elementsContainer.isLocked = true;
        this.elementsContainer.reset();
        addEventListener('GameOver', this.gameOver);
    }

    public destroy = (): void => {
        removeEventListener('GameOver', this.gameOver);
        this.elementsContainer.destroy();
        this.startBtn.removeEventListener('click', this.startGame);
        this.resetBtn.removeEventListener('click', this.reset);
    };

    private startGame = (): void => {
        this.elementsContainer.isLocked = false;
        this.time.start();
    };

    private reset = (): void => {
        this.elementsContainer.isLocked = true;
        this.elementsContainer.reset();
        this.time.reset();
    };

    private gameOver = (): void => {
        this.elementsContainer.isLocked = true;
        this.time.reset();
    };
}
