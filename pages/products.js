
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{}; var d=CoreBIQ.data;
  CoreBIQ.pages['/products/packages']=function(){return CoreBIQ.tablePage({title:'Travel Packages',subtitle:'Build, publish and manage travel packages.',icon:'luggage',data:d.packages,filterKey:'destination',filterLabel:'Destination',columns:[
    {key:'id',label:'Package'},{key:'name',label:'Name'},{key:'destination',label:'Destination'},{key:'nights',label:'Nights'},{key:'price',label:'Price'},{key:'status',label:'Status',status:true}]});};
  CoreBIQ.pages['/products/package-builder']=function(){return CoreBIQ.simplePage('Package Builder','build','Create packages with destinations, services, day plans, pricing, markup and inclusions.');};
  CoreBIQ.pages['/products/costing']=function(){return CoreBIQ.simplePage('Pricing & Costing','calculate','Control supplier cost, markup, discounts, taxes, margins and selling prices.');};
  CoreBIQ.pages['/products/destinations']=function(){return CoreBIQ.simplePage('Destinations','location_on','Manage destinations and package availability.');};
  CoreBIQ.pages['/itineraries']=function(){return CoreBIQ.simplePage('Itineraries','route','Build day-wise FIT and group travel programmes.');};
  CoreBIQ.pages['/quotations']=function(){return CoreBIQ.simplePage('Quotations','request_quote','Prepare, send and approve travel quotations.');};
  CoreBIQ.pages['/visa']=function(){return CoreBIQ.simplePage('Visa & Immigration','travel_explore','Manage visa applications and document readiness.');};
  CoreBIQ.pages['/umrah']=function(){return CoreBIQ.simplePage('Umrah','mosque','Manage Umrah programmes, travellers and operations.');};
})();
