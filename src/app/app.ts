import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tcg-vault');

  // Listado por defecto (solo se usa la primerísima vez)
  cartas = [
    { id: 'OP01-001', name: 'Monkey.D.Luffy', rarity: 'Leader', quantity: 2 },
    { id: 'OP01-013', name: 'Roronoa Zoro', rarity: 'SR', quantity: 4 },
    { id: 'OP01-016', name: 'Nami', rarity: 'R', quantity: 3 }
  ];

  // 🧠 Este bloque se ejecuta solo al cargar la app en el navegador
  constructor() {
    if (typeof window !== 'undefined') {
      const datosGuardados = localStorage.getItem('mis_cartas_tcg');
      if (datosGuardados) {
        this.cartas = JSON.parse(datosGuardados); // Recuperamos lo guardado
      }
    }
  }

  sumarCarta(carta: any) {
    carta.quantity++;
    this.guardarEnDisko(); // Guardamos el cambio
  }

  restarCarta(carta: any) {
    if (carta.quantity > 0) {
      carta.quantity--;
      this.guardarEnDisko(); // Guardamos el cambio
    }
  }

  // 💾 Función mágica para guardar la lista actual en el navegador
  guardarEnDisko() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mis_cartas_tcg', JSON.stringify(this.cartas));
    }
  }
}