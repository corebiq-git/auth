
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{};
  var d=CoreBIQ.data;
  CoreBIQ.pages['/crm/customers']=function(){return CoreBIQ.tablePage({title:'Customers',subtitle:'Customer profiles, segments and relationship history.',icon:'group',data:d.customers,filterKey:'segment',filterLabel:'Segment',columns:[
    {key:'id',label:'ID'},{key:'name',label:'Name'},{key:'contact',label:'Contact'},{key:'segment',label:'Segment'},{key:'status',label:'Status',status:true}]});};
  CoreBIQ.pages['/crm/leads']=function(){return CoreBIQ.tablePage({title:'Leads',subtitle:'Capture, qualify and follow up travel enquiries.',icon:'person_search',data:d.leads,filterKey:'stage',filterLabel:'Stage',columns:[
    {key:'id',label:'ID'},{key:'requirement',label:'Requirement'},{key:'customer',label:'Customer'},{key:'value',label:'Value'},{key:'stage',label:'Stage',status:true}]});};
  CoreBIQ.pages['/crm/enquiries']=function(){return CoreBIQ.simplePage('Travel Enquiries','question_mark','Capture and qualify travel requirements before itinerary and quotation.');};
  CoreBIQ.pages['/crm/followups']=function(){return CoreBIQ.simplePage('Follow-ups','event_repeat','Manage scheduled callbacks, reminders and customer follow-up activity.');};
})();
