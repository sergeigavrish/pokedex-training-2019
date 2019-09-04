import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon = null;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonById(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

}
