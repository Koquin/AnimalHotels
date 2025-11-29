import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

interface Tutor {
    id: number;
    name: string;
    email: string;
    phone: string;
    animalCount: number;
}

const mockTutores: Tutor[] = [
    { id: 1, name: "João Silva", email: "joao.s@email.com", phone: "2015", animalCount: 3 },
    { id: 2, name: "Upo Titea", email: "upo.t@email.com", phone: "2210", animalCount: 1 },
    { id: 3, name: "Cia Floga", email: "cia.f@email.com", phone: "3110", animalCount: 5 },
    { id: 4, name: "Dpr Brod", email: "dpr.b@email.com", phone: "1980", animalCount: 2 },
];

const GestaoTutor: React.FC = () => {
    const [tutores, setTutores] = useState(mockTutores);
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(tutores[0] || null);

    const handleNewTutor = () => {
        alert("Navegar para a tela de Cadastro de Novo Tutor.");
    };

    return (
        <div className="tutor-management-container">
            <header className="navbar">
                <div className="logo">
                    <span role="img" aria-label="paw">🐾</span> **AnimalHotels**
                </div>
                <nav>
                    <Link to="/dashboard" className="nav-item">Dashboard</Link>
                    <Link to="/reservas" className="nav-item">Reservas</Link>
                    <a href="#" className="nav-item active">Tutores</a>
                    <Link to="/hospedagens" className="nav-item">Hospedagens</Link>
                    <Link to="/config" className="nav-item">Configuações</Link>
                </nav>
                <div className="user-info">
    Olá, **[Nome do Usuário!]**
    <Link 
        to="/" 
        onClick={() => alert('Logout simulado')} 
        title="Sair"
        className="logout-link" 
        style={{ padding: '5px' }} 
    >
        SAIR <MdLogout size={20} /> 
    </Link>
</div>
            </header>
            
            <main className="content">
                <h2>Módulo de Gestão de Tutores e Animais</h2>
                
                <div className="panels-grid">
                    <div className="tutor-panel">
                        <h3 className="panel-title-tutor">Tutores Cadastrados</h3>
                        
                        <div className="search-and-new">
                            <button className="new-tutor-button" onClick={handleNewTutor}>
                                <FaPlus /> Novo Tutor
                            </button>
                        </div>
                        <div className="tutor-list">
                            {tutores.map((tutor) => (
                                <div 
                                    key={tutor.id} 
                                    className={`tutor-item ${selectedTutor?.id === tutor.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedTutor(tutor)}
                                >
                                    <div className="tutor-details">
                                        <h4>{tutor.name}</h4>
                                        <p className="email-phone">Email: {tutor.email}</p>
                                        <p className="email-phone">Telefone: {tutor.phone}</p>
                                    </div>
                                    <div className="tutor-actions">
                                        <span className="pet-count">{tutor.animalCount} Animais</span>
                                        <button title="Editar Tutor" className="action-button"><FaEdit /></button>
                                        <button title="Visualizar Detalhes" className="action-button"><FaEye /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="pagination">
                            <p>1 - {tutores.length} de 55</p>
                            <span className="page-nav">&lt;</span>
                            <span className="page-nav">&gt;</span>
                        </div>
                    </div>                    
                    <div className="animal-panel">
                        <h3 className="panel-title-animal">
                            Animais do Tutor: {selectedTutor ? selectedTutor.name : 'Nenhum Tutor Selecionado'}
                        </h3>
                        {selectedTutor && (
                            <button className="new-animal-button" onClick={() => alert(`Navegar para o cadastro de animal para ${selectedTutor.name}`)}>
                                + Novo Animal
                            </button>
                        )}
                        
                        <div className="empty-animal-list">
                            <p>Selecione um tutor para ver seus animais ou clique em **+ Novo Animal** para cadastrar.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GestaoTutor;