
/*
 * @author : Dilanka Dilshan<ehd.dilanka@gmail.com>
 */

import manageItems from './manage-items.component.html';
import style from './manage-items.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { data } from 'jquery';
import { deleteItem, getAllItems, saveItem } from '../service/item.service';
import { Item } from '../model/item';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

$("#tbl-items tbody").on('click', 'tr .fas', async(event: Event)=>{
    let code = ($(event.target as any).parents("tr").find("td:first-child").text());
    try {
        await deleteItem(code);
        alert("Customer has Deleted Successfully");
        loadAllItems();
    } catch (error) {
        alert("Failed to delete the customer");
    }
});

let dataTable: any = null;

async function loadAllItems() {

    let items = await getAllItems();

    if(dataTable){
        ($("#tbl-items") as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
    }

    for (const item of items) {
        $("#tbl-items tbody").append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qty}</td>
                <td>${item.unitPrice}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `);
    }

    dataTable = ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false,
    });

}

loadAllItems();

$("#btn-save1").click(async () => {
    let code = <string>$("#txt-code").val();
    let description = <string>$("#txt-description").val();
    let qty = <number>$("#txt-qty").val();
    let unitPrice = <string>$("#txt-unitprice").val();

    if(!code.match(/^C\d{3}$/) || description.trim().length===0){
        alert("Invalid Item Information");
        return;
    }

    try{
        await saveItem(new Item(code,description,qty,unitPrice));
        alert("Item Saved");
        loadAllItems();
    }catch(error){
        alert("Failed to save the itemr");
        console.log(error);
    }
});
