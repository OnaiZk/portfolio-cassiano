import { useState } from 'react'
import { Send, MapPin, Mail, Github, Linkedin } from 'lucide-react'

export default function Contact() {
    const [status, setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        setErrorMessage('')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setStatus('error')
            setErrorMessage('Por favor, insira um e-mail válido.')
            return
        }
        if (formData.message.length < 10) {
            setStatus('error')
            setErrorMessage('Sua mensagem é muito curta. Por favor, detalhe mais.')
            return
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
                setErrorMessage('Erro ao enviar. Tente novamente.')
            }
        } catch (error) {
            setStatus('error')
            setErrorMessage('Erro de conexão. Verifique sua internet.')
        }

        setTimeout(() => {
            setStatus('')
            setErrorMessage('')
        }, 5000)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="contact-section" id="contato">
            <div className="container reveal">
                <div className="contact-grid">
                    <div className="contact-info">
                        <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Vamos Conversar?</span>
                        <h2 className="contact-title">Inicie uma <br className="hide-mobile" /> conversa.</h2>
                        <p style={{ marginBottom: '2rem', opacity: 0.6, maxWidth: '320px', lineHeight: 1.7 }}>
                            Estou sempre aberto a novos projetos e colaborações criativas.
                        </p>

                        <a href="mailto:mouracassiano410@gmail.com" className="contact-email">
                            mouracassiano410@gmail.com
                        </a>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <MapPin size={14} />
                                <span>São Paulo, SP, Brasil</span>
                            </div>
                            <div className="contact-detail-item">
                                <Mail size={14} />
                                <span>Disponível para Freelance</span>
                            </div>
                        </div>

                        <div className="contact-socials">
                            <a href="https://github.com/cassianosilva-elt" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="GitHub">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com/in/mouracassiano" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Seu nome"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mensagem</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Como posso ajudar?"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`btn-primary submit-btn ${status === 'sending' ? 'loading' : ''}`}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'} <Send size={14} />
                            </button>

                            {status === 'success' && <div className="form-status success">Mensagem enviada com sucesso!</div>}
                            {status === 'error' && <div className="form-status error">{errorMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
