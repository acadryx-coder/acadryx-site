// config/countries.js
export const countries = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", price_per_student: 1000, currency: "₦", currency_code: "NGN" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", price_per_student: 15, currency: "₵", currency_code: "GHS" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", price_per_student: 300, currency: "KSh", currency_code: "KES" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", price_per_student: 50, currency: "R", currency_code: "ZAR" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", price_per_student: 2, currency: "£", currency_code: "GBP" },
  { code: "US", name: "United States", flag: "🇺🇸", price_per_student: 3, currency: "$", currency_code: "USD" }
]

export const countriesMap = countries.reduce((acc, c) => {
  acc[c.code] = c
  return acc
}, {})
