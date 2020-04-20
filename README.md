# What's this?

An implementation of an "EAV pattern" that can be used to store arbitrary KV data
in MongoDB. The idea is that you can dynamically add "types" of entities, and the
system will:

* Have GET, POST, PATCH, DELETE endpoints for entities of that type
* Support the appropriate validation and permissions on operations for that type
* Store and query associated data from MongoDB

# How It Works

## Concepts

* *Naming*. Things are named twice:
    * A human-friendly "display name"
    * An API-friendly "moniker"

* *Lifecycle*. Records are created during "intake". Their fields can be modified
using an "assessment", or an "API" call.

## Creating Types

You create "types" which have:
* A display name and moniker
* A set of attributes, each of which has:
    * A display name and moniker
    * A JSON schema
    * Permissions for "intake" and "assessments"

A sample type can be found [here](etc/sampleType.json)

## Creating Records

Once you've defined a type, you can create records of that type.

* Permissions. You MUST supply values for every field that is *REQUIRED* for intake,
and you MAY supply values for another that is *ALLOWED* for intake. You MAY NOT supply
values for anything which is marked as *NONE*. The system will enforce these rules.

* Validation. Your values MUST conform to the required JSON schema. The system will perform
validation and reject invalid requests.

A sample of creating a record can be found [here](etc/sampleCreate.json)

## Updating Records - API

Once you've created a record, you can update it.

* Permissions. You MAY supply new values for every field that is *READ_WRITE* for assessments.
You MAY NOT update anything that is *READ* or *NONE*. The system will enforce these
rules.

* Validation. Your values MUST conform to the required JSON schema. The system will perform
validation and reject invalid requests.

A sample of updating a record can be found [here](etc/sampleUpdate.json)

## Updating Records - Assessments

*NOT IMPLEMENTED*

The idea here is that a data type would be associated with a pair of "templates" which would
allow someone to:
    * Create a new record of that type; and,
    * Update an existing record of that type

This would require:
    * Addition of a service to manage templates
    * Creation of a form generator
    * Creation of APIs to serve that form

# Future

* Add support for declaring indexed properties on data types
* Add support for modifying data types
* Add change history to records
