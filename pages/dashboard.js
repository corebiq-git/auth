
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{};
  CoreBIQ.pages['/'] = function(){
    return '<div class="page-enter space-y-6">'+
      '<div class="rounded-[28px] p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-m3-geminiStart to-m3-geminiEnd">'+
      '<div class="section-kicker mb-3">COREBIQ FLY • TRAVEL OPERATIONS</div>'+
      '<h2 class="headline-lg text-m3-onSurface mb-3">Run your travel business from one connected workspace.</h2>'+
      '<p class="body-lg text-m3-onSurfaceVariant max-w-2xl">Plan, sell, book and operate travel with connected CRM, packages, quotations, suppliers, finance and operations.</p></div>'+
      '<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">'+
      [['Active Packages','24','luggage'],['Open Bookings','38','book_online'],['Customers','1,284','group'],['Revenue','₹12.8L','payments']].map(function(x){
        return '<div class="data-card p-4 sm:p-5"><div class="module-icon mb-4">'+CoreBIQ.icon(x[2])+'</div><div class="metric-number">'+x[1]+'</div><div class="body-md text-m3-onSurfaceVariant">'+x[0]+'</div></div>';
      }).join('')+'</div>'+
      '<div class="grid grid-cols-1 lg:grid-cols-3 gap-3">'+
      '<div class="soft-card p-5 lg:col-span-2"><div class="title-md">Sales pipeline</div><div class="body-md text-m3-onSurfaceVariant mb-4">Current travel enquiries</div><div class="grid grid-cols-2 sm:grid-cols-4 gap-3">'+
      [['New Enquiries','86'],['Quotations','42'],['Confirmed','18'],['Payment Due','9']].map(function(x){return '<div class="rounded-2xl bg-m3-surfaceContainer p-4"><div class="metric-number">'+x[1]+'</div><div class="body-md text-m3-onSurfaceVariant">'+x[0]+'</div></div>';}).join('')+
      '</div></div>'+
      '<div class="soft-card p-5"><div class="title-md">Today’s operations</div><div class="body-md text-m3-onSurfaceVariant mb-4">Items requiring attention</div>'+
      [['Airport transfers','6','airport_shuttle'],['Hotel confirmations','11','hotel'],['Visa cases','7','travel_explore'],['Payments due','9','payments']].map(function(x){return '<div class="flex items-center gap-3 mb-3"><div class="module-icon">'+CoreBIQ.icon(x[2])+'</div><div><div class="label-lg">'+x[0]+'</div><div class="body-md text-m3-onSurfaceVariant">'+x[1]+' items</div></div></div>';}).join('')+
      '</div></div></div>';
  };
})();
