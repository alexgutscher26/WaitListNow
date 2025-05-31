-- Check if the User table exists and show its columns
SELECT 
    table_name, 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_name = 'User'
ORDER BY 
    ordinal_position;
