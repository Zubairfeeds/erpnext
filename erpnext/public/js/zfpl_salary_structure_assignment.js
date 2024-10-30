frappe.ui.form.on('Salary Structure Assignment', {
	gross_monthly_salary:function(frm) {
    	let total = 0
    	total = (frm.doc.gross_monthly_salary / frm.doc.factor)
    	frm.set_value('base',total)
    	console.log("Gross Monthly Salary Added")
	},
	refresh:function(frm){
    	let total = 0
    	total = (frm.doc.gross_monthly_salary / frm.doc.factor)
    	frm.set_value('base',total)
    	console.log("Gross Monthly Salary Added")
	},
	factor:function(frm){
    	let total = 0
    	total = (frm.doc.gross_monthly_salary / frm.doc.factor)
    	frm.set_value('base',total)
    	console.log("Gross Monthly Salary Added")
	}	
})