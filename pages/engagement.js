
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{};
  [['/communications','Communications','chat','Centralize customer and operational communication.'],['/marketing','Marketing','campaign','Manage campaigns, offers and lead sources.'],['/ai','Fly AI','auto_awesome','AI-assisted travel planning and operational insights.']].forEach(function(x){
    CoreBIQ.pages[x[0]]=function(){return CoreBIQ.simplePage(x[1],x[2],x[3]);};
  });
})();
