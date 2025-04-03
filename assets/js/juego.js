// * Patrón Módulo
const miModulo = (() => {
    'use strict'

    /*
    * C = Clubs (Tréboles)
    * D = Diamonds (Diamantes)
    * H = Hearts (Corazones)
    * S = Spades (Picas)
    */
    let deck = [];
    const types = ['C', 'D', 'H', 'S'], 
        especiales = ['A', 'J', 'Q', 'K'];

    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnIniciar = document.querySelector('#btnIniciar');

    const playersCards = document.querySelectorAll('.divCards'),
        puntosHTML = document.querySelectorAll('small');

    let puntosJugadores = [];

    const iniciarJuego = ( numJugadores = 2 ) => {
        deck = createDeck();

        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerHTML = 0 );
        playersCards.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const createDeck = () => {
        deck = [];
        for ( let i = 2; i <= 10; i++ ) {
            for ( let type of types ) {
                deck.push(`${i}${type}`);
            }
        }

        for ( let type of types ) {
            for ( let especial of especiales ) {
                deck.push(`${especial}${type}`);
            }
        }

        return _.shuffle(deck);
    }

    // Función para pedir una carta
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor) ) ? ( valor === 'A' ) ? 11 : 10 : valor * 1;
    }

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('card');
        playersCards[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [ puntosJugador, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if ( puntosComputadora === puntosJugador ) {
                alert('Empate!');
            } else if ( puntosJugador > 21 ) {
                alert('Perdiste!');
            } else if ( puntosComputadora > 21 ) {
                alert('Ganaste!');
            } else {
                alert('Perdiste!');
            }
        }, 100 );
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMin ) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta, puntosJugadores.length-1);
        } while ( (puntosComputadora < puntosMin) && (puntosMin <= 21) );

        determinarGanador();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if ( puntosJugador > 21 ) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21 ) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnIniciar.addEventListener('click', () => {
        iniciarJuego();
    });

    return {
        nuevoJuego: iniciarJuego
    }
})()
