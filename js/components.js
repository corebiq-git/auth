
(function(){
  window.CoreBIQ = window.CoreBIQ || {};
  var C = CoreBIQ;

  C.icon = function(name, cls){
    return '<span class="material-symbols-outlined '+(cls||'')+'">'+name+'</span>';
  };

  C.status = function(text){
    var t=String(text||'').toLowerCase();
    var type=(t.indexOf('active')>=0||t.indexOf('confirmed')>=0||t.indexOf('published')>=0||t.indexOf('received')>=0||t.indexOf('success')>=0)
      ? 'green'
      : (t.indexOf('hot')>=0||t.indexOf('due')>=0||t.indexOf('follow')>=0||t.indexOf('draft')>=0||t.indexOf('hold')>=0||t.indexOf('inactive')>=0)
      ? 'orange' : 'blue';
    return '<span class="status status-'+type+'">'+text+'</span>';
  };

  C.pageHeader = function(title, subtitle, icon){
    return '<div class="page-toolbar">'+
      '<div class="page-toolbar-left flex items-center gap-3">'+
        '<div class="module-icon">'+C.icon(icon)+'</div>'+
        '<div><h1 class="headline-lg">'+title+'</h1><div class="page-note">'+subtitle+'</div></div>'+
      '</div>'+
      '<div class="page-toolbar-actions">'+
        '<button class="secondary-btn" data-filter-toggle>'+C.icon('filter_list')+' Filter</button>'+
        '<button class="primary-btn" data-add>'+C.icon('add')+' New</button>'+
      '</div>'+
    '</div>';
  };

  C.tablePage = function(cfg){
    var id='table_'+Date.now();
    var options='';
    if(cfg.filterKey){
      var vals=[];
      cfg.data.forEach(function(r){ if(vals.indexOf(r[cfg.filterKey])<0) vals.push(r[cfg.filterKey]); });
      options='<select class="toolbar-control" data-filter><option value="">All '+cfg.filterLabel+'</option>'+
        vals.map(function(v){return '<option value="'+v+'">'+v+'</option>';}).join('')+'</select>';
    }
    options+='<select class="toolbar-control" data-sort><option value="">Sort: Default</option>'+
      cfg.columns.map(function(c){return '<option value="'+c.key+'">'+c.label+'</option>';}).join('')+
      '</select><button class="secondary-btn" data-reset>Reset</button>';

    return '<div class="page-enter space-y-5" data-table-page id="'+id+'">'+
      C.pageHeader(cfg.title,cfg.subtitle,cfg.icon)+
      '<div class="soft-card p-4">'+
        '<div class="flex items-center gap-3">'+
          '<div class="relative flex-1">'+C.icon('search','absolute left-4 top-[10px] text-[22px] text-m3-onSurfaceVariant')+
          '<input class="search-field" data-search placeholder="'+(cfg.placeholder||'Search...')+'" style="width:100%;padding-left:44px"></div>'+
          '<div class="record-count whitespace-nowrap" data-count></div>'+
        '</div>'+
        '<div class="filter-panel" data-filter-panel>'+options+'</div>'+
      '</div>'+
      '<div class="table-wrap"><table class="data-table"><thead><tr>'+
      cfg.columns.map(function(c){return '<th><button class="sort-btn" data-col="'+c.key+'">'+c.label+' ↕</button></th>';}).join('')+
      '</tr></thead><tbody data-rows></tbody></table></div>'+
      '</div>';
  };

  C.renderTableRows = function(root,cfg){
    var q=(root.querySelector('[data-search]')||{}).value||'';
    q=q.toLowerCase().trim();
    var f=(root.querySelector('[data-filter]')||{}).value||'';
    var s=(root.querySelector('[data-sort]')||{}).value||'';
    var rows=cfg.data.filter(function(r){
      return (!q || Object.keys(r).some(function(k){return String(r[k]).toLowerCase().indexOf(q)>=0;}))
        && (!f || String(r[cfg.filterKey])===String(f));
    });
    if(s) rows.sort(function(a,b){return String(a[s]).localeCompare(String(b[s]),undefined,{numeric:true,sensitivity:'base'});});
    root.querySelector('[data-count]').textContent=rows.length+' of '+cfg.data.length;
    root.querySelector('[data-rows]').innerHTML=rows.length ? rows.map(function(r){
      return '<tr>'+cfg.columns.map(function(c){
        return '<td>'+(c.status?C.status(r[c.key]):(r[c.key]===undefined?'':r[c.key]))+'</td>';
      }).join('')+'</tr>';
    }).join('') :
      '<tr><td colspan="'+cfg.columns.length+'"><div class="empty-state">'+C.icon('search_off','text-[32px]')+
      '<div class="title-md mt-2">No records found</div><div class="page-note">Try another search or filter.</div></div></td></tr>';
  };
})();
