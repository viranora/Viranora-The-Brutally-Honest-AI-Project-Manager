import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("Viranora analizör uyanıyor...");

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/tasks');
      setTasks(res.data);
      fetchAI(); 
    } catch (err) {
      console.error("Hata:", err);
    }
  };

  const fetchAI = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/ai-analyze');
      setAiAnalysis(res.data.analysis);
    } catch (err) {
      setAiAnalysis("Analizör uykuda.");
    }
  };

  const addTask = async () => {
    if (!newTaskTitle) return;
    try {
      await axios.post(`http://127.0.0.1:8000/tasks?title=${newTaskTitle}`);
      setNewTaskTitle(""); 
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${id}`);
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="min-h-screen bg-v-matte text-v-paper p-8 font-serif">
      <header className="max-w-5xl mx-auto mb-12 border-b border-v-accent/30 pb-6 text-center md:text-left">
        <h1 className="text-6xl font-bold tracking-tighter opacity-90">VİRANORA</h1>
        <p className="text-v-accent mt-2 italic font-sans text-xs tracking-[0.3em] uppercase">Bahaneleri Öldüren Proje Yönetimi</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="bg-v-card p-6 rounded-lg border border-white/5 flex justify-between items-center group">
                <div>
                  <h3 className="text-2xl mb-1 group-hover:text-v-accent transition-colors">{task.title}</h3>
                  <span className="text-[10px] text-v-accent/50 uppercase font-sans">SİSTEM KAYDI #{task.id}</span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-[10px] text-v-accent hover:text-red-500 transition-colors tracking-widest uppercase">
                  [ İMHA ET ]
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-v-accent/10 flex gap-4">
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Yeni bir kaos ismi..."
              className="flex-1 bg-transparent border-b border-v-accent/20 focus:border-v-accent outline-none py-2 italic transition-all"
            />
            <button onClick={addTask} className="px-6 py-2 bg-v-accent text-v-matte font-bold text-xs uppercase hover:bg-v-paper transition-colors">
              SİSTEME İŞLE
            </button>
          </div>
        </div>

        <aside>
          <div className="bg-v-card rounded-sm p-8 border-t-4 border-v-accent sticky top-12 shadow-2xl">
            <h2 className="text-xs font-black tracking-[0.2em] text-v-accent uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-v-accent rounded-full animate-pulse"></span> SİSTEM RAPORU
            </h2>
            <p className="text-sm leading-relaxed opacity-90 font-sans italic border-l border-v-accent/20 pl-4">
              "{aiAnalysis}"
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;