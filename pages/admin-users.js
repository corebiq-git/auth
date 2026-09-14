(function(){
  CoreBIQ.pages=CoreBIQ.pages||{};
  CoreBIQ.pages['/admin/users']=function(){
    return '<div class="page-enter space-y-5"><div class="page-toolbar"><div class="page-toolbar-left flex items-center gap-3"><div class="module-icon">'+CoreBIQ.icon('manage_accounts')+'</div><div><h1 class="headline-lg">Users & Staff</h1><div class="page-note">Manage CoreBIQ Fly workspace access, roles and staff status.</div></div></div><div class="page-toolbar-actions"><button class="primary-btn" id="addStaffBtn">'+CoreBIQ.icon('person_add')+' Add Staff</button></div></div><div class="soft-card p-4"><div class="relative"><input id="staffSearch" class="search-field" style="width:100%;padding-left:44px" placeholder="Search users by name or email"><span class="material-symbols-outlined absolute left-4 top-[11px] text-m3-onSurfaceVariant">search</span></div></div><div id="staffList" class="space-y-3"><div class="soft-card p-6 text-center body-md text-m3-onSurfaceVariant">Loading users…</div></div></div>';
  };
  async function loadUsers(){
    var list=document.getElementById('staffList'); if(!list||!CoreBIQ.db)return;
    if(!CoreBIQ.profile || CoreBIQ.profile.role!=='admin'){list.innerHTML='<div class="soft-card p-6"><div class="title-md">Access restricted</div><div class="body-md text-m3-onSurfaceVariant mt-1">Only administrators can manage users and staff.</div></div>';return;}
    try{
      var snap=await CoreBIQ.db.collection('users').where('companyId','==',CoreBIQ.profile.companyId).get(); var rows=[];
      snap.forEach(function(doc){rows.push(Object.assign({uid:doc.id},doc.data()));});
      function draw(){var q=(document.getElementById('staffSearch')?.value||'').toLowerCase();var filtered=rows.filter(function(u){return !q||String(u.displayName||'').toLowerCase().includes(q)||String(u.email||'').toLowerCase().includes(q)||String(u.role||'').toLowerCase().includes(q);});list.innerHTML=filtered.length?filtered.map(function(u){return '<div class="soft-card p-4 flex items-center justify-between gap-4"><div class="flex items-center gap-3 min-w-0"><div class="module-icon">'+CoreBIQ.icon('person')+'</div><div class="min-w-0"><div class="title-md truncate">'+(u.displayName||'Unnamed staff')+'</div><div class="body-md text-m3-onSurfaceVariant truncate">'+(u.email||'')+'</div></div></div><div class="flex items-center gap-2">'+CoreBIQ.status(u.role||'staff')+CoreBIQ.status(u.status||'active')+'</div></div>';}).join(''):'<div class="soft-card p-6 text-center body-md text-m3-onSurfaceVariant">No users found.</div>';}
      draw(); document.getElementById('staffSearch')?.addEventListener('input',draw);
    }catch(e){list.innerHTML='<div class="soft-card p-6"><div class="title-md">Unable to load users</div><div class="body-md text-m3-onSurfaceVariant mt-1">Check Firebase configuration and Firestore rules.</div></div>';}
  }
  async function addStaff(){
    if(!CoreBIQ.profile||CoreBIQ.profile.role!=='admin')return alert('Administrator access required.');
    var name=prompt('Staff name');if(!name)return;var email=prompt('Staff email');if(!email)return;var role=prompt('Role: manager, sales, operations, finance, visa, staff','staff')||'staff';var password=prompt('Temporary password (minimum 6 characters)');if(!password||password.length<6)return alert('Use a temporary password with at least 6 characters.');var secondary;
    try{secondary=firebase.initializeApp(COREBIQ_FIREBASE_CONFIG,'staff_'+Date.now());var cred=await secondary.auth().createUserWithEmailAndPassword(email.trim(),password);await cred.user.sendEmailVerification();await CoreBIQ.db.collection('users').doc(cred.user.uid).set({displayName:name.trim(),email:email.trim(),role:role,status:'active',companyId:CoreBIQ.profile.companyId,department:role,createdAt:firebase.firestore.FieldValue.serverTimestamp()});alert('Staff account created. A verification email was sent.');await secondary.delete();loadUsers();}catch(e){alert(e.message||'Unable to create staff account.');try{if(secondary)await secondary.delete();}catch(_){} }
  }
  window.addEventListener('corebiq:profile-ready',loadUsers);document.addEventListener('click',function(e){if(e.target.closest('#addStaffBtn'))addStaff();});window.addEventListener('popstate',function(){if(location.pathname==='/admin/users')setTimeout(loadUsers,0);});
})();
