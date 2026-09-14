
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{};
  [['/settings','Settings','settings','Configure company, users, roles, taxes and preferences.'],['/integrations','Integrations','hub','Connect payment, accounting, travel and communication services.'],['/audit','Audit Log','fact_check','Review important system activity.']].forEach(function(x){
    CoreBIQ.pages[x[0]]=function(){return CoreBIQ.simplePage(x[1],x[2],x[3]);};
  });
})();
