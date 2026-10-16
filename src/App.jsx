import { useEffect } from 'react'
import './App.css'

function App() {
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelector('.nav-menu')?.classList.remove('active');
    document.querySelector('.nav-toggle')?.classList.remove('active');
  };

  const handleFilterClick = (e) => {
    const filterValue = e.currentTarget.getAttribute('data-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const filterCount = document.querySelector('.filter-count');
    let visibleProjectCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
        visibleProjectCount += 1;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    if (filterCount) {
      filterCount.textContent = `Showing ${visibleProjectCount} of ${projectCards.length} projects`;
    }

    document.querySelectorAll('.filter-btn').forEach(btn =>
      btn.classList.remove('active')
    );
    e.currentTarget.classList.add('active');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearError = (input) => {
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
      error.remove();
    }
    input.classList.remove('error');
  };

  const showError = (input, message) => {
    clearError(input);

    const error = document.createElement('span');
    error.classList.add('error-message');
    error.textContent = message;

    input.classList.add('error');
    input.classList.remove('success');
    input.parentElement.appendChild(error);
  };

  const showSuccess = (input) => {
    clearError(input);
    input.classList.add('success');
  };

  const maxMessageLength = 300;

  const updateMessageCounter = () => {
    const messageInput = document.querySelector('#message');
    const messageCounter = document.querySelector('#message-counter');
    if (!messageInput || !messageCounter) return;

    const messageLength = messageInput.value.length;
    messageCounter.textContent = `${messageLength} / ${maxMessageLength}`;
    messageCounter.classList.toggle('error', messageLength > maxMessageLength);
  };

  const validateName = () => {
    const nameInput = document.querySelector('#name');
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Name must be at least 2 characters.');
      return false;
    }
    showSuccess(nameInput);
    return true;
  };

  const validateEmail = () => {
    const emailInput = document.querySelector('#email');
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      return false;
    }
    showSuccess(emailInput);
    return true;
  };

  const validateMessage = () => {
    const messageInput = document.querySelector('#message');
    const messageLength = messageInput.value.trim().length;

    if (messageLength < 10) {
      showError(messageInput, 'Message must be at least 10 characters.');
      return false;
    }

    if (messageInput.value.length > maxMessageLength) {
      showError(messageInput, 'Message must be 300 characters or fewer.');
      return false;
    }

    showSuccess(messageInput);
    return true;
  };

  const handleNameInput = () => {
    validateName();
  };

  const handleEmailInput = () => {
    validateEmail();
  };

  const handleMessageInput = () => {
    updateMessageCounter();
    validateMessage();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const contactForm = document.querySelector('#contact-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      contactForm.querySelector('.success-message')?.remove();
      return;
    }

    const existingSuccessMessage = contactForm.querySelector('.success-message');
    if (existingSuccessMessage) {
      existingSuccessMessage.remove();
    }

    const successMessage = document.createElement('p');
    successMessage.classList.add('success-message');
    successMessage.textContent = 'Your message has been sent successfully!';
    contactForm.appendChild(successMessage);

    contactForm.reset();
    updateMessageCounter();
    [nameInput, emailInput, messageInput].forEach(input => {
      input.classList.remove('success');
    });
  };

  const handleMobileMenuToggle = () => {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.querySelector('.nav-toggle').classList.toggle('active');
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link =>
          link.classList.remove('active')
        );
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    const filterCount = document.querySelector('.filter-count');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterCount) {
      filterCount.textContent = `Showing ${projectCards.length} of ${projectCards.length} projects`;
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav id="navbar">
        <div className="nav-brand">
          <span>Chuol Ruei Deng - AI/ML Engineer</span>
        </div>
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
          <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
          <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
        </ul>
        <div className="nav-toggle" onClick={handleMobileMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Chuol Ruei Deng</h1>
          <p className="hero-subtitle">AI/ML Engineer</p>
          <p className="hero-tagline">Building intelligent systems that solve real-world problems</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>View Projects</a>
            <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>Get In Touch</a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a passionate AI/ML engineer with 3 years of experience creating intelligent systems that solve real-world problems. I specialize in machine learning, deep learning, and data science techniques that drive innovation.</p>
              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">✉️</span>
                  <a href="mailto:chuolrdeng@berkeley.edu">chuolrdeng@berkeley.edu</a>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📱</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
            <div className="about-availability">
              <h3>Currently Available For:</h3>
              <div className="availability-tags">
                <span className="tag tag-available">Freelance</span>
                <span className="tag tag-available">Full-Time</span>
                <span className="tag tag-available">Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">⚛️</span>
                <h3 className="skill-name">React</h3>
              </div>
              <div className="skill-category">Frontend Framework</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '90%' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🎨</span>
                <h3 className="skill-name">CSS3</h3>
              </div>
              <div className="skill-category">Styling</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '95%' }}></div>
              </div>
              <span className="skill-percentage">95%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">📱</span>
                <h3 className="skill-name">Responsive Design</h3>
              </div>
              <div className="skill-category">Design</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '88%' }}></div>
              </div>
              <span className="skill-percentage">88%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🚀</span>
                <h3 className="skill-name">JavaScript</h3>
              </div>
              <div className="skill-category">Programming</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '85%' }}></div>
              </div>
              <span className="skill-percentage">85%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🎯</span>
                <h3 className="skill-name">Figma</h3>
              </div>
              <div className="skill-category">Design Tools</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '80%' }}></div>
              </div>
              <span className="skill-percentage">80%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🌐</span>
                <h3 className="skill-name">Node.js</h3>
              </div>
              <div className="skill-category">Backend</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '75%' }}></div>
              </div>
              <span className="skill-percentage">75%</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>

          <div className="filter-buttons">
            <button className="filter-btn active" data-filter="all" onClick={handleFilterClick}>All Projects</button>
            <button className="filter-btn" data-filter="frontend" onClick={handleFilterClick}>Frontend</button>
            <button className="filter-btn" data-filter="fullstack" onClick={handleFilterClick}>Full-Stack</button>
            <button className="filter-btn" data-filter="design" onClick={handleFilterClick}>Design</button>
            <button className="filter-btn" data-filter="webapp" onClick={handleFilterClick}>Web App</button>
          </div>
          <p className="filter-count" aria-live="polite"></p>

          <div className="projects-grid">
            <div className="project-card featured" data-category="fullstack">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/4f46e5/ffffff?text=E-Commerce+App" alt="E-Commerce Platform" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">E-Commerce Platform</h3>
                  <span className="project-category">Full-Stack</span>
                </div>
                <p className="project-description">A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.</p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Node.js</span>
                  <span className="project-tag">MongoDB</span>
                  <span className="project-tag">Stripe</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="frontend">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/059669/ffffff?text=Weather+App" alt="Weather Dashboard" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Weather Dashboard</h3>
                  <span className="project-category">Frontend</span>
                </div>
                <p className="project-description">Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.</p>
                <div className="project-tags">
                  <span className="project-tag">JavaScript</span>
                  <span className="project-tag">CSS3</span>
                  <span className="project-tag">API</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="webapp">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/dc2626/ffffff?text=Task+Manager" alt="Task Management App" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Task Management App</h3>
                  <span className="project-category">Web App</span>
                </div>
                <p className="project-description">Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.</p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">TypeScript</span>
                  <span className="project-tag">Firebase</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="design">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/7c3aed/ffffff?text=Portfolio+Site" alt="Portfolio Website" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Creative Portfolio</h3>
                  <span className="project-category">Design</span>
                </div>
                <p className="project-description">Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.</p>
                <div className="project-tags">
                  <span className="project-tag">HTML5</span>
                  <span className="project-tag">CSS3</span>
                  <span className="project-tag">GSAP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>I'm always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

            <form id="contact-form" className="contact-form" noValidate onSubmit={handleFormSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required onInput={handleNameInput} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required onInput={handleEmailInput} />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="5" required onInput={handleMessageInput}></textarea>
                  <p id="message-counter" className="message-counter" aria-live="polite">0 / 300</p>
                </div>

                <div className="form-group form-group-full">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Chuol Ruei Deng. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Portfolio</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
