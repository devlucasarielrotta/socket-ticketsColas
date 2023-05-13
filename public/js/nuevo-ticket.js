// referencias html
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear  = document.querySelector('button')

const socket = io();

socket.on('connect', () => {

    btnCrear.disabled = false;

})

socket.on('disconnect', () => {

    btnCrear.disabled = true;

})

socket.on('ultimo-ticket', ticket => {
    lblNuevoTicket.textContent = ('Ultimo ticket: ' + ticket);
    console.log('Desde el server ', ticket)
});

btnCrear.addEventListener('click',() => {
   

    socket.emit('siguiente-ticket',null,(ticket) => {
        lblNuevoTicket.textContent = ticket
        //console.log('Desde el server ', ticket)
    });
    

})
