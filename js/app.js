
(function(){
  var C=window.CoreBIQ;
  C.pages=C.pages||{};

  C.simplePage=function(title,icon,subtitle){
    return '<div class="page-enter max-w-5xl mx-auto"><div class="soft-card p-6 sm:p-8">'+
      '<div class="flex items-start gap-4"><div class="module-icon">'+C.icon(icon)+'</div><div><h1 class="headline-lg">'+title+'</h1><p class="body-lg text-m3-onSurfaceVariant mt-2">'+subtitle+'</p></div></div>'+
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">'+
      [['Records','128','database'],['Pending','14','pending_actions'],['Completed','114','check_circle']].map(function(x){
        return '<div class="stat-mini">'+C.icon(x[2],'text-m3-primary')+'<strong>'+x[1]+'</strong><span class="body-md text-m3-onSurfaceVariant">'+x[0]+'</span></div>';
      }).join('')+'</div></div></div>';
  };

  function render(){
    var path=location.pathname;
    // Downloaded HTML commonly opens under content://downloads/...; never show 404 for that shell path.
    if(!C.pages[path]) path='/';
    document.getElementById('page-title').textContent=path==='/'?'Overview':(document.querySelector('.nav-item-active')?.textContent?.trim()||C.titleMap?.[path]||'CoreBIQ Fly');
    document.title=(document.getElementById('page-title').textContent)+' - CoreBIQ Fly';
    document.getElementById('app-content').innerHTML=C.pages[path]();
    bindPage();
    updateActive(path);
    document.getElementById('app-content').scrollTop=0;
  }

  function updateActive(path){
    document.querySelectorAll('.nav-item').forEach(function(a){a.classList.toggle('nav-item-active',a.getAttribute('href')===path);});
    document.querySelectorAll('.mobile-nav-item').forEach(function(a){
      var box=a.querySelector('div'),ic=a.querySelector('.material-symbols-outlined');
      var active=a.getAttribute('href')===path || (path!=='/' && a.getAttribute('href')==='/operations' && path.indexOf('/services/')===0);
      if(box)box.classList.toggle('bg-m3-primaryContainer',active);
      if(ic){ic.classList.toggle('text-m3-onPrimaryContainer',active);ic.style.fontVariationSettings=active?"'FILL' 1":"'FILL' 0";}
    });
  }

  function bindPage(){
    var root=document.getElementById('app-content');
    var table=root.querySelector('[data-table-page]');
    root.querySelector('[data-filter-toggle]')?.addEventListener('click',function(){root.querySelector('[data-filter-panel]')?.classList.toggle('open');});
    root.querySelector('[data-add]')?.addEventListener('click',function(){alert('New record form is ready to connect to CoreBIQ data/API.');});
    if(!table)return;
    var cfg=buildConfig(location.pathname);
    function refresh(){C.renderTableRows(table,cfg);}
    root.querySelector('[data-search]')?.addEventListener('input',refresh);
    root.querySelector('[data-filter]')?.addEventListener('change',refresh);
    root.querySelector('[data-sort]')?.addEventListener('change',refresh);
    root.querySelector('[data-reset]')?.addEventListener('click',function(){
      var s=root.querySelector('[data-search]'),f=root.querySelector('[data-filter]'),so=root.querySelector('[data-sort]');
      if(s)s.value='';if(f)f.value='';if(so)so.value='';refresh();
    });
    root.querySelectorAll('[data-col]').forEach(function(b){b.addEventListener('click',function(){
      var so=root.querySelector('[data-sort]');if(so){so.value=b.getAttribute('data-col');refresh();}
    });});
    refresh();
  }

  function buildConfig(path){
    var d=C.data, base={
      '/crm/customers':{title:'Customers',subtitle:'Customer profiles, segments and relationship history.',icon:'group',data:d.customers,filterKey:'segment',filterLabel:'Segment',columns:[['id','ID'],['name','Name'],['contact','Contact'],['segment','Segment'],['status','Status']]},
      '/crm/leads':{title:'Leads',subtitle:'Capture, qualify and follow up travel enquiries.',icon:'person_search',data:d.leads,filterKey:'stage',filterLabel:'Stage',columns:[['id','ID'],['requirement','Requirement'],['customer','Customer'],['value','Value'],['stage','Stage']]},
      '/bookings':{title:'Bookings',subtitle:'Confirmed, pending and operational travel bookings.',icon:'book_online',data:d.bookings,filterKey:'status',filterLabel:'Status',columns:[['id','Booking'],['customer','Customer'],['package','Package'],['travelDate','Travel Date'],['amount','Amount'],['status','Status']]},
      '/products/packages':{title:'Travel Packages',subtitle:'Build, publish and manage travel packages.',icon:'luggage',data:d.packages,filterKey:'destination',filterLabel:'Destination',columns:[['id','Package'],['name','Name'],['destination','Destination'],['nights','Nights'],['price','Price'],['status','Status']]},
      '/partners/suppliers':{title:'Suppliers',subtitle:'Supplier contacts, categories, rates and payables.',icon:'handshake',data:d.suppliers,filterKey:'category',filterLabel:'Category',columns:[['id','Supplier'],['name','Name'],['category','Category'],['destination','Destination'],['payable','Payable'],['status','Status']]}
    }[path];
    if(!base)return null;
    base.columns=base.columns.map(function(x){return {key:x[0],label:x[1],status:x[0]==='status'||x[0]==='stage'};});
    return base;
  }

  document.addEventListener('DOMContentLoaded',function(){
    C.renderNav();

    document.getElementById('sidebarBackdrop')?.addEventListener('click',function(){C.Sidebar.toggle();});
    document.getElementById('mobileMoreBtn')?.addEventListener('click',function(){C.Sidebar.toggle();});

    document.body.addEventListener('click',function(e){
      var a=e.target.closest('[data-link]');
      if(!a)return;
      var href=a.getAttribute('href');if(!href)return;
      e.preventDefault();
      history.pushState({},'',href);
      render();
      if(innerWidth<768 && C.Sidebar.open)C.Sidebar.toggle();
    });

    window.addEventListener('popstate',render);
    render();

    var splash=document.getElementById('flySplash');
    if(splash){
      setTimeout(function(){splash.classList.add('fly-hide');},650);
      setTimeout(function(){splash.remove();},1000);
    }
  });
})();
