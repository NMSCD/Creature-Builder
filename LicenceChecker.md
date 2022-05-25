API
CRUD licence
- Props
  - guid
  - name
  - hash
  - isActive
  - dateCreated
  - dateRedeemed

On activate
- hash licence and name
- Set name
- Set dateRedeemed
- return has to requester

On hashExists check
- If hash exists in db & row isActive



WinApp

On boot
- No hashLicence exists
  - Ask licence
  - submit to API
  - persist hash returned
- hashLicence exists
  - check if hashLicence is valid
