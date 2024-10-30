(()=>{frappe.templates.item_dashboard=`<div class="stock-levels">
	<div class="result">
	</div>
	<div class="more hidden" style="padding: 15px;">
		<a class="btn btn-default btn-xs btn-more">More</a>
	</div>
</div>
`;frappe.templates.item_dashboard_list=`{% for d in data %}
	<div class="dashboard-list-item">
		<div class="row">
			<div class="col-sm-3" style="margin-top: 8px;">
				<a data-type="warehouse" data-name="{{ d.warehouse }}">{{ d.warehouse }}</a>
			</div>
			<div class="col-sm-3" style="margin-top: 8px;">
				{% if show_item %}
					<a data-type="item"
						data-name="{{ d.item_code }}">{{ d.item_code }}
						{% if d.item_name != d.item_code %}({{ d.item_name }}){% endif %}
					</a>
				{% endif %}
			</div>
			<div class="col-sm-4">
				<span class="inline-graph">
					<span class="inline-graph-half" title="{{ __("Reserved Qty") }}">
						<span class="inline-graph-count">{{ d.total_reserved }}</span>
						<span class="inline-graph-bar">
							<span class="inline-graph-bar-inner"
								style="width: {{ cint(Math.abs(d.total_reserved)/max_count * 100) || 5 }}%">
							</span>
						</span>
					</span>
					<span class="inline-graph-half" title="{{ __("Actual Qty {0} / Waiting Qty {1}", [d.actual_qty, d.pending_qty]) }}">
						<span class="inline-graph-count">
							{{ d.actual_qty }} {{ (d.pending_qty > 0) ? ("(" + d.pending_qty+ ")") : "" }}
						</span>
						<span class="inline-graph-bar">
							<span class="inline-graph-bar-inner dark"
								style="width: {{ cint(d.actual_qty/max_count * 100) }}%">
							</span>
							{% if d.pending_qty > 0 %}
							<span class="inline-graph-bar-inner" title="{{ __("Projected Qty") }}"
								style="width: {{ cint(d.pending_qty/max_count * 100) }}%">
							</span>
							{% endif %}
						</span>
					</span>
				</span>
			</div>
			{% if can_write %}
			<div class="col-sm-2 text-right" style="margin: var(--margin-sm) 0;">
				{% if d.actual_qty %}
				<button class="btn btn-default btn-xs btn-move"
					data-disable_quick_entry="{{ d.disable_quick_entry }}"
					data-warehouse="{{ d.warehouse }}"
					data-actual_qty="{{ d.actual_qty }}"
					data-item="{{ escape(d.item_code) }}">{{ __("Move") }}</a>
				{% endif %}
				<button style="margin-left: 7px;" class="btn btn-default btn-xs btn-add"
					data-disable_quick_entry="{{ d.disable_quick_entry }}"
					data-warehouse="{{ d.warehouse }}"
					data-actual_qty="{{ d.actual_qty }}"
					data-item="{{ escape(d.item_code) }}"
					data-rate="{{ d.valuation_rate }}">{{ __("Add") }}</a>
			</div>
			{% endif %}
		</div>
	</div>
{% endfor %}
`;frappe.provide("erpnext.stock");erpnext.stock.ItemDashboard=class{constructor(t){$.extend(this,t),this.make()}make(){var t=this;this.start=0,this.sort_by||(this.sort_by="projected_qty",this.sort_order="asc"),this.content=$(frappe.render_template("item_dashboard")).appendTo(this.parent),this.result=this.content.find(".result"),this.content.on("click",".btn-move",function(){i($(this),"Move")}),this.content.on("click",".btn-add",function(){i($(this),"Add")}),this.content.on("click",".btn-edit",function(){let n=unescape($(this).attr("data-item")),a=unescape($(this).attr("data-warehouse")),e=unescape($(this).attr("data-company"));frappe.db.get_value("Putaway Rule",{item_code:n,warehouse:a,company:e},"name",s=>{frappe.set_route("Form","Putaway Rule",s.name)})});function i(n,a){let e=unescape(n.attr("data-item")),s=unescape(n.attr("data-warehouse")),d=unescape(n.attr("data-actual_qty")),l=Number(unescape(n.attr("data-disable_quick_entry"))),c=a==="Move"?"Material Transfer":"Material Receipt";if(l)r(e,s,c);else if(a==="Add"){let _=unescape($(this).attr("data-rate"));erpnext.stock.move_item(e,null,s,d,_,function(){t.refresh()})}else erpnext.stock.move_item(e,s,null,d,null,function(){t.refresh()})}function r(n,a,e){frappe.model.with_doctype("Stock Entry",function(){var s=frappe.model.get_new_doc("Stock Entry");e&&(s.stock_entry_type=e);var d=frappe.model.add_child(s,"items");d.item_code=n,e==="Material Transfer"?d.s_warehouse=a:d.t_warehouse=a,frappe.set_route("Form",s.doctype,s.name)})}this.content.find(".btn-more").on("click",function(){t.start+=t.page_length,t.refresh()})}refresh(){this.before_refresh&&this.before_refresh();let t={item_code:this.item_code,warehouse:this.warehouse,parent_warehouse:this.parent_warehouse,item_group:this.item_group,company:this.company,start:this.start,sort_by:this.sort_by,sort_order:this.sort_order};var i=this;frappe.call({method:this.method,args:t,callback:function(r){i.render(r.message)}})}render(t){this.start===0&&(this.max_count=0,this.result.empty());let i="";if(this.page_name==="warehouse-capacity-summary"?i=this.get_capacity_dashboard_data(t):i=this.get_item_dashboard_data(t,this.max_count,!0),this.max_count=this.max_count,t&&t.length===this.page_length+1?(this.content.find(".more").removeClass("hidden"),t.splice(-1)):this.content.find(".more").addClass("hidden"),i.data.length>0)this.content.find(".result").css("text-align","unset"),$(frappe.render_template(this.template,i)).appendTo(this.result);else{var r=__("No Stock Available Currently");this.content.find(".result").css("text-align","center"),$(`<div class='text-muted' style='margin: 20px 5px;'>
				${r} </div>`).appendTo(this.result)}}get_item_dashboard_data(t,i,r){i||(i=0),t||(t=[]),t.forEach(function(a){a.actual_or_pending=a.projected_qty+a.reserved_qty+a.reserved_qty_for_production+a.reserved_qty_for_sub_contract,a.pending_qty=0,a.total_reserved=a.reserved_qty+a.reserved_qty_for_production+a.reserved_qty_for_sub_contract,a.actual_or_pending>a.actual_qty&&(a.pending_qty=a.actual_or_pending-a.actual_qty),i=Math.max(a.actual_or_pending,a.actual_qty,a.total_reserved,i)});let n=0;return frappe.boot.user.can_write.indexOf("Stock Entry")>=0&&(n=1),{data:t,max_count:i,can_write:n,show_item:r||!1}}get_capacity_dashboard_data(t){t||(t=[]),t.forEach(function(r){r.color=r.percent_occupied>=80?"#f8814f":"#2490ef"});let i=0;return frappe.boot.user.can_write.indexOf("Putaway Rule")>=0&&(i=1),{data:t,can_write:i}}};erpnext.stock.move_item=function(o,t,i,r,n,a){var e=new frappe.ui.Dialog({title:i?__("Add Item"):__("Move Item"),fields:[{fieldname:"item_code",label:__("Item"),fieldtype:"Link",options:"Item",read_only:1},{fieldname:"source",label:__("Source Warehouse"),fieldtype:"Link",options:"Warehouse",read_only:1},{fieldname:"target",label:__("Target Warehouse"),fieldtype:"Link",options:"Warehouse",reqd:1,get_query(){return{filters:{is_group:0}}}},{fieldname:"qty",label:__("Quantity"),reqd:1,fieldtype:"Float",description:__("Available {0}",[r])},{fieldname:"rate",label:__("Rate"),fieldtype:"Currency",hidden:1}]});e.show(),e.get_field("item_code").set_input(o),t?e.get_field("source").set_input(t):(e.get_field("source").df.hidden=1,e.get_field("source").refresh()),n&&(e.get_field("rate").set_value(n),e.get_field("rate").df.hidden=0,e.get_field("rate").refresh()),i&&(e.get_field("target").df.read_only=1,e.get_field("target").value=i,e.get_field("target").refresh()),e.set_primary_action(__("Create Stock Entry"),function(){if(t&&(e.get_value("qty")==0||e.get_value("qty")>r)){frappe.msgprint(__("Quantity must be greater than zero, and less or equal to {0}",[r]));return}if(e.get_value("source")===e.get_value("target")){frappe.msgprint(__("Source and target warehouse must be different"));return}frappe.model.with_doctype("Stock Entry",function(){let s=frappe.model.get_new_doc("Stock Entry");s.from_warehouse=e.get_value("source"),s.to_warehouse=e.get_value("target"),s.stock_entry_type=s.from_warehouse?"Material Transfer":"Material Receipt";let d=frappe.model.add_child(s,"items");d.item_code=e.get_value("item_code"),d.s_warehouse=e.get_value("source"),d.t_warehouse=e.get_value("target"),d.qty=e.get_value("qty"),d.conversion_factor=1,d.transfer_qty=e.get_value("qty"),d.basic_rate=e.get_value("rate"),frappe.set_route("Form",s.doctype,s.name)})})};frappe.templates.warehouse_capacity_summary=`{% for d in data %}
	<div class="dashboard-list-item" style="padding: 7px 15px;">
		<div class="row">
			<div class="col-sm-2" style="margin-top: 8px;">
				<a data-type="warehouse" data-name="{{ d.warehouse }}">{{ d.warehouse }}</a>
			</div>
			<div class="col-sm-2" style="margin-top: 8px; ">
				<a data-type="item" data-name="{{ d.item_code }}">{{ d.item_code }}</a>
			</div>
			<div class="col-sm-1" style="margin-top: 8px; ">
				{{ d.stock_capacity }}
			</div>
			<div class="col-sm-2" style="margin-top: 8px; ">
				{{ d.actual_qty }}
			</div>
			<div class="col-sm-2">
				<div class="progress" title="Occupied Qty: {{ d.actual_qty }}" style="margin-bottom: 4px; height: 7px; margin-top: 14px;">
					<div class="progress-bar" role="progressbar"
						aria-valuenow="{{ d.percent_occupied }}"
						aria-valuemin="0" aria-valuemax="100"
						style="width:{{ d.percent_occupied }}%;
						background-color: {{ d.color }}">
					</div>
				</div>
			</div>
			<div class="col-sm-1" style="margin-top: 8px;">
				{{ d.percent_occupied }}%
			</div>
			{% if can_write %}
			<div class="col-sm-2 text-right" style="margin-top: 2px;">
				<button
					class="btn btn-default btn-xs btn-edit"
					style="margin: 4px 0; float: left;"
					data-warehouse="{{ d.warehouse }}"
					data-item="{{ escape(d.item_code) }}"
					data-company="{{ escape(d.company) }}">
					{{ __("Edit Capacity") }}
				</button>
			</div>
			{% endif %}
		</div>
	</div>
{% endfor %}
`;frappe.templates.warehouse_capacity_summary_header=`<div class="dashboard-list-item" style="padding: 12px 15px;">
	<div class="row">
		<div class="col-sm-2 text-muted" style="margin-top: 8px;">
			Warehouse
		</div>
		<div class="col-sm-2 text-muted" style="margin-top: 8px;">
			Item
		</div>
		<div class="col-sm-1 text-muted" style="margin-top: 8px;">
			Stock Capacity
		</div>
		<div class="col-sm-2 text-muted" style="margin-top: 8px;">
			Balance Stock Qty
		</div>
		<div class="col-sm-2 text-muted" style="margin-top: 8px;">
			% Occupied
		</div>
	</div>
</div>
`;})();
//# sourceMappingURL=item-dashboard.bundle.WJUAWVI6.js.map
