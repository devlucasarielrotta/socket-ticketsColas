import * as data from '../db/data.json' assert {type:"json"}
import path from 'path';
import { __dirname } from '../utils.js';
import fs from 'fs';

class Ticket {

    constructor(numero,escritorio){

        this.numero = numero;
        this.escritorio = escritorio;

    }

}
export default class TicketControl {

    constructor (){

        this.ultimo     = 0;
        this.hoy        = new Date().getDate(); // 
        this.tickets    = [];
        this.ultimos4   = [];

        this.init()
    }

    get toJSON(){

        return {
            ultimo:     this.ultimo,
            hoy:        this.hoy,
            tickets:    this.tickets,
            ultimos4:   this.ultimos4
        }

    }

    init(){

        const {ultimo,hoy,tickets,ultimos4} = data.default;

        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else {
            // es otro dia
            this.guardarDB();
        }
    }

    guardarDB(){
        const dbPath = path.join(__dirname,'./db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJSON));
    }

    siguiente(){

        this.ultimo +=1;

        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push (ticket);

        this.guardarDB();

        return 'Ultimo ticket: ' + ticket.numero;

    }

    atenderTicket(escritorio){

        // no tenemos tickets
        if (this.tickets.length === 0){
            return null;
        }
        
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if( this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        return ticket;
    }

}

