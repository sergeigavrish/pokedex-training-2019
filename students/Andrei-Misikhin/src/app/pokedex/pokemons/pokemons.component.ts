import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  pokemons$: Observable<Pokemon[]>;
  page: number;
  offset: number = 25;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pokemons$ = this.getPokemons();
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.route.queryParamMap.pipe(
      switchMap(params => {
        this.page = params.get('page') ? +params.get('page') - 1 : 0;
        this.offset = +params.get('offset') || this.offset;
        return this.pokemonService.getPokemons(this.page, this.offset);
      })
    )
  }

}
