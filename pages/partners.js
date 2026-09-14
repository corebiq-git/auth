
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{}; var d=CoreBIQ.data;
  CoreBIQ.pages['/partners/suppliers']=function(){return CoreBIQ.tablePage({title:'Suppliers',subtitle:'Supplier contacts, categories, rates and payables.',icon:'handshake',data:d.suppliers,filterKey:'category',filterLabel:'Category',columns:[
    {key:'id',label:'Supplier'},{key:'name',label:'Name'},{key:'category',label:'Category'},{key:'destination',label:'Destination'},{key:'payable',label:'Payable'},{key:'status',label:'Status',status:true}]});};
  CoreBIQ.pages['/partners/agents']=function(){return CoreBIQ.simplePage('B2B Agents','business_center','Manage agents, credit limits and partner balances.');};
})();
