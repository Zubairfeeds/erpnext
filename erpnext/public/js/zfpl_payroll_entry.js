   frappe.ui.form.on('Payroll Entry', {
    setup: function(frm) {
            {
            cur_frm.set_query("bank_account",  function(doc) {
                     return {
                            filters: [
                                    ["Bank Account", "account","=", doc.payment_account ]
                                    ]
                            }
                });
                console.log("Payment Account Set seccessfully")
            }
        }
   });    
    