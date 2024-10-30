frappe.ui.form.on('Vehicle Log', {
	amount_total:function(frm) {
    var totalAmount = frm.doc.amount_total || 0;
    var expenseAmount = frm.doc.total_expense_amount || 0;

    // Calculate grand total
    var grandTotal = totalAmount + expenseAmount;

    // Set the value in the grand total field
    frm.set_value('grand_total', grandTotal);

	},
	total_expense_amount:function(frm) {
    var totalAmount = frm.doc.amount_total || 0;
    var expenseAmount = frm.doc.total_expense_amount || 0;

    // Calculate grand total
    var grandTotal = totalAmount + expenseAmount;

    // Set the value in the grand total field
    frm.set_value('grand_total', grandTotal);

	}
})	

frappe.ui.form.on('Vehicle Log', {
	odometer:function(frm) {
	    let last_odometer = frm.doc.last_odometer
        let current_odometer = frm.doc.odometer
        let consumed_odometer =current_odometer - last_odometer
        frm.set_value('consumed_odometer_value', consumed_odometer)
        console.log("Odometer reading done")
	},
	consumed_odometer_value:function(frm) {
        {
            let consumed_ov = frm.doc.consumed_odometer_value
            let tot_fuel_qty = frm.doc.fuel_qty
            let avg_mile = consumed_ov / tot_fuel_qty
            frm.set_value('avg_mileage', avg_mile)
            console.log("Average Mileage Calculated")
        }
	},
	fuel_qty:function(frm) {
	    let consumed_ov = frm.doc.consumed_odometer_value
        let tot_fuel_qty = frm.doc.fuel_qty
        let avg_mile = consumed_ov / tot_fuel_qty
        frm.set_value('avg_mileage', avg_mile)
        console.log("Average Mileage Calculated")
	},
	total_kms:function(frm){
            let avg_mileage = frm.doc.avg_mileage
            let ltre_consumed = frm.doc.litre_consumed;
            let total_kms = frm.doc.total_kms
            let total_ltre_consumed = total_kms / avg_mileage
            frm.set_value("litre_consumed",total_ltre_consumed)
            console.log("total_ltre_consumed print")
	},
	avg_mileage:function(frm){
            let avg_mileage = frm.doc.avg_mileage
            let ltre_consumed = frm.doc.litre_consumed;
            let total_kms = frm.doc.total_kms
            let total_ltre_consumed = total_kms / avg_mileage
            frm.set_value("litre_consumed",total_ltre_consumed)
            console.log("total_ltre_consumed print")
	},	
	before_save:function(frm){
        let service_total = frm.doc.service_total;
        if (service_total > 2000) {
            frappe.throw('Please apply another Vehicle Log using Log Type "Special Approval"');
        }
    }
})


    // frappe.ui.form.on('Refuling Details',{
    // fuel_qty: function(frm, cdt, cdn) {
    //         {
    //             var d = locals[cdt][cdn]; 
    //             var total = 0;
    //             frm.doc.refulling_details_.forEach(function(d) { total += d.fuel_qty });
    //             frm.set_value('fuel_qty', total);
    //             console.log("Total Fuel Qty Done");
    //         }
    //         {
    //         var f = locals[cdt][cdn]; 
    //         frappe.model.set_value(f.doctype, f.name, "fuel_price", f.fuel_qty * f.fuel_rate);
            
    //         var total_fuel_price = 0;
    //         frm.doc.refulling_details_.forEach(function(f) { total_fuel_price += f.fuel_price });
    //         frm.set_value('amount_total', total_fuel_price);
    //         console.log("total_fuel_price");               
    //         }
    //         {
    //         var a = locals[cdt][cdn]; 
    //         // frappe.model.set_value(a.doctype, a.name, "fuel_price", f.fuel_qty * f.fuel_rate);
            
    //         var avg_fuel_price = 0;
    //         var row_count = 0;
    //         frm.doc.refulling_details_.forEach(function(f) { avg_fuel_price += f.fuel_rate; row_count +=1} );
    //         var average = avg_fuel_price / row_count;
    //         frm.set_value('price', average);
    //         console.log("total_fuel_price");             
    //         }
    //     },
    // fuel_rate: function(frm, cdt, cdn) {
    //        {
    //         var d = locals[cdt][cdn]; 
    //         frappe.model.set_value(d.doctype, d.name, "fuel_price", d.fuel_qty * d.fuel_rate);
            
    //         var total_fuel_price = 0;
    //         frm.doc.refulling_details_.forEach(function(d) { total_fuel_price += d.fuel_price });
    //         frm.set_value('amount_total', total_fuel_price);
    //         console.log("total_fuel_price")
    //        }
    //         {
    //         var a = locals[cdt][cdn]; 
    //         // frappe.model.set_value(a.doctype, a.name, "fuel_price", f.fuel_qty * f.fuel_rate);
            
    //         var avg_fuel_price = 0;
    //         var row_count = 0;
    //         frm.doc.refulling_details_.forEach(function(f) { avg_fuel_price += f.fuel_rate; row_count +=1} );
    //         var average = avg_fuel_price / row_count;
    //         frm.set_value('price', average);
    //         console.log("total_fuel_price");             
    //         }
    //     },  
        
        
    // });

    frappe.ui.form.on('Refuling Details', {
        fuel_rate: function(frm, cdt, cdn) {
            var d = locals[cdt][cdn]; 
            frappe.model.set_value(d.doctype, d.name, "fuel_qty", d.fuel_price / d.fuel_rate);
            
            var total_fuel_qty = 0;
            frm.doc.refulling_details_.forEach(function(d) { 
                total_fuel_qty += d.fuel_qty;
            });
            frm.set_value('fuel_qty', total_fuel_qty);
            console.log("Total Fuel Qty Done");
            
            var avg_fuel_price = 0;
            var row_count = 0;
            frm.doc.refulling_details_.forEach(function(f) { 
                avg_fuel_price += f.fuel_rate; 
                row_count += 1;
            });
            var average = avg_fuel_price / row_count;
            frm.set_value('price', average);
            console.log("Total Fuel Price Done");
        },
    
        fuel_price: function(frm, cdt, cdn) {
            var d = locals[cdt][cdn]; 
            frappe.model.set_value(d.doctype, d.name, "fuel_qty", d.fuel_price / d.fuel_rate);
            
            var total_fuel_qty = 0;
            frm.doc.refulling_details_.forEach(function(d) { 
                total_fuel_qty += d.fuel_qty;
            });
            frm.set_value('fuel_qty', total_fuel_qty);
            console.log("Total Fuel Qty Done");
            
            var avg_fuel_price = 0;
            var row_count = 0;
            frm.doc.refulling_details_.forEach(function(f) { 
                avg_fuel_price += f.fuel_rate; 
                row_count += 1;
            });
            var average = avg_fuel_price / row_count;
            frm.set_value('price', average);
            console.log("Total Fuel Price Done");
        }
    });
    
    
    frappe.ui.form.on('Vehicle Service',{
    expense_amount: function(frm, cdt, cdn) {
            {
                let d = locals[cdt][cdn]; 
                var total = 0;
                var serviceExpenseTotal = 0;
                var cumulativeServiceExpenseTotal = 0;
                var service_total = 0;
                frm.doc.service_detail.forEach(function(d) { total += d.expense_amount });
                frm.set_value('total_expense_amount', total);
                console.log("Total Expense Qty Done");
                
                    // if (d.type == 'Service') {
                    //     // Accumulate expense_amount for Service type
                    //     // serviceExpenseTotal += d.expense_amount;
                    //     frm.set_value('serviceExpenseTotal', total);
                    //     console.log(service_total)
                    // }
                    if (d.type == "Service" && frm.doc.log_type == "Running Expense") {
                        frm.doc.service_detail.forEach(function(d) {
                            service_total += d.expense_amount;
                            frm.set_value('service_total', service_total);
                        });
                        if (service_total > 2000){
                            frappe.throw('Please apply another Vehicle Log using Log Type "Special Approval"');
                        }
                        
                    }
            } 
        },
    service_detail_remove: function(frm, cdt, cdn) {
            {
                let d = locals[cdt][cdn]; 
                var total = 0;
                frm.doc.service_detail.forEach(function(d) { total += d.expense_amount });
                frm.set_value('total_expense_amount', total);
                console.log("Charges Remove");
            }
                       {
                let d = locals[cdt][cdn]; 
                var total = 0;
                frm.doc.service_detail.forEach(function(d) { total += d.expense_amount });
                frm.set_value('service_total', total);
                console.log("Charges Remove");
            }
        },        
    })
    
    
    frappe.ui.form.on('Extra Visit',{
    kms: function(frm, cdt, cdn) {
            {
                var d = locals[cdt][cdn]; 
                var total = 0;
                frm.doc.extra_visit.forEach(function(d) { total += d.kms });
                frm.set_value('total_kms', total);
                console.log("Total Kms Done");
            }
        },
    extra_visit_remove: function(frm, cdt, cdn) {
            {
                var d = locals[cdt][cdn]; 
                var total = 0;
                frm.doc.extra_visit.forEach(function(d) { total += d.kms });
                frm.set_value('total_kms', total);
                console.log("Total Kms Done");
            }
        }    
    })    
    
