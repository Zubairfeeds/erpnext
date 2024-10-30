// frappe.ui.form.on('Sales Order Item', {
// 	refresh(frm) {
		
// 	}
// })
frappe.ui.form.on("Sales Order Item",
    "price_list_rate", function(frm, cdt, cdn) 
{ 
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype, d.name, "price_list_amount", d.qty * d.price_list_rate ); 

    
});
frappe.ui.form.on("Sales Order Item",
    "qty", function(frm, cdt, cdn) 
{ 
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype, d.name, "price_list_amount", d.qty * d.price_list_rate ); 

    
});
frappe.ui.form.on("Sales Order Item",
    "qty", function(frm, cdt, cdn) 
{ 
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype, d.name, "gross_discount_amount", d.qty * d.discount_amount ); 

    
});
frappe.ui.form.on("Sales Order Item",
    "item_code", function(frm, cdt, cdn) 
{ 
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype, d.name, "gross_discount_amount", d.qty * d.discount_amount ); 

    
});


frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        frm.doc.items.forEach(function(item) {
            item.balance_qty = item.qty - item.delivered_qty;
        });
        // Refresh the child table to reflect the calculated values
        frm.refresh_field('items');
        console.log("DO")
    }
});