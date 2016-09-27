# Routing module.

- crud.js just handle all CRUD HTTP verb's, and connect those verbs to actions using the controller/crud.
- company.js is just an example to showcase how to extend the basic behaviour of the crud.js router, example:
  - you create company entity (create/read/update/delete), but you want to avoid two companies with the same name.
  - company.js use a middleware to validate this type of business case before handling the control to the default crud.js router.
