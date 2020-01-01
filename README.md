# apex

a library for building things


## apex/schema

Methods:

`validate (schema, data)`

validates data against the given schema

`getPath(schema, data, path)`

returns { schema, value } for the given 'path'

`get(schema, data, path)`

returns the nested value at 'path'

`set (schema, data, path, value)`

sets the nested value at 'path'

