const isLocalhost = window.location.hostname === 'localhost';

const deployId = process.env.REACT_APP_PROPS_DEPLOY_ID;

const API_URL = isLocalhost
  ? '/api/props'
  : `https://script.google.com/macros/s/${deployId}/exec`;

console.log('🔍 HOSTNAME:', window.location.hostname);
console.log('🔧 REACT_APP_PROPS_DEPLOY_ID:', deployId);
console.log('🔀 API_URL final usado:', API_URL);

export async function obtenerPropiedades () {
  const url = `${API_URL}?action=getProperties`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error('HTTP ' + resp.status);

  return resp.json();
}
