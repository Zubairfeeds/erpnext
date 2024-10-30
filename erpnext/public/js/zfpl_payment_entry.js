
frappe.ui.form.on('Payment Entry', {
    refresh: function(frm) {
        frm.set_query('bank_account', function() {
            var filters = [];

            if (frm.doc.bank_account_type) {
                filters.push([
                    'Bank Account',
                    'account_type',
                    '=',
                    frm.doc.bank_account_type
                ]);
            }

            if (frm.doc.account_subtype) {
                filters.push([
                    'Bank Account',
                    'account_subtype',
                    '=',
                    frm.doc.account_subtype
                ]);
            }

            if (filters.length > 0) {
                return {
                    filters: filters
                };
            } else {
                // If both fields are empty, return null to show nothing in the bank_account field
        	return {
				filters: {
					is_company_account: 1,
					company: frm.doc.company
				}
			}
            }
        });     
    }
});



frappe.ui.form.on('Payment Entry', {
    mode_of_payment:function(frm){
		let pt = frm.doc.payment_type
		let mop = frm.doc.mode_of_payment;

		console.log("BPVCPV");
		if(pt=="Receive" && mop == "Cash"){
			let abbr = "CRV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(pt=="Receive" && mop == "Bank Draft"){
			let abbr = "BRV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(pt=="Receive" && mop == "Online"){
			let abbr = "BRV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(pt=="Receive" && mop == "Cheque"){
			let abbr = "BRV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}		
		else if(pt=="Pay" && mop == "Bank Draft"){
			let abbr = "BPV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}		
		else if(pt=="Pay" && mop == "Cash"){
			let abbr = "CPV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(pt=="Pay" && mop == "Bank Draft"){
			let abbr = "BPV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(pt=="Internal Transfer" && mop == "Cash"){
			let abbr = "CTR-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else if(pt=="Internal Transfer" && mop == "Bank Draft"){
			let abbr = "BTR-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
		else{
			let abbr = "ACC-JV-.FY.-";
			console.log(abbr);
			frm.set_value('naming_series',abbr);
		}
// 		else if(entry=="Land Export"){
// 			let abbr = "LE";
// 			console.log(abbr);
// 			frm.set_value('abbrevation',abbr);
// 		}
// 		else if(entry=="Custom Clearence"){
// 			let abbr = "CC";
// 			console.log(abbr);
// 			frm.set_value('abbrevation',abbr);
// 		}
// 		else if(entry=="Third Party Service"){
// 			let abbr = "THS";
// 			console.log(abbr);
// 			frm.set_value('abbrevation',abbr);
// 		}
	
	},
});