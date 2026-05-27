import { faker } from '@faker-js/faker';

export function gerarReserva() { 
return {
    "firstname" : faker.person.firstName(),
    "lastname" : faker.person.lastName(), 
    "totalprice" : faker.finance.amount({dec: 0}),
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2024-08-15",
        "checkout" : "2024-08-20"
    },
    "additionalneeds" : "Breakfast"
    }
}