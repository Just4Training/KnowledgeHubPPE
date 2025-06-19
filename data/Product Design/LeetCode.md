## Requirement
### Functional Requirements
- User should able read/write(submit) Problems
- User should able to retrieve submitted solution
- Problem should support multi-programming languages
- User should able to see contest ranking (living)
### Non-functional
- Accessibility over consistency
- Security
- Platform support 100,000 users join competition
- High durability? 
## Core Entities
- User
- Problem
- Problem metadata
- Solution
- Contest
## API design
- GET /problems?page=1&limit=100 -> <Problem>[]
- GET /problems/:id?language={language} -> Problem
- POST /problems/:id/submit
{
    code: string
    language: string
}
- GET /contest?page=1&limit=100 -> <Problem>[]
## High-level Design
## Dive deep
## Take away