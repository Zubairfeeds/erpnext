frappe.ui.form.on('Purchase Order', {
    refresh: function(frm) {
        frm.doc.items.forEach(function(item) {
            item.stock_uom_rate = item.rate / item.conversion_factor;
        });
        frm.refresh_field('items');
        console.log("Upadted items stock uom")
    }
});