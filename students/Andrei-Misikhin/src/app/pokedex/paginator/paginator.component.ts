import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

import { PokemonService } from '../pokemon.service';
import { switchMap, map, tap  } from 'rxjs/operators';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  pokemonsAmount$: Observable<number>;
  currentPage$: Observable<number>;
  @Input() offset: number;
  firstPage: { page: number } = { page: 0 };
  lastPage: { page: number };
  middlePages: { page: number}[] = [];

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentPage$ = this.getCurrentPage();
    this.pokemonsAmount$ = this.pokemonService.getPokemonsAmount();
    this.calculatePages();
  }

  getCurrentPage(): Observable<number> {
    return this.route.queryParamMap.pipe(
      map(params => +params.get('page') || 1)
    );
  }

  calculatePages(): void {
    combineLatest(this.currentPage$, this.pokemonsAmount$)
      .subscribe(([currentPage, pokemonsAmount]) => {
        
        this.lastPage = { page: Math.floor(pokemonsAmount / this.offset) - 1 };

        if (currentPage < 3) {
          this.middlePages = [];
          for (let page = 1; page < 6; page++) {
            this.middlePages.push({ page })
          }
        }

        if (currentPage >= 3 && currentPage <= this.lastPage.page - 3) {
          this.middlePages = [];
          for (let page = -2; page < 3; page++) {
            this.middlePages.push({ page: currentPage + page })
          }
        }

        if (currentPage > this.lastPage.page - 3) {
          this.middlePages = [];
          for (let page = -4; page < 1; page++) {
            this.middlePages.push({ page: this.lastPage.page + page })
          }
        }
      });
  }  

}