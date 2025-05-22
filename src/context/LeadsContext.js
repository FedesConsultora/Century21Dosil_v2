import React, { createContext, useContext, useEffect, useState } from 'react';
import * as leadsService from '../services/leadsService';
import { v4 as uuidv4 } from 'uuid';

const LeadsContext = createContext(null);

export function LeadsProvider({ children }) {
  const [utmParams, setUtmParams] = useState({});
  const [leadId, setLeadId] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Capturar los utm de la URL o del localStorage
  const capturarUTMs = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utms = {};

    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith('utm_')) {
        utms[key] = value;
      }
    }

    // Si no hay utms en la URL, intentar recuperar del localStorage
    if (Object.keys(utms).length === 0) {
      const localUtm = localStorage.getItem('utmParams');
      if (localUtm) {
        const parsed = JSON.parse(localUtm);
        setUtmParams(parsed);
        return parsed;
      }
      return null;
    }

    // Si sí hay utms en la URL
    setUtmParams(utms);
    localStorage.setItem('utmParams', JSON.stringify(utms));
    return utms;
  };

  // 🔹 Generar o recuperar el leadId
  useEffect(() => {
    let storedId = localStorage.getItem('leadId');
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('leadId', storedId);
    }
    setLeadId(storedId);
  }, []);

  // 🔹 Enviar UTM apenas tengamos el leadId
  useEffect(() => {
    if (!leadId) return;

    const utms = capturarUTMs();
    if (utms) {
      const page_url = window.location.href;
      const device = /Mobi|Android/i.test(navigator.userAgent) ? 'Móvil' : 'Escritorio';

      leadsService.guardarUTM(leadId, { ...utms, page_url, device })
        .then(() => {
          console.log('✅ UTMs enviados:', { leadId, ...utms });
        })
        .catch(err => {
          console.error('❌ Error al guardar UTMs:', err);
        });
    }
  }, [leadId]);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await leadsService.sincronizarLeads();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeadsContext.Provider value={{
      leadId,
      utmParams,
      leads,
      loading,
      error,
      fetchLeads
    }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
}