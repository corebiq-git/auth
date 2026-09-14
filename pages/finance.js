
(function(){
  CoreBIQ.pages=CoreBIQ.pages||{};
  [['/finance/transactions','Transactions','receipt_long','Track receipts, payables and adjustments.'],['/finance/invoices','Invoices & Payments','payments','Issue invoices and track payment schedules.'],['/finance/refunds','Refunds & Credits','currency_exchange','Process cancellations, refunds and credit notes.'],['/finance/ledgers','Ledgers','account_balance','Track customer, supplier and agent balances.'],['/reports','Reports & Analytics','analytics','Sales, profitability, receivables and operations reporting.']].forEach(function(x){
    CoreBIQ.pages[x[0]]=function(){return CoreBIQ.simplePage(x[1],x[2],x[3]);};
  });
})();
