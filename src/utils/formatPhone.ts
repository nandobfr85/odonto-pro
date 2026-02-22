export function formatPhone(phone: string) {
  const cleanedValue = phone.replace(/\D/g, "");

  if (cleanedValue.length > 11) {
    return cleanedValue.slice(0, 15);
  }

  const formattedValue = cleanedValue.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3",
  );

  return formattedValue;
}

export function extractPhoneNumber(phone: string) {
  const phoneValue = phone.replace(/[\(\)\s-]/g, "");

  return phoneValue;
}
