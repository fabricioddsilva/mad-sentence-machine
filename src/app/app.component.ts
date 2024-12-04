import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Story } from './models/story.model';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { RandomStory } from './models/randomStory.model';
import { HtmlDecodeService } from './services/html-decode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'joguinho';

  start_sentence = "";
  end_sentence = "";
  player_sentence = '.............';
  isDisabled = false;
  rateMenu = false;
  storyMenu = false;
  buttonContent: string[] = ['&#128552;', '&#128530;', '&#128128;', '&#128514;', '&#129327;'];
  story: Story = {text: ''};
  randomStory!: RandomStory;
  testStory!: RandomStory;

   white_deck = [
    'My mother picked me up in pajamas at the club',
    'Neighbors stole my land',
    'My dog ate my engagement ring',
    'My cousin wants to be my clone',
    'I accessed his/her social network',
    'Dark parents white daughter',
    'Grandfather died, company inheritance to 2 children',
    'My uncle killed my father',
    'My mother-in-law came to live with me',
    ];

  purple_deck = [
    "I threw a surprise party for my father",
    "and we ended up at the police station",
    "and took a yoga/gym/crossfit class",
    "And they sang in the bathroom",
    "And I went hunting the",
    "and we ended up in the hospital",
    "and ended up somewhere else",
    "And I opened the book of",
    "And discovered a terrible betrayal",
  ];


  constructor(
    private service: DataService,
    private decodeService: HtmlDecodeService){}

  shuffleDeckSentences(){
    this.start_sentence = this.white_deck[this.rollRandomNumber() - 1];
    this.end_sentence = this.purple_deck[this.rollRandomNumber() - 1];
    this.player_sentence = '.............';
    this.storyMenu = true;
  }

  getRandomStory(){
    this.rateMenu = true;
    this.service.getStory()
      .subscribe((res)=> {
        this.randomStory = res;
      })

  }

  setPlayerSentence(event: Event){
    const target = event.target as HTMLInputElement;
    this.player_sentence = target.value;
  }

  clearInput(input: HTMLInputElement){
    input.value = '';
  }

  rollRandomNumber(){
    return Math.floor(Math.random() * 9) + 1;
  }

  disableButton(){
    this.isDisabled = true;
  }

  enableButton(){
    this.isDisabled = false;
  }

  enableRateMenu(){
    this.rateMenu = true;
  }

  submitStory(text: HTMLParagraphElement){
    this.story.text = text.innerHTML
    this.service.insertStory(this.story)

  }

  disableMenus(){
    this.storyMenu = false;
    this.rateMenu = false;
  }

  insertRate(rate: string, id: string){
    // this.service.updateRate(rate, id)
    console.log(this.randomStory.rateCount['&#129327;'])
  }

}
