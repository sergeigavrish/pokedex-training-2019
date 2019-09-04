import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl = 'http://localhost:3000/pokemons';

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(page: number, offset: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      map(pokemons => 
        pokemons.slice(page * offset, page * offset + offset)
      )
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      map(pokemons => 
        pokemons.find(pokemon => pokemon.id === id)
      )
    );
  }

  getPokemonsAmount(): Observable<number> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      map(pokemons => pokemons.length)
    );
  }
}
