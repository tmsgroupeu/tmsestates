export type PropertyDisplayLike = {
  price?: number | string | null;
  currency?: string | null;
  prop_status?: string | null;
  marketing_label?: string | null;
  marketing_tags?: string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  area?: number | string | null;
  bedroomsLabel?: string | null;
  bathroomsLabel?: string | null;
  areaLabel?: string | null;
};

export function readable(value?: string | null) {
  if (!value) return "";
  return String(value).replace(/[-_]/g, " ");
}

function normalized(value?: string | null) {
  return readable(value).trim().toLowerCase();
}

function hasValue(value: unknown) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function moneyValue(value: unknown) {
  if (!hasValue(value)) return null;
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : null;
}

export function isSoldProperty(property: PropertyDisplayLike) {
  return [
    normalized(property.prop_status),
    normalized(property.marketing_label),
    normalized(property.marketing_tags),
  ].includes("sold");
}

export function isRentedProperty(property: PropertyDisplayLike) {
  return [
    normalized(property.prop_status),
    normalized(property.marketing_label),
    normalized(property.marketing_tags),
  ].includes("rented");
}

export function formatPropertyPrice(property: PropertyDisplayLike) {
  if (isSoldProperty(property)) return "Sold";
  if (isRentedProperty(property)) return "Rented";

  const price = moneyValue(property.price);
  if (!price) return "Price Upon Request";

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: property.currency || "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function bedroomText(property: PropertyDisplayLike) {
  if (hasValue(property.bedroomsLabel)) return String(property.bedroomsLabel).trim();
  if (hasValue(property.bedrooms)) return `${property.bedrooms} Beds`;
  return "";
}

export function bathroomText(property: PropertyDisplayLike) {
  if (hasValue(property.bathroomsLabel)) return String(property.bathroomsLabel).trim();
  if (hasValue(property.bathrooms)) return `${property.bathrooms} Baths`;
  return "";
}

export function areaText(property: PropertyDisplayLike) {
  if (hasValue(property.areaLabel)) return String(property.areaLabel).trim();
  if (hasValue(property.area)) return `${property.area} m²`;
  return "";
}

export function bedroomValue(property: PropertyDisplayLike) {
  if (hasValue(property.bedroomsLabel)) return String(property.bedroomsLabel).trim();
  if (hasValue(property.bedrooms)) return String(property.bedrooms);
  return "—";
}

export function bathroomValue(property: PropertyDisplayLike) {
  if (hasValue(property.bathroomsLabel)) return String(property.bathroomsLabel).trim();
  if (hasValue(property.bathrooms)) return String(property.bathrooms);
  return "—";
}

export function areaValue(property: PropertyDisplayLike, fallback = "—") {
  return areaText(property) || fallback;
}
