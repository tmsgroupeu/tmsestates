# TMS Estates — Strapi fields to confirm before entering project content

## Project collection
Keep the existing relation from Project to Property. Before entering the new project copy, add or confirm these fields:

- `Title` or `title` — project name, for example `TMS Athens`.
- `slug` — URL slug.
- `Location` — use this instead of `Destination`.
- `Status` — for example `Off Plan/Under Construction` or `Under Construction – estimated delivery July 2027`.
- `Scale` — for example `4 apartments`.
- `ProjectOverview` or `Description` — rich text / long text containing the project overview paragraphs.
- `Highlights` — rich text / long text for bullet highlights. This is especially useful for TMS Tuscany.
- `coverImage` — hero image.
- `gallery` — 3 or more supporting images. The new page uses only selected images inside the story instead of showing a gallery grid.
- `properties` — relation to the individual units/properties.

## Property collection
The property collection already has the required `project` relation. Make sure every individual property/unit is linked to its parent project in Strapi.

Recommended optional fields for individual units:

- `floor`
- `coveredVeranda`
- `roofGarden`
- `parkingSpaces`
- `storageRoom`
- `energyEfficiency`
- `unitStatus`

These are optional for now; the current frontend patch will still work without them.

## Content notes from the uploaded documents
- The label `Destination` should be changed to `Location`.
- The TMS Tuscany document starts with the title `TMS Napoli`, but the overview text describes `TMS Tuscany`; enter it as `TMS Tuscany` in Strapi.
- The Tuscany location appears once as `Traconi` and later as `Trachoni`; confirm the final spelling before publishing.
