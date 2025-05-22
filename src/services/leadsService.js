const isLocalhost = window.location.hostname === 'localhost';
const API_LEADS_URL = isLocalhost
  ? '/api/leads'
  : `https://script.google.com/macros/s/${process.env.REACT_APP_LEADS_DEPLOY_ID}/exec`;

console.log('🔧 API_LEADS_URL:', API_LEADS_URL);


// Guardar formulario
export async function guardarFormulario(formData) {
  const url = `${API_LEADS_URL}?action=guardarFormulario`;

  console.log('📤 Enviando datos del formulario:', formData);
  console.log('📤 Endpoint destino:', url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData)
  });

  const text = await response.text();
  console.log('📥 Respuesta recibida:', text);

  if (!response.ok) throw new Error('Error HTTP: ' + response.status);
  return text;
}

// Guardar UTM
export async function guardarUTM(leadId, utmParams) {
  const url = `${API_LEADS_URL}?action=guardarUTM`;

  const page_url = window.location.href;
  const device = /Mobi|Android/i.test(navigator.userAgent) ? 'Móvil' : 'Escritorio';

  const safeUTM = {
    utm_source: utmParams.utm_source || '',
    utm_medium: utmParams.utm_medium || '',
    utm_campaign: utmParams.utm_campaign || '',
    utm_term: utmParams.utm_term || '',
    utm_content: utmParams.utm_content || ''
  };

  const body = new URLSearchParams({
    id_utm: leadId,
    ...safeUTM,
    page_url,
    device
  });

  console.log('📤 Enviando UTMs:', Object.fromEntries(body.entries()));
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  const text = await response.text();
  console.log('📥 Respuesta UTM:', text);
}

// Sincronizar leads (este probablemente no funcione en local con no-cors si querés ver la respuesta)
export async function sincronizarLeads() {
  try {
    await fetch(`${API_LEADS_URL}?action=sincronizarLeads`, {
      method: 'GET',
      mode: 'no-cors'
    });
    return true;
  } catch (error) {
    console.error('sincronizarLeads failed:', error);
    throw error;
  }
}
