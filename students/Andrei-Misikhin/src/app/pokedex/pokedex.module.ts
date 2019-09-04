import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';


@NgModule({
  declarations: [PokemonComponent, PokemonsComponent, PaginatorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: []
})
export class PokedexModule { }
