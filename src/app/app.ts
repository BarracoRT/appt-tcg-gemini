import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Carta {
  id: string;
  name: string;
  rarity: string;
  quantity: number;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tcg-vault');

  cartas: Carta[] = [
    { id: 'OP01-001', name: 'Monkey.D.Luffy', rarity: 'Leader', quantity: 2 },
    { id: 'OP01-013', name: 'Roronoa Zoro', rarity: 'SR', quantity: 4 },
    { id: 'OP01-016', name: 'Nami', rarity: 'R', quantity: 3 }
  ];

  nuevoId = '';
  nuevoNombre = '';
  nuevaRareza = '';

  constructor() {
    if (typeof window !== 'undefined') {
      const datosGuardados = localStorage.getItem('mis_cartas_tcg');
      if (datosGuardados) {
        this.cartas = JSON.parse(datosGuardados);
      }
    }
  }

  sumarCarta(carta: Carta) {
    carta.quantity++;
    this.guardarEnDisko();
  }

  restarCarta(carta: Carta) {
    if (carta.quantity > 0) {
      carta.quantity--;
      this.guardarEnDisko();
    }
  }

  // 🗑️ Nueva función para eliminar la carta por completo
  eliminarCarta(carta: Carta) {
    // Filtramos la lista: nos quedamos con todas las cartas MENOS la que coincide con el ID seleccionado
    this.cartas = this.cartas.filter(c => c.id !== carta.id);
    this.guardarEnDisko();
  }

  agregarCarta() {
    if (this.nuevoId.trim() && this.nuevoNombre.trim() && this.nuevaRareza.trim()) {
      
      const nuevaCarta: Carta = {
        id: this.nuevoId,
        name: this.nuevoNombre,
        rarity: this.nuevaRareza,
        quantity: 1
      };

      this.cartas.push(nuevaCarta);
      this.guardarEnDisko();

      this.nuevoId = '';
      this.nuevoNombre = '';
      this.nuevaRareza = '';
    }
  }

  guardarEnDisko() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mis_cartas_tcg', JSON.stringify(this.cartas));
    }
  }
}