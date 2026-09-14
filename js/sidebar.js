
(function(){
  window.CoreBIQ = window.CoreBIQ || {};
  var C=CoreBIQ;

  C.nav = [
    {section:'WORKSPACE'},
    {title:'Overview',icon:'home',path:'/'},
    {id:'crm',title:'CRM',icon:'group',items:[
      ['Leads','/crm/leads'],['Customers','/crm/customers'],['Enquiries','/crm/enquiries'],['Follow-ups','/crm/followups']
    ]},
    {section:'PRODUCTS'},
    {id:'packages',title:'Travel Packages',icon:'luggage',items:[
      ['All Packages','/products/packages'],['Package Builder','/products/package-builder'],['Pricing & Costing','/products/costing'],['Destinations','/products/destinations']
    ]},
    {title:'Itineraries',icon:'route',path:'/itineraries'},
    {title:'Quotations',icon:'request_quote',path:'/quotations'},
    {title:'Visa & Immigration',icon:'travel_explore',path:'/visa'},
    {title:'Umrah',icon:'mosque',path:'/umrah'},
    {section:'BOOKINGS & OPERATIONS'},
    {title:'Bookings',icon:'book_online',path:'/bookings'},
    {id:'services',title:'Services',icon:'confirmation_number',items:[
      ['Hotels','/services/hotels'],['Flights','/services/flights'],['Transfers','/services/transfers'],['Activities','/services/activities'],['Transport','/services/transport']
    ]},
    {title:'Operations',icon:'task_alt',path:'/operations'},
    {title:'Documents & Vouchers',icon:'description',path:'/documents'},
    {section:'PARTNERS'},
    {title:'Suppliers',icon:'handshake',path:'/partners/suppliers'},
    {title:'B2B Agents',icon:'business_center',path:'/partners/agents'},
    {section:'FINANCE'},
    {id:'finance',title:'Finance & Accounts',icon:'account_balance_wallet',items:[
      ['Transactions','/finance/transactions'],['Invoices & Payments','/finance/invoices'],['Refunds & Credits','/finance/refunds'],['Ledgers','/finance/ledgers']
    ]},
    {title:'Reports & Analytics',icon:'analytics',path:'/reports'},
    {section:'ENGAGEMENT'},
    {title:'Communications',icon:'chat',path:'/communications'},
    {title:'Marketing',icon:'campaign',path:'/marketing'},
    {title:'Fly AI',icon:'auto_awesome',path:'/ai'},
    {section:'ADMINISTRATION'},
    {title:'Users & Staff',icon:'manage_accounts',path:'/admin/users'},
    {title:'Settings',icon:'settings',path:'/settings'},
    {title:'Integrations',icon:'hub',path:'/integrations'},
    {title:'Audit Log',icon:'fact_check',path:'/audit'}
  ];

  C.renderNav=function(){
    var el=document.getElementById('nav-container'); if(!el)return;
    el.innerHTML=C.nav.map(function(n){
      if(n.section)return '<div class="px-4 pt-3 pb-1 section-kicker">'+n.section+'</div>';
      if(n.items)return '<div>'+
        '<button data-submenu="'+n.id+'" class="w-full flex items-center justify-between px-4 py-3 rounded-full text-m3-onSurfaceVariant hover:bg-m3-surfaceContainerHigh transition-colors">'+
        '<div class="flex items-center gap-3">'+C.icon(n.icon)+'<span class="label-lg">'+n.title+'</span></div>'+
        C.icon('expand_more','text-[20px] transition-transform duration-300')+'</button>'+
        '<div id="menu-'+n.id+'" class="submenu-transition flex flex-col pl-12 pr-4 space-y-1">'+
        n.items.map(function(x){return '<a href="'+x[1]+'" data-link class="nav-item py-2.5 label-lg text-m3-onSurfaceVariant hover:text-m3-primary transition-colors block">'+x[0]+'</a>';}).join('')+
        '</div></div>';
      return '<a href="'+n.path+'" data-link class="nav-item flex items-center gap-3 px-4 py-3 rounded-full text-m3-onSurfaceVariant hover:bg-m3-surfaceContainerHigh transition-colors">'+
        C.icon(n.icon)+'<span class="label-lg">'+n.title+'</span></a>';
    }).join('');

    el.querySelectorAll('[data-submenu]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var id=btn.getAttribute('data-submenu'),m=document.getElementById('menu-'+id);
        m.classList.toggle('submenu-open');
        var ic=btn.querySelector('.material-symbols-outlined:last-child');
        if(ic)ic.style.transform=m.classList.contains('submenu-open')?'rotate(180deg)':'rotate(0deg)';
      });
    });
  };

  C.Sidebar={
    open:false,
    toggle:function(){
      this.open=!this.open;
      var s=document.getElementById('sidebar'),b=document.getElementById('sidebarBackdrop');
      if(this.open){
        s.classList.add('open'); b.classList.remove('hidden');
        requestAnimationFrame(function(){b.classList.replace('opacity-0','opacity-100');});
      }else{
        s.classList.remove('open'); b.classList.replace('opacity-100','opacity-0');
        setTimeout(function(){b.classList.add('hidden');},300);
      }
    }
  };
})();
