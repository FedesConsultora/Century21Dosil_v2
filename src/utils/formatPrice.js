// src/utils/formatPrice.js

export function formatUSD(rawValue) {
    // 1. Si el valor no existe, devolvemos cadena vacía
    if (rawValue === null || rawValue === undefined) {
      return "";
    }
  
    // 2. Convertir a string para poder usar replace
    const rawString = String(rawValue);
  
    // 3. Quitar todo lo que no sean dígitos (opcional)
    //    Esto ayuda si tienes algo como "USD 135000" o "U$S 135.000"
    const digits = rawString.replace(/\D/g, ""); // extraer solo dígitos
  
    if (!digits) {
      // si no queda ningún dígito, devolvemos el valor original
      return rawString;
    }
  
    // 4. Convertir a número y formatear
    const num = parseInt(digits, 10);
    // Formatear con separadores de miles usando toLocaleString
    const formatted = num.toLocaleString("es-AR");
  
    // 5. Retornar en formato "USD 135.000"
    return `USD ${formatted}`;
  }
  