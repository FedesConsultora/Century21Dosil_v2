// pages/LeadsPage.js (o componente similar)
import React, { useEffect } from 'react';
import { useLeads } from '../context/LeadsContext';

export default function LeadsPage() {
  const { leads, loading, error, fetchLeads } = useLeads();

  // Cargar leads al montar el componente
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  if (loading) {
    return <p>Cargando leads...</p>;
  }

  if (error) {
    return <p>Error al cargar leads: {error.message}</p>;
  }

  return (
    <div>
      <h2>Listado de Leads</h2>
      <button onClick={fetchLeads}>Refrescar</button>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.nombre} - {lead.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
