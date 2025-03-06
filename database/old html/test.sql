CREATE or REPLACE
        VIEW `Sales_Facts`
        AS
        SELECT
            convert(convert(cs340_zimmerl.salesinvoices.InvoiceDate,
            DATETIME),
            char(23)) as FullDate,
            cs340_zimmerl.salesinvoices.CustomerID,
            cs340_zimmerl.salesinvoices .SalesEmployeeID as EmployeeID,
            cs340_zimmerl.salesinvoicedetails.ProductNumber as ProductID,
            cs340_zimmerl.salesinvoicedetails.OrderQty as UnitsSold,
            cs340_zimmerl.salesinvoicedetails.LineTotal as DollarSold
        from
            cs340_zimmerl.salesinvoicedetails
        inner join
        .salesinvoices 
        on
            cs340_zimmerl.salesinvoicedetails.SalesInvoiceID = cs340_zimmerl.salesinvoices.SalesInvoiceID
        WHERE
            (YEAR(cs340_zimmerl.salesinvoices.InvoiceDate)>= 2014)
        ORDER BY
            FullDate ;