//REFERENCIAS HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlertar = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error ('El campo escritorio es obligatorio')
}
divAlertar.style.display = 'none';
const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = 'Escritorio: ' + escritorio;

const socket = io();

socket.on('connect', () => {

    //btnCrear.disabled = false;

})

socket.on('disconnect', () => {

    //btnCrear.disabled = true;

})

socket.on('tickets-pendientes', pendientes => {
    if (pendientes === 0 ){
        lblPendientes.style.display = 'none';
    }else {

        lblPendientes.innerText = pendientes;
        lblPendientes.style.display = '';
    }
});


btnAtender.addEventListener('click',() => {
   
    
    socket.emit('atender-ticket',{escritorio}, ({ok,ticket,msg}) => {

        if(!ok){
            lblTicket.innerText = 'Nadie'
            return divAlertar.style.display = '';
        }
        lblTicket.innerText = `
            Ticket ${ticket.numero}
        `
    })
   

})
