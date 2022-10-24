# facebook-messenger-bot

This is a simple Facebook Messenger Bot integrated with webhook, SendGrid, and MongoDB using expessJS.

## Installation

    $ git clone project URL
    $ npm install
    $ Set up Environment file suing the config/example.env
    $ npm start


<br> 

## Question: How to solve the high volume of write operations in RDS MySQL databases?
There multiple ways to optimize furth our application so that it require less cache memory, making our application more scalable. 

1. Optimization: Queries, in the form of SELECT statements, perform all the lookup operations in the database. 
2. Besides SELECT statements, the tuning techniques for queries also apply to constructs such as CREATE TABLE...AS SELECT, INSERT INTO...SELECT, and WHERE clauses in DELETE statements.
3. Memory caches techniques: An in-memory cache removes the performance delays when an application built on a disk-based database must retrieve data from a disk before processing. Reading data from memory is faster than from the disk. In-memory caching avoids latency and improves online application performance.
4. The MySQL Query Cache: The query cache can also be useful in an environment where we have tables that do not change very 
often and for which the server receives many identical queries, for example product querys in online shopping. 
5. Indexing: to make a slow SELECT query faster, the first thing to check is whether you can add an index. It is especially important for queries that reference different tables, using features such as joins and foreign keys. 
6. Extended inserts: If we are inserting many rows from the same client at the same time, use INSERT statements with multiple VALUES lists to insert several rows at a time. This is considerably faster than using separate single-row INSERT statements. If needed we can also use bulk_insert_buffer_size variable to make data insertion even faster
It also Minimize the number of full table scans in your queries, particularly for big tables.
7. Adjust the size and properties of the memory areas that MySQL uses for caching. https://dev.mysql.com/doc/refman/8.0/en/select-optimization.html
8. Analyzing your database workload on an Amazon RDS for SQL Server DB instance with Database Engine Tuning Advisor http://mysql.rjweb.org/doc.php/mysql_analysis
9. LOAD DATA INFILE: it is the preferred solution when looking for raw performance on a single connection. It requires you to prepare a properly formatted file, so if you have to generate this file first, and/or transfer it to the database server, be sure to take that into account when measuring insert speed.
10. Using partitions: MySQL supports table partitions, which means the table is split into X mini tables (the DBA controls X). The one big table is actually divided into many small ones.
<br />

Redis: redis is a great option when we have to deal with high volumn read and write. it has High volume inserts, low latency reads. 

References: <br />
https://dev.mysql.com/doc/refman/8.0/en/select-optimization.html <br />
https://medium.com/@benmorel/high-speed-inserts-with-mysql-9d3dcd76f723 <br />
https://seo-explorer.io/blog/twenty-ways-to-optimize-mysql-for-faster-insert-rate/ <br />
https://redis.io/docs/about/<br />
 
