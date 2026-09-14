
(function(){
  window.CoreBIQ = window.CoreBIQ || {};
  CoreBIQ.data = {
    customers:[
      {id:'CUS-1001',name:'Afsal Hyd',contact:'+91 98765 43210',segment:'Corporate',status:'Active'},
      {id:'CUS-1002',name:'Sarah J.',contact:'+91 98765 11111',segment:'FIT Traveller',status:'Active'},
      {id:'CUS-1003',name:'Nihal K.',contact:'+91 98765 22222',segment:'Umrah',status:'Active'},
      {id:'CUS-1004',name:'Rashid P.',contact:'+91 98765 33333',segment:'Family',status:'Inactive'}
    ],
    leads:[
      {id:'LD-2081',requirement:'Dubai Family Trip',customer:'Afsal Hyd',value:'₹1.20L',stage:'Hot'},
      {id:'LD-2079',requirement:'Kerala Honeymoon',customer:'Sarah J.',value:'₹78,000',stage:'Qualified'},
      {id:'LD-2075',requirement:'Umrah December',customer:'Nihal K.',value:'₹2.40L',stage:'Follow-up'}
    ],
    bookings:[
      {id:'BK-1048',customer:'Afsal Hyd',package:'Dubai Family Escape',travelDate:'18 Sep 2026',amount:'₹86,500',status:'Confirmed'},
      {id:'BK-1047',customer:'Sarah J.',package:'Kerala Explorer',travelDate:'21 Sep 2026',amount:'₹42,800',status:'Payment Due'},
      {id:'BK-1046',customer:'Nihal K.',package:'Umrah Premium',travelDate:'29 Sep 2026',amount:'₹1,24,000',status:'Processing'}
    ],
    packages:[
      {id:'PK-1001',name:'Dubai Family Escape',destination:'Dubai',nights:'5',price:'₹86,500',status:'Published'},
      {id:'PK-1002',name:'Kerala Explorer',destination:'Kerala',nights:'6',price:'₹42,800',status:'Published'},
      {id:'PK-1003',name:'Maldives Couple',destination:'Maldives',nights:'4',price:'₹78,000',status:'Draft'},
      {id:'PK-1004',name:'Umrah Premium',destination:'Saudi Arabia',nights:'12',price:'₹1,24,000',status:'Published'}
    ],
    suppliers:[
      {id:'SUP-204',name:'Dubai Hotels',category:'Hotel',destination:'Dubai',payable:'₹38,200',status:'Active'},
      {id:'SUP-198',name:'Transport Partner',category:'Transport',destination:'Kerala',payable:'₹12,500',status:'Active'},
      {id:'SUP-176',name:'Saudi DMC',category:'DMC',destination:'Saudi Arabia',payable:'₹74,000',status:'On Hold'}
    ]
  };
})();
