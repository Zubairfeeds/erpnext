// frappe.ui.form.on('Token', {
// 	po_ref_no: function(frm){
// 		if(cur_frm.doc.po_ref_no)
// 		{
// 		    frm.clear_table("items")
// 			 let po_no = cur_frm.doc.po_ref_no;
// 			 console.log("test")
// 				frappe.db.get_doc('Purchase Order', po_no).then(m =>{
// 				    frm.set_value("party",m.supplier)
// 					for(let j=0;j< m.items.length;j++){
// 						let row = cur_frm.add_child("items");
// 						console.log(m)
// 						row.item_code = m.items[j].item_code;
// 						row.item_name = m.items[j].item_name;
// 						row.qty = m.items[j].qty;
// 						row.description = m.items[j].description;
// 						row.uom = m.items[j].uom;
// 						row.rate = m.items[j].rate;
// 						row.amount = m.items[j].amount;
// 						row.conversion_factor = m.items[j].conversion_factor;
// 						row.price_list_rate = m.items[j].price_list_rate;
// 						row.stock_uom_rate = m.items[j].stock_uom_rate;
// 						row.warehouse = m.items[j].warehouse;
// 						row.base_rate = m.items[j].base_rate;
// 						row.base_amount = m.items[j].base_amount;						
// 					}
// 					cur_frm.refresh_field("items");
// 				})			
// 			}
// 		else {
//             cur_frm.clear_table('items');
//             cur_frm.refresh_field('items');
//             cur_frm.set_value('party', '');
//         }	
// 	},
frappe.ui.form.on('Token', {
    document_name: function(frm) {
        if(cur_frm.doc.document_type){
        frm.clear_table("items")
            if (cur_frm.doc.document_type === "Purchase Order" && cur_frm.doc.document_name ) {
                let document_name = cur_frm.doc.document_name;
                let document_type = cur_frm.doc.document_type;
                    frappe.db.get_doc(document_type, document_name).then(doc => {
                    frm.set_value("party", doc.supplier);
                    frm.set_value("party_name", doc.supplier_name);
                    frm.set_value("selling_price_list", doc.buying_price_list);
                    
                    console.log("Tesing123")
                    for (let j = 0; j < doc.items.length; j++) {
                        let row = cur_frm.add_child("items");
                        row.item_code = doc.items[j].item_code;
                        row.item_name = doc.items[j].item_name;
                        row.qty = doc.items[j].qty;
                        row.description = doc.items[j].description;
                        row.uom = doc.items[j].uom;
                        row.rate = doc.items[j].rate;
                        row.amount = doc.items[j].amount;
                        row.conversion_factor = doc.items[j].conversion_factor;
                        row.price_list_rate = doc.items[j].price_list_rate;
                        row.stock_uom_rate = doc.items[j].stock_uom_rate;
                        row.warehouse = doc.items[j].warehouse;
                        row.base_rate = doc.items[j].base_rate;
                        row.base_amount = doc.items[j].base_amount;
                    }
                    cur_frm.refresh_field("items");
                });
            }
            else if (cur_frm.doc.document_type === "Sales Order" && cur_frm.doc.document_name )
            {
                frm.clear_table("items")
                let document_name = cur_frm.doc.document_name;
                let document_type = cur_frm.doc.document_type;
                    frappe.db.get_doc(document_type, document_name).then(doc => {
                    frm.set_value("party", doc.customer);
                    frm.set_value("party_name", doc.customer_name);
                    frm.set_value("selling_price_list", doc.selling_price_list);
                    
                    console.log("Tesing123")
                    for (let j = 0; j < doc.items.length; j++) {
                        let row = cur_frm.add_child("items");
                        row.item_code = doc.items[j].item_code;
                        row.item_name = doc.items[j].item_name;
                        row.qty = doc.items[j].qty;
                        row.description = doc.items[j].description;
                        row.uom = doc.items[j].uom;
                        row.rate = doc.items[j].rate;
                        row.amount = doc.items[j].amount;
                        row.conversion_factor = doc.items[j].conversion_factor;
                        row.price_list_rate = doc.items[j].price_list_rate;
                        row.stock_uom_rate = doc.items[j].stock_uom_rate;
                        row.warehouse = doc.items[j].warehouse;
                        row.base_rate = doc.items[j].base_rate;
                        row.base_amount = doc.items[j].base_amount;
                    }
                    cur_frm.refresh_field("items");
                });
            }      
            else if (cur_frm.doc.document_type === "Material Request" && cur_frm.doc.document_name )
            {
                frm.clear_table("items")
                let document_name = cur_frm.doc.document_name;
                let document_type = cur_frm.doc.document_type;
                    frappe.db.get_doc(document_type, document_name).then(doc => {
                    // frm.set_value("party", doc.customer);
                    console.log("Tesing123")
                    for (let j = 0; j < doc.items.length; j++) {
                        let row = cur_frm.add_child("items");
                        row.item_code = doc.items[j].item_code;
                        row.item_name = doc.items[j].item_name;
                        row.qty = doc.items[j].qty;
                        row.description = doc.items[j].description;
                        row.uom = doc.items[j].uom;
                        row.rate = doc.items[j].rate;
                        row.amount = doc.items[j].amount;
                        row.conversion_factor = doc.items[j].conversion_factor;
                        row.price_list_rate = doc.items[j].price_list_rate;
                        row.stock_uom_rate = doc.items[j].stock_uom_rate;
                        row.warehouse = doc.items[j].warehouse;
                        row.base_rate = doc.items[j].base_rate;
                        row.base_amount = doc.items[j].base_amount;
                    }
                    cur_frm.refresh_field("items");
                });
            }                  
            else {
                cur_frm.clear_table('items');
                cur_frm.refresh_field('items');
                cur_frm.set_value('party', '');
            }
        }
        else{
            console.log('Else Satatement Execute')
            cur_frm.set_value('document_name', '')
            cur_frm.set_value('party', '')
        }
        {
            frm.fields_dict['document_name'].get_query = function(doc, cdt, cdn) {
    let filters = {
        docstatus: 1,
        status: ['not in', ['Ordered', 'Completed']],
    };

    if (doc.document_type === 'Material Request') {
        filters.material_request_type = 'Material Transfer';
    }

    return {
        filters: filters
    };
};
        }
    },
    document_type:function(frm){
        if (!cur_frm.doc.document_type)
            console.log('Else Satatement Execute')
            cur_frm.set_value('document_name', '')
            cur_frm.clear_table('items');
            cur_frm.refresh_field('items');
            cur_frm.set_value('party', '');
            cur_frm.set_value('party_name', '')
    },
    refresh:function(frm){
                frm.fields_dict['document_type'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                        'name': ['in', ['Sales Order', 'Purchase Order', 'Material Request']]
                }
            };
        };
        frm.fields_dict['document_name'].get_query = function(doc, cdt, cdn) {
            if (doc.document_type == 'Material Request') {
                return {
                    filters: {
                        'material_request_type': 'Material Transfer'
                    }
                };
            } else {
                return {};
            }
        };        
    }
    
    
})			