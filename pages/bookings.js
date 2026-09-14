
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{}; var d=CoreBIQ.data;
  CoreBIQ.pages['/bookings']=function(){return CoreBIQ.tablePage({title:'Bookings',subtitle:'Confirmed, pending and operational travel bookings.',icon:'book_online',data:d.bookings,filterKey:'status',filterLabel:'Status',columns:[
    {key:'id',label:'Booking'},{key:'customer',label:'Customer'},{key:'package',label:'Package'},{key:'travelDate',label:'Travel Date'},{key:'amount',label:'Amount'},{key:'status',label:'Status',status:true}]});};
  [['/services/hotels','Hotels','hotel','Manage hotel bookings, rooms and confirmations.'],['/services/flights','Flights','flight','Manage sectors, PNRs, ticketing and passengers.'],['/services/transfers','Transfers','airport_shuttle','Manage pickups, vehicles, drivers and manifests.'],['/services/activities','Activities','local_activity','Manage sightseeing, excursions and tickets.'],['/services/transport','Transport','directions_bus','Manage buses, cars, coaches, routes and allocations.'],['/operations','Operations','task_alt','Coordinate confirmations, manifests, vouchers and departure readiness.'],['/documents','Documents & Vouchers','description','Generate and manage travel documents and vouchers.']].forEach(function(x){
    CoreBIQ.pages[x[0]]=function(){return CoreBIQ.simplePage(x[1],x[2],x[3]);};
  });
})();
