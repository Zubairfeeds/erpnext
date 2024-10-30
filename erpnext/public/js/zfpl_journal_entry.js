frappe.ui.form.on('Payment Entry', {
    mode_of_payment:function(frm){
		let vt = frm.doc.voucher_type;
// 		let mop = frm.doc.mode_of_payment;

		console.log("BPVCPV");
		if(vt =="Receive" ){
			let abbr = "CRV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(vt=="Receive"){
			let abbr = "BRV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(vt=="Receive"){
			let abbr = "BRV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(vt=="Receive"){
			let abbr = "BRV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}		
		else if(vt=="Pay"){
			let abbr = "BPV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}		
		else if(vt=="Pay"){
			let abbr = "CPV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(vt=="Pay" ){
			let abbr = "BPV-.YYYY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
// 		else if(pt=="Internal Transfer" && mop == "Cash"){
// 			let abbr = "CTR-.YYYY.-";
// 			console.log(abbr);
// 			frm.set_value('naming_series',abbr);
// 		}
// 		else if(pt=="Internal Transfer" && mop == "Bank Draft"){
// 			let abbr = "BTR-.YYYY.-";
// 			console.log(abbr);
// 			frm.set_value('naming_series',abbr);
// 		}
// 		else{
// 			let abbr = "ACC-JV-.YYYY.-";
// 			console.log(abbr);
// 			frm.set_value('naming_series',abbr);
// 		}
    },
    refresh: function(frm) {
        frm.fields_dict['accounts'].grid.get_field('bank_account').get_query = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            return {
                filters: [
                    ["Bank Account", "account", "in", child.account]
                ]
            };
        };
        console.log("Updated")
    }
});



frappe.ui.form.on('Journal Entry Account', {
    reference_name: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        
        if (child.reference_type == 'Asset') {
            console.log("Fetching asset_name...");
            fetchAssetName(frm, child);
        }
    }
});

function fetchAssetName(frm, child) {
    frappe.call({
        method: 'frappe.client.get_value',
        args: {
            doctype: 'Asset',
            filters: { 'name': child.reference_name },
            fieldname: 'asset_name'
        },
        callback: function(response) {
            console.log("Response:", response);
            
            if (response && response.message && response.message.asset_name) {
                console.log("Setting asset_name:", response.message.asset_name);
                frappe.model.set_value(child.doctype, child.name, 'asset_name', response.message.asset_name);
                frm.fields_dict[child.parentfield].grid.refresh();
                
            } else {
                frappe.model.set_value(child.doctype, child.name, 'asset_name', '');
            }
        },
    });
}
