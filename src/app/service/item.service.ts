/*
 * @author : Dilanka Dilshan<ehd.dilanka@gmail.com>
 */

import { Item } from "../model/item";

let items : Array<Item> = [];
let loaded = false;

export function getAllItems(): Promise<Array<Item>>{
    return new Promise((resolve, reject)=>{
        if(!loaded){

            $.ajax({
                method:"GET",
                url:'http://localhost:8080/pos/item'
            }).then((data)=>{
                items = data;
                loaded= true;
                resolve(items);
            }).fail(()=>{
                reject();
            })

        }else{
            resolve(items);
        }
    });
}

export function saveItem(item: Item): Promise<void> {

    return new Promise((resolve, reject) => {

        $.ajax({
            method:'POST',
            url: 'http://localhost:8080/pos/item',
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).then(()=>{
            items.push(item);
            resolve();
        }).fail(()=>{
            reject();
        })

    });

}

export function deleteItem (code: string): Promise<void>{

    return new Promise((reslove, reject)=>{

       $.ajax({
           method:"DELETE",
           url:`http://localhost:8080/pos/item?code=${code}`
       }).then(()=>{
           items.splice(items.findIndex((elm)=>elm.code===code),1);
           reslove();
       }).catch(()=>{
           reject();
       })

    });
}