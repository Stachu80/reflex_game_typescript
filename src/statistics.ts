export class Statistics {
    private live: number = 0;
    private score: number = 0;
    private scorePanel: HTMLElement = document.querySelector('.score p');
    private livesPanel: HTMLElement = document.querySelector('.lives p');

    public updateScore = (): void => { this.scorePanel.textContent = 'Punkty : ' + this.score };
    public updateLives = (): void => { this.livesPanel.textContent = 'Życie : ' + this.lives };

    get lives(): number { return this.live };
    get scores(): number { return this.score };
    set lives(lives: number) { this.live = lives };
    set scores(score: number) { this.score = score }
}