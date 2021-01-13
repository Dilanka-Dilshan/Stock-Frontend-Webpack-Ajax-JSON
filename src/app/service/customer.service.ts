/*
 * @author : Dilanka Dilshan<ehd.dilanka@gmail.com>
 */

import { Customer } from "../model/customer";

let customers: Array<Customer> = [];  
let loaded = false;

export function getAllCustomers(): Promise<Array<Customer>> {
    // To-do: retrive data from backend and fill the customers array

    return new Promise((resolve, reject) => {

        if(!loaded){
            // // (1) Initiate a XMLHttpRequest
            // let http = new XMLHttpRequest();

            // // (2) Setting up the call back function
            // http.onreadystatechange = function () {
            //     if (http.readyState ===  4) {
            //         customers= JSON.parse(http.responseText);
            //         loaded=true;
            //         resolve(customers);
            //         // console.log("awaa");
            //          // //console.log(http.responseXML);
            //         // // loaded = true;
            //         // if (http.responseXML) {
            //         //     let dom = $(http.responseXML);
            //         //     dom.find("table tbody tr").each((index, elm) => {
            //         //         let id = $(elm).find("td").first().text();
            //         //         let name = $(elm).find("td").first().text();
            //         //         let address = $(elm).find("td").first().text();
            //         //         customers.push(new Customer(id, name, address));
            //         //     });
            //         //     resolve(customers);
            //         // // }
            //     }
            // }

            // // (3) Let's open the request
            // http.open('GET', 'http://localhost:8080/pos/customer', true);

            // // (4) If we have to set headers
            // // (5)
            // http.send();

            $.ajax({
                method:"GET",
                url:'http://localhost:8080/pos/customer'
            }).then((data)=>{
                customers = data;
                loaded= true;
                resolve(customers);
            }).fail(()=>{
                reject();
            })

        }else{
            resolve(customers);
        }
    });
}

export function saveCustomer(customer: Customer): Promise<void> {

    return new Promise((resolve, reject) => {

        // let http = new XMLHttpRequest();

        // http.onreadystatechange = () => {
        //     if(http.readyState == 4){
        //         if(http.status == 200){
        //             customers.push(customer);
        //             resolve();
        //         }else{
        //             reject();
        //         }
        //     }
        // };

        // http.open('POST', 'http://localhost:8080/pos/customer', true);

        // http.setRequestHeader('Content-Type', 'application/json');

        // http.send(JSON.stringify(customer));

        $.ajax({
            method:'POST',
            url: 'http://localhost:8080/pos/customer',
            contentType: 'application/json',
            data: JSON.stringify(customer)
        }).then(()=>{
            customers.push(customer);
            resolve();
        }).fail(()=>{
            reject();
        })

    });

}

 export function deleteCustomer (id: string): Promise<void>{
     return new Promise((reslove, reject)=>{

        // let http = new XMLHttpRequest();

        // http.onreadystatechange = () => {
        //     if(http.readyState == 4){
        //         if(http.status == 204){
        //             customers.splice(customers.findIndex((elm)=>elm.id===id),1);
        //             reslove();
        //         }else{
        //             reject();
        //         }
        //     }
        // };

        // http.open('DELETE', `http://localhost:8080/pos/customer?id=${id}`, true);

        // http.send();

        $.ajax({
            method:"DELETE",
            url:`http://localhost:8080/pos/customer?id=${id}`
        }).then(()=>{
            customers.splice(customers.findIndex((elm)=>elm.id===id),1);
            reslove();
        }).catch(()=>{
            reject();
        })

     });
 }