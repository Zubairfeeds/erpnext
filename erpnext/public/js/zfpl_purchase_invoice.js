frappe.ui.form.on('Purchase Invoice', {
	product_type:function(frm) {
	    if (frm.doc.product_type == 'Operation'){
	        
		frm.set_value('session_user',frappe.session.user)
	    }
// 		console.log("Session user is defined")
        {
    	    let rm = 'RM-PINV-YYYY.-';
    	    let ops = 'OPS-PINV-YYYY.-';
    	    let gn = 'GEN-PINV-YYYY.-';
    	    let lc = 'LC-PINV-YYYY.-';
    	    let product_type = frm.doc.product_type;
    	    
    	    if (product_type == 'General Items')
    	        {
    	            frm.set_value('naming_series',gn)
    	        }
    	    else if (product_type == 'Special Items Purchase')
    	        {
    	            frm.set_value('naming_series',lc)
    	        }
    	   	else if (product_type == 'Raw Material Items')
    	        {
    	            frm.set_value('naming_series',rm)
    	        }
    	   	 else if (product_type == 'Operation')
    	        {
    	            frm.set_value('naming_series',ops)
    	        }
    	    else{}
    	}	
	},
})