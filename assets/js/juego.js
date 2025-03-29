/*
* C = Clubs (Tréboles)
* D = Diamonds (Diamantes)
* H = Hearts (Corazones)
* S = Spades (Picas)
*/

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnIniciar = document.querySelector('#btnIniciar');

const puntosHTML = document.querySelectorAll('small');

const playerCards = document.querySelector('#player-card');
const computerCards = document.querySelector('#computer-card');

let puntosJugador = 0, puntosComputadora = 0;

const createDesk = () => {
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

    deck = _.shuffle(deck);
    return deck;
}

createDesk();

// Función para pedir una carta
const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    
    const carta = deck.pop();
    return carta;
}

// pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor) ) ? ( valor === 'A' ) ? 11 : 10 : valor * 1;
}

// Turno de la computadora
const turnoComputadora = ( puntosMin ) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('card');
        computerCards.append(imgCarta);

        if ( puntosMin > 21 ) {
            break;
        }
    } while ( (puntosComputadora < puntosMin) && (puntosMin <= 21) );

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

// valorCarta(pedirCarta());

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    btnDetener.disabled = false;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('card');
    playerCards.append(imgCarta);

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
    turnoComputadora(puntosJugador);
});

btnIniciar.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = createDesk();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    playerCards.innerHTML = '';
    computerCards.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = true;
});
