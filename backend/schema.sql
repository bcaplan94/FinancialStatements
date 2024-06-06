Create Database financial_statements;
Use financial_statements;

Create Table financial_items (
    id varchar(64) Primary KEY,
    as_of_date date not null,
    item varchar(255) not null,
    amount float,
    treeHeight int,
    parent varchar(64),
    itemOrder int,
    notes text
);

insert into financial_items (id,as_of_date,item,amount,treeHeight,parent,itemOrder,notes)
Values
    ("21111111-1111-1111-1111-111111111110","2024-06-01",'Assets',120 ,0,null,0,""),
    ("21111111-1111-1111-1111-111111111111","2024-06-01",'Cash', 30, 1,"11111111-1111-1111-1111-111111111110",1,"" ),
    ("21111111-1111-1111-1111-111111111112","2024-06-01",'Real Estate', 50, 1,"11111111-1111-1111-1111-111111111110",2,"" ),
    ("21111111-1111-1111-1111-111111111113","2024-06-01",'455', 10, 2,"11111111-1111-1111-1111-111111111112",3,"" ),
    ("21111111-1111-1111-1111-111111111114","2024-06-01",'other', 40, 2,"11111111-1111-1111-1111-111111111112",4,"" ),
    ("21111111-1111-1111-1111-111111111115","2024-06-01",'Stocks', 40, 1,"11111111-1111-1111-1111-111111111110",5,"" ),
    ("21111111-1111-1111-1111-111111111116","2024-06-01",'Liabilites', 130, 0,null,6,"" ),
    ("21111111-1111-1111-1111-111111111117","2024-06-01",'Credit Cards', 20, 1,"11111111-1111-1111-1111-111111111116",7,"" ),
    ("21111111-1111-1111-1111-111111111118","2024-06-01",'Mortgage',100, 1,"11111111-1111-1111-1111-111111111116",8,"" ),
    ("21111111-1111-1111-1111-111111111119","2024-06-01",'Car Loan',10, 1,"11111111-1111-1111-1111-111111111116",9,"" ),
    ("21111111-1111-1111-1111-11111111111a","2024-06-01",'Networth',-10, 0,null,10,"" );

   
insert into financial_items (id,as_of_date,item,amount,treeHeight,parent,itemOrder,notes)
Values
    ("11111111-1111-1111-1111-11111111111b", "2024-06-01",'Assets',120 ,0,null,0,"");
    DELETE FROM financial_items WHERE id='11111111-1111-1111-1111-11111111111b';

select * from financial_items  where as_of_date = (select max(as_of_date) from financial_items);
DELETE FROM financial_items WHERE id ='11111111-1111-1111-1111-11111111111c';
DELETE FROM financial_items WHERE id ='1111111111111111111111111111111c';

