frappe.ui.form.on('Issue', {
	onload:function(frm) {
// 		a = frm.doc.session_user
		frm.set_value('session_user',frappe.session.user)
	},
    // refresh: function(frm) {
    //     frm.fields_dict['accounts'].grid.get_field('bank_account').get_query = function(doc, cdt, cdn) {
    //         var child = locals[cdt][cdn];
    //         return {
    //             filters: [
    //                 ["Bank Account", "account", "in", child.account]
    //             ]
    //         };
    //     };
    //     console.log("Updated")
    // }
});

