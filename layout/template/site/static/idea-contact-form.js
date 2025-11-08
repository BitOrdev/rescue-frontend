async function getIdeaContactForm(params) {
  let contactFormHtml = `
    
        <style>

            .contact-container {
                width: 100%;
                background: var(--black);
                border-radius: 12px;
            }

            .contact-header {
                padding: 30px;
                text-align: center;
                position: relative;
                border-radius: 0.5rem 0.5rem 00px 00px;
            }

            .secure-badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: var(--success_tr_bg);
                color: var(--success);
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .contact-header h1 {
                font-size: 2.2rem;
                margin-bottom: 10px;
                color: var(--white);
            }

            .contact-header p {
                color: var(--white);
                font-size: 1rem;
                max-width: 80%;
                margin: 0 auto;
            }

            .contact-form {
                padding: 30px;
            }

            .form-group {
                margin-bottom: 25px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--white);
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px 15px;
                border-radius: 6px;
                color: var(--white);
                font-size: 1rem;
                transition: all 0.3s ease;
                background-color:var(--black);
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--nav_gradient_two);
            }

            .form-group textarea {
                min-height: 150px;
                resize: vertical;
            }

            .contact-method {
                display: flex;
                gap: 15px;
            }

            .contact-method select {
                flex: 1;
            }

            .contact-method input {
                flex: 2;
            }

            .secure-section {
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 25px;
            }

            .secure-section h3 {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
                color: var(--nav_gradient_two);
            }

            .secure-info {
                font-size: 0.9rem;
                color: var(--card_desc_text);
                margin-bottom: 15px;
                line-height: 1.5;
            }

            /* Updated styles for details/summary */
            details {
                margin-bottom: 15px;
            }

            summary {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                cursor: pointer;
                font-weight: 600;
                border-radius: 6px;
                transition: background-color 0.3s ease;
            }

            .secure-fields {
                margin-top: 15px;
                animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .submit-btn {
                background: linear-gradient(135deg, var(--nav_gradient_one), var(--nav_gradient_two));
                color: var(--white);
                border: none;
                padding: 14px 25px;
                border-radius: 6px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: all 0.3s ease;
            }

            .submit-btn:hover {
                transform: translateY(-2px);
            }

            .submit-btn:active {
                transform: translateY(0);
            }

            .form-footer {
                text-align: center;
                margin-top: 20px;
                color: var(--card_desc_text);
                font-size: 0.9rem;
            }

            .success-message {
                background-color: var(--success_tr_bg_2);
                border-left: 4px solid var(--success);
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 20px;
                display: none;
            }

            .error-message {
                background-color: var(--danger_tr_bg_2);
                border-left: 4px solid var(--danger);
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 20px;
                display: none;
            }

            .secure-notice {
                border-left: 4px solid var(--nav_gradient_two);
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 20px;
                display: none;
            }

            @media (max-width: 576px) {
                .contact-method {
                    flex-direction: column;
                }
                
                .contact-header {
                    padding: 20px;
                }
                
                .contact-form {
                    padding: 20px;
                }
                
                .secure-badge {
                    position: static;
                    display: inline-block;
                    margin-bottom: 10px;
                }
            }
        </style>

        <div class="contact-container">
            <div class="contact-header moveGradientAniClass">
                <div class="secure-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Secure
                </div>
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            
            <div class="contact-form">
                <div class="success-message" id="successMessage">
                    Your message has been sent successfully!
                </div>
                
                <div class="error-message" id="errorMessage">
                    Please fill in all required fields correctly.
                </div>
                
                <div class="secure-notice" id="secureNotice">
                    Provide a secret phrase or sentence that will be used to verify your identity and enable secure communication with our team and users.
                </div>
                
                <div id="contactForm">
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="contactMethod">Contact Method</label>
                        <div class="contact-method">
                            <select id="contactMethod" name="contactMethod">
                                <option value="Telegram" style="background-color: var(--black); color: var(--white);">Telegram</option>
                                <option value="Twitter" style="background-color: var(--black); color: var(--white);">Twitter</option>
                                <option value="Email" style="background-color: var(--black); color: var(--white);">Email</option>
                                <option value="Phone" style="background-color: var(--black); color: var(--white);">Phone</option>
                            </select>
                            <input type="text" id="contactId" name="contactId" placeholder="Username / ID / Email / Phone">
                        </div>
                    </div>
                    
                    <div class="secure-section">
                        <h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Secure Communication
                        </h3>
                        <p class="secure-info">Enable this option for confidential messages. You'll need to provide a secure phrase that our team will use to verify your identity.</p>
                        
                        <!-- Replaced toggle with details/summary -->
                        <div class="secure-fields">
                            <div class="form-group">
                                <label for="securePhrase">Secure Phrase</label>
                                <input type="text" id="securePhrase" name="securePhrase" placeholder="Enter a secret word or sentence">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" placeholder="Type your message here..."></textarea>
                    </div>
                    
                    <button class="submit-btn idea-form-submit-btn">Send Message</button>
                </div>
                
                <div class="form-footer">
                    We typically respond within 24 hours
                </div>
            </div>
        </div>

    `;

  return contactFormHtml;
}

export { getIdeaContactForm };