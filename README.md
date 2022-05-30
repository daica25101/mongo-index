# For this example:
## Create index for email field in user model
## Result (Query to look for user with exact email):
 - Before create index: Around 75ms to find.
 - After create index: Around 2ms to find
 - Conclusion: It's 30x faster.


# What is cluster index ? 
It's a index on a single column which is primary key for the table, mostly it's the "id" column or "_id"

#What is non cluster index?
Opposite with cluster index, index for column which is not primary key. 

How many types of indexing are there except cluster ? 
Listed below:

#Compound index
- Compound index is for group of field which is often used to perform a query
- Example like User table usually being queried with "email" and "status" columns.
- Creating compound for these 2 fields increase the query time to 30x faster.
- But what if we crete another single field index on "email" column. Is it conflicted with the compound index?
- It's not, email index is for query email only. Compound between "email" and "status" won't help increase query with only "email"
#Single field index
#Unique index
#Spare Index
- Spare index is for null column field in record. 
- Example like User table has "isBlocked" but default of "isBlocked" in each created record is null. 
- Example like User table has 1 billion records, half of its had null value for "isBlocked" field.
- Creating a spare index for "isBlocked" will ignore useless 500 mil record loop when performing a query on DB.
#TTL Index
#Text index

