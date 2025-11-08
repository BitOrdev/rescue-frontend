async function getHomeMain(data){
    let main = `

        <style>
            /* Main Content */
            .main-content {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            /* Hero Section */
            .hero {
                border-radius: 16px;
                padding: 40px;
                position: relative;
                min-height: 200px;

                box-shadow: 0 0 25px var(--nav_gradient_one);
            }

            .hero-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                z-index: 2;
            }

            .hero-text {
                color: white;
            }

            .hero-label {
                font-size: 14px;
                opacity: 0.9;
                margin-bottom: 8px;
                display: block;
            }

            .hero-title {
                font-size: 32px;
                font-weight: 700;
                margin-bottom: 8px;
            }

            .hero-subtitle {
                font-size: 16px;
                opacity: 0.9;  
            }

            /* Trending Section */

            .trending-title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 24px;
                color: var(--white);
                margin-top: 1rem;
            }

            .trending-grid {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .trending-grid > .trending-card {
                flex: 1 1 calc(33.333% - 1rem);
                box-sizing: border-box;
            }

        </style>

        <!-- Main Content -->
        <main class="main-content">

            <!-- Hero Section -->
            <section class="hero moveGradientAniClass" >
                <div class="hero-content">
                <div class="hero-text">
                    <span class="hero-label">Tcysed</span>
                    <h1 class="hero-title">Recover Funds</h1>
                    <p class="hero-subtitle">Securely recover funds from wallets compromised by sweeper bots across all EVM networks.</p>
                </div>
                </div>
            </section>

            <!-- Trending Section -->
            <section class="trending">
                <h2 class="trending-title">Rescue cards</h2>
                <div class="trending-grid">
                
                    ${data.cards}

                </div>
            </section>

        </main>
    `;

    return main;

}

export { getHomeMain };