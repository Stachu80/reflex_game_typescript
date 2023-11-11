import { Statistics } from './statistics';
import { ReflexElement } from './element';

export class ElementsContainer {
    private statistics: Statistics = new Statistics();
    private elementArray: Array<ReflexElement> = [];
    private greenIndex: number;
    private isSave: boolean = false;
    private clicked: boolean = false;

    constructor(elements: number) {
        for (var i = 0; i < elements; i++) {
            this.elementArray.push(new ReflexElement(i));
        }
        addEventListener('clickElement', this.clickOnTiles);
        addEventListener('hideGreen', this.hideGreen);
        addEventListener('showGreen', this.showGreen);
    }

    set isLocked(locked: boolean) {
        this.elementArray.forEach(element => (element.isLocked = locked));
    }

    public destroy = () => {
        removeEventListener('clickElement', this.clickOnTiles);
        removeEventListener('hideGreen', this.hideGreen);
        removeEventListener('showGreen', this.showGreen);
    };

    public reset = (): void => {
        this.elementArray.forEach(event => event.reset());
        this.statistics.scores = 0;
        this.statistics.lives = 3;
        this.statistics.updateLives();
        this.statistics.updateScore();
    };

    private clickOnTiles = (event: CustomEvent): void => {
        this.isSave = this.greenIndex == event.detail.index;
        this.statisticUpdate();
        this.clicked = true;

        if (this.statistics.lives !== 0) {
            this.isSave
                ? console.log(this.statistics.lives)
                : alert('Klinąłeś nie w ten kwadrat. Straciłeś życie');
        }
        this.lockElements(true);
    };

    private statisticUpdate = (): void => {
        this.isSave ? ++this.statistics.scores : --this.statistics.lives;
        this.statistics.updateLives();
        this.statistics.updateScore();
        if (this.statistics.lives === 0) {
            dispatchEvent(new CustomEvent('GameOver'));
            alert('Koniec Gry');
        }
    };

    private showGreen = (): void => {
        this.greenIndex = Math.floor(Math.random() * this.elementArray.length);
        this.lockElements(false);
        this.elementArray[this.greenIndex].changeColor = 'green';
    };

    private hideGreen = (): void => {
        if (!this.clicked) {
            this.isSave ? console.log('Brawo') : alert('Za poźno. Straciłeś życie');
            this.statisticUpdate();
        }
        this.clicked = false;
        this.isSave = false;
        this.greenIndex = null;
        this.lockElements(false);
    };

    private lockElements = (lock: boolean): void => {
        this.elementArray.forEach(element => {
            element.isLocked = lock;
            element.reset();
        });
    };
}
