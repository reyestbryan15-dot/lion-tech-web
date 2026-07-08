import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({ nombre: '', precio: '', status: 'Stock Inmediato', imagen: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data } = await supabase.from('productos').select('*').order('id', { ascending: false });
    setProductos(data);
  };

  const handleSubirImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    
    // Limpiamos el nombre del archivo para evitar conflictos
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    // --- CORRECCIÓN AQUÍ: Cambiamos 'productos' por 'producto' ---
    const { data, error } = await supabase.storage
      .from('producto') 
      .upload(fileName, file);

    if (error) {
      alert("Error al subir imagen: " + error.message);
    } else {
      // --- CORRECCIÓN AQUÍ: También en la URL pública ---
      const { data: urlData } = supabase.storage
        .from('producto')
        .getPublicUrl(fileName);
        
      setForm({ ...form, imagen: urlData.publicUrl });
      alert("Imagen lista para el catálogo");
    }
    setLoading(false);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    if (!form.imagen) return alert("Sube una imagen primero");

    if (editId) {
      await supabase.from('productos').update(form).eq('id', editId);
      setEditId(null);
    } else {
      await supabase.from('productos').insert([form]);
    }

    setForm({ nombre: '', precio: '', status: 'Stock Inmediato', imagen: '' });
    fetchProductos();
  };

  const prepararEdicion = (p) => {
    setForm({ nombre: p.nombre, precio: p.precio, status: p.status, imagen: p.imagen });
    setEditId(p.id);
    window.scrollTo(0, 0);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      await supabase.from('productos').delete().eq('id', id);
      fetchProductos();
    }
  };

  return (
    <div className="p-8 bg-lion-black min-h-screen text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-lion-cyan tracking-widest uppercase">Panel Admin Lion Tech</h1>

        <form onSubmit={guardarProducto} className="bg-[#111] p-8 rounded-3xl border border-white/5 mb-12 shadow-2xl">
          <h2 className="text-xl mb-6 font-playfair font-bold text-white/90">
            {editId ? 'Editar Producto' : 'Añadir Nuevo Producto'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nombre</label>
              <input 
                type="text" placeholder="Ej: Mouse Gamer Pro" required
                className="bg-black border border-white/10 p-4 rounded-xl text-white focus:border-lion-cyan outline-none transition-all"
                value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Precio (COP)</label>
              <input 
                type="number" placeholder="Ej: 150000" required
                className="bg-black border border-white/10 p-4 rounded-xl text-white focus:border-lion-cyan outline-none transition-all"
                value={form.precio} onChange={e => setForm({...form, precio: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Estado</label>
              <select 
                className="bg-black border border-white/10 p-4 rounded-xl text-white focus:border-lion-cyan outline-none transition-all appearance-none"
                value={form.status} onChange={e => setForm({...form, status: e.target.value})}
              >
                <option value="Stock Inmediato">Stock Inmediato</option>
                <option value="Agotado">Agotado</option>
                <option value="Próximamente">Próximamente</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fotografía</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleSubirImagen} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="bg-black border border-dashed border-white/20 p-4 rounded-xl text-center text-xs text-gray-400 group-hover:border-lion-cyan">
                  {loading ? 'Subiendo archivo...' : (form.imagen ? '✅ Imagen cargada' : 'Seleccionar Imagen')}
                </div>
              </div>
            </div>
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full mt-8 bg-lion-cyan text-black font-black py-4 rounded-xl hover:bg-white transition-all tracking-widest uppercase text-xs"
          >
            {loading ? 'Procesando...' : (editId ? 'Actualizar Producto' : 'Publicar Producto')}
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xs font-black mb-6 text-gray-500 uppercase tracking-[0.3em]">Inventario Actual</h2>
          {productos.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <img src={p.imagen} className="w-14 h-14 object-cover rounded-xl border border-white/5" />
                <div>
                  <p className="font-bold text-sm text-white">{p.nombre}</p>
                  <p className="text-lion-cyan font-mono text-[10px]">${Number(p.precio).toLocaleString('es-CO')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => prepararEdicion(p)} className="p-2 px-4 bg-white/5 text-white text-[10px] font-bold rounded-lg hover:bg-white hover:text-black transition-all">EDITAR</button>
                <button onClick={() => eliminarProducto(p.id)} className="p-2 px-4 bg-red-500/10 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all">BORRAR</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;